var path = require('path');
var fs = require('fs');
var qs = require('query-string');

var utils = require('./utils.js');

var DEFAULT_CONFIG = {
  validateStatus: function (status) {
    return status >= 200 && status < 300;
  },
};

function getResponse(method, url, data, _config) {
  var default_config_copy = Object.assign({}, DEFAULT_CONFIG);
  var config = Object.assign(default_config_copy, _config || {});
  var mockups_path = config.mockupsPath || __dirname;
  
  var url_slipt = url.split('?', 2);
  var url_path = url_slipt[0];
  if (url_path.slice(-1) === '/') {
    url_path = url_slipt[0].slice(0, -1);
  }
  var query_string = qs.parse(url_slipt[1] || '');
  
  var mockup_path = path.join(
    mockups_path,
    method,
    url_path + '.json');
  var mockup_file_content = fs.readFileSync(mockup_path, 'utf8');
  var mockup_content = JSON.parse(mockup_file_content);
  var data_str = utils.dictToComparableStr(data || {});
  
  var results = mockup_content.filter(function (mockup) {
    // Check data
    if (data || mockup.data) {
      var mockup_data_str = utils.dictToComparableStr(mockup.data || {});
      if (data_str !== mockup_data_str) return false;
    }

    // Check headers
    if (config.headers || mockup.headers) {
      var headers_str = utils.dictToComparableStr(config.headers || {});
      var mockup_headers_str = utils.dictToComparableStr(mockup.headers || {});
      if (headers_str !== mockup_headers_str) return false;
    }

    // Check query string
    if (query_string || mockup.query_string) {
      var query_string_str = utils.dictToComparableStr(query_string || {});
      var mockup_query_string_str = utils.dictToComparableStr(mockup.query_string || {});
      if (query_string_str !== mockup_query_string_str) return false;
    }

    return true;
  });
  
  var result = results.shift();
  if (result) {
    var response = result.response;
    if (response && response.status && !config.validateStatus(response.status)) {
      var error = new Error(response);
      error.response = response;
      throw error;
    }
    return response;
  }
  throw new Error('Mockup don\'t match');
}


module.exports = {
  getResponse: getResponse,
  create: function (method, config) {
    return function (url, data, extraConfig) {
      return getResponse(
        method,
        url,
        data,
        Object.assign(
          Object.assign({}, config || {}),
          extraConfig || {})
      );
    };
  },
  utils: utils,
};
