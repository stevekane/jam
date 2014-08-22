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

function rgbaToHex (r, g, b) {
  var rh = parseInt("0x" + r)
  var gh = parseInt("0x" + g)
  var bh = parseInt("0x" + b)

  return 0xff000000 + (rh << 16) + (gh << 8) + bh
}

function rgbaToStr (r, g, b, a) {
  return "rgba(" + [r,g,b,a].join(",") + ")"
}

module.exports.hexToRgba = hexToRgba
module.exports.rgbaToHex = rgbaToHex
module.exports.rgbaToStr = rgbaToStr
