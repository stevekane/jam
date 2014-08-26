var fns   = require("../helpers/functions")
var curry = fns.curry

var loadXhr = curry(function (type, path, cb) {
  var xhr     = new XMLHttpRequest

  xhr.responseType = type
  xhr.onload       = function () { cb(null, xhr.response) }
  xhr.onerror      = function () { cb(new Error("Could not load " + path)) }
  xhr.open("GET", path, true)
  xhr.send(null)
})

var loadImage = curry(function (path, cb) {
  var i       = new Image
  var onload  = function () { cb(null, i) }
  var onerror = function () { cb(new Error("Could not load " + path)) }
  
  i.onload  = onload
  i.onerror = onerror
  i.src     = path
})

var loadSound = curry(function (audioCtx, path, cb) {
  loadXhr("arraybuffer", path, function (err, binary) {
    if (err) return cb(err)

    var decodeSuccess = function (buffer) {
      cb(null, buffer)   
    }
    var decodeFailure = cb

    audioCtx.decodeAudioData(binary, decodeSuccess, decodeFailure)
  })
})

module.exports.loadImage = loadImage
module.exports.loadSound = loadSound
module.exports.loadXhr   = loadXhr
