var uuid      = require("node-uuid")
var fns       = require("../helpers/functions")
var makeUuid  = uuid.v4
var pick      = fns.pick
var curry     = fns.curry
var types     = {}

types.matrices = require("./types/matrices")
types.game     = require("./types/game")
types.kfanim   = require("./types/keyframe-animation")

types.Entity = function () {
  return { 
    uuid: makeUuid() 
  }
}

types.ColorRgba = curry(function (r,g,b,a) {
  return {
    r: r,
    g: g,
    b: b,
    a: a 
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
    size:     types.matrices.Vec2(width, height),
    position: types.matrices.Vec2(x, y),
    rotation: 0
  }
})

types.World2D = pick([
  "size", "camera", "entities", "imageLayers", "tileLayers", "uiLayers"
])

module.exports = types
