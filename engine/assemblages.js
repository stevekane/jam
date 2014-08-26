var types          = require("./types")
var components     = require("./components")
var fns            = require("../helpers/functions")
var Entity         = types.Entity
var Vector3        = types.Vector3
var Point3         = types.Point3
var ColorRgba      = types.ColorRgba
var Size           = components.Size
var Position       = components.Position
var Collides       = components.Collides
var ColorFromRgba  = components.ColorFromRgba
var assemblages    = {}

assemblages.BasicBox = function (point3) {
  var e = Entity()

  Size(Vector3(24,24,24), e)
  ColorFromRgba(ColorRgba(220, 0, 0, 1), e)
  Position(point3 || Point3(0,0,0), e)
  Collides(e)
  
  return e
}

//TODO: perhaps this should set size based on w/h from animation?
assemblages.BasicSprite = function (animationState, point3) {
  var e = Entity()

  Size(Vector3(24,24,24), e)
  Position(point3 || Point3(0,0,0), e)
  AnimatedSprite(animationState)
  Collides(e)
}

module.exports = assemblages
