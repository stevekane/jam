var test             = require("tape")
var types            = require("../engine/types")
var Entity           = types.Entity

test("Entity adds uuid field to object", function (t) {
  var e = Entity()

  t.plan(1)
  t.true(!!e.uuid, "a uuid is correctly assiged in Entity constructor")
})

require("./types/matrices")
require("./types/game")
require("./types/keyframe-animation")
require("./types/rendering")
