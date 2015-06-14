'use strict';
var assert = require('assert');
var chessRules = require('../src');

describe('position module', function () {

    it('must provide initial game position', function () {
        var position = chessRules.getInitialPosition();
        assert.equal(position.board.length, 64);
        assert.equal(position.castlingFlags.length, 4);
        assert.equal(position.lastPawnMoveColumn, null);
    });

});
