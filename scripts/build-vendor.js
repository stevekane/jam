var path       = require('path')
  , fs         = require('fs')
  , browserify = require('browserify')
  , bundlePath = path.join("dist", "vendor-bundle.js")

browserify({debug: true})
  .require("lodash")
  .require("node-uuid")
  .require("async")
  .bundle()
  .on('error', function (err) { console.error(err); })
  .pipe(fs.createWriteStream(bundlePath));
