var _ = require("lodash")

/**
  N.B. Eventually we may replace the lodash functions with
  our own implementations.  For now, we simply fix the lodash
  functions to have a more appropriate functional style

  namely, we curry all of them and re-order arguments where needed
  to enable better function composition

  Finally, we provide some utilities for doing mutations which 
  we would typically eschew.  We do this for performance reasons
  inside the game engine.
*/
var functions = {}

functions.keys      = _.keys
functions.values    = _.values
functions.extend    = _.extend
functions.curry     = _.curry
functions.partial   = _.partial
functions.bind      = _.bind
functions.clone     = _.clone
functions.cloneDeep = _.cloneDeep
functions.reverse   = _.reverse
functions.range     = _.range

functions.hasKey = functions.curry(function (key, obj) {
  return obj.hasOwnProperty(key)
})

//returns either found element or undefined
functions.find = functions.curry(function (boolFn, ar) {
  var found = undefined

  for (i in ar) {
    if (boolFn(ar[i])) { found = ar[i] } 
  }
  return found 
})

functions.compose = function (fns) {
  return _.compose.apply(null, fns)  
}

functions.map = functions.curry(function (fn, ar) {
  var res = []

  for (i in ar) { res.push(fn(ar[i])) }
  return res
})

functions.filter = functions.curry(function (fn, ar) {
  var res = []

  for (i in ar) { if (fn(ar[i])) { res.push(ar[i]) }}
  return res
})

//::fn => (accum, el) -> accum
functions.reduce = functions.curry(function (fn, accum, ar) {
  for (i in ar) { fn(accum, ar[i]) }
  return accum
})

functions.forEach = functions.curry(function (fn, ar) {
  for (i in ar) { fn(ar[i], i) }
  return ar
})

functions.mapBy = functions.curry(function (key, list) {
  return list.reduce(function (hash, el) {
    hash[key] = el[key] 
    return hash
  }, {});
})

//fill array with results of running provided function n times
functions.ofSize = functions.curry(function (size, fn) {
  var ar = []

  while (ar.length < size) {
    ar.push(fn()) 
  } 
  return ar
})

/**
  combination of filtering and forEach.  useful for systems that mutate
  :: boolFn => el -> Boolean
  :: fn     => el -> el || nothing (this probably performs mutation)
  we return the provided array for possible composition
*/
functions.ifThenDo = functions.curry(function (boolFn, fn, ar) {
  for (i in ar) { if (boolFn(ar[i])) { fn(ar[i]) }}
  return ar
})

functions.forKeys = functions.curry(function (kFn, hash) {
  var ks = functions.keys(hash)
  var i = 0

  for (i = 0, len = ks.length; i < len; ++i) {
    kFn(ks[i])
  }
})

functions.forValues = functions.curry(function (vFn, hash) {
  var ks = functions.keys(hash)
  var i = 0

  for (i = 0, len = ks.length; i < len; ++i) {
    vFn(hash[ks[i]])
  }
})

//kvFn :: k -> v -> nothing (it's forEach baby)
functions.forKV = functions.curry(function (kvFn, hash) {
  var ks = functions.keys(hash)
  var i = 0

  for (i = 0, len = ks.length; i < len; ++i) {
    kvFn(ks[i], hash[ks[i]]) 
  }
})

module.exports = functions
