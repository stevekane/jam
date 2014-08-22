var _         = require("lodash")
var uuid      = require("node-uuid")
var types     = require("./types")
var extend    = _.extend
var clone     = _.clone
var curry     = _.curry
var Vector3   = types.Vector3
var Point3    = types.Point3
var ColorRgba = types.ColorRgba
var makeUuid  = uuid.v4

var Entity = curry(function Entity () {
  if (!(this instanceof Entity)) return new Entity

  this.uuid = makeUuid()
})

var Size = curry(function Size (vector3, entity) {
  extend(entity, {size: clone(vector3)})
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

var ColorFromRgba = curry(function (r, g, b, a, entity) {
  entity.color = ColorRgba(r, g, b, a)
  return entity
})

module.exports.Entity        = Entity
module.exports.Size          = Size
module.exports.Direction     = Direction
module.exports.Renderable    = Renderable
module.exports.ColorFromRgba = ColorFromRgba
