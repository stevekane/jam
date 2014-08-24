var _              = require("lodash")
var physics        = require("../helpers/physics")
var forEach        = _.forEach
var filter         = _.filter
var checkCollision = physics.checkCollision
var systems        = {}

function doesCollide (e) { return !!e.collides }

systems.handleCollisions = function (es) {
  var colliders  = filter(es, doesCollide)
  var collisions = []

  forEach(colliders, function (c1) {
    forEach(colliders, function (c2) {
      if (checkCollision(c1, c2)) collisions.push([c1, c2])
    })    
  });
}

module.exports = systems
