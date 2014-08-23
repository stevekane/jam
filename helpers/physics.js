var physics = {}

//sub and tar are entities
physics.checkCollision = function checkCollision (sub, tar) {
  if (sub === tar) return false

  return ((sub.position.x < (tar.position.x + tar.size.x)) && 
          ((sub.position.x + sub.size.x) > tar.position.x) &&
          (sub.position.y < (tar.position.y + tar.size.y)) &&
          ((sub.position.y + sub.size.y) > tar.position.y))
}

module.exports = physics
