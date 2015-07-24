'use strict';
var assert = require('assert');
var chessRules = require('../src/');


function playMoves(position, moves) {
    for (var moveIndex = 0; moveIndex < moves.length; moveIndex++) {
        var pgn = moves[moveIndex];
        var move = chessRules.pgnToMove(position, pgn);
        position = chessRules.applyMove(position, move);

        // console.log(pgn + " -> \n" + chessRules.positionToString(position));
    }

    return position;
}

describe('single game with', function () {
    it('en-passant move for white', function () {
        var position = chessRules.getInitialPosition();
        position = playMoves(position, ['e4']);
        assert.equal(position.lastPawnMoveColumn, 4);
        position = playMoves(position, ['Nf6']);
        assert.equal(position.lastPawnMoveColumn, null);
        position = playMoves(position, ['e5']);
        assert.equal(position.lastPawnMoveColumn, null);
        position = playMoves(position, ['d5']);
        assert.equal(position.lastPawnMoveColumn, 3);

        position = playMoves(position, ['exd6']);
        assert.equal(position.board[35], null);

        playMoves(position, ['Qxd6', 'Nf3', 'Nc6']);
    });

    it('en-passant move for black', function () {
        var position = chessRules.getInitialPosition();
        position = playMoves(position, ['Nf3', 'd5', 'Nc3', 'd4', 'e4', 'dxe3']);
        assert.equal(position.board[28], null);
    });
});
