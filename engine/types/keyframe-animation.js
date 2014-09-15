var fns    = require("../../helpers/functions")
var curry  = fns.curry
var range  = fns.range
var reduce = fns.reduce
var kfanim = {}

kfanim.Frame = curry(function (x, y, w, h) {
  return {
    x: x,
    y: y,
    w: w,
    h: h 
  }
})

/*
  constructor for an array of frames which assumes that all frames for
  an animation are linearly laid out in a spritesheet
*/
kfanim.linearFrames = curry(function (xStart, y, w, h, total) {
  var initialAcc = {
    xPos:   xStart,
    result: []
  }
  var makeFrame = function (acc, el) {
    var newFrame = kfanim.Frame(acc.xPos, y, w, h)

    acc.result.push(newFrame)
    acc.xPos += w
    return acc
  }

  return reduce(makeFrame, initialAcc, range(total)).result
})

kfanim.Animation = curry(function (name, spriteSheet, frames, opts) {
  return {
    name:        name,
    frames:      frames,
    spriteSheet: spriteSheet,
    shouldLoop:  opts.shouldLoop || false,
    fps:         opts.fps || 24
  }  
})

//alternative constructor assuming linear layout of frames
kfanim.linearAnimation = curry(function (name, spriteSheet, x, y, w, h, total, opts) {
  var frames = kfanim.linearFrames(x, y, w, h, total)

  return kfanim.Animation(name, spriteSheet, frames, opts)
})

kfanim.AnimationState = function (animations) {
  if (!animations.default) throw new Error("Invalid default animation provided")

  return {
    defaultAnimation: animations.default,
    currentIndex:     null,
    nextFrameDelta:   null,   
    animations:       animations
  }
}

module.exports = kfanim
