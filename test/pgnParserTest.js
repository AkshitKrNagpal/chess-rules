'use strict';
var assert = require('assert');
var parser = require('../src/chess/pgnParser');

describe('pgn parser module', function () {

    it('must parse e4', function () {
        var fields = parser.parsePgnMove("e4");
        assert.equal(fields.srcCol, null);
        assert.equal(fields.srcRow, null);
        assert.equal(fields.dst, 28);
        assert.equal(fields.capture, false);
        assert.equal(fields.type, 'P');
        assert.equal(fields.checking, false);
        assert.equal(fields.mate, false);
        assert.equal(fields.promotion, null);
    });

    it('must parse dxe4', function () {
        var fields = parser.parsePgnMove("dxe4");
        assert.equal(fields.srcCol, 3);
        assert.equal(fields.dst, 28);
        assert.equal(fields.capture, true);
        assert.equal(fields.type, 'P');
    });

    it('must parse Nxe4', function () {
        var fields = parser.parsePgnMove("Nxe4");
        assert.equal(fields.srcCol, null);
        assert.equal(fields.dst, 28);
        assert.equal(fields.capture, true);
        assert.equal(fields.type, 'N');
    });

    it('must parse bogus input', function () {
        var fields = parser.parsePgnMove("asdfjasgj");
        assert.equal(fields, null);
    });

    it('must parse check indicator', function () {
        var fields = parser.parsePgnMove("Ra6+");
        assert.equal(fields.checking, true);
    });

    it('must parse promotion piece type', function () {
        var fields = parser.parsePgnMove("e8=Q");
        assert.equal(fields.promotion, "Q");
    });

    it('must parse checkmate indicator', function () {
        var fields = parser.parsePgnMove("e8=Q#");
        assert.equal(fields.promotion, "Q");
        assert.equal(fields.mate, true);
        assert.equal(fields.checking, false);
    });

    it('must parse Ra1', function () {
        var fields = parser.parsePgnMove("Ra1");
        assert.equal(fields.type, 'R');
        assert.equal(fields.dst, 0);
    });
});

