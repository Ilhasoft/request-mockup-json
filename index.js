var path = require('path');
var fs = require('fs');

var utils = require('./utils.js');


function getResponse(method, url, data, config, base_path) {
  data = utils.sortDict(data);
  base_path = base_path || __dirname;
  var mockup_path = path.join(
    base_path,
    method,
    (url.slice(-1) === '/' ?
      url.slice(0, -1) :
      url) + '.json');
  var mockup_file_content = fs.readFileSync(mockup_path, 'utf8');
  var mockup_content = JSON.parse(mockup_file_content);
  var out = null;
  mockup_content.forEach(function (mockup) {
    var mockup_data = utils.sortDict(mockup.data || {});
    if (JSON.stringify(data) === JSON.stringify(mockup_data)) {
      out = mockup;
    }
  });
  return out;
}


module.exports = {
  getResponse: getResponse,
  create: function (method, base_path) {
    return function (url, data, config) {
      data = data || {};
      config = config || {};
      return getResponse(
        method,
        url,
        data,
        config,
        base_path
      );
    };
  },
  utils: utils,
};
