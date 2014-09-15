var test      = require("tape")
var rendering = require("../../engine/types/rendering")
var World2D   = rendering.World2D
var Camera2D  = rendering.Camera2D
var ColorRgba = rendering.ColorRgba

test("ColorRgba outputs correct aliases", function (t) {
  var c = ColorRgba(1,2,3,1)

  t.plan(8)
  t.equal(c.r, 1)
  t.equal(c.g, 2)
  t.equal(c.b, 3)
  t.equal(c.a, 1)
  c.r++
  c.g++
  c.b++
  c.a = c.a - .5
  t.equal(c.r, 2)
  t.equal(c.g, 3)
  t.equal(c.b, 4)
  t.equal(c.a, .5)
})

test("World2D ", function (t) {
  var props = {
    size:        {},
    camera:      {},
    entites:     [],
    imageLayers: {},
    tileLayers:  {},
    uiLayers:    {}
  }
  var world = World2D(props)

  t.plan(6)

  t.same(world.size, props.size, "size object present")
  t.same(world.camera, props.camera, "camera object present")
  t.same(world.entities, props.entities, "entities array present")
  t.same(world.imageLayers, props.imageLayers, "imageLayers object present")
  t.same(world.tileLayers, props.tileLayers, "tileLayers object present")
  t.same(world.uiLayers, props.uiLayers, "uiLayers object present")
})

test("Camera2D", function (t) {
  var c = Camera2D(0, 20, 640, 480)

  t.plan(5)
  t.same(c.position.x, 0, "x position set correctly")
  t.same(c.position.y, 20, "y position set correctly")
  t.same(c.size.x, 640, "x size set correctly")
  t.same(c.size.y, 480, "y size set correctly")
  t.same(c.rotation, 0, "rotation set to 0 as default")
})
