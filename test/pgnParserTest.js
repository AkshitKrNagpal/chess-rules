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
});

