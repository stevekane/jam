var fns        = require("../helpers/functions")
var types      = require("./types")
var extend     = fns.extend
var clone      = fns.clone
var curry      = fns.curry
var Vector3    = types.Vector3
var Point3     = types.Point3
var ColorRgba  = types.ColorRgba
var components = {}

components.Size = curry(function (vector3, entity) {
  extend(entity, {size: clone(vector3)})
  return entity
})

components.Position = curry(function (point3, entity) {
  extend(entity, {position: clone(point3)})
  return entity
})

components.Direction = curry(function (vector3, entity) {
  extend(entity, {direction: clone(vector3)})
  return entity
})

components.Collides = function (entity) {
  entity.collides = true
  return entity 
}

components.AnimatedSprite = curry(function (animationState, entity) {
  extend(entity, {animationState: clone(animationState)})
  return entity
})

components.ColorFromRgba = curry(function (rgba, entity) {
  entity.color = rgba
  return entity
})

module.exports = components
