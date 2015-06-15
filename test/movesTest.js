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

function contains(l, item) {
    var result = false;

    for (var i = 0; i < l.length; i++) {
        if (l[i].src === item.src && l[i].dst === item.dst) {
            result = true;
            break;
        }
    }

    return result;
}

describe('moves module', function () {

    it('must implement consistent Pawn movement', function () {
        var position = createEmptyBoard();
        position.board[28] = {type: 'P', side: 'W'};
        var moves = chessRules.getAvailableMoves(position);
        assert.equal(moves.length, 1);
    });

    it('must implement consistent Knight movement', function () {
        var position = createEmptyBoard();
        position.board[28] = {type: 'N', side: 'W'};
        var moves = chessRules.getAvailableMoves(position);
        assert.equal(moves.length, 8);
    });

    it('must implement consistent Bishop movement', function () {
        var position = createEmptyBoard();
        position.board[28] = {type: 'B', side: 'W'};
        var moves = chessRules.getAvailableMoves(position);
        assert.equal(moves.length, 13);
    });

    it('must implement consistent Rook movement', function () {
        var position = createEmptyBoard();
        position.board[0] = {type: 'R', side: 'W'};
        var moves = chessRules.getAvailableMoves(position);
        assert.equal(moves.length, 14);
    });

    it('must implement consistent Queen movement', function () {
        var position = createEmptyBoard();
        position.board[0] = {type: 'Q', side: 'W'};
        var moves = chessRules.getAvailableMoves(position);
        assert.equal(moves.length, 21);
    });

    it('must implement consistent K movement', function () {
        var position = createEmptyBoard();
        position.board[0] = {type: 'K', side: 'W'};
        var moves = chessRules.getAvailableMoves(position);
        assert.equal(moves.length, 3);
    });

    it('must provide available moves list', function () {
        var position = chessRules.getInitialPosition();
        var moves = chessRules.getAvailableMoves(position);
        assert.equal(moves.length, 20);
        assert(contains(moves, {src: 12, dst: 20}));
        assert(contains(moves, {src: 12, dst: 28}));
    });

    it('must forbid King movements that would jeopardize him', function () {
        var position = createEmptyBoard();
        position.board[0] = {type: 'K', side: 'W'};
        position.board[15] = {type: 'R', side: 'B'};
        var moves = chessRules.getAvailableMoves(position);
        assert.equal(moves.length, 1);
    });

    it('must forbid piece movements that would uncover King', function () {
        var position = createEmptyBoard();
        position.board[0] = {type: 'K', side: 'W'};
        position.board[3] = {type: 'R', side: 'W'};
        position.board[7] = {type: 'R', side: 'B'};
        var moves = chessRules.getAvailableMoves(position);
        assert.equal(moves.length, 9);
    });

});

