'use strict'

var test            = require("tape")
var debug           = require("../helpers/debug")
var types           = require("../engine/types")
var components      = require("../engine/components")
var Entity          = types.Entity
var linearAnimation = types.kfanim.linearAnimation
var AnimationState  = types.kfanim.AnimationState
var Size            = components.Size
var Position        = components.Position
var Direction       = components.Direction
var AnimatedSprite  = components.AnimatedSprite
var ColorFromRgba   = components.ColorFromRgba
var Position        = components.Position
var Velocity        = components.Velocity
var Acceleration    = components.Acceleration
var BasicGravity    = components.BasicGravity
var Collides        = components.Collides

test("Size adds correct size with vector3 to the entity", function (t) {
  var e = Size(1,2,3, Entity())

  t.plan(3)
  t.same(e.size.x, 1, "x component set to 1 correctly")
  t.same(e.size.y, 2, "y component set to 2 correctly")
  t.same(e.size.z, 3, "z component set to 3 correctly")
})

test("Position adds correct position with point3 to the entity", function (t) {
  var e = Position(1,2,3, Entity())

  t.plan(3)
  t.same(e.position.x, 1, "x component set to 1 correctly")
  t.same(e.position.y, 2, "y component set to 2 correctly")
  t.same(e.position.z, 3, "z component set to 3 correctly")
})

test("Direction adds correct direction with vector3 to the entity", function (t) {
  var e = Direction(1,2,3, Entity())

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
  var e = ColorFromRgba(255, 255, 255, 1, Entity())

  t.plan(4)
  t.same(e.color.r, 255, "r component set to 255 correctly")
  t.same(e.color.g, 255, "g component set to 255 correctly")
  t.same(e.color.b, 255, "b component set to 255 correctly")
  t.same(e.color.a, 1, "a component set to 1 correctly")
})

test("Position adds correct position vector to entity", function (t) {
  var e = Position(1,1,2, Entity())

  t.plan(3)
  t.same(e.position.x, 1, "x position set")
  t.same(e.position.y, 1, "y position set")
  t.same(e.position.z, 2, "z position set")
})

test("Velocity adds correct velocity vector to entity", function (t) {
  var e = Velocity(1,1,2, Entity())

  t.plan(3)
  t.same(e.velocity.x, 1, "x velocity set")
  t.same(e.velocity.y, 1, "y velocity set")
  t.same(e.velocity.z, 2, "z velocity set")
})

test("Acceleration adds correct acceleration vector to entity", function (t) {
  var e = Acceleration(1,1,2, Entity())

  t.plan(3)
  t.same(e.acceleration.x, 1, "x acceleration set")
  t.same(e.acceleration.y, 1, "y acceleration set")
  t.same(e.acceleration.z, 2, "z acceleration set")
})

//the actual fractional number is converted to Float32 in the Vec3
//therefore we cannot compare exactly to .00004 due to rounding
test("BasicGravity adds correct y acceleration vector to entity", function (t) {
  var e = BasicGravity(.00004, Entity())

  t.plan(3)
  t.same(e.acceleration.x, 0, "x acceleration set")
  t.true(typeof e.acceleration.y === "number", "y acceleration set")
  t.same(e.acceleration.z, 0, "z acceleration set")
})

test("Collides adds collides == true attribute", function (t) {
  var e = Collides(Entity())

  t.plan(1)
  t.true(e.collides, "collides attribute set to true")
})
