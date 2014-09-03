'use strict'

var fns         = require("./functions")
var curry       = fns.curry
var compose     = fns.compose
var reduce      = fns.reduce
var combinators = {}

combinators.all = curry(function (boolFns, input) {
  return reduce(function (result, boolFn) {
    return result && boolFn(input) 
  }, true, boolFns)
})

combinators.doAll = curry(function (transactions, ar) {
  for (var i in transactions) {
    transactions[i](ar) 
  }
  return ar
})

/*
 * Often times you want to check several conditions and only
 * perform some transactions if all are true.
 *
 * ifThenDo noops if any condition is not satisfied and it "fails"
 * silently.  It's intended to be used in "systems" in the engine
 *
 * We return the originally passed in object (albeit perhaps mutated)
 * for composition reasons and convenience
 */
combinators.ifThenDo = curry(function (boolFns, transactions, ar) {
  var allConds = combinators.all(boolFns)
  var allTrans = combinators.doAll(transactions)

  for (var i in ar) {
    if (allConds(ar[i])) allTrans(ar[i])
  } 

  return ar
})

module.exports = combinators
