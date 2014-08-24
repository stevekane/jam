var _      = require("lodash")
var extend = _.extend
var curry  = _.curry

var wap = {}

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
