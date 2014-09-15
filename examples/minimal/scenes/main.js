'use strict'

var jam              = require("../../../jam")
var Entity           = jam.types.Entity
var Vec2             = jam.types.matrices.Vec2
var ImageLayer       = jam.types.rendering.ImageLayer
var TileLayer        = jam.types.rendering.TileLayer
var UILayer          = jam.types.rendering.UILayer
var ColorRgba        = jam.types.rendering.ColorRgba
var Camera2D         = jam.types.rendering.Camera2D
var World2D          = jam.types.rendering.World2D
var Type             = jam.components.Type
var Size             = jam.components.Size
var ColorFromRgba    = jam.components.ColorFromRgba
var Position         = jam.components.Position
var Velocity         = jam.components.Velocity
var BasicGravity     = jam.components.BasicGravity
var Collides         = jam.components.Collides
var updatePhysics    = jam.systems.updatePhysics
var fillScreen       = jam.rendering.fillScreen
var clearScreen      = jam.rendering.clearScreen
var renderImageLayer = jam.rendering.renderImageLayer
var forValues        = jam.utils.functions.forValues
var reduce           = jam.utils.functions.reduce
var curry            = jam.utils.functions.curry
var hasKey           = jam.utils.functions.hasKey
var hasKeyVal        = jam.utils.functions.hasKeyVal
var ofSize           = jam.utils.functions.ofSize
var thread           = jam.utils.functions.thread
var ifThenDo         = jam.utils.combinators.ifThenDo
var play             = jam.audioPlayer.play
var loop             = jam.audioPlayer.loop

var main = {}

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

//TODO: FIX THIS.  need to decide how a camera gets its size.
//Is the size a property of the game?  should the game even
//create a canvas at all or simply store the root node
//to be used by a scene at its discretion?
main.setup = function (game) {
  var size        = Vec2(1920, 1080)
  var camera      = Camera2D(0, 0, 640, 480)
  var entities    = []
  var tileLayers  = {}
  var uiLayers    = {}
  var imageLayers = {
    bg: ImageLayer(game.cache.spriteSheets.bg)
  }
  var world = World2D({
    size:        size,
    camera:      camera, 
    entities:    entities,
    imageLayers: imageLayers,
    tileLayers:  tileLayers,
    uiLayers:    uiLayers
  })

  game.world = world
}

main.update = function (dT, game) {}

main.render = function (dT, game) {
  clearScreen(game.visualCtx)
  fillScreen("blue", game.visualCtx)
}

module.exports = main
