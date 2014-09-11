'use strict'

var jam            = require("../../jam")
var startGame      = jam.game.startGame
var Scene          = jam.types.Scene
var Game           = jam.types.Game

var bootstrap = function () {
  var node     = document.querySelector("#game")
  var audioCtx = new (AudioContext || webkitAudioContext)()
  var scenes = {
    main: Scene(require("./scenes/main"))
  }
  var game = Game(node, audioCtx, scenes)

  node.style.width  = game.size.x
  node.style.height = game.size.y
  startGame(game, "main")
}

window.onload = bootstrap
