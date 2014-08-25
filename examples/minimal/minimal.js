var raf              = require("raf-shim")(window).requestAnimationFrame
var jam              = require("../../jam")
var Entity           = jam.types.Entity
var Point3           = jam.types.Point3
var Layer            = jam.types.Layer
var Cache            = jam.types.Cache
var BasicBox         = jam.assemblages.BasicBox
var handleCollisions = jam.systems.handleCollisions
var clearLayer       = jam.systems.clearLayer
var extend           = jam.utils.functions.extend
var compose          = jam.utils.functions.compose
var mapBy            = jam.utils.functions.mapBy
var forEach          = jam.utils.functions.forEach
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

//SYSTEMS 
var renderSquare = curry(function (ctx, e) {
  var rgbaStr = rgbaToStr(e.color)

  ctx.fillStyle = rgbaStr
  ctx.fillRect(e.position.x, e.position.y, e.size.x, e.size.y)
})

var renderBackground = curry(function (ctx, bgImage) {
  ctx.drawImage(bgImage, 0, 0, ctx.canvas.width, ctx.canvas.height)
})

var renderForeground = curry(function (ctx, fgImage) {
  ctx.drawImage(fgImage, 0, 0, ctx.canvas.width, ctx.canvas.height)
})

var hasColor    = hasKey("color") 
var hasSize     = hasKey("size")
var hasPosition = hasKey("position")

var changeColor = function (e) { 
  e.color = makeRandRgba() 
  return e
}

var drawUi = function (ui) {
  ui.innerHTML = "Here is your UI friend"  
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


var attachUi = curry(function (target, el) {
  target.appendChild(el)
  el.style.width  = target.style.width
  el.style.height = target.style.height
})

//DOM interactions
var attachLayer = curry(function (target, l) {
  target.appendChild(l.ctx.canvas)
  l.ctx.canvas.style.width  = target.style.width
  l.ctx.canvas.style.height = target.style.height
})

var attachLayers = curry(function (target, layers) {
  forEach(attachLayer(target), layers)
})

//converts lists of layers into hash of layers by name -> ctx
var hashLayers = function (layers) {
  return layers.reduce(function (hash, l) {
    hash[l.name] = l.ctx
    return hash
  }, {})
}

//Special Constructors

var makeRandomBox = compose([relocate, BasicBox])

//Special Constructors -- END

//DOM interactions -- END

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
  var targetNode   = document.querySelector("#game")
  var ui           = document.createElement("div")
  var layers       = [
    Layer("2d", "background"),
    Layer("2d", "entities"),
    Layer("2d", "foreground")
  ]
  var sceneObjects = {
    audioCtx: new (AudioContext || webkitAudioContext()),
    ui:       ui,
    layers:   hashLayers(layers),
    entities: ofSize(1000, makeRandomBox),
    cache:    Cache()
  }

  targetNode.style.width  = width
  targetNode.style.height = height
  attachLayers(targetNode, layers)
  attachUi(targetNode, ui)

  runParallel({
    images: runParallel({
      bg:       loadImage(spriteSheets.bg),
      fg:       loadImage(spriteSheets.fg),
      maptiles: loadImage(spriteSheets.maptiles)
    }),
    sounds: runParallel({
      hadouken: loadSound(sounds.hadouken)  
    })
  }, function (err, assets) {
    if (err) {
      console.log(err)
    } else {
      extend(sceneObjects.cache.spriteSheets, assets.images) 
      extend(sceneObjects.cache.spriteSheets, assets.sounds) 
      cb(scenes, sceneObjects)
    }
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
  renderBackground(layers.background, sceneObjects.cache.spriteSheets.bg)
  renderSquares(layers.entities, entities)
  renderForeground(layers.foreground, sceneObjects.cache.spriteSheets.fg)
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
          hadouken: "/examples/assets/sounds/hadouken.mp3"
        },
        spriteSheets: {
          maptiles: "/examples/assets/spritesheets/maptiles.png",
          bg:       "/examples/assets/spritesheets/fantasy-bg.jpg",
          fg:       "/examples/assets/spritesheets/fg-tree-small.png" 
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
