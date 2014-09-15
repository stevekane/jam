var fns       = require("../../helpers/functions")
var curry     = fns.curry
var aliasProp = fns.aliasProp
var matrices  = {}

/*
NOTE!  The inputs are parsed in column-major order meaning you
read the first three inputs as a single column of the matrix!
This is done because webgl's shader language GLSL uses column
major as its default for its built-in matrix matrices

For convenience in javascript, we have aliased the elements of the
typed array to names in row,column format.  
E.G. The bottom row middle column element is zy
*/
matrices.Mat3 = curry(function (a, b, c, d, e, f, g, h, i) {
  var out = new Float32Array(9)

  out[0] = a
  out[1] = b
  out[2] = c
  out[3] = d
  out[4] = e
  out[5] = f
  out[6] = g
  out[7] = h
  out[8] = i
  aliasProp("xx", 0, out)
  aliasProp("yx", 1, out)
  aliasProp("zx", 2, out)
  aliasProp("xy", 3, out)
  aliasProp("yy", 4, out)
  aliasProp("zy", 5, out)
  aliasProp("xz", 6, out)
  aliasProp("yz", 7, out)
  aliasProp("zz", 8, out)
  return out
})

//N.B. Columm-major ordering!
matrices.Mat4 = curry(function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
  var out = new Float32Array(16)

  out[0]  = a
  out[1]  = b
  out[2]  = c
  out[3]  = d
  out[4]  = e
  out[5]  = f
  out[6]  = g
  out[7]  = h
  out[8]  = i
  out[9]  = j
  out[10] = k
  out[11] = l
  out[12] = m
  out[13] = n
  out[14] = o
  out[15] = p
  aliasProp("xx", 0, out)
  aliasProp("yx", 1, out)
  aliasProp("zx", 2, out)
  aliasProp("wx", 3, out)

  aliasProp("xy", 4, out)
  aliasProp("yy", 5, out)
  aliasProp("zy", 6, out)
  aliasProp("wy", 7, out)
  
  aliasProp("xz", 8, out)
  aliasProp("yz", 9, out)
  aliasProp("zz", 10, out)
  aliasProp("wz", 11, out)

  aliasProp("xw", 12, out)
  aliasProp("yw", 13, out)
  aliasProp("zw", 14, out)
  aliasProp("ww", 15, out)

  return out
})

matrices.Vec2 = curry(function (x, y) {
  var out = new Float32Array(2)

  out[0] = x
  out[1] = y
  aliasProp("x", 0, out)
  aliasProp("y", 1, out)
  return out
})

matrices.Vec3 = curry(function (x, y, z) {
  var out = new Float32Array(3)

  out[0] = x
  out[1] = y
  out[2] = z
  aliasProp("x", 0, out)
  aliasProp("y", 1, out)
  aliasProp("z", 2, out)
  return out  
})

matrices.Vec4 = curry(function (x, y, z, w) {
  var out = new Float32Array(4)

  out[0] = x
  out[1] = y
  out[2] = z
  out[3] = w
  aliasProp("x", 0, out)
  aliasProp("y", 1, out)
  aliasProp("z", 2, out)
  aliasProp("w", 3, out)
  return out  
})

module.exports = matrices
