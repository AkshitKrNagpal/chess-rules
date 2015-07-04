'use strict';

var chessMoves = require('./moves');
var parser = require('./pgnParser');

function pgnToMove(position, pgnMove) {
    var move = null;

    var pgnFields = parser.parsePgnMove(pgnMove);

    if (pgnFields) {
        var availableMoves = chessMoves.getAvailableMoves(position);
        availableMoves.forEach(function (m) {
            if (pgnFields.srcCol && m.src % 8 != pgnFields.srcCol) {
                return;
            }

            if (pgnFields.srcRow && Math.floor(m.src / 8) != pgnFields.srcRow) {
                return;
            }

            if (m.dst == pgnFields.dst && position.board[m.src].type == pgnFields.type) {
                pgnFields.src = m.src;
            }
        });

        if (pgnFields.src != null && pgnFields.dst != null) {
            move = {src: pgnFields.src, dst: pgnFields.dst};
        }
    }

    return move;
}

function moveToPgn() {
    return null;
}

module.exports = {
    pgnToMove: pgnToMove,
    moveToPgn: moveToPgn
};
