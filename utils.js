function sortDict(dict) {
  var out = {};
  Object.keys(dict).sort().forEach(function (key) {
    out[key] = dict[key];
  });
  return out;
}

function dictToComparableStr(dict) {
  return JSON.stringify(sortDict(dict));
}

module.exports = {
  sortDict: sortDict,
  dictToComparableStr: dictToComparableStr,
};
