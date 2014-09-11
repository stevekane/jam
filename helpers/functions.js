'use strict'

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

functions.hasKeyVal = functions.curry(function (key, val, obj) {
  return obj[key] === val
})

//returns either found element or undefined
functions.find = functions.curry(function (boolFn, ar) {
  var found = undefined

  for (var i in ar) {
    if (boolFn(ar[i])) { found = ar[i] } 
  }
  return found 
})

//TODO change to look like thread in reverse?
functions.compose = function (fns) {
  return _.compose.apply(null, fns)  
}

//same as compose but functions execute left-to-right
functions.thread = functions.curry(function (fns, target) {
  var output = target

  for (var i in fns) {
    output = fns[i](output) 
  }
  return output
})

functions.map = functions.curry(function (fn, ar) {
  var res = []

  for (var i in ar) { 
    res.push(fn(ar[i])) 
  }
  return res
})

functions.filter = functions.curry(function (fn, ar) {
  var res = []

  for (var i in ar) { 
    if (fn(ar[i], i, ar)) { res.push(ar[i]) }
  }
  return res
})

//::fn => (accum, el, i, ar) -> accum
functions.reduce = functions.curry(function (fn, accum, ar) {
  for (var i in ar) { 
    accum = fn(accum, ar[i], i, ar) 
  }
  return accum
})

functions.forEach = functions.curry(function (fn, ar) {
  for (var i in ar) { 
    fn(ar[i], i, ar) 
  }
  return ar
})

functions.mapBy = functions.curry(function (key, list) {
  return functions.reduce(function (hash, el) {
    hash[key] = el[key] 
    return hash
  }, {}, list);
})

//fill array with results of running provided function n times
functions.ofSize = functions.curry(function (size, fn) {
  var ar = []

  while (ar.length < size) {
    ar.push(fn()) 
  } 
  return ar
})

functions.forKeys = functions.curry(function (kFn, hash) {
  var ks = functions.keys(hash)

  for (var i in ar) {
    kFn(ks[i])
  }
})

functions.forValues = functions.curry(function (vFn, hash) {
  var ks = functions.keys(hash)

  for (var i in ks) {
    vFn(hash[ks[i]])
  }
})

//kvFn :: k -> v -> nothing (it's forEach baby)
functions.forKV = functions.curry(function (kvFn, hash) {
  var ks = functions.keys(hash)

  for (var i in ks) {
    kvFn(ks[i], hash[ks[i]]) 
  }
})

//kvfn :: -> k -> v -> *
functions.transformHash = functions.curry(function (kvFn, hash) {
  var ks     = functions.keys(hash)
  var output = {}

  for (var i in ks) {
    output[ks[i]] = kvFn(ks[i], hash[ks[i]])
  }

  return output
})

//vFn :: -> v -> *
functions.transformValues = functions.curry(function (vFn, hash) {
  var ks     = functions.keys(hash)
  var output = {}

  for (var i in ks) {
    output[ks[i]] = vFn(hash[ks[i]])
  }

  return output
})

module.exports = functions
