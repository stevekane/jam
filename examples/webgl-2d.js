'use strict'

var raf              = require("raf-shim")(window).requestAnimationFrame
var jam              = require("jam")

var loadAndStart = function () {
  fetchAndCache(audioCtx, cache, assetPath, function (err, assets) {
    var completionTime = performance.now()

    //loop(audioCtx, assets.sounds.bgMusic)
    return cb(completionTime, scenes, sceneObjects)
  })
}

window.onload = loadAndStart

var mainPlay = function (oldTime, scenes, sceneObjects) {
  raf(function () { mainPlay(now, scenes, sceneObjects) })
}
