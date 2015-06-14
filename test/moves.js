'use strict';
var assert = require('assert');
var chessRules = require('../src');

function createEmptyBoard() {
    var position = chessRules.getInitialPosition();

    for (var i = 0; i < 64; i++) {
        position.board[i] = null;
    }

    return position;
}


describe('moves module', function () {

    it('must implement consistent Pawn movement', function () {
        var position = createEmptyBoard();
        position.board[28] = {type: 'P', side: 'W'};
        var moves = chessRules.getAvailableMoves(position);
        assert.equal(moves.length, 1);
    });

    it('must implement conistent Knight movement', function () {
        var position = createEmptyBoard();
        position.board[28] = {type: 'N', side: 'W'};
        var moves = chessRules.getAvailableMoves(position);
        assert.equal(moves.length, 8);
    });

    it('must provide available moves list', function () {
        var position = chessRules.getInitialPosition();
        var moves = chessRules.getAvailableMoves(position);
        assert.equal(moves.length, 20);
    });

});
