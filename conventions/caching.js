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

var loaders         = require("../engine/loaders")
var async           = require("../helpers/async")
var functions       = require("../helpers/functions")
var loadJSON        = loaders.loadJSON
var loadImage       = loaders.loadImage
var loadSound       = loaders.loadSound
var runParallel     = async.runParallel
var extend          = functions.extend
var transformValues = functions.transformValues
var curry           = functions.curry
var caching         = {}

/*
 * audioCtx: instance of AudioContext
 * cache:    instance of types.Cache
 * path:     path to the assets JSON
 * cb:       function called when fetch/caching complete
 */
caching.fetchAndCache = curry(function (audioCtx, cache, assets, cb) {
  var soundLoads       = transformValues(loadSound(audioCtx), assets.sounds || {})
  var spriteSheetLoads = transformValues(loadImage, assets.spriteSheets || {})
  var jsonLoads        = transformValues(loadJSON, assets.json || {})

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

module.exports = caching
