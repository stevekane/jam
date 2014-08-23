var raf           = require("raf-shim")(window).requestAnimationFrame
var jam           = require("../../jam")
var Entity        = jam.types.Entity
var Point3        = jam.types.Point3
var BasicBox      = jam.assemblages.BasicBox
var pp            = jam.utils.debug.pp
var log           = jam.utils.debug.log
var rgbaToStr     = jam.utils.rendering.rgbaToStr
var makeRandRgba  = jam.utils.rendering.makeRandRgba
var randomFloored = jam.utils.random.randomFloored
var loadImage     = jam.loaders.loadImage
var loadSound     = jam.loaders.loadSound

window.onload = function () {
  var ac = new (AudioContext || webkitAudioContext)()

  loadImage("/examples/assets/spritesheets/maptiles.png", function (err, image) {
    if (err) return console.log(err)
  })

  loadSound("/examples/assets/sounds/hadouken.mp3", function (err, audioBinary) {
    if (err) return console.log(err)

    ac.decodeAudioData(audioBinary, function (buffer) {
      var bs = ac.createBufferSource() 

      bs.buffer = buffer
      bs.connect(ac.destination)
      //looping works as you might imagine..
      //bs.loop = true
      bs.start()
    })
  })
}

var e    = BasicBox(Point3(24,24,0))
var ents = [e]
var c    = document.createElement("canvas")
var ctx  = c.getContext("2d")

c.height = 480
c.width  = 640
document.body.appendChild(c)

var renderSquare = function (ctx, e) {
  var rgbaStr = rgbaToStr(e.color)

  ctx.fillStyle = rgbaStr
  ctx.fillRect(e.position.x, e.position.y, e.size.x, e.size.y)
}

var hasColor    = function (e) { return !!e.color }
var hasSize     = function (e) { return !!e.size }
var changeColor = function (e) { e.color = makeRandRgba() }

var resize = function (e) { 
  var newSize = Point3(
    randomFloored(0, 48),
    randomFloored(0, 48),
    randomFloored(0, 48))

  e.size = newSize
}

//SYSTEMS
var clearScreen = function (ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

var renderSquares = function (ctx, es) {
  es
  .filter(hasColor)
  .forEach(renderSquare.bind(null, ctx))
}

var changeColors = function (es) {
  es
  .filter(hasColor)
  .forEach(changeColor)
}

var resizeAll = function (es) {
  es
  .filter(hasSize)
  .forEach(resize)
}
//SYSTEMS -- END

var run = function () {
  resizeAll(ents)
  changeColors(ents)
  clearScreen(ctx)
  renderSquares(ctx, ents)
  raf(run)
}

raf(run)
