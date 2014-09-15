'use strict'

var jam       = require("../../jam")
var Scene     = jam.types.game.Scene
var Game      = jam.types.game.Game
var gameFns   = jam.game
var startGame = gameFns.startGame

var bootstrap = function () {
  var width     = 640
  var height    = 480
  var node      = document.querySelector("#game")
  var canvas    = document.createElement("canvas")
  var visualCtx = canvas.getContext("2d")
  var audioCtx  = new (AudioContext || webkitAudioContext)()
  var scenes = {
    main: require("./scenes/main")
  }
  var game = Game(visualCtx, audioCtx, scenes)

  canvas.style.width  = width
  canvas.style.height = height
  node.appendChild(canvas)
  startGame(game, "main")
  window.game = game
}

window.onload = bootstrap
