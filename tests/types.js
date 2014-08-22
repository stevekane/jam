var test    = require("tape")
var types   = require("../types")
var Vector2 = types.Vector2
var Vector3 = types.Vector3
var Point2  = types.Point2
var Point3  = types.Point3

test("Vector2 has x and y component set correctly", function (t) {
  var v2 = Vector2(1,2)

  t.plan(2)
  t.same(v2.x, 1, "x component set to 1 correctly")
  t.same(v2.y, 2, "y component set to 2 correctly")
})

test("Vector3 has x, y and z component set correctly", function (t) {
  var v3 = Vector3(1,2,3)

  t.plan(3)
  t.same(v3.x, 1, "x component set to 1 correctly")
  t.same(v3.y, 2, "y component set to 2 correctly")
  t.same(v3.z, 3, "z component set to 3 correctly")
})

test("Point2 has x and y component set correctly", function (t) {
  var p2 = Vector2(1,2)

  t.plan(2)
  t.same(p2.x, 1, "x component set to 1 correctly")
  t.same(p2.y, 2, "y component set to 2 correctly")
})

test("Point3 has x, y and z component set correctly", function (t) {
  var p3 = Point3(1,2,3)

  t.plan(3)
  t.same(p3.x, 1, "x component set to 1 correctly")
  t.same(p3.y, 2, "y component set to 2 correctly")
  t.same(p3.z, 3, "z component set to 3 correctly")
})
