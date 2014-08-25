var fns    = require("../helpers/functions")
var extend = fns.extend
var curry  = fns.curry
var wap    = {}

var basePlay = curry(function (options, ac, cache, sName) {
  var bs     = createBufferSource()
  var buffer = cache[soundName] || cache.default

  extend(bs, options)
  bs.buffer = buffer
  bs.connect(ac.destination)
  bs.start()
})

wap.play = basePlay({})

wap.loop = basePlay({loop: true})

module.exports = wap
