var raf              = require("raf-shim")(window).requestAnimationFrame
var jam              = require("../../jam")
var systems          = jam.systems
var Entity           = jam.types.Entity
var Point3           = jam.types.Point3
var BasicBox         = jam.assemblages.BasicBox
var handleCollisions = systems.handleCollisions
var mapBy            = jam.utils.functions.mapBy
var pp               = jam.utils.debug.pp
var log              = jam.utils.debug.log
var rgbaToStr        = jam.utils.rendering.rgbaToStr
var makeRandRgba     = jam.utils.rendering.makeRandRgba
var randomFloored    = jam.utils.random.randomFloored
var loadImage        = jam.loaders.loadImage
var loadSound        = jam.loaders.loadSound
var play             = jam.audioPlayer.play

//SYSTEMS 
var renderSquare = function (ctx, e) {
  var rgbaStr = rgbaToStr(e.color)

  ctx.fillStyle = rgbaStr
  ctx.fillRect(e.position.x, e.position.y, e.size.x, e.size.y)
}

var hasColor    = function (e) { return !!e.color }
var hasSize     = function (e) { return !!e.size }
var changeColor = function (e) { e.color = makeRandRgba() }

var drawUi = function (ui) {
  ui.innerHTML = "Here is your UI friend"  
}

var resize = function (e) { 
  e.size = Point3(randomFloored(24, 48), randomFloored(24, 48), 0)
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


var attachUi = function (target, el) {
  target.appendChild(el)
  el.style.width  = target.style.width
  el.style.height = target.style.height
}

//DOM interactions
var attachLayer = function (target, l) {
  target.appendChild(l.ctx.canvas)
  l.ctx.canvas.style.width  = target.style.width
  l.ctx.canvas.style.height = target.style.height
}

//converts lists of layers into hash of layers by name -> ctx
var hashLayers = function (layers) {
  return layers.reduce(function (hash, l) {
    hash[l.name] = l.ctx
    return hash
  }, {})
}

//DOM interactions -- END

/* 
 * Here we build a new audioContext, drawing contexts,
 * ui (html), and cache for the main game state. 
 * We will then load the assets required for this state
 * into the new cache and then call our callback function
*/
var mainLoad = function (scenes, cb) {
  var height      = 480
  var width       = 640
  var targetNode  = document.querySelector("#game")
  var ui          = document.createElement("div")
  var layers      = [
    {name: "entities", ctx: document.createElement("canvas").getContext("2d") },
  ]
  var sceneObjects = {
    audioCtx: new (AudioContext || webkitAudioContext()),
    ui:       ui,
    layers:   hashLayers(layers),
    entities: [BasicBox(Point3(24, 24, 0)), BasicBox(Point3(12, 12, 0))],
    cache: {
      spriteSheets: {},
      sounds:       {},
      json:         {}
    }
  }

  targetNode.style.width    = width
  targetNode.style.height   = height
  layers.forEach(function (l) { attachLayer(targetNode, l) })
  attachUi(targetNode, ui)

  window.setTimeout(function () {
    cb(sceneObjects) 
  }, 2000)
}

var mainPlay = function (sceneObjects) {
  var layers   = sceneObjects.layers
  var entities = sceneObjects.entities

  //resizeAll(entities)
  changeColors(entities)
  handleCollisions(entities)
  clearScreen(layers.entities)
  renderSquares(layers.entities, entities)
  drawUi(sceneObjects.ui)
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
