var fns            = require("../helpers/functions")
var physics        = require("../helpers/physics")
var forEach        = fns.forEach
var curry          = fns.curry
var filter         = fns.filter
var hasKey         = fns.hasKey
var checkCollision = physics.checkCollision
var systems        = {}

var doesCollide = hasKey("collides")

//TODO: This doesnt do anything yet...
systems.handleCollisions = function (es) {
  var colliders  = filter(es, doesCollide)
  var collisions = []

  forEach(colliders, function (c1) {
    forEach(colliders, function (c2) {
      if (checkCollision(c1, c2)) collisions.push([c1, c2])
    })    
  });
}

systems.lifespan = curry(function (now, es) {
  if (es.deathTime <= now) {
    es.isDead = true 
  }
})

//RENDERING SYSTEMS
systems.clearLayer = function (layer) {
  var ctx = layer.ctx

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

systems.renderImageLayer = curry(function (layer, image) {
  var ctx = layer.ctx

  ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height)
})

systems.attachUi = curry(function (target, el) {
  target.appendChild(el)
  el.style.width  = target.style.width
  el.style.height = target.style.height
})

systems.attachLayer = curry(function (target, layer) {
  layer.ctx.canvas.id           = layer.name
  layer.ctx.canvas.style.zIndex = layer.level
  layer.ctx.canvas.style.width  = target.style.width
  layer.ctx.canvas.style.height = target.style.height
  target.appendChild(layer.ctx.canvas)
})
//RENDERING SYSTEMS -- END

module.exports = systems
