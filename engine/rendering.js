'use strict'

var fns       = require("../helpers/functions")
var curry     = fns.curry
var rendering = {}

rendering.clearScreen = function (ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

rendering.fillScreen = curry(function (color, ctx) {
  ctx.fillStyle = color
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
})

rendering.renderImageLayer = curry(function (layer, image) {
  var ctx = layer.ctx

  ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height)
})

module.exports = rendering
