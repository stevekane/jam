var types          = require("./types")
var components     = require("./components")
var fns            = require("../helpers/functions")
var Entity         = types.Entity
var Vec3           = types.matrices.Vec3
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

assemblages.BasicBox = function (x, y, z) {
  return thread([
    Size(24,24,24),
    ColorFromRgba(220, 0, 0, 1),
    Position(x, y, z),
    Velocity(0, -.3, 0),
    BasicGravity(.0009),
    Collides
  ], Entity())
}

module.exports = assemblages
