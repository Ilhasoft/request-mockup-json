/* globals describe */
/* eslint-disable no-console */

var path = require('path');
// var assert = require('assert');

var requestMockupJson = require('.');

var get = requestMockupJson.create('GET', path.join(__dirname, 'mockups'));

describe('GET', function () {
  describe('simple request', function () {
    var response = get('/test/');
    console.log(response);
  });
});
