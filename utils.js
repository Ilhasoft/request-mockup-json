function sortDict(dict) {
  var out = {};
  Object.keys(dict).sort().forEach(function (key) {
    out[key] = dict[key];
  });
  return out;
}

module.exports = {
  sortDict: sortDict,
};
