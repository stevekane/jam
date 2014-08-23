var loadXhr = function (type, path, cb) {
  var xhr     = new XMLHttpRequest

  xhr.responseType = type
  xhr.onload       = function () { cb(null, xhr.response) }
  xhr.onerror      = function () { cb(new Error("Could not load " + path)) }
  xhr.open("GET", path, true)
  xhr.send(null)
}

var loadImage = function (path, cb) {
  var i       = new Image
  var onload  = function () { cb(null, i) }
  var onerror = function () { cb(new Error("Could not load " + path)) }
  
  i.onload  = onload
  i.onerror = onerror
  i.src     = path
}

var loadSound = function (path, cb) { loadXhr("arraybuffer", path, cb) }

module.exports.loadImage = loadImage
module.exports.loadSound = loadSound
module.exports.loadXhr   = loadXhr
