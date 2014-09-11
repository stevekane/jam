var fns             = require("../helpers/functions")
var async           = require("../helpers/async")
var curry           = fns.curry
var transformValues = fns.transformValues
var runParallel     = async.runParallel
var loaders         = {}

loaders.loadXhr = curry(function (type, path, cb) {
  var xhr     = new XMLHttpRequest

  xhr.responseType = type
  xhr.onload       = function () { cb(null, xhr.response) }
  xhr.onerror      = function () { cb(new Error("Could not load " + path)) }
  xhr.open("GET", path, true)
  xhr.send(null)
})

loaders.loadJSON = loaders.loadXhr("json")

loaders.loadImage = curry(function (path, cb) {
  var i       = new Image
  var onload  = function () { cb(null, i) }
  var onerror = function () { cb(new Error("Could not load " + path)) }
  
  i.onload  = onload
  i.onerror = onerror
  i.src     = path
})

loaders.loadSound = curry(function (audioCtx, path, cb) {
  loaders.loadXhr("arraybuffer", path, function (err, binary) {
    if (err) return cb(err)

    var decodeSuccess = function (buffer) {
      cb(null, buffer)   
    }
    var decodeFailure = cb

    audioCtx.decodeAudioData(binary, decodeSuccess, decodeFailure)
  })
})

loaders.loadAssetsHash = curry(function (audioCtx, assets, cb) {
  var soundLoads       = transformValues(loaders.loadSound(audioCtx), assets.sounds)
  var spriteSheetLoads = transformValues(loaders.loadImage, assets.spriteSheets)
  var jsonLoads        = transformValues(loaders.loadJSON, assets.json)

  runParallel({
    sounds:       runParallel(soundLoads),
    spriteSheets: runParallel(spriteSheetLoads),
    json:         runParallel(jsonLoads)
  }, cb)
})

module.exports = loaders
