var raf           = require("raf-shim")(window).requestAnimationFrame
var jam           = require("../../jam")
var Entity        = jam.types.Entity
var Point3        = jam.types.Point3
var BasicBox      = jam.assemblages.BasicBox
var pp            = jam.utils.debug.pp
var log           = jam.utils.debug.log
var rgbaToStr     = jam.utils.rendering.rgbaToStr
var makeRandRgba  = jam.utils.rendering.makeRandRgba
var randomFloored = jam.utils.random.randomFloored
var loadImage     = jam.loaders.loadImage
var loadSound     = jam.loaders.loadSound
var play          = jam.audioPlayer.play

//SYSTEMS
var renderSquare = function (ctx, e) {
  var rgbaStr = rgbaToStr(e.color)

  ctx.fillStyle = rgbaStr
  ctx.fillRect(e.position.x, e.position.y, e.size.x, e.size.y)
}

var hasColor    = function (e) { return !!e.color }
var hasSize     = function (e) { return !!e.size }
var changeColor = function (e) { e.color = makeRandRgba() }

var resize = function (e) { 
  var newSize = Point3(
    randomFloored(0, 48),
    randomFloored(0, 48),
    randomFloored(0, 48))

  e.size = newSize
}

var clearScreen = function (ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

var renderSquares = function (ctx, es) {
  es.filter(hasColor).forEach(function (e) { renderSquare(ctx, e) })
}

var changeColors = function (es) { 
  es.filter(hasColor).forEach(changeColor)
}

var resizeAll = function (es) {
  es.filter(hasSize).forEach(resize)
}
//SYSTEMS -- END


/* 
 * Here we build a new audioContext, drawing contexts,
 * ui (html), and cache for the main game state. 
 * We will then load the assets required for this state
 * into the new cache and then call our callback function
*/
var mainLoad = function (scenes, cb) {
  var entityCanvas = document.createElement("canvas")
  var sceneObjects = {
    audioCtx: new (AudioContext || webkitAudioContext()),
    layers: {
      entities: entityCanvas.getContext("2d") 
    },
    entities: [BasicBox(Point3(24, 24, 0))],
    cache: {
      sounds:       {},
      spriteSheets: {},
      json:         {}
    }
  }

  entityCanvas.height = 480
  entityCanvas.width  = 640

  document.body.appendChild(sceneObjects.layers.entities.canvas)

  window.setTimeout(function () {
    cb(sceneObjects) 
  }, 2000)
}

var mainPlay = function (sceneObjects) {
  var layers   = sceneObjects.layers
  var entities = sceneObjects.entities

  resizeAll(entities)
  changeColors(entities)
  clearScreen(layers.entities)
  renderSquares(layers.entities, entities)
  raf(function () { mainPlay(sceneObjects) })
}

var mainPause = function () {}

var bootstrap = function (cb) {
  var scenes = {
    main: {
      assets: {
        sounds: {
          hadouken: "/examples/assets/sounds/hadouken.mp3"
        },
        spritesheets: {
          maptiles: "/examples/assets/spritesheets/maptiles.png" 
        }
      },
      load:  mainLoad,
      play:  mainPlay,
      pause: mainPause
    } 
  }

  scenes.main.load(scenes, scenes.main.play)
}

window.onload = bootstrap
