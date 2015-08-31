'use strict';
var assert = require('assert');
var chessRules = require('../src');

describe('status module', function () {

    it('must detect pat when only two kings are left', function () {
        var position = chessRules.getInitialPosition();
        position.board.forEach(function (piece, ix) {
            position.board[ix] = null;
        });

        position.board[0] = {type: 'K', side: 'W'};
        position.board[63] = {type: 'K', side: 'B'};

        assert.equal(chessRules.getGameStatus(position), 'PAT');

        position.board[8] = {type: 'P', side: 'W'};
        assert.equal(chessRules.getGameStatus(position), 'OPEN');
    });

});
