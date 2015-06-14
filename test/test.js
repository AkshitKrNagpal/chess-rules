'use strict';
var assert = require('assert');
var chessRules = require('../');

describe('chess-rules node module', function () {
    it('must provide initial game position', function () {
        assert.deepEqual(chessRules.getInitialPosition(), {});
    });
});
