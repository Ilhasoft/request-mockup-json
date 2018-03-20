/* eslint-env mocha */
/* eslint-disable no-console */

var path = require('path');
var assert = require('assert');

var requestMockupJson = require('.');

var get = requestMockupJson.create('GET', path.join(__dirname, 'mockups'));

describe('GET', function () {
  it('simple request', function () {
    var response = get('/test/');
    assert.equal(response.code, 200);
    assert.equal(response.content, 'OK');
  });
});
