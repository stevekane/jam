'use strict'

var raf           = require("raf-shim")(window).requestAnimationFrame
var jam           = require("../../jam")
var Cache         = jam.types.Cache
var Scene         = jam.types.Scene
var curry         = jam.utils.functions.curry
var fetchAndCache = jam.conventions.caching.fetchAndCache

var Game = function (targetNode, audioCtx, scenes) {
  return {
    targetNode:   targetNode,
    audioCtx:     audioCtx,
    scenes:       scenes,
    cache:        Cache(),
    activeScene:  null,
    isPaused:     false,
    sceneObjects: {}
  }
}

/*
 * Store the previous scene's name
 * load and cache assets for the scene
 * When load is complete
 *  change the activeScene
 *  call the setup function
 */
var update = function (oldTime, game) {
  var now = performance.now()
  var dT  = now - oldTime

  game.activeScene.update(dT, game)
  window.setTimeout(update, 25, now, game)
}

var render = function (oldTime, game) {
  var now = performance.now()
  var dT  = now - oldTime

  game.activeScene.render(dT, game)
  raf(function () { render(now, game) })
}

var changeScene = curry(function (game, sceneName, cb) {
  var newScene = game.scenes[sceneName]
  var cb       = cb || function () {}

  fetchAndCache(game.audioCtx, game.cache, newScene.assets, function (err, assets) {
    game.previousScene = game.activeScene
    game.activeScene   = game.scenes[sceneName]       
    game.activeScene.setup(game)
    cb(err, game)
  })
})

var startGame = curry(function (game, sceneName) {
  changeScene(game, sceneName, function (err) {
    var startTime = performance.now()

    update(startTime, game)
    render(startTime, game)
  })
})

var bootstrap = function () {
  var node     = document.querySelector("#game")
  var audioCtx = new (AudioContext || webkitAudioContext)()
  var scenes = {
    main: Scene(require("./scenes/main"))
  }
  var game = Game(node, audioCtx, scenes)

  node.style.width  = 640 
  node.style.height = 480
  startGame(game, "main")
}

window.onload = bootstrap
