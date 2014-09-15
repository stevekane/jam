var test     = require("tape")
var matrices = require("../../engine/types/matrices")
var Mat3     = matrices.Mat3
var Mat4     = matrices.Mat4
var Vec2     = matrices.Vec2
var Vec3     = matrices.Vec3
var Vec4     = matrices.Vec4

//NB.  The inputs are read in column-major format!
test("Mat3 defines all property aliases correctly", function (t) {
  var m = Mat3(1,2,3,4,5,6,7,8,9)  

  t.plan(18)
  t.equal(m.xx, 1)
  t.equal(m.xy, 4)
  t.equal(m.xz, 7)
  t.equal(m.yx, 2)
  t.equal(m.yy, 5)
  t.equal(m.yz, 8)
  t.equal(m.zx, 3)
  t.equal(m.zy, 6)
  t.equal(m.zz, 9)

  m.xx++ 
  m.xy++
  m.xz++
  m.yx++
  m.yy++
  m.yz++
  m.zx++
  m.zy++
  m.zz++

  t.equal(m.xx, 2)
  t.equal(m.xy, 5)
  t.equal(m.xz, 8)
  t.equal(m.yx, 3)
  t.equal(m.yy, 6)
  t.equal(m.yz, 9)
  t.equal(m.zx, 4)
  t.equal(m.zy, 7)
  t.equal(m.zz, 10)
})

test("Mat4 defines all property aliases correctly", function (t) {
  var m = Mat4(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16)  

  t.plan(32)
  t.equal(m.xx, 1)
  t.equal(m.xy, 5)
  t.equal(m.xz, 9)
  t.equal(m.xw, 13)
  t.equal(m.yx, 2)
  t.equal(m.yy, 6)
  t.equal(m.yz, 10)
  t.equal(m.yw, 14)
  t.equal(m.zx, 3)
  t.equal(m.zy, 7)
  t.equal(m.zz, 11)
  t.equal(m.zw, 15)
  t.equal(m.wx, 4)
  t.equal(m.wy, 8)
  t.equal(m.wz, 12)
  t.equal(m.ww, 16)

  m.xx++ 
  m.xy++
  m.xz++
  m.xw++
  m.yx++
  m.yy++
  m.yz++
  m.yw++
  m.zx++
  m.zy++
  m.zz++
  m.zw++
  m.wx++
  m.wy++
  m.wz++
  m.ww++

  t.equal(m.xx, 2)
  t.equal(m.xy, 6)
  t.equal(m.xz, 10)
  t.equal(m.xw, 14)
  t.equal(m.yx, 3)
  t.equal(m.yy, 7)
  t.equal(m.yz, 11)
  t.equal(m.yw, 15)
  t.equal(m.zx, 4)
  t.equal(m.zy, 8)
  t.equal(m.zz, 12)
  t.equal(m.zw, 16)
  t.equal(m.wx, 5)
  t.equal(m.wy, 9)
  t.equal(m.wz, 13)
  t.equal(m.ww, 17)
})

test("Vec2 defines all property aliases correctly", function (t) {
  var v = Vec2(1,2)

  t.plan(4)
  t.equal(v.x, 1)
  t.equal(v.y, 2)

  v.x++
  v.y++
  t.equal(v.x, 2)
  t.equal(v.y, 3)
})

test("Vec3 defines all property aliases correctly", function (t) {
  var v = Vec3(1,2,3)

  t.plan(6)
  t.equal(v.x, 1)
  t.equal(v.y, 2)
  t.equal(v.z, 3)

  v.x++
  v.y++
  v.z++
  t.equal(v.x, 2)
  t.equal(v.y, 3)
  t.equal(v.z, 4)
})

test("Vec4 defines all property aliases correctly", function (t) {
  var v = Vec4(1,2,3,4)

  t.plan(8)
  t.equal(v.x, 1)
  t.equal(v.y, 2)
  t.equal(v.z, 3)
  t.equal(v.w, 4)

  v.x++
  v.y++
  v.z++
  v.w++
  t.equal(v.x, 2)
  t.equal(v.y, 3)
  t.equal(v.z, 4)
  t.equal(v.w, 5)
})
