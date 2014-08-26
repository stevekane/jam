var raf              = require("raf-shim")(window).requestAnimationFrame
var jam              = require("../../jam")
var Entity           = jam.types.Entity
var Point3           = jam.types.Point3
var Layer2d          = jam.types.Layer2d
var Cache            = jam.types.Cache
var BasicBox         = jam.assemblages.BasicBox
var handleCollisions = jam.systems.handleCollisions
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
var ifThenDo         = jam.utils.functions.ifThenDo
var ofSize           = jam.utils.functions.ofSize
var runParallel      = jam.utils.async.runParallel
var pp               = jam.utils.debug.pp
var rgbaToStr        = jam.utils.rendering.rgbaToStr
var makeRandRgba     = jam.utils.rendering.makeRandRgba
var randomFloored    = jam.utils.random.randomFloored
var loadImage        = jam.loaders.loadImage
var loadSound        = jam.loaders.loadSound
var play             = jam.audioPlayer.play
var loop             = jam.audioPlayer.loop

//SYSTEMS 
var renderSquare = curry(function (layer, e) {
  var rgbaStr = rgbaToStr(e.color)

  layer.ctx.fillStyle = rgbaStr
  layer.ctx.fillRect(e.position.x, e.position.y, e.size.x, e.size.y)
})

var hasColor    = hasKey("color") 
var hasSize     = hasKey("size")
var hasPosition = hasKey("position")

var changeColor = function (e) { 
  e.color = makeRandRgba() 
  return e
}

var drawUi = function (ui) {
  ui.innerHTML = "Waiting it out.."  
}

var resize = function (e) { 
  e.size.x = randomFloored(2, 8)
  e.size.y = randomFloored(2, 8)
  return e
}

var relocate = function (e) {
  e.position.x = randomFloored(0, 300)
  e.position.y = randomFloored(0, 300)
  return e
}

var renderSquares = curry(function (ctx, es) {
  ifThenDo(hasColor, renderSquare(ctx), es)
  return es
})

var changeColors = ifThenDo(hasColor, changeColor)
var resizeAll    = ifThenDo(hasSize, resize)
var relocateAll  = ifThenDo(hasPosition, relocate)

//SYSTEMS -- END



//Special Constructors

var makeRandomBox = compose([relocate, BasicBox])

//Special Constructors -- END

/* 
 * Here we build a new audioContext, drawing contexts,
 * ui (html), and cache for the main game state. 
 * We will then load the assets required for this state
 * into the new cache and then call our callback function
*/
var mainLoad = function (scenes, cb) {
  var spriteSheets = scenes.main.assets.spriteSheets
  var sounds       = scenes.main.assets.sounds
  var height       = 480
  var width        = 640
  var audioCtx     = new (AudioContext || webkitAudioContext)()
  var targetNode   = document.querySelector("#game")
  var ui           = document.createElement("div")
  var layers       = {
    background: Layer2d("background", 0), 
    entities:   Layer2d("entities", 1),
    foreground: Layer2d("foreground", 2)
  }
  var sceneObjects = {
    audioCtx: audioCtx,
    ui:       ui,
    layers:   layers,
    entities: ofSize(1000, makeRandomBox),
    cache:    Cache()
  }

  ui.style.zIndex         = 99
  ui.style.color          = "white"
  ui.className            = "ui"
  targetNode.style.width  = width
  targetNode.style.height = height
  forValues(attachLayer(targetNode), layers)
  attachUi(targetNode, ui)

  runParallel({
    images: runParallel({
      bg:       loadImage(spriteSheets.bg),
      fg:       loadImage(spriteSheets.fg),
      maptiles: loadImage(spriteSheets.maptiles),
      //raindrop: loadImage(spriteSheets.raindrop)
    }),
    sounds: runParallel({
      bgMusic:  loadSound(audioCtx, sounds.bgMusic),
      hadouken: loadSound(audioCtx, sounds.hadouken)  
    })
  }, function (err, assets) {
    if (err) return console.log(err)

    play(audioCtx, assets.sounds.hadouken)
    extend(sceneObjects.cache.spriteSheets, assets.images) 
    extend(sceneObjects.cache.spriteSheets, assets.sounds) 
    cb(scenes, sceneObjects)
  })
}

var mainPlay = function (scenes, sceneObjects) {
  var layers   = sceneObjects.layers
  var entities = sceneObjects.entities

  //UPDATES
  resizeAll(entities)
  changeColors(entities)
  relocateAll(entities)
  handleCollisions(entities)
  //UPDATES -- END

  //RENDERING
  clearLayer(layers.entities)
  clearLayer(layers.background)
  clearLayer(layers.foreground)
  renderImageLayer(layers.background, sceneObjects.cache.spriteSheets.bg)
  renderSquares(layers.entities, entities)
  renderImageLayer(layers.foreground, sceneObjects.cache.spriteSheets.fg)
  drawUi(sceneObjects.ui)
  //RENDERING -- END

  raf(function () { mainPlay(scenes, sceneObjects) })
}

var mainPause = function (scenes, sceneObjects) {}

var bootstrap = function (cb) {
  var scenes = {
    main: {
      assets: {
        sounds: {
          bgMusic:  "/examples/assets/sounds/bgm1.mp3",
          hadouken: "/examples/assets/sounds/hadouken.mp3"
        },
        spriteSheets: {
          maptiles: "/examples/assets/spritesheets/maptiles.png",
          bg:       "/examples/assets/spritesheets/fantasy-bg.jpg",
          fg:       "/examples/assets/spritesheets/fg-tree-small.png",
          //raindrop: "/examples/assets/spritesheets/raindrop.png",
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
