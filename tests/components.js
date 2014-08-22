var _          = require("lodash")
var compose    = _.compose
var sequence   = _.sequence
var test       = require("tape")
var debug      = require("../helpers/debug")
var types      = require("../types")
var components = require("../components")
var Vector3    = types.Vector3
var Entity     = components.Entity
var Size       = components.Size
var Direction  = components.Direction

test("Entity adds uuid field to object", function (t) {
  var e = Entity()

  t.plan(1)
  t.true(!!e.uuid, "a uuid is correctly assiged in Entity constructor")
})

test("Size adds correct size with vector3 to the entity", function (t) {
  var e = Size(Vector3(1,2,3), Entity())

  t.plan(3)
  t.same(e.size.x, 1, "x component set to 1 correctly")
  t.same(e.size.y, 2, "y component set to 2 correctly")
  t.same(e.size.z, 3, "z component set to 3 correctly")
})

test("Direction adds correct direction with vector3 to the entity", function (t) {
  var e = Direction(Vector3(1,2,3), Entity())

  t.plan(3)
  t.same(e.direction.x, 1, "x component set to 1 correctly")
  t.same(e.direction.y, 2, "y component set to 2 correctly")
  t.same(e.direction.z, 3, "z component set to 3 correctly")
})
