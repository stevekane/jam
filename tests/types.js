var test             = require("tape")
var types            = require("../engine/types")
var Entity           = types.Entity
var World2D          = types.World2D
var Camera2D         = types.Camera2D

test("Entity adds uuid field to object", function (t) {
  var e = Entity()

  t.plan(1)
  t.true(!!e.uuid, "a uuid is correctly assiged in Entity constructor")
})

require("./types/matrices")
require("./types/game")
require("./types/keyframe-animation")

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
