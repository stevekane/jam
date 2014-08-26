var test             = require("tape")
var types            = require("../engine/types")
var Entity           = types.Entity
var Vector2          = types.Vector2
var Vector3          = types.Vector3
var Point2           = types.Point2
var Point3           = types.Point3
var Frame            = types.Frame
var linearFrames     = types.linearFrames
var Animation        = types.Animation
var linearAnimation  = types.linearAnimation
var AnimationState   = types.AnimationState
var Layer            = types.Layer
var Layer2d          = types.Layer2d

test("Entity adds uuid field to object", function (t) {
  var e = Entity()

  t.plan(1)
  t.true(!!e.uuid, "a uuid is correctly assiged in Entity constructor")
})

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

test("Frame has x, y, w, h components set correctly", function (t) {
  var f = Frame(0, 48, 24, 24)

  t.plan(4)
  t.same(f.x, 0,  "x component set correctly")
  t.same(f.y, 48, "y component set correctly")
  t.same(f.w, 24, "w component set correctly")
  t.same(f.h, 24, "h component set correctly")
})

test("linearFrames produces correct array of frames", function (t) {
  var expectedFirstFrame  = Frame(0, 24, 24, 24)
  var expectedSecondFrame = Frame(24, 24, 24, 24)
  var expectedThirdFrame  = Frame(48, 24, 24, 24)
  var fs                  = linearFrames(0, 24, 24, 24, 3)

  t.plan(3) 
  t.same(fs[0], expectedFirstFrame, "produces correct first frame")
  t.same(fs[1], expectedSecondFrame, "produces correct second frame")
  t.same(fs[2], expectedThirdFrame, "produces correct third frame")
})

test("Animation produces correct components", function (t) {
  var settings = {
    fps:        24,
    shouldLoop: true 
  }
  var frames = linearFrames(0, 24, 24, 24, 3)
  var a      = Animation("test", "test.png", frames, settings)

  t.plan(5)
  t.same(a.name, "test", "name assigned correctly")
  t.same(a.frames, frames, "frames assigned correctly")
  t.same(a.spriteSheet, "test.png", "spriteSheet assigned correctly")
  t.same(a.fps, 24, "fps assigned correctly")
  t.same(a.shouldLoop, true, "shouldLoop assigned correctly")
})

test("linearAnimation produces correct components", function (t) {
  var settings = {
    fps:        24,
    shouldLoop: true 
  }
  var a = linearAnimation("test", "test.png", 0, 24, 24, 24, 3, settings)
  
  t.plan(5)
  t.same(a.name, "test", "name assigned correctly")
  t.same(a.spriteSheet, "test.png", "spriteSheet assigned correctly")
  t.same(a.fps, 24, "fps assigned correctly")
  t.same(a.shouldLoop, true, "shouldLoop assigned correctly")
  t.true(!!a.frames,  "defines array of frames")
})

test("AnimationState produces correct components", function (t) {
  var jumpFrames  = linearFrames(0, 24, 24, 24, 3)
  var standFrames = linearFrames(0, 48, 24, 24, 3)
  var settings = {
    fps:        24,
    shouldLoop: true 
  }
  var animations = {
    default: Animation("jump", "char.png", jumpFrames, settings),
    jump:    Animation("jump", "char.png", jumpFrames, settings),
    stand:   Animation("stand", "char.png", standFrames, settings) 
  }
  var as = AnimationState(animations)

  t.plan(4)
  t.same(as.defaultAnimation, animations.default, "sets defaultAnimation correctly")
  t.same(as.currentIndex, null, "sets currentIndex correctly")
  t.same(as.nextFrameDelta, null, "sets nextFrameDelta, correctly")
  t.same(as.animations, animations, "sets animations correctly")
})

//TODO
//This test would need to run inside the DOM.  This should be split out?
//test("Layer produces correct components", function (t) {
//})

//TODO
//This test would need to run inside the DOM.  This should be split out?
//test("Layer2d produces correct components", function (t) {
//})
