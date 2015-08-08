'use strict';
var assert = require('assert');
var chessRules = require('../src/');


function playMoves(position, moves) {
    for (var moveIndex = 0; moveIndex < moves.length; moveIndex++) {
        var pgn = moves[moveIndex];
        var move = chessRules.pgnToMove(position, pgn);
        position = chessRules.applyMove(position, move);

        //console.log(pgn + " -> \n" + chessRules.positionToString(position, true));
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

    it('White kingside castling', function () {
        var position = chessRules.getInitialPosition();
        position = playMoves(position, ['e4', 'e5', 'Bb5', 'Nc6', 'Nf3', 'Nf6']);
        position = playMoves(position, ['O-O']);
        assert.equal(position.check, false);
        assert.equal(position.board[5].type, 'R');
        assert.equal(position.board[6].type, 'K');
    });

    it('Both queenside castlings', function () {
        var position = chessRules.getInitialPosition();
        position = playMoves(position, ['Nc3', 'Nc6', 'd4', 'd5', 'Bf4', 'Bf5', 'Qd3', 'Qd6']);
        position = playMoves(position, ['O-O-O']);
        assert.equal(position.board[3].type, 'R');
        assert.equal(position.board[2].type, 'K');
        assert.equal(position.check, false);
        assert.equal(position.castlingFlags.W.K, false);
        assert.equal(position.castlingFlags.W.Q, false);
        assert.equal(position.castlingFlags.B.K, true);
        assert.equal(position.castlingFlags.B.Q, true);
        position = playMoves(position, ['O-O-O']);
        assert.equal(position.board[59].type, 'R');
        assert.equal(position.board[58].type, 'K');
        assert.equal(position.check, false);
        assert.equal(position.castlingFlags.W.K, false);
        assert.equal(position.castlingFlags.W.Q, false);
        assert.equal(position.castlingFlags.B.K, false);
        assert.equal(position.castlingFlags.B.Q, false);
    });

    it('Rook move altering castling flags', function () {
        var position = chessRules.getInitialPosition();
        position = playMoves(position, ['e4', 'h5', 'Nf3', 'Rh6']);
        assert.equal(position.check, false);
        assert.equal(position.castlingFlags.W.K, true);
        assert.equal(position.castlingFlags.W.Q, true);
        assert.equal(position.castlingFlags.B.K, false);
        assert.equal(position.castlingFlags.B.Q, true);
    });
    //
    //it('A situation were the black king is in check', function () {
    //    var position = chessRules.getInitialPosition();
    //    position = playMoves(position, ['e4', 'e5', 'd4', 'd5', 'Bb5+']);
    //    assert.equal(chessRules.getAvailableMoves(position).length, 0);
    //    assert.equal(position.check, true);
    //    assert.equal(position.status, "OPEN");
    //});
    //
    //it('A short game leading to a white win.', function () {
    //    var position = chessRules.getInitialPosition();
    //    position = playMoves(position, ['e4', 'e5', 'Bc4', 'Bc5', 'Qh5', 'Nf6', 'Qxf7#']);
    //    assert.equal(chessRules.getAvailableMoves(position).length, 0);
    //    assert.equal(position.check, true);
    //    assert.equal(position.status, "WHITEWON");
    //});
    //
    //it('A short game leading to a black win.', function () {
    //    var position = chessRules.getInitialPosition();
    //    position = playMoves(position, ['g4', 'e5', 'f4', 'Qh4#']);
    //    assert.equal(chessRules.getAvailableMoves(position).length, 0);
    //    assert.equal(position.check, true);
    //    assert.equal(position.status, "BLACKWON");
    //});
});
