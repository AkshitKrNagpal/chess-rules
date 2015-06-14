'use strict';

var assert = require('assert');
var chessRules = require('../src');

describe('updates module', function () {

    it('must have create a different position after a move', function () {
        var position = chessRules.getInitialPosition();
        var moves = chessRules.getAvailableMoves(position);
        moves.forEach(function (move) {
            var updatedPosition = chessRules.applyMove(position, move);
            assert.notDeepEqual(updatedPosition, position);
        });
    });

    it('must process a few easy moves', function () {
        var position1 = chessRules.getInitialPosition();

        // e4
        var position2 = chessRules.applyMove(position1, {src: 12, dst: 28});
        assert.equal(position2.board[12], null);
        assert.equal(position2.board[28], position1.board[12]);

        // d5
        var position3 = chessRules.applyMove(position2, {src: 51, dst: 35});
        assert.equal(position3.board[51], null);
        assert.equal(position3.board[35], position1.board[51]);

        // exd5
        var position4 = chessRules.applyMove(position2, {src: 28, dst: 35});
        assert.equal(position4.board[28], null);
        assert.equal(position4.board[35], position1.board[12]);

    });
});
