var cf             = require("./helpers/control-flow")
var types          = require("./types")
var components     = require("./components")
var Vector3        = types.Vector3
var Point3         = types.Point3
var Size           = components.Size
var Direction      = components.Direction
var ColorFromRgba  = components.ColorFromRgba
var thread         = cf.thread

var BasicBox = thread([
  Size(Vector3(24,24,24)),
  ColorFromRgba(220, 0, 0, 1),
  Direction(Vector3(1,1,0))
])

module.exports.BasicBox = BasicBox
