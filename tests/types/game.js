var test  = require("tape")
var game  = require("../../engine/types/game")
var Game  = game.Game

test("Game object contains expected values", function (t) {
  var audioCtx   = {}
  var visualCtx  = {}
  var scenes     = {}
  var game       = Game(visualCtx, audioCtx, scenes)

  t.plan(6)
  t.same(game.audioCtx, audioCtx, "audioCtx present")
  t.same(game.visualCtx, visualCtx, "visualCtx present")
  t.same(game.scenes, scenes, "scenes present")
  t.equal(typeof game.cache, "object", "Cache present")
  t.same(game.activeScene, null, "activeScene present")
  t.equal(typeof game.world, "object", "world present")
})
