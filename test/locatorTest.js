'use strict';
var assert = require('assert');
var chessRules = require('../src');

describe('locator module', function () {

    it('must find the white pawns using position side', function () {
        var position = chessRules.getInitialPosition();
        var pawns = chessRules.findPiece(position, 'P');

        assert.equal(pawns.length, 8);

        pawns.forEach(function (c) {
            var p = position.board[c.offset];
            assert.equal(p.side, 'W');
            assert.equal(p.type, 'P');
        });
    });

    it('must find the white pawns using explicit side', function () {
        var position = chessRules.getInitialPosition();
        var pawns = chessRules.findPiece(position, 'P', 'W');

        assert.equal(pawns.length, 8);

        pawns.forEach(function (c) {
            var p = position.board[c.offset];
            assert.equal(p.side, 'W');
            assert.equal(p.type, 'P');
        });
    });

    it('must find the black pawns', function () {
        var position = chessRules.getInitialPosition();
        var pawns = chessRules.findPiece(position, 'P', 'B');

        assert.equal(pawns.length, 8);

        pawns.forEach(function (c) {
            var p = position.board[c.offset];
            assert.equal(p.side, 'B');
            assert.equal(p.type, 'P');
        });
    });
});

