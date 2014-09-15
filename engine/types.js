var uuid      = require("node-uuid")
var fns       = require("../helpers/functions")
var makeUuid  = uuid.v4
var pick      = fns.pick
var curry     = fns.curry
var range     = fns.range
var reduce    = fns.reduce
var aliasProp = fns.aliasProp
var types     = {}

types.Scene = pick(["assets", "setup", "render", "update"])

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
types.linearFrames = curry(function (xStart, y, w, h, total) {
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

types.Animation = curry(function (name, spriteSheet, frames, opts) {
  return {
    name:        name,
    frames:      frames,
    spriteSheet: spriteSheet,
    shouldLoop:  opts.shouldLoop || false,
    fps:         opts.fps || 24
  }  
})

//alternative constructor assuming linear layout of frames
types.linearAnimation = curry(function (name, spriteSheet, x, y, w, h, total, opts) {
  var frames = types.linearFrames(x, y, w, h, total)

  return types.Animation(name, spriteSheet, frames, opts)
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

//alternative form for mat3 possibly better?
types.Mat3 = curry(function (a, b, c, d, e, f, g, h, i) {
  var out = new Float32Array(9)

  out[0] = a
  out[1] = b
  out[2] = c
  out[3] = d
  out[4] = e
  out[5] = f
  out[6] = g
  out[7] = h
  out[8] = i

  aliasProp("xx", 0, out)
  aliasProp("xy", 1, out)
  aliasProp("xz", 2, out)
  aliasProp("yx", 3, out)
  aliasProp("yy", 4, out)
  aliasProp("yz", 5, out)
  aliasProp("zx", 6, out)
  aliasProp("zy", 7, out)
  aliasProp("zz", 8, out)
  return out
})

types.Vec3 = curry(function (x, y, z) {
  var out = new Float32Array(3)

  out[0] = x
  out[1] = y
  out[2] = z

  aliasProp("x", 0, out)
  aliasProp("y", 1, out)
  aliasProp("z", 2, out)
  return out  
})

types.Matrix2 = curry(function (a, b, c, d) {
  return [
    [a, b],
    [c, d] 
  ]
})

types.Matrix3 = curry(function (a, b, c, d, e, f, g, h, i) {
  return [
    [a, b, c],
    [d, e, f],
    [g, h, i]
  ]
})

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

types.Game = curry(function (visualCtx, audioCtx, scenes) {
  return {
    visualCtx:    visualCtx,
    audioCtx:     audioCtx,
    scenes:       scenes,
    cache:        types.Cache(),
    activeScene:  null,
    world:        {}
  }
})

types.ImageLayer = curry(function (image) {
  return {
    image: image,
  }  
})

types.TileLayer = curry(function () {})

types.UILayer = curry(function () {})

types.Camera2D = curry(function (x, y, width, height) {
  return {
    size:     types.Vector2(width, height),
    position: types.Vector2(x, y),
    rotation: 0
  }
})

types.World2D = pick([
  "size", "camera", "entities", "imageLayers", "tileLayers", "uiLayers"
])

module.exports = types
