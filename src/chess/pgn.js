'use strict';

var chessMoves = require('./moves');
var parser = require('./pgnParser');

/**
 * Convert an offset to a PGN coord: 0 -> a1, ... , 63 -> h8
 */
function coordToName(offset) {
    var move = '';

    move += String.fromCharCode('a'.charCodeAt(0) + (offset % 8));
    move += String.fromCharCode('1'.charCodeAt(0) + Math.floor(offset / 8));

    return move;
}

function pgnToMove(position, pgnMove) {
    var move = null;

    var pgnFields = parser.parsePgnMove(pgnMove);

    if (pgnFields) {
        var availableMoves = chessMoves.getAvailableMoves(position);
        availableMoves.forEach(function (m) {
            if (pgnFields.srcCol != null && m.src % 8 != pgnFields.srcCol) {
                return;
            }

            if (pgnFields.srcRow != null && Math.floor(m.src / 8) != pgnFields.srcRow) {
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

function moveToPgn(position, move) {
    var pgn = '';

    var piece = position.board[move.src];
    if (piece.type != 'P') {
        pgn += piece.type;
    }

    pgn += coordToName(move.src);
    pgn += coordToName(move.dst);

    return pgn;
}

module.exports = {
    pgnToMove: pgnToMove,
    moveToPgn: moveToPgn
};
