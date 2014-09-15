var test        = require("tape")
var types       = require("../engine/types")
var assemblages = require("../engine/assemblages") 
var Vec3        = types.matrices.Vec3
var BasicBox    = assemblages.BasicBox

test("BasicBox produces a composite entity", function (t) {
  var bb = BasicBox(24,24,0)

  t.plan(4)
  t.true(!!bb.size, "basic box has a size component")
  t.true(!!bb.position, "basic box has a position component")
  t.true(!!bb.color, "basic box has a color component")
  t.true(!!bb.collides, "basic box has a collides component")
})
