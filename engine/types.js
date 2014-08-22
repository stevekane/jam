var uuid      = require("node-uuid")
var makeUuid  = uuid.v4

var Entity = function Entity () {
  return { 
    uuid: makeUuid() 
  }
}

function Vector2 (x,y) {
  return {
    x: x,
    y: y 
  }
}

function Vector3 (x,y,z) {
  return {
    x: x,
    y: y,
    z: z 
  }
}

var Point2 = Vector2

var Point3 = Vector3

function ColorRgba (r,g,b,a) {
  return {
    r: r,
    g: g,
    b: b,
    a: a 
  }
}

module.exports.Entity    = Entity
module.exports.Vector2   = Vector2
module.exports.Vector3   = Vector3
module.exports.Point2    = Point2
module.exports.Point3    = Point3
module.exports.ColorRgba = ColorRgba
