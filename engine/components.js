var _         = require("lodash")
var types     = require("./types")
var extend    = _.extend
var clone     = _.clone
var curry     = _.curry
var Vector3   = types.Vector3
var Point3    = types.Point3
var ColorRgba = types.ColorRgba

var Size = curry(function Size (vector3, entity) {
  extend(entity, {size: clone(vector3)})
  return entity
})

var Position = curry(function Position (point3, entity) {
  extend(entity, {position: clone(point3)})
  return entity
})

var Direction = curry(function Direction (vector3, entity) {
  extend(entity, {direction: clone(vector3)})
  return entity
})

var Renderable = curry(function Renderable (fn, entity) {
  entity.renderFn = fn
  return entity
})

var ColorFromRgba = curry(function (rgba, entity) {
  entity.color = rgba
  return entity
})

module.exports.Size          = Size
module.exports.Position      = Position
module.exports.Direction     = Direction
module.exports.Renderable    = Renderable
module.exports.ColorFromRgba = ColorFromRgba
