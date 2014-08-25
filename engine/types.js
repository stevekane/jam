var uuid     = require("node-uuid")
var fns      = require("../helpers/functions")
var makeUuid = uuid.v4
var curry    = fns.curry
var range    = fns.range
var reduce   = fns.reduce
var types    = {}

//DOM TYPES

types.Layer = curry(function (contextType, name) {
  return {
    name: name,
    ctx:  document.createElement("canvas").getContext(contextType)
  }
})

//DOM TYPES -- END

types.Cache = function () {
  return {
    spriteSheets: {}, 
    sounds:       {}, 
    json:         {}
  }
}

types.Frame = curry(function (x, y, w, h) {
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
types.makeLinearFrames = curry(function (xStart, y, w, h, total) {
  var initialAcc = {
    xPos:   xStart,
    result: []
  }
  var makeFrame = function (acc, el) {
    var newFrame = types.Frame(acc.xPos, y, w, h)

    acc.result.push(newFrame)
    acc.xPos += w
    return acc
  }

  return reduce(makeFrame, initialAcc, range(total)).result
})

types.Animation = curry(function (name, spriteSheet, frames, settings) {
  return {
    name:        name,
    frames:      frames,
    spriteSheet: spriteSheet,
    shouldLoop:  settings.shouldLoop || false,
    fps:         settings.fps || 24
  }  
})

types.AnimationState = function (animations) {
  if (!animations.default) throw new Error("Invalid default animation provided")

  return {
    defaultAnimation: animations.default,
    currentIndex:     null,
    nextFrameDelta:   null,   
    animations:       animations
  }
}

types.Entity = function () {
  return { 
    uuid: makeUuid() 
  }
}

types.Vector2 = curry(function (x,y) {
  return {
    x: x,
    y: y 
  }
})

types.Vector3 = curry(function (x,y,z) {
  return {
    x: x,
    y: y,
    z: z 
  }
})

types.Point2 = types.Vector2

types.Point3 = types.Vector3

types.ColorRgba = curry(function (r,g,b,a) {
  return {
    r: r,
    g: g,
    b: b,
    a: a 
  }
})

module.exports = types
