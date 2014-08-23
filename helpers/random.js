function randomFloored (min, max) {
  return Math.round((Math.random() * (max - min)) + min)
}

module.exports.randomFloored = randomFloored
