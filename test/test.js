'use strict';
var assert = require('assert');
var chessRules = require('../src');
var Coord = require('../src/chess/coordinates').BoardCoordinates;

function createEmptyBoard() {
    var position = chessRules.getInitialPosition();

    for (var i = 0; i < 64; i++) {
        position.board[i] = null;
    }

    return position;
}


describe('chess-rules module', function () {
    it('must have a consistent coordinate system', function () {
        var cE2xy = new Coord(4, 1);
        var cE2of = new Coord(12);

        assert.deepEqual(cE2xy, cE2of);

        var dest = cE2xy.add(new Coord(-2, 1));
        assert.deepEqual(cE2xy, cE2of);
        assert.equal(dest.offset, 18);
        assert.equal(dest.x, 2);
        assert.equal(dest.y, 2);
    });

    it('must provide initial game position', function () {
        var position = chessRules.getInitialPosition();
        assert.equal(position.board.length, 64);
        assert.equal(position.castlingFlags.length, 4);
        assert.equal(position.lastPawnMoveColumn, null);
    });

    it('must implement conistent Pawn movement', function () {
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
