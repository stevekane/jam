var functions = {}

functions.mapBy = function (key, list) {
  return list.reduce(function (hash, el) {
    hash[key] = el[key] 
    return hash
  }, {});
}

module.exports = functions
