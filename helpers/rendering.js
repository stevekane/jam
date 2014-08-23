var random        = require("./random")
var randomFloored = random.randomFloored

function hexToRgba (hex) {
  var r = parseInt(hex.slice(1,3), 16)
  var g = parseInt(hex.slice(3,5), 16)
  var b = parseInt(hex.slice(5,7), 16)

  return {
    r: r,
    g: g,
    b: b,
    a: 1
  }
}

function rgbaToStr (rgba) {
  return "rgba(" + [rgba.r, rgba.g, rgba.b, rgba.a].join(",") + ")"
}

function randomFloored (max) {
  return Math.round(Math.random() * max)
}

function makeRandRgba () {
  return {
    r: randomFloored(0, 255),
    g: randomFloored(0, 255),
    b: randomFloored(0, 255),
    a: 1
  }
}

module.exports.hexToRgba    = hexToRgba
module.exports.rgbaToStr    = rgbaToStr
module.exports.makeRandRgba = makeRandRgba
