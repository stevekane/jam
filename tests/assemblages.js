var pp          = require("../helpers/debug").pp
var test        = require("tape")
var components  = require("../components")
var assemblages = require("../assemblages") 
var Entity      = components.Entity
var BasicBox    = assemblages.BasicBox

test("BasicBox produces a composite entity", function (t) {
  var bb = BasicBox(Entity())

  t.plan(3)
  t.true(!!bb.size, "basic box has a size component")
  t.true(!!bb.direction, "basic box has a direction component")
  t.true(!!bb.color, "basic box has a color component")
  pp(bb)
})
