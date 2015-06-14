'use strict';
var assert = require('assert');
var chessRules = require('../');

describe('chess-rules node module', function () {
    it('must provide initial game position', function () {
        var position = chessRules.getInitialPosition();
        assert.equal(64, position.board.length);
        assert.equal(4, position.castlingFlags.length);
        assert.equal(null, position.lastPawnMoveColumn);
    });
});
