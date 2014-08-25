var asyncLib = require("async")
var fns      = require("./functions")
var curry    = fns.curry
var async    = {}

//We may eventually replace the async lib dependency completely

async.runParallel = curry(asyncLib.parallel)
async.runSeries   = curry(asyncLib.series)

module.exports = async
