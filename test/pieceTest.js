'use strict';

var assert = require('assert');
var pieces = require('../src/chess/piece');

describe('piece module', function () {

    it('must provide a chess piece', function () {
        var piece = pieces.pieceFactory("P", "W");
        assert.equal(piece.type, 'P');
        assert.equal(piece.side, 'W');
    });

    it('must provide utf8 code of white Pawn', function () {
        var code = pieces.pieceToUTF8(pieces.pieceFactory("P", "W"));
        assert.equal(code, '\u2659');
    });

    it('must provide utf8 code of white kNight', function () {
        var code = pieces.pieceToUTF8(pieces.pieceFactory("N", "W"));
        assert.equal(code, '\u2658');
    });

    it('must provide utf8 code of white Bishop', function () {
        var code = pieces.pieceToUTF8(pieces.pieceFactory("B", "W"));
        assert.equal(code, '\u2657');
    });

    it('must provide utf8 code of white Rook', function () {
        var code = pieces.pieceToUTF8(pieces.pieceFactory("R", "W"));
        assert.equal(code, '\u2656');
    });

    it('must provide utf8 code of white Queen', function () {
        var code = pieces.pieceToUTF8(pieces.pieceFactory("Q", "W"));
        assert.equal(code, '\u2655');
    });

    it('must provide utf8 code of white King', function () {
        var code = pieces.pieceToUTF8(pieces.pieceFactory("K", "W"));
        assert.equal(code, '\u2654');
    });

    it('must provide utf8 code of black Pawn', function () {
        var code = pieces.pieceToUTF8(pieces.pieceFactory("P", "B"));
        assert.equal(code, '\u265F');
    });

    it('must provide utf8 code of black kNight', function () {
        var code = pieces.pieceToUTF8(pieces.pieceFactory("N", "B"));
        assert.equal(code, '\u265E');
    });

    it('must provide utf8 code of black Bishop', function () {
        var code = pieces.pieceToUTF8(pieces.pieceFactory("B", "B"));
        assert.equal(code, '\u265D');
    });

    it('must provide utf8 code of black Rook', function () {
        var code = pieces.pieceToUTF8(pieces.pieceFactory("R", "B"));
        assert.equal(code, '\u265C');
    });

    it('must provide utf8 code of black Queen', function () {
        var code = pieces.pieceToUTF8(pieces.pieceFactory("Q", "B"));
        assert.equal(code, '\u265B');
    });

    it('must provide utf8 code of black King', function () {
        var code = pieces.pieceToUTF8(pieces.pieceFactory("K", "B"));
        assert.equal(code, '\u265A');
    });
});
