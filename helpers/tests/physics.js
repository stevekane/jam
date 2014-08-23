var test           = require("tape")
var physics        = require("../physics")
var types          = require("../../engine/types")
var assemblages    = require("../../engine/assemblages")
var checkCollision = physics.checkCollision
var BasicBox       = assemblages.BasicBox
var Point3         = types.Point3

test("checkCollision correctly detects colliding entities", function (t) {
  var sub  = BasicBox(Point3(0,0,0))
  var tar  = BasicBox(Point3(12,12,0))
  var tar2 = BasicBox(Point3(48,48,0))

  t.plan(2)
  t.true(checkCollision(sub, tar), "collision correctly detected")
  t.false(checkCollision(sub, tar2), "non-collision correctly detected")
})

test("checkCollision does not detect collisions with self", function (t) {
  var e  = BasicBox(Point3(0,0,0))

  t.plan(1)
  t.false(checkCollision(e, e), "collision with self returns false")
})
