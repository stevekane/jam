var test        = require("tape")
var pp          = require("../helpers/debug").pp
var types       = require("../engine/types")
var components  = require("../engine/components")
var assemblages = require("../engine/assemblages") 
var Point3      = types.Point3
var BasicBox    = assemblages.BasicBox

test("BasicBox produces a composite entity", function (t) {
  var bb = BasicBox()

  t.plan(3)
  t.true(!!bb.size, "basic box has a size component")
  t.true(!!bb.position, "basic box has a position component")
  t.true(!!bb.color, "basic box has a color component")
  pp(bb)
})

test("BasicBox sets position to optionally provided point3", function (t) {
  var bb = BasicBox(Point3(24,24,0))

  t.plan(3)
  t.same(bb.position.x, 24, "BasicBox assigns correct x parameter")
  t.same(bb.position.y, 24, "BasicBox assigns correct y parameter")
  t.same(bb.position.z, 0, "BasicBox assigns correct z parameter")
  pp(bb)
})
