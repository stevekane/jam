var uuid      = require("node-uuid")
var fns       = require("../helpers/functions")
var makeUuid  = uuid.v4
var pick      = fns.pick
var curry     = fns.curry
var types     = {}

types.matrices  = require("./types/matrices")
types.game      = require("./types/game")
types.kfanim    = require("./types/keyframe-animation")
types.rendering = require("./types/rendering")

types.Entity = function () {
  return { 
    uuid: makeUuid() 
  }
}

module.exports = types
