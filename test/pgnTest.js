'use strict';
var assert = require('assert');
var chessRules = require('../src');

describe('pgn module', function () {

    it('must understand basic initial moves', function () {
        var position = chessRules.getInitialPosition();
        var moveE4 = chessRules.pgnToMove(position, "e4");
        assert.equal(moveE4.src, 12);
        assert.equal(moveE4.dst, 28);
    });

});

