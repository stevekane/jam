var path       = require('path')
  , fs         = require('fs')
  , browserify = require('browserify')
  , bundlePath = path.join("dist", 'jam.js')

browserify({debug: true})
  .require(require.resolve('../jam.js'), { entry: true })
  .bundle()
  .on('error', function (err) { console.error(err); })
  .pipe(fs.createWriteStream(bundlePath))
