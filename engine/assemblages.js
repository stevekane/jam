var types          = require("./types")
var components     = require("./components")
var fns            = require("../helpers/functions")
var Entity         = types.Entity
var Vector3        = types.Vector3
var Point3         = types.Point3
var ColorRgba      = types.ColorRgba
var Type           = components.Type
var Size           = components.Size
var Position       = components.Position
var Velocity       = components.Velocity
var Acceleration   = components.Acceleration
var BasicGravity   = components.BasicGravity
var Collides       = components.Collides
var ColorFromRgba  = components.ColorFromRgba
var curry          = fns.curry
var thread         = fns.thread
var assemblages    = {}

assemblages.BasicBox = function (pos) {
  return thread([
    Size(Vector3(24,24,24)),
    ColorFromRgba(ColorRgba(220, 0, 0, 1)),
    Position(pos),
    Velocity(Point3(0, -.3, 0)),
    BasicGravity(.0009),
    Collides
  ], Entity())
}

//TODO: perhaps this should set size based on w/h from animation?
assemblages.BasicSprite = curry(function (animationState, pos) {
  return thread([
    Size(Vector3(24,24,24)),
    Position(pos),
    AnimatedSprite(animationState),
    Collides
  ], Entity())
})

module.exports = assemblages
