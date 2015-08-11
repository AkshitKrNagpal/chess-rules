'use strict';
var assert = require('assert');
var positions = require('../src/chess/position');
var colors = require('colors');

describe('position module', function () {

    it('must provide initial game position', function () {
        var position = positions.getInitialPosition();
        assert.equal(position.board.length, 64);
        assert.equal(position.turn, 'W');
        assert.equal(position.castlingFlags.W.K, true);
        assert.equal(position.lastPawnMoveColumn, null);
    });

    it('must be able to clone a position', function () {
        var position = positions.getInitialPosition();
        var clone = positions.clone(position);
        assert.deepEqual(clone, position);
        assert.notStrictEqual(clone, position);
    });

    it('must display board positions and turn', function () {
        var position = positions.getInitialPosition();
        var positionStr = positions.positionToString(position, false);
        var positionStrArray = positionStr.split('\n');
        assert.equal(positionStrArray.length, 10);
        assert.equal(positionStrArray[0], 'WHITE KQkq');
        assert.equal(positionStrArray[1], '8 r n b q k b n r ');
        assert.equal(positionStrArray[2], '7 p p p p p p p p ');
        assert.equal(positionStrArray[3], '6 . . . . . . . . ');
        assert.equal(positionStrArray[4], '5 . . . . . . . . ');
        assert.equal(positionStrArray[5], '4 . . . . . . . . ');
        assert.equal(positionStrArray[6], '3 . . . . . . . . ');
        assert.equal(positionStrArray[7], '2 P P P P P P P P ');
        assert.equal(positionStrArray[8], '1 R N B Q K B N R ');
        assert.equal(positionStrArray[9], '  a b c d e f g h ');
    });

    it('must display board positions and turn in unicode', function () {
        colors.setTheme({
            BW: ['black', 'bgWhite'],
            BB: ['black', 'bgMagenta'],
            WW: ['white', 'bgWhite'],
            WB: ['white', 'bgMagenta']
        });
        var position = positions.getInitialPosition();
        var positionStr = positions.positionToString(position, true);
        var positionStrArray = positionStr.split('\n');
        assert.equal(positionStrArray.length, 10);
        assert.equal(positionStrArray[0], 'WHITE KQkq');
        assert.equal(positionStrArray[1], '8 ' + '♜ '.BW + '♞ '.BB +  '♝ '.BW + '♛ '.BB + '♚ '.BW + '♝ '.BB + '♞ '.BW + '♜ '.BB);
        assert.equal(positionStrArray[2], '7 ' + '♟ '.BB + '♟ '.BW + '♟ '.BB + '♟ '.BW + '♟ '.BB + '♟ '.BW + '♟ '.BB + '♟ '.BW);
        assert.equal(positionStrArray[3], '6 ' + '  '.WW + '  '.WB + '  '.WW + '  '.WB + '  '.WW + '  '.WB + '  '.WW + '  '.WB);
        assert.equal(positionStrArray[4], '5 ' + '  '.WB + '  '.WW + '  '.WB + '  '.WW + '  '.WB + '  '.WW + '  '.WB + '  '.WW);
        assert.equal(positionStrArray[5], '4 ' + '  '.WW + '  '.WB + '  '.WW + '  '.WB + '  '.WW + '  '.WB + '  '.WW + '  '.WB);
        assert.equal(positionStrArray[6], '3 ' + '  '.WB + '  '.WW + '  '.WB + '  '.WW + '  '.WB + '  '.WW + '  '.WB + '  '.WW);
        assert.equal(positionStrArray[7], '2 ' + '♙ '.WW + '♙ '.WB + '♙ '.WW + '♙ '.WB + '♙ '.WW + '♙ '.WB + '♙ '.WW + '♙ '.WB);
        assert.equal(positionStrArray[8], '1 ' + '♖ '.WB + '♘ '.WW + '♗ '.WB + '♕ '.WW + '♔ '.WB + '♗ '.WW + '♘ '.WB + '♖ '.WW);
        assert.equal(positionStrArray[9], '  a b c d e f g h ');
    });
});
