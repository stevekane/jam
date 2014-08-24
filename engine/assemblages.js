var cf             = require("../helpers/control-flow")
var types          = require("./types")
var components     = require("./components")
var thread         = cf.thread
var Entity         = types.Entity
var Vector3        = types.Vector3
var Point3         = types.Point3
var ColorRgba      = types.ColorRgba
var Size           = components.Size
var Position       = components.Position
var Collides       = components.Collides
var ColorFromRgba  = components.ColorFromRgba

var BasicBox = function (point3) {
  var e = Entity()

  return thread([
    Size(Vector3(24,24,24)),
    ColorFromRgba(ColorRgba(220, 0, 0, 1)),
    Position(point3 || Point3(0,0,0)),
    Collides
  ])(e)
}

module.exports.BasicBox      = BasicBox
