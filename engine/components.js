'use strict'

var fns        = require("../helpers/functions")
var types      = require("./types")
var extend     = fns.extend
var curry      = fns.curry
var clone      = fns.clone
var Vec3       = types.matrices.Vec3
var ColorRgba  = types.ColorRgba
var components = {}

components.Type = curry(function (type, entity) {
  entity.type = type
  return entity
})

components.Size = curry(function (x, y, z, entity) {
  extend(entity, {size: Vec3(x, y, z)})
  return entity
})

components.Position = curry(function (x, y, z, entity) {
  extend(entity, {position: Vec3(x, y, z)})
  return entity
})

components.Velocity = curry(function (x, y, z, entity) {
  extend(entity, {velocity: Vec3(x, y, z)})
  return entity
})

components.Acceleration = curry(function (x, y, z, entity) {
  extend(entity, {acceleration: Vec3(x, y, z)})
  return entity
})

components.BasicGravity = curry(function (coeff, entity) {
  extend(entity, {acceleration: Vec3(0, coeff, 0)})
  return entity
})

components.Direction = curry(function (x, y, z, entity) {
  extend(entity, {direction: Vec3(x, y, z)})
  return entity
})

components.Collides = function (entity) {
  extend(entity, {collides: true})
  return entity 
}

components.AnimatedSprite = curry(function (animationState, entity) {
  extend(entity, {animationState: clone(animationState)})
  return entity
})

components.ColorFromRgba = curry(function (r, g, b, a, entity) {
  extend(entity, {color: ColorRgba(r,g,b,a)})
  return entity
})

module.exports = components
