var path = require('path');
var fs = require('fs');

var utils = require('./utils.js');

var DEFAULT_CONFIG = {
  validateStatus: function (status) {
    return status >= 200 && status < 300;
  },
};

function getResponse(method, url, _data, _config) {
  var data = _data || {};
  var config = Object.assign(DEFAULT_CONFIG, _config || {});
  var mockups_path = config.mockupsPath || __dirname;
  var mockup_path = path.join(
    mockups_path,
    method,
    (url.slice(-1) === '/' ?
      url.slice(0, -1) :
      url) + '.json');
  var mockup_file_content = fs.readFileSync(mockup_path, 'utf8');
  var mockup_content = JSON.parse(mockup_file_content);
  var out = null;
  mockup_content.forEach(function (mockup) {
    var data_str = utils.dictToComparableStr(data);
    var mockup_data_str = utils.dictToComparableStr(mockup.data || {});
    if (data_str === mockup_data_str) {
      if (config.headers || mockup.headers) {
        var headers_str = utils.dictToComparableStr(config.headers || {});
        var mockup_headers_str = utils.dictToComparableStr(mockup.headers || {});
        if (headers_str === mockup_headers_str) {
          out = mockup.response;  
        }
      } else {
        out = mockup.response;
      }
    }
  });
  if (out && out.status && !config.validateStatus(out.status)) {
    var error = new Error(out);
    error.response = out;
    throw error;
  }
  return out;
}


module.exports = {
  getResponse: getResponse,
  create: function (method, config) {
    return function (url, data, extraConfig) {
      return getResponse(
        method,
        url,
        data,
        Object.assign(config || {}, extraConfig || {})
      );
    };
  },
  utils: utils,
};
