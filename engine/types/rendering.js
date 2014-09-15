var fns       = require("../../helpers/functions") 
var matrices  = require("./matrices")
var Vec2      = matrices.Vec2
var pick      = fns.pick
var curry     = fns.curry
var aliasProp = fns.aliasProp
var rendering = {}

rendering.ColorRgba = curry(function (r,g,b,a) {
  var out = new Float32Array(4)
  
  out[0] = r
  out[1] = g
  out[2] = b
  out[3] = a
  aliasProp("r", 0, out)
  aliasProp("g", 1, out)
  aliasProp("b", 2, out)
  aliasProp("a", 3, out)
  return out
})

//TODO: IMPLEMENT
rendering.ImageLayer = curry(function (image) {
  return {
    image: image,
  }  
})

//TODO: IMPLEMENT
rendering.TileLayer = curry(function () {})

//TODO: IMPLEMENT
rendering.UILayer = curry(function () {})

rendering.Camera2D = curry(function (x, y, width, height) {
  return {
    size:     Vec2(width, height),
    position: Vec2(x, y),
    rotation: 0
  }
})

rendering.World2D = pick([
  "size", "camera", "entities", "imageLayers", "tileLayers", "uiLayers"
])

module.exports = rendering
