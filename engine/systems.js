var fns            = require("../helpers/functions")
var physics        = require("../helpers/physics")
var forEach        = fns.forEach
var filter         = fns.filter
var hasKey         = fns.hasKey
var checkCollision = physics.checkCollision
var systems        = {}

var doesCollide = hasKey("collides")

systems.handleCollisions = function (es) {
  var colliders  = filter(es, doesCollide)
  var collisions = []

  forEach(colliders, function (c1) {
    forEach(colliders, function (c2) {
      if (checkCollision(c1, c2)) collisions.push([c1, c2])
    })    
  });
}

systems.clearLayer = function (ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

module.exports = systems
