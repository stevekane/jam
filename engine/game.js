'use strict'

var raf            = require("raf-shim")(window).requestAnimationFrame
var types          = require("./types")
var loaders        = require("./loaders")
var fns            = require("../helpers/functions")
var Game           = types.Game
var curry          = fns.curry
var extend         = fns.extend
var loadAssetsHash = loaders.loadAssetsHash
var gameFns        = {}

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

gameFns.changeScene = curry(function (game, sceneName, cb) {
  var newScene = game.scenes[sceneName]
  var cb       = cb || function () {}

  loadAssetsHash(game.audioCtx, newScene.assets, function (err, assets) {
    extend(game.cache, assets)
    game.previousScene = game.activeScene
    game.activeScene   = game.scenes[sceneName]
    game.activeScene.setup(game)
    cb(err, game)
  })
})

gameFns.startGame = curry(function (game, sceneName) {
  gameFns.changeScene(game, sceneName, function (err) {
    var startTime = performance.now()

    update(startTime, game)
    render(startTime, game)
  })
})

module.exports = gameFns
