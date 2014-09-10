'use strict'

/*
 * Here we define systems that use types and functions
 * from the engine in combination to provide a layer of sugar
 * for fetching, storing, retrieving, and removing assets 
 * from an in-memory cache
 *
 * The workflow we want here is simple:
 *
 * 1. Assets are defined in a JSON file where they are organized
 * by type and given names.
 *
 * {
 *   "spriteSheets": {
 *     "background": "/path/to/background.png"
 *   },
 *   "sounds": {
 *     "bgmusic": "/path/to/bgmusic.mp3"
 *   }
 * }
 *
 * 2. We fetch asset list from the JSON file during the load function
 *    for a scene (or at another time defined by the code)
 * 3. These assets are then fetched via XHR from the server and then
 *    shoved into a cache by their keynames.  
 */

var loaders       = require("../engine/loaders")
var async         = require("../helpers/async")
var functions     = require("../helpers/functions")
var loadJSON      = loaders.loadJSON
var loadImage     = loaders.loadImage
var loadSound     = loaders.loadSound
var runParallel   = async.runParallel
var runSeries     = async.runSeries
var extend        = functions.extend
var transformHash = functions.transformHash
var curry         = functions.curry
var caching       = {}

var buildSoundLoads = function (audioCtx, sounds) {
  return transformHash(function (k, v) {
    return loadSound(audioCtx, v)
  }, sounds || {})
}

var buildSpriteSheetLoads = function (spriteSheets) {
  return transformHash(function (k, v) {
    return loadImage(v)
  }, spriteSheets || {})
}

var buildJsonLoads = function (jsons) {
  return transformHash(function (k, v) {
    return loadJSON(v)
  }, jsons || {})
}

/*
 * audioCtx: instance of AudioContext
 * cache:    instance of types.Cache
 * path:     path to the assets JSON
 * cb:       function called when fetch/caching complete
 */
caching.fetchAndCache = curry(function (audioCtx, cache, path, cb) {
  loadJSON(path, function (err, json) {
    if (err) return cb(err)
    var soundLoads       = buildSoundLoads(audioCtx, json.sounds)
    var spriteSheetLoads = buildSpriteSheetLoads(json.spriteSheets)
    var jsonLoads        = buildJsonLoads(json.json)

    runParallel({
      sounds:       runParallel(soundLoads),
      spriteSheets: runParallel(spriteSheetLoads),
      json:         runParallel(jsonLoads)
    }, function (err, assets) {
      if (err) return cb(err) 
      extend(cache, assets)
      return cb(null, assets)
    })
  })
})

module.exports = caching
