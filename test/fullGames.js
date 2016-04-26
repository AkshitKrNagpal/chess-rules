'use strict';
var assert = require('assert');
var chessRules = require('../src/');


function playMoves(position, moves) {
    // Comments below may be removed to temporarily activate extra logs for debugging,
    // But don't forget to remove them on the next commit.

    for (var moveIndex = 0; moveIndex < moves.length; moveIndex++) {
        var pgn = moves[moveIndex];
        // console.log('Moving: ', pgn);
        var move = chessRules.pgnToMove(position, pgn);
        //var pgnBack = chessRules.moveToPgn(position, move);
        //assert.equal(pgnBack, pgn);

        position = chessRules.applyMove(position, move);
        // console.log('Moved: ', pgn);
        // console.log(chessRules.positionToString(position));
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

    it('white kingside castling', function () {
        var position = chessRules.getInitialPosition();
        position = playMoves(position, ['e4', 'e5', 'Bb5', 'Nc6', 'Nf3', 'Nf6']);
        position = playMoves(position, ['O-O']);
        assert.equal(position.check, false);
        assert.equal(position.board[5].type, 'R');
        assert.equal(position.board[6].type, 'K');
    });

    it('both queenside castlings', function () {
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

    it('rook move altering castling flags', function () {
        var position = chessRules.getInitialPosition();
        position = playMoves(position, ['e4', 'h5', 'Nf3', 'Rh6']);
        assert.equal(position.check, false);
        assert.equal(position.castlingFlags.W.K, true);
        assert.equal(position.castlingFlags.W.Q, true);
        assert.equal(position.castlingFlags.B.K, false);
        assert.equal(position.castlingFlags.B.Q, true);
    });

    it('a situation were the black king is in check', function () {
        var position = chessRules.getInitialPosition();
        position = playMoves(position, ['e4', 'e5', 'd4', 'd5', 'Bb5+']);
        assert.equal(position.check, true);
        assert.equal(chessRules.getGameStatus(position), "OPEN");
    });

    it('a short game leading to a white win.', function () {
        var position = chessRules.getInitialPosition();
        position = playMoves(position, ['e4', 'e5', 'Bc4', 'Bc5', 'Qh5', 'Nf6', 'Qxf7#']);
        assert.equal(chessRules.getAvailableMoves(position).length, 0);
        assert.equal(position.check, true);
        assert.equal(chessRules.getGameStatus(position), "WHITEWON");
    });

    it('a short game leading to a black win.', function () {
        var position = chessRules.getInitialPosition();
        position = playMoves(position, ['g4', 'e5', 'f4', 'Qh4#']);
        assert.equal(chessRules.getAvailableMoves(position).length, 0);
        assert.equal(position.check, true);
        assert.equal(chessRules.getGameStatus(position), "BLACKWON");
    });

    it('A pawn promotion to queen.', function () {
        var position = chessRules.getInitialPosition();
        position = playMoves(position, ['e4', 'd5', 'e5', 'd4', 'e6', 'd3', 'exf7+', 'Kd7', 'fxg8=Q']);
        assert.equal(position.board[62].type, 'Q');
    });

    it('A pawn promotion to knight.', function () {
        var position = chessRules.getInitialPosition();
        position = playMoves(position, ['e4', 'd5', 'e5', 'd4', 'e6', 'd3', 'exf7+', 'Kd7', 'fxg8=N']);
        assert.equal(position.board[62].type, 'N');
    });

    it('a queen promotion which puts the opponent in check', function () {
        playMoves(chessRules.getInitialPosition(), ['d4', 'Nf6', 'e4', 'Nh5', 'Nf3', 'c5', 'dxc5', 'f5', 'exf5', 'Kf7', 'Bc4+',
            'Kf6', 'Qd4+', 'e5', 'Nxe5', 'g5', 'O-O', 'd6', 'Qxd6+', 'Be6', 'Qxe6+', 'Kg7', 'Qf7+', 'Kh6', 'Qg6+',
            'hxg6', 'fxg6', 'Nc6', 'Nxc6', 'Qe7', 'Nxe7', 'Rc8', 'Nxc8', 'Bd6', 'Nxd6', 'Rf8', 'Nf5+', 'Rxf5', 'Nc3',
            'Rxc5', 'Ne4', 'Rc7', 'g4', 'a6', 'gxh5', 'a5', 'Nxg5', 'Rf7', 'Nxf7+', 'Kxh5', 'g7', 'Kg6', 'g8+=Q', 'Kh5']);
    });

    it('a queen promotion while taking a piece that puts opponent in check', function () {
        playMoves(chessRules.getInitialPosition(), ["e4", "Nc6", "Nc3", "Nf6", "Nf3", "d5", "d4", "Nxe4",
            "Nxe4", "dxe4", "Bh6", "gxh6", "Ba6", "exf3", "Qd3", "fxg2", "Qxh7", "gxh1+=Q", "Ke2"]);
    });

    it('two pieces on the same row that can reach the same square', function () {
        playMoves(chessRules.getInitialPosition(), [
            "e4", "Na6",
            "e5", "f5",
            "e6", "b5",
            "exd7+", "Kf7",
            "dxc8=Q", "f4",
            "Qxd8", "g5",
            "Qxa8", "g4",
            "Qd5+", "Ke8",
            "Qxg8", "Nc5",
            "Qxh8", "Nb3",
            "Qxh7", "c6",
            "cxb3", "e6",
            "d4", "Kd8",
            "d5", "Bh6",
            "d6", "c5",
            "Qxh6", "a6",
            "d7", "g3",
            "Qg7", "gxh2",
            "Qf8+", "Kc7",
            "d8=Q+", "Kc6",
            "Q8d6+"
        ]);
    });

});
