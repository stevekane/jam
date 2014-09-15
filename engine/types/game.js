var fns   = require("../../helpers/functions")
var curry = fns.curry
var game  = {}

game.Game = curry(function (visualCtx, audioCtx, scenes) {
  return {
    visualCtx:    visualCtx,
    audioCtx:     audioCtx,
    scenes:       scenes,
    activeScene:  null,
    world:        {},
    cache:        {
      spriteSheets: {}, 
      sounds:       {}, 
      json:         {}
    },
  }
})

module.exports = game
