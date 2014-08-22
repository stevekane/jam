var _       = require("lodash")
var compose = _.compose

/*
thread allows you to chain several unary functions
in order with a priovided intial input.
 */
var thread = function (fns) { return compose.apply(null, fns.reverse()) }

module.exports.thread = thread
