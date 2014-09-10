var test        = require("tape")
var pp          = require("../helpers/debug").pp
var types       = require("../engine/types")
var components  = require("../engine/components")
var assemblages = require("../engine/assemblages") 
var Point3      = types.Point3
var Vector3     = types.Vector3
var BasicBox    = assemblages.BasicBox
var Camera      = assemblages.Camera
var World       = assemblages.World

test("BasicBox produces a composite entity", function (t) {
  var bb = BasicBox(Point3(24,24,0))

  t.plan(4)
  t.true(!!bb.size, "basic box has a size component")
  t.true(!!bb.position, "basic box has a position component")
  t.true(!!bb.color, "basic box has a color component")
  t.true(!!bb.collides, "basic box has a collides component")
})

test("BasicBox sets position to optionally provided point3", function (t) {
  var bb = BasicBox(Point3(24,24,0))

  t.plan(3)
  t.same(bb.position.x, 24, "BasicBox assigns correct x parameter")
  t.same(bb.position.y, 24, "BasicBox assigns correct y parameter")
  t.same(bb.position.z, 0, "BasicBox assigns correct z parameter")
})

test("Camera sets all components correctly", function (t) {
  var size     = Vector3(24, 24 ,0)
  var position = Vector3(0, 0, 0)
  var c        = Camera(size, position)

  t.plan(12)
  t.same(c.position.x, 0, "sets x position correctly")
  t.same(c.position.y, 0, "sets y position correctly")
  t.same(c.position.z, 0, "sets z position correctly")
  t.same(c.size.x, 24, "sets x size correctly")
  t.same(c.size.y, 24, "sets y size correctly")
  t.same(c.size.z, 0, "sets z size correctly")
  t.same(c.velocity.x, 0, "sets x velocity correctly")
  t.same(c.velocity.y, 0, "sets y velocity correctly")
  t.same(c.velocity.z, 0, "sets z velocity correctly")
  t.same(c.acceleration.x, 0, "sets x acceleration correctly")
  t.same(c.acceleration.y, 0, "sets y acceleration correctly")
  t.same(c.acceleration.z, 0, "sets z acceleration correctly")
})

test("World sets components correctly", function (t) {
  var size = Vector3(480, 640, 0)
  var w    = World(size)

  t.plan(3)
  t.same(w.size.x, 480, "sets x size correctly")
  t.same(w.size.y, 640, "sets y size correctly")
  t.same(w.size.z, 0, "sets z size correctly")
})
