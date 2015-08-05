'use strict';
var piece = require('./piece');
var _ = require('underscore-plus');

function clone(position) {
    return _.deepClone(position);
}

function getInitialPosition() {
    return {
        turn: 'W',
        castlingFlags: {
            'W': {'K': true, 'Q': true},
            'B': {'K': true, 'Q': true}
        },

        lastPawnMoveColumn: null,

        board: [
            piece.pieceFactory("R", "W"),
            piece.pieceFactory("N", "W"),
            piece.pieceFactory("B", "W"),
            piece.pieceFactory("Q", "W"),
            piece.pieceFactory("K", "W"),
            piece.pieceFactory("B", "W"),
            piece.pieceFactory("N", "W"),
            piece.pieceFactory("R", "W"),

            piece.pieceFactory("P", "W"),
            piece.pieceFactory("P", "W"),
            piece.pieceFactory("P", "W"),
            piece.pieceFactory("P", "W"),
            piece.pieceFactory("P", "W"),
            piece.pieceFactory("P", "W"),
            piece.pieceFactory("P", "W"),
            piece.pieceFactory("P", "W"),

            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,

            piece.pieceFactory("P", "B"),
            piece.pieceFactory("P", "B"),
            piece.pieceFactory("P", "B"),
            piece.pieceFactory("P", "B"),
            piece.pieceFactory("P", "B"),
            piece.pieceFactory("P", "B"),
            piece.pieceFactory("P", "B"),
            piece.pieceFactory("P", "B"),

            piece.pieceFactory("R", "B"),
            piece.pieceFactory("N", "B"),
            piece.pieceFactory("B", "B"),
            piece.pieceFactory("Q", "B"),
            piece.pieceFactory("K", "B"),
            piece.pieceFactory("B", "B"),
            piece.pieceFactory("N", "B"),
            piece.pieceFactory("R", "B")
        ]
    };
}

function positionToString(position, utfFlag) {
    var strings = [];
    strings.push(position.turn == 'W' ? 'WHITE' : 'BLACK');
    strings.push(' ');
    strings.push(position.castlingFlags.W.K ? 'K' : '');
    strings.push(position.castlingFlags.W.Q ? 'Q' : '');
    strings.push(position.castlingFlags.B.K ? 'k' : '');
    strings.push(position.castlingFlags.B.Q ? 'q' : '');

    var row;
    var col;
    for (row = 7; row >= 0; row--) {
        strings.push('\n');
        for (col = 0; col < 8; col++) {
            var currentPiece = position.board[row * 8 + col];
            if (currentPiece == null) {
                strings.push('.');
            } else if (currentPiece.side == 'W') {
                strings.push(utfFlag?piece.pieceToUTF8(currentPiece):currentPiece.type.toUpperCase());
            } else {
                strings.push(utfFlag?piece.pieceToUTF8(currentPiece):currentPiece.type.toLowerCase());
            }
            strings.push(' ');
        }
    }
    return strings.join('');
}

module.exports = {
    getInitialPosition: getInitialPosition,
    positionToString: positionToString,
    clone: clone
};
