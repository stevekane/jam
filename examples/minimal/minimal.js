'use strict'

var raf              = require("raf-shim")(window).requestAnimationFrame
var jam              = require("../../jam")
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
var handleCollisions = jam.systems.handleCollisions
var updatePhysics    = jam.systems.updatePhysics
var clearLayer       = jam.systems.clearLayer
var attachLayer      = jam.systems.attachLayer
var attachUi         = jam.systems.attachUi
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
var fetchAndCache    = jam.conventions.caching.fetchAndCache
var pp               = jam.utils.debug.pp
var rgbaToStr        = jam.utils.rendering.rgbaToStr
var randomFloored    = jam.utils.random.randomFloored
var loadImage        = jam.loaders.loadImage
var loadSound        = jam.loaders.loadSound
var play             = jam.audioPlayer.play
var loop             = jam.audioPlayer.loop

//SYSTEMS 
var drawUi = function (dT, ui) {
  ui.innerHTML = "dT is:  " + dT 
}

var renderSquare = curry(function (layer, e) {
  //var rgbaStr = rgbaToStr(e.color)

  //layer.ctx.fillStyle = rgbaStr
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

//SYSTEMS -- END



//ASSEMBLAGES and CONSTRUCTORS

//takes an array of layer names in render order (back-to-front)
var make2dLayers = reduce(function (layers, name, level) {
  layers[name] = Layer2d(level, name)
  return layers
}, {})

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

//ASSEMBLAGES and CONSTRUCTORS -- END


/* 
 * TODO: Camera should be made a type w/ constructor
 *
 * Here we build a new audioContext, drawing contexts,
 * ui (html), and cache for the main game state. 
 * We will then load the assets required for this state
 * into the new cache and then call our callback function
*/
var mainLoad = function (scenes, cb) {
  var height       = 480
  var width        = 640
  var audioCtx     = new (AudioContext || webkitAudioContext)()
  var targetNode   = document.querySelector("#game")
  var ui           = document.createElement("div")
  var layers       = make2dLayers(["background", "entities", "foreground"])
  var cache        = Cache()
  var assetPath    = "/examples/assets/json/main-assets.json"
  var camera       = Camera(Vector3(width, height, 0), Vector3(0, 0, 0))
  var sceneObjects = {
    camera:   camera,
    audioCtx: audioCtx,
    ui:       ui,
    layers:   layers,
    entities: ofSize(400, makeRain),
    cache:    cache
  }

  ui.style.zIndex         = 99
  ui.style.color          = "white"
  ui.className            = "ui"
  targetNode.style.width  = width
  targetNode.style.height = height
  forValues(attachLayer(targetNode), layers)
  attachUi(targetNode, ui)

  fetchAndCache(audioCtx, cache, assetPath, function (err, assets) {
    return cb(scenes, sceneObjects)
  })
}

var mainUpdate = function (oldTime, scenes, sceneObjects) {
  var entities = sceneObjects.entities
  var now      = performance.now()
  var dT       = now - oldTime

  updatePhysics(dT, entities)
  recycleRain(sceneObjects.camera.size.y, entities)

  window.setTimeout(function () { mainUpdate(now, scenes, sceneObjects) }, 25)
}

//called as quickly as possible to draw (raf)
var mainRender = function (oldTime, sceneObjects) {
  var layers   = sceneObjects.layers
  var entities = sceneObjects.entities
  var now      = performance.now()
  var dT       = now - oldTime

  clearLayer(layers.entities)
  clearLayer(layers.background)
  clearLayer(layers.foreground)
  renderImageLayer(layers.background, sceneObjects.cache.spriteSheets.bg)
  renderSquares(layers.entities, entities)
  renderImageLayer(layers.foreground, sceneObjects.cache.spriteSheets.fg)
  drawUi(dT, sceneObjects.ui)

  raf(function () { mainRender(now, sceneObjects) })
}

var mainPlay = function (scenes, sceneObjects) {
  var startTime = performance.now()

  mainUpdate(startTime, scenes, sceneObjects)
  mainRender(startTime, sceneObjects)
}

var mainPause = function (scenes, sceneObjects) {}

var bootstrap = function (cb) {
  var scenes = {
    main: {
      load:  mainLoad,
      play:  mainPlay,
      pause: mainPause
    } 
  }

  scenes.main.load(scenes, scenes.main.play)
}

window.onload = bootstrap
