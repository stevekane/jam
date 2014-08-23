var _     = require("lodash")
var curry = _.curry

var wap = {}

wap.play = curry(function (audioContext, cache, soundName) {
  var bs     = createBufferSource()
  var buffer = cache[soundName] || cache.default

  bs.buffer = buffer
  bs.connect(ac.destination)
  bs.start()
})

wap.loop = curry(function (audioContext, cache, soundName) {
  var bs     = createBufferSource()
  var buffer = cache[soundName] || cache.default

  bs.buffer = buffer
  bs.loop   = true
  bs.connect(ac.destination)
  bs.start()
})

module.exports = wap
