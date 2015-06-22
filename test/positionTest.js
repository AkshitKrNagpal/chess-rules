'use strict';
var assert = require('assert');
var positions = require('../src/chess/position');

describe('position module', function () {

    it('must provide initial game position', function () {
        var position = positions.initialPositionFactory();
        assert.equal(position.board.length, 64);
        assert.equal(position.turn, 'W');
        assert.equal(position.castlingFlags.length, 4);
        assert.equal(position.lastPawnMoveColumn, null);
    });

    it('must be able to clone a position', function () {
        var position = positions.initialPositionFactory();
        var clone = positions.clone(position);
        assert.deepEqual(clone, position);
        assert.notStrictEqual(clone, position);
    });

    it('must display board positions and turn', function () {
        var position = positions.initialPositionFactory();
        var positionStr = positions.positionToString(position);
        var positionStrArray = positionStr.split('\n');
        assert.equal(positionStrArray.length, 9);
        assert.equal(positionStrArray[0], 'WHITE KQkq');
        assert.equal(positionStrArray[1], 'r n b q k b n r ');
        assert.equal(positionStrArray[2], 'p p p p p p p p ');
        assert.equal(positionStrArray[3], '. . . . . . . . ');
        assert.equal(positionStrArray[4], '. . . . . . . . ');
        assert.equal(positionStrArray[5], '. . . . . . . . ');
        assert.equal(positionStrArray[6], '. . . . . . . . ');
        assert.equal(positionStrArray[7], 'P P P P P P P P ');
        assert.equal(positionStrArray[8], 'R N B Q K B N R ');
    });

});
