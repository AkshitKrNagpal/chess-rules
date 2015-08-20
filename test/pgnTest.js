'use strict';
var assert = require('assert');
var chessRules = require('../src');

describe('pgn module', function () {

    it('must understand e4', function () {
        var position = chessRules.getInitialPosition();
        var moveE4 = chessRules.pgnToMove(position, "e4");
        assert.equal(moveE4.src, 12);
        assert.equal(moveE4.dst, 28);
    });

    it('must understand a simple game', function () {
        var position = chessRules.getInitialPosition();
        position = chessRules.applyMove(position, chessRules.pgnToMove(position, "e4"));
        position = chessRules.applyMove(position, chessRules.pgnToMove(position, "e5"));
        position = chessRules.applyMove(position, chessRules.pgnToMove(position, "d4"));
        position = chessRules.applyMove(position, chessRules.pgnToMove(position, "exd4"));
        assert.equal(position.board[27].type, 'P');
        assert.equal(position.board[27].side, 'B');
        position = chessRules.applyMove(position, chessRules.pgnToMove(position, "Qd4"));
        position = chessRules.applyMove(position, chessRules.pgnToMove(position, "Nc6"));
        position = chessRules.applyMove(position, chessRules.pgnToMove(position, "e5"));
        position = chessRules.applyMove(position, chessRules.pgnToMove(position, "Nxd4"));
        assert.equal(position.board[27].type, 'N');
        assert.equal(position.board[27].side, 'B');
    });

    it('must be able to identify source by piece type', function () {
        var position = chessRules.getInitialPosition();
        // Add a white bishop at C3
        position.board[18] = {type: 'B', side: 'W'};

        // Add a white knight at F3
        position.board[21] = {type: 'N', side: 'W'};

        // Both pieces can reach E5...
        var knightMove = chessRules.pgnToMove(position, "Ne5");
        assert.equal(knightMove.src, 21);

        var bishopMove = chessRules.pgnToMove(position, "Be5");
        assert.equal(bishopMove.src, 18);
    });


    it('must be able to identify source by column', function () {
        var position = chessRules.getInitialPosition();
        // Add a black bishop at C3
        position.board[18] = {type: 'B', side: 'B'};

        // Two pawns can take it
        var colBMove = chessRules.pgnToMove(position, "bxc3");
        assert.equal(colBMove.src, 9);

        var colDMove = chessRules.pgnToMove(position, "dxc3");
        assert.equal(colDMove.src, 11);
    });

    it('must be able to identify source by row', function () {
        var position = chessRules.getInitialPosition();
        // Add a black bishop at C3
        position.board[18] = {type: 'B', side: 'B'};
        // Add a white knight at E4
        position.board[28] = {type: 'N', side: 'W'};

        // Two knights can take the bishop
        var row1Move = chessRules.pgnToMove(position, "N1xc3");
        assert.equal(row1Move.src, 1);

        var row4Move = chessRules.pgnToMove(position, "N4xc3");
        assert.equal(row4Move.src, 28);
    });

    it('must reject bogus entries', function () {
        var position = chessRules.getInitialPosition();
        assert.equal(chessRules.pgnToMove(position, "bdfasasd"), null);
        assert.equal(chessRules.pgnToMove(position, "r3e5o6"), null);
        assert.equal(chessRules.pgnToMove(position, ""), null);
        assert.equal(chessRules.pgnToMove(position, "#@#$"), null);
    });

    it('must reject invalid moves', function () {
        var position = chessRules.getInitialPosition();
        assert.equal(chessRules.pgnToMove(position, "e5"), null);
    });

    it('must convert moves to pgn and back', function () {
        var position = chessRules.getInitialPosition();

        var moves = chessRules.getAvailableMoves(position);
        moves.forEach(function (move) {
            var movePgn = chessRules.moveToPgn(position, move);
            var moveFromPgn = chessRules.pgnToMove(position, movePgn);
            assert.deepEqual(moveFromPgn, move);
        });
    });

    it('must add an "x" when a piece is taken', function () {
        var position = chessRules.getInitialPosition();

        ['e4', 'd5', 'exd5'].forEach(function (movetext) {
            var m = chessRules.pgnToMove(position, movetext);
            var p = chessRules.moveToPgn(position, m);
            assert.equal(p, movetext);
            position = chessRules.applyMove(position, m);
        });
    });

    it('must hide source when destination is explicit', function () {
        var position = chessRules.getInitialPosition();
        assert.equal(chessRules.moveToPgn(position, chessRules.pgnToMove(position, 'e3')), 'e3');
    });


    it('must indicate explicit column for confusing pawn destination', function () {
        var position = chessRules.getInitialPosition();

        ['e4', 'd5', 'c4', 'e6', 'exd5'].forEach(function (movetext) {
            var m = chessRules.pgnToMove(position, movetext);
            var p = chessRules.moveToPgn(position, m);
            assert.equal(p, movetext);
            position = chessRules.applyMove(position, m);
        });
    });

    it('must indicate explicit column/line for confusing knight destination', function () {
        var position = chessRules.getInitialPosition();

        ['Nc3', 'Nc6', 'Nb5', 'Nf6', 'Nd4', 'd5', 'Ngf3', 'e5', 'Nf5', 'h6', 'N3d4'].forEach(function (movetext) {
            var m = chessRules.pgnToMove(position, movetext);
            var p = chessRules.moveToPgn(position, m);
            assert.equal(p, movetext);
            position = chessRules.applyMove(position, m);
        });
    });

    it('must support a game leading to PAT situation', function () {
        var position = chessRules.getInitialPosition();

        ['a4', 'b5', 'axb5', 'a6', 'bxa6', 'c5', 'b4', 'd6', 'bxc5', 'f6', 'cxd6',
            'g5', 'dxe7', 'Bxe7', 'h4', 'Nc6', 'hxg5', 'Nd4', 'gxf6', 'Nf3+', 'exf3',
            'Nh6', 'fxe7', 'Ng4', 'fxg4', 'Bf5', 'exd8=Q+', 'Kf7', 'gxf5', 'h5', 'Qxa8',
            'h4', 'Qxh8', 'h3', 'Rxh3', 'Ke7', 'Qf6+', 'Kd7', 'Rh7+', 'Kc8', 'a7'].forEach(function (movetext) {
                var m = chessRules.pgnToMove(position, movetext);
                var p = chessRules.moveToPgn(position, m);
                position = chessRules.applyMove(position, m);
                assert.equal(p, movetext);
            });

        assert.equal(chessRules.getGameStatus(position), 'PAT');
    });

    it('must support queen and king side castling', function () {
        var position = chessRules.getInitialPosition();

        ['e4', 'd5', 'Nf3', 'Nc6', 'Bb5', 'Bg4', 'O-O', 'Qd6', 'Nc3', 'O-O-O'].forEach(function (movetext) {
            var m = chessRules.pgnToMove(position, movetext);
            var p = chessRules.moveToPgn(position, m);
            position = chessRules.applyMove(position, m);
            assert.equal(p, movetext);
        });

        assert.equal(chessRules.getGameStatus(position), 'OPEN');
    });

    it('must a move to A1', function () {
        var position = chessRules.getInitialPosition();

        ['a4', 'a5', 'Ra3', 'b6', 'Ra1'].forEach(function (movetext) {
            console.log(chessRules.positionToString(position, true));
            var m = chessRules.pgnToMove(position, movetext);
            var p = chessRules.moveToPgn(position, m);
            position = chessRules.applyMove(position, m);
            assert.equal(p, movetext);
        });

        assert.equal(chessRules.getGameStatus(position), 'OPEN');
    });


});

