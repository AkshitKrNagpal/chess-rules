'use strict';

var chessMoves = require('./moves');
var parser = require('./pgnParser');

function pgnToMove(position, pgnMove) {
    var pgnFields = parser.parsePgnMove(pgnMove);

    if (!pgnFields.type) {
        pgnFields.type = 'P';
    }

    if (!pgnFields.src) {
        var availableMoves = chessMoves.getAvailableMoves(position);
        availableMoves.forEach(function (m) {
            if (m.dst === pgnFields.dst) {
                pgnFields.src = m.src;
            }
        });
    }

    return {src: pgnFields.src, dst: pgnFields.dst};
}

function moveToPgn(position, move) {
    return null;
}

module.exports = {
    pgnToMove: pgnToMove,
    moveToPgn: moveToPgn
};
