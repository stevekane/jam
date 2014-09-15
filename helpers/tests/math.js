var test          = require("tape")
var m             = require("../math")
var types         = require("../../engine/types")
var mat2ByVec2    = m.mat2ByVec2
var mat3ByMat3    = m.mat3ByMat3
var scaleVec2     = m.scaleVec2
var vec2AddVec2   = m.vec2AddVec2
var vec2SubVec2   = m.vec2SubVec2
var translateVec2 = m.translateVec2
var Vector2       = types.Vector2
var Matrix2       = types.Matrix2
var Matrix3       = types.Matrix3
var Mat3          = types.Mat3

//test("mat3ByMat3 correctly multiplies", function (t) {
//  var m1     = Matrix3(1,1,1,2,2,2,3,3,3)
//  var m2     = Matrix3(1,1,1,2,2,2,3,3,3)
//  var output = Matrix3(0,0,0,0,0,0,0,0,0)
//
//  mat3ByMat3(m1, m2, output)
//  t.plan(9)
//  t.equal(output[0][0], 6 , "00 correct")
//  t.equal(output[0][1], 6 , "01 correct")
//  t.equal(output[0][2], 6 , "02 correct")
//  t.equal(output[1][0], 12, "10 correct")
//  t.equal(output[1][1], 12, "11 correct")
//  t.equal(output[1][2], 12, "12 correct")
//  t.equal(output[2][0], 18, "20 correct")
//  t.equal(output[2][1], 18, "21 correct")
//  t.equal(output[2][2], 18, "22 correct")
//})
//
//test("mat2ByVec2 correctly multiplies", function (t) {
//  var m = Matrix2(2, 0, 4, 0) 
//  var v = Vector2(2, 2)
//
//  mat2ByVec2(m, v)
//  t.plan(2)
//  t.equal(v.x, 4, "x corrdinate of vector correctly updated")
//  t.equal(v.y, 8, "y corrdinate of vector correctly updated")
//})
//
//test("scaleVec2 correctly scales", function (t) {
//  var sx = 2
//  var sy = 4
//  var v  = Vector2(2, 2)
//
//  scaleVec2(sx, sy, v)
//  t.plan(2)
//  t.equal(v.x, 4, "x coord of v correct")
//  t.equal(v.y, 8, "y coord of v correct")
//})
//
//test("vec2Addvec2 correctly adds", function (t) {
//  var toAdd = Vector2(2, 3)
//  var v     = Vector2(1, 4)
//
//  vec2AddVec2(toAdd, v)
//  t.plan(2)
//  t.equal(v.x, 3, "x coord of v correct")
//  t.equal(v.y, 7, "y coord of v correct")
//})
//
//test("vec2Subvec2 correctly subtracts", function (t) {
//  var toSub = Vector2(2, 3)
//  var v     = Vector2(1, 4)
//
//  vec2SubVec2(toSub, v)
//  t.plan(2)
//  t.equal(v.x, -1, "x coord of v correct")
//  t.equal(v.y, 1, "y coord of v correct")
//})
//
//test("translateVec2 correctly translates", function (t) {
//  var tx = 3
//  var ty = 4
//  var v  = Vector2(3, 5)
//
//  translateVec2(tx, ty, v)
//  t.plan(2)
//  t.equal(v.x, 6, "x coord correct")
//  t.equal(v.y, 9, "y coord correct")
//})
