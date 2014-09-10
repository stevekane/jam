var jam = {}

jam.types       = require("./engine/types"),
jam.components  = require("./engine/components"),
jam.assemblages = require("./engine/assemblages"),
jam.systems     = require("./engine/systems")
jam.loaders     = require("./engine/loaders")
jam.audioPlayer = require("./engine/audioPlayer")
jam.conventions = {
  caching: require("./conventions/caching")
}
jam.utils = {
  debug:       require("./helpers/debug"),
  rendering:   require("./helpers/rendering"),
  random:      require("./helpers/random"),
  functions:   require("./helpers/functions"),
  combinators: require("./helpers/combinators"),
  async:       require("./helpers/async")
}

module.exports = jam
