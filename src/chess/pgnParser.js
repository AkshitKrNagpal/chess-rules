'use strict';

function computeOffset(pgn, cursor) {
    var offs = 0;

    offs += pgn.charCodeAt(cursor) - 'a'.charCodeAt(0);
    offs += (pgn.charCodeAt(cursor + 1) - '1'.charCodeAt(0)) * 8;

    return offs;
}

function parsePgnMove(pgn) {
    var fields = {
        type: null,
        src: null,
        dst: null,
        promotion: null
    };

    var cursor = 0;

    // Piece type prefix

    if (['P', 'R', 'N', 'B', 'K', 'Q'].indexOf(pgn[cursor]) != -1) {
        fields.type = pgn[cursor];
        cursor++;
    }

    if (pgn[cursor] === 'x') {
        cursor++;
    }

    fields.dst = computeOffset(pgn, cursor);


    return fields;
}

module.exports = {
    parsePgnMove: parsePgnMove
};
