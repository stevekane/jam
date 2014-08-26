var test            = require("tape")
var debug           = require("../helpers/debug")
var types           = require("../engine/types")
var components      = require("../engine/components")
var Entity          = types.Entity
var Vector3         = types.Vector3
var Point3          = types.Point3
var ColorRgba       = types.ColorRgba
var linearAnimation = types.linearAnimation
var AnimationState  = types.AnimationState
var Size            = components.Size
var Position        = components.Position
var Direction       = components.Direction
var AnimatedSprite  = components.AnimatedSprite
var ColorFromRgba   = components.ColorFromRgba

test("Size adds correct size with vector3 to the entity", function (t) {
  var e = Size(Vector3(1,2,3), Entity())

  t.plan(3)
  t.same(e.size.x, 1, "x component set to 1 correctly")
  t.same(e.size.y, 2, "y component set to 2 correctly")
  t.same(e.size.z, 3, "z component set to 3 correctly")
})

test("Position adds correct position with point3 to the entity", function (t) {
  var e = Position(Point3(1,2,3), Entity())

  t.plan(3)
  t.same(e.position.x, 1, "x component set to 1 correctly")
  t.same(e.position.y, 2, "y component set to 2 correctly")
  t.same(e.position.z, 3, "z component set to 3 correctly")
})

test("Direction adds correct direction with vector3 to the entity", function (t) {
  var e = Direction(Vector3(1,2,3), Entity())

  t.plan(3)
  t.same(e.direction.x, 1, "x component set to 1 correctly")
  t.same(e.direction.y, 2, "y component set to 2 correctly")
  t.same(e.direction.z, 3, "z component set to 3 correctly")
})

test("AnimatedSprite adds appropriate animatedSprite to entity", function (t) {
  var settings = {shouldLoop: true}
  var as = AnimationState({
    default: linearAnimation("stand", "char.png", 0,24,24,24,3, settings),
    stand:   linearAnimation("stand", "char.png", 0,24,24,24,3, settings),
    jump:    linearAnimation("jump", "char.png", 0,48,24,24,8, settings),
  })
  var e = AnimatedSprite(as, Entity())

  t.plan(1)
  t.true(!!e.animationState, "correctly assigns hash animationState")
})

test("ColorFromRgba adds correct color to the entity", function (t) {
  var e = ColorFromRgba(ColorRgba(255, 255, 255, 1), Entity())

  t.plan(4)
  t.same(e.color.r, 255, "r component set to 255 correctly")
  t.same(e.color.g, 255, "g component set to 255 correctly")
  t.same(e.color.b, 255, "b component set to 255 correctly")
  t.same(e.color.a, 1, "a component set to 1 correctly")
})
