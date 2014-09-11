'use strict'

var raf              = require("raf-shim")(window).requestAnimationFrame
var jam              = require("../../../jam")
var Entity           = jam.types.Entity
var Point3           = jam.types.Point3
var Vector3          = jam.types.Vector3
var Layer2d          = jam.types.Layer2d
var ColorRgba        = jam.types.ColorRgba
var Cache            = jam.types.Cache
var Type             = jam.components.Type
var Size             = jam.components.Size
var ColorFromRgba    = jam.components.ColorFromRgba
var Position         = jam.components.Position
var Velocity         = jam.components.Velocity
var BasicGravity     = jam.components.BasicGravity
var Collides         = jam.components.Collides
var Camera           = jam.assemblages.Camera
var updatePhysics    = jam.systems.updatePhysics
var clearLayer       = jam.systems.clearLayer
var attachLayer      = jam.systems.attachLayer
var renderImageLayer = jam.systems.renderImageLayer
var extend           = jam.utils.functions.extend
var compose          = jam.utils.functions.compose
var mapBy            = jam.utils.functions.mapBy
var forEach          = jam.utils.functions.forEach
var forValues        = jam.utils.functions.forValues
var values           = jam.utils.functions.values
var reduce           = jam.utils.functions.reduce
var curry            = jam.utils.functions.curry
var hasKey           = jam.utils.functions.hasKey
var hasKeyVal        = jam.utils.functions.hasKeyVal
var ofSize           = jam.utils.functions.ofSize
var thread           = jam.utils.functions.thread
var ifThenDo         = jam.utils.combinators.ifThenDo
var runParallel      = jam.utils.async.runParallel
var randomFloored    = jam.utils.random.randomFloored
var play             = jam.audioPlayer.play
var loop             = jam.audioPlayer.loop

var main = {}

var renderSquare = curry(function (layer, e) {
  layer.ctx.fillRect(e.position.x, e.position.y, e.size.x, e.size.y)
})

var hasColor      = hasKey("color") 
var isRain        = hasKeyVal("type", "rain") 
var rainOffScreen = curry(function (height, e) {
  return e.position.y > height
})
var resetRain = function (e) {
  e.position.y = 0
  e.position.x = randomFloored(0, 640)
  e.velocity.y = Math.random()
}
//takes an array of layer names in render order (back-to-front)
var make2dLayers = reduce(function (layers, name, level) {
  layers[name] = Layer2d(level, name)
  return layers
}, {})


//Assemblages/Constructors
var makeRain = function () {
  return thread([
    Type("rain"),
    Size(Vector3(4, 4, 0)),
    ColorFromRgba(ColorRgba(0, 0, 210, .6)),
    Position(Point3(randomFloored(-100, 640), 0, 0)),
    Velocity(Vector3(.1, Math.random(), 0)),
    BasicGravity(.0009),
    Collides
  ], Entity())
}
//Assemblages/Constructors -- END

var renderSquares = curry(function (ctx, ents) {
  ifThenDo(
    [hasColor], 
    [renderSquare(ctx)], 
    ents
  )
})

var recycleRain = curry(function (height, ents) {
  ifThenDo(
    [isRain, rainOffScreen(height)],
    [resetRain],
    ents 
  )
})


main.assets = {
  sounds: {
    bgMusic: "/examples/assets/sounds/bgm1.mp3"
  },
  spriteSheets: {
    bg: "/examples/assets/spritesheets/fantasy-bg.jpg",
    fg: "/examples/assets/spritesheets/fg-tree-small.png"
  },
  json: {}
}

main.setup = function (game) {
  var width  = game.size.x
  var height = game.size.y

  game.sceneObjects = {
    camera:   Camera(Vector3(width, height, 0), Vector3(0, 0, 0)),
    layers:   make2dLayers(["bg", "entities", "fg"]),
    entities: ofSize(400, makeRain)
  }

  forValues(attachLayer(game.targetNode), game.sceneObjects.layers)
  renderImageLayer(game.sceneObjects.layers.bg, game.cache.spriteSheets.bg)
  renderImageLayer(game.sceneObjects.layers.fg, game.cache.spriteSheets.fg)
}

main.update = function (dT, game) {
  var entities  = game.sceneObjects.entities
  var maxHeight = game.sceneObjects.camera.size.y

  updatePhysics(dT, entities)
  recycleRain(maxHeight, entities)
}

main.renderWhileLoading = function (dT, game) {
  console.log("whatever i'm loading ok")
}

main.renderWhilePaused = function (dT, game) {
  console.log("paused")
}

//called as quickly as possible to draw (raf)
main.render = function (dT, game) {
  var layers   = game.sceneObjects.layers
  var entities = game.sceneObjects.entities
  var cache    = game.cache

  clearLayer(layers.entities)
  renderSquares(layers.entities, entities)
}

module.exports = main
