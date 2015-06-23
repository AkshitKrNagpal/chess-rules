'use strict';

var chessMoves = require('./moves');
var parser = require('./pgnParser');

function pgnToMove(position, pgnMove) {
    var pgnFields = parser.parsePgnMove(pgnMove);

    var availableMoves = chessMoves.getAvailableMoves(position);
    availableMoves.forEach(function (m) {
        if (pgnFields.srcCol && m.src % 8 != pgnFields.srcCol) {
            return;
        }

        if (pgnFields.srcRow && Math.floor(m.src / 8) != pgnFields.srcRow) {
            return;
        }

        if (m.dst == pgnFields.dst) {
            pgnFields.src = m.src;
        }
    });


    return {src: pgnFields.src, dst: pgnFields.dst};
}

function moveToPgn(position, move) {
    return null;
}

module.exports = {
    pgnToMove: pgnToMove,
    moveToPgn: moveToPgn
};
