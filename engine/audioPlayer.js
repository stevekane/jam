var fns    = require("../helpers/functions")
var extend = fns.extend
var curry  = fns.curry
var wap    = {}

var basePlay = curry(function (options, ac, buffer) {
  var bs     = ac.createBufferSource()

  extend(bs, options)
  bs.buffer = buffer
  bs.connect(ac.destination)
  bs.start(0)
})

wap.play = basePlay({})

wap.loop = basePlay({loop: true})

module.exports = wap
