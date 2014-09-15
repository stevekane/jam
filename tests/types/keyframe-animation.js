var test            = require("tape")
var kf              = require("../../engine/types/keyframe-animation")
var Frame           = kf.Frame
var linearFrames    = kf.linearFrames
var Animation       = kf.Animation
var linearAnimation = kf.linearAnimation
var AnimationState  = kf.AnimationState

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

