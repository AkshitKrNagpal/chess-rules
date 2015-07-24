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
});
