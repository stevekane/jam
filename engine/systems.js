var fns            = require("../helpers/functions")
var physics        = require("../helpers/physics")
var combinators    = require("../helpers/combinators")
var forEach        = fns.forEach
var curry          = fns.curry
var filter         = fns.filter
var hasKey         = fns.hasKey
var checkCollision = physics.checkCollision
var doAll          = combinators.doAll
var ifThenDo       = combinators.ifThenDo
var systems        = {}

var doesCollide     = hasKey("collides")
var hasPosition     = hasKey("position")
var hasVelocity     = hasKey("velocity")
var hasAcceleration = hasKey("acceleration")

//TODO: This doesnt do anything yet...
systems.handleCollisions = curry(function (collisionMap, es) {
  var colliders  = filter(es, doesCollide)
  var collisions = []

  forEach(colliders, function (c1) {
    forEach(colliders, function (c2) {
      if (checkCollision(c1, c2)) collisions.push([c1, c2])
    })    
  });
})

var updateVelocity = curry(function (dT, e) {
  e.velocity.x = e.velocity.x + e.acceleration.x * dT
  e.velocity.y = e.velocity.y + e.acceleration.y * dT
  return e
})

var updatePosition = curry(function (dT, e) {
  e.position.x = e.position.x + e.velocity.x * dT
  e.position.y = e.position.y + e.velocity.y * dT
  return e
})

systems.updatePhysics = curry(function (dT, es) {
  ifThenDo(
    [hasPosition, hasVelocity, hasAcceleration],
    [updateVelocity(dT), updatePosition(dT)],
    es
  )
})

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
