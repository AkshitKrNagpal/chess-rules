'use strict';
var assert = require('assert');
var parser = require('../src/chess/pgnParser');

describe('pgn parser module', function () {

    it('must parse e4', function () {
        var fields = parser.parsePgnMove("e4");
        assert.equal(fields.dst, 28);
    });

});

