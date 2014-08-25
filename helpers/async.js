var asyncLib = require("async")
var async    = {}

//We may eventually replace the async lib dependency completely

async.runParallel = asyncLib.parallel
async.runSeries   = asyncLib.series

module.exports = async
