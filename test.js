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

  describe('with headers', function () {
    it('one', function () {
      var response = get('/test/', null, {
        headers: {
          Auth: 'Token 123',
        }
      });
      assert.equal(response.status, 200);
      assert.equal(response.content, 'Access 123');
    });

    it('two', function () {
      var response = get('/test/', null, {
        headers: {
          Auth: 'Token 321',
        }
      });
      assert.equal(response.status, 200);
      assert.equal(response.content, 'Access 321');
    });
  });

  describe('with query string', function () {
    it('simple', function () {
      var response = get('/test/?value=pop');
      assert.equal(response.status, 200);
      assert.equal(response.content, 'pop');
    });

    it('array', function () {
      var response = get('/test/?names=douglas&names=ana');
      assert.equal(response.status, 200);
      assert.equal(response.content, 'douglas and ana');
    });
  });
});
