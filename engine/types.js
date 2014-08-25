var uuid     = require("node-uuid")
var fns      = require("../helpers/functions")
var makeUuid = uuid.v4
var curry    = fns.curry
var types    = {}

//DOM TYPES

types.Layer = curry(function (contextType, name) {
  return {
    name: name,
    ctx:  document.createElement("canvas").getContext(contextType)
  }
})

//DOM TYPES -- END

types.Entity = function () {
  return { 
    uuid: makeUuid() 
  }
}

types.Vector2 = curry(function (x,y) {
  return {
    x: x,
    y: y 
  }
})

types.Vector3 = curry(function (x,y,z) {
  return {
    x: x,
    y: y,
    z: z 
  }
})

types.Point2 = types.Vector2

types.Point3 = types.Vector3

types.ColorRgba = curry(function (r,g,b,a) {
  return {
    r: r,
    g: g,
    b: b,
    a: a 
  }
})

module.exports = types
