/* eslint-env mocha */
/* eslint-disable no-console */

var path = require('path');
var assert = require('assert');

var requestMockupJson = require('.');

var config = {
  mockupsPath: path.join(__dirname, 'mockups')
};
var get = requestMockupJson.create('GET', config);

describe('GET', function () {
  it('simple request', function () {
    var response = get('/test/');
    assert.equal(response.status, 200);
    assert.equal(response.content, 'OK');
  });

  it('status 500', function () {
    try {
      get('/status500/');
    } catch (e) {
      assert.equal(e.response.status, 500);
      assert.equal(e.response.content, 'Internal Error');
    }
  });

  it('with headers', function () {
    var response = get('/test/', null, {
      headers: {
        Auth: 'Token 123',
      }
    });
    assert.equal(response.status, 200);
  });
});
