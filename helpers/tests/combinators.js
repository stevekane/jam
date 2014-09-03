var test     = require("tape")
var cmbs     = require("../combinators")
var all      = cmbs.all
var doAll    = cmbs.doAll
var ifThenDo = cmbs.ifThenDo

var tallerThanFive = function (obj) {
  return obj.height > 5
}

var youngerThanSeven = function (obj) {
  return obj.age > 7
}

var grow = function (obj) {
  obj.height++
  return obj
}

var age = function (obj) {
  obj.age++
  return obj
}

test("all checks if all functions return true for a given input", function (t) {
  var tallAndYoungEnough = all([tallerThanFive, youngerThanSeven])
  var child = {
    height: 7,
    age:    9 
  }
  var badChild = {
    height: 4,
    age:    9 
  }

  t.plan(2)
  t.true(tallAndYoungEnough(child), "all return true for valid child")
  t.false(tallAndYoungEnough(badChild), "all return false for invalid child")
})

test("doAll performs all transactions on a given input", function (t) {
  var growAndAge = doAll([grow, age])
  var child = {
    height: 7,
    age:    9 
  }

  growAndAge(child)

  t.plan(2)
  t.same(child.height, 8, "increments height appropriately")
  t.same(child.age, 10, "increments age appropriately")
})

test("ifThenDo does all transactions if all conditions pass", function (t) {
  var fn = ifThenDo([tallerThanFive, youngerThanSeven], [grow])
  var children = [
    {
      height: 7,
      age:    9 
    },
    {
      height: 4,
      age:    9 
    }
  ]

  fn(children)
  t.plan(3)
  t.true(typeof fn === "function", "returns a function correctly")
  t.same(children[0].height, 8, "height incremented correctly")
  t.same(children[1].height, 4, "height left alone correctly")
})
