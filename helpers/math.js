'use strict'

var fns   = require("./functions")
var curry = fns.curry
var math  = {}

/*
 * Here we define mat3 x mat3.  this is useful for creating
 * compositions of transforms in homogeneous coordinates
 */
math.mat3ByMat3 = curry(function (a, b, outMat3) {
  var a00 = a[0][0], a01 = a[0][1], a02 = a[0][2]
  var a10 = a[1][0], a11 = a[1][1], a12 = a[1][2]
  var a20 = a[2][0], a21 = a[2][1], a22 = a[2][2]
  var b00 = b[0][0], b01 = b[0][1], b02 = b[0][2]
  var b10 = b[1][0], b11 = b[1][1], b12 = b[1][2]
  var b20 = b[2][0], b21 = b[2][1], b22 = b[2][2]

  outMat3[0][0] = b00 * a00 + b01 * a10 + b02 * a20
  outMat3[0][1] = b00 * a01 + b01 * a11 + b02 * a21
  outMat3[0][2] = b00 * a02 + b01 * a12 + b02 * a22

  outMat3[1][0] = b10 * a00 + b11 * a10 + b12 * a20
  outMat3[1][1] = b10 * a01 + b11 * a11 + b12 * a21
  outMat3[1][2] = b10 * a02 + b11 * a12 + b12 * a22

  outMat3[2][0] = b20 * a00 + b21 * a10 + b22 * a20
  outMat3[2][1] = b20 * a01 + b21 * a11 + b22 * a21
  outMat3[2][2] = b20 * a02 + b21 * a12 + b22 * a22

  return outMat3
})

/*
 * | a b |   | x |
 * | c d | * | y |
 *
 * | ax + by |
 * | cx + dy |
 */

math.mat2ByVec2 = curry(function (mat2, outVec2) {
  var x = outVec2.x
  var y = outVec2.y

  outVec2.x = (mat2[0][0] * x) + (mat2[0][1] * y)
  outVec2.y = (mat2[1][0] * x) + (mat2[1][1] * y)
  return outVec2
})

//same idea as mat2ByVec2 but w/o the input matric.  just x/y scalefactors
math.scaleVec2 = curry(function (sx, sy, outVec2) {
  var x = outVec2.x
  var y = outVec2.y

  outVec2.x = (sx * x)
  outVec2.y = (sy * y)
  return outVec2
})

/*
 * | x | + | a |
 * | y | + | b |
 *
 * | x + a |
 * | y + b |
 */
math.vec2AddVec2 = curry(function (vec2, outVec2) {
  outVec2.x = outVec2.x + vec2.x
  outVec2.y = outVec2.y + vec2.y
  return outVec2
})

math.vec2SubVec2 = curry(function (vec2, outVec2) {
  outVec2.x = outVec2.x - vec2.x
  outVec2.y = outVec2.y - vec2.y
  return outVec2
})

//same idea as vec2AddVec2 but w/o input vector2, just x/y values
math.translateVec2 = curry(function (tx, ty, outVec2) {
  outVec2.x = outVec2.x + tx
  outVec2.y = outVec2.y + ty
  return outVec2
})

/*
 * this is done w/ matrix multiplication thus we need
 * to "build" a matrix for use in the rotation given
 * an angle in radians
 */
//TODO: implement
math.rotateVec2 = curry(function (rad, outVec2) {
  return outVec2
})

/*
 * We first must translate to achieve new origin
 * then we can use our existing scale function
 * then we must translate back
 */
//TODO: implement
math.scaleAboutVec2 = curry(function (sx, sy, vec2, outVec2) {
  return outVec2 
})

module.exports = math
