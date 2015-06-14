'use strict';
var assert = require('assert');
var positions = require('../src/chess/position');

describe('position module', function () {

    it('must provide initial game position', function () {
        var position = positions.initialPositionFactory();
        assert.equal(position.board.length, 64);
        assert.equal(position.castlingFlags.length, 4);
        assert.equal(position.lastPawnMoveColumn, null);
    });

    it('must be able to clone a position', function () {
        var position = positions.initialPositionFactory();
        var clone = positions.clone(position);
        assert.deepEqual(clone, position);
        assert.notStrictEqual(clone, position);
    });

});
