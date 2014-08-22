var _            = require("lodash")
var bind         = _.bind
var compose      = _.compose

var stringify = function (stuff) { return JSON.stringify(stuff, null, 2) }
var log       = bind(console.log, console)
var pp        = compose(log, stringify)

module.exports.stringify = stringify
module.exports.log       = log
module.exports.pp        = pp
