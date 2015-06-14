'use strict';


function pieceFactory(piece, side) {
    return {type: piece, side: side};
}

function clone(position) {
    return {
        turn: position.turn,
        castlingFlags: position.castlingFlags.slice(0),
        lastPawnMoveColumn: position.lastPawnMoveColumn,
        board: position.board.slice(0)
    };
}

function getInitialPosition() {
    return {
        turn: 'W',
        castlingFlags: ['wk', 'wq', 'bk', 'bq'],

        lastPawnMoveColumn: null,

        board: [
            pieceFactory("R", "W"),
            pieceFactory("N", "W"),
            pieceFactory("B", "W"),
            pieceFactory("Q", "W"),
            pieceFactory("K", "W"),
            pieceFactory("B", "W"),
            pieceFactory("N", "W"),
            pieceFactory("R", "W"),

            pieceFactory("P", "W"),
            pieceFactory("P", "W"),
            pieceFactory("P", "W"),
            pieceFactory("P", "W"),
            pieceFactory("P", "W"),
            pieceFactory("P", "W"),
            pieceFactory("P", "W"),
            pieceFactory("P", "W"),

            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,

            pieceFactory("P", "B"),
            pieceFactory("P", "B"),
            pieceFactory("P", "B"),
            pieceFactory("P", "B"),
            pieceFactory("P", "B"),
            pieceFactory("P", "B"),
            pieceFactory("P", "B"),
            pieceFactory("P", "B"),

            pieceFactory("R", "B"),
            pieceFactory("N", "B"),
            pieceFactory("B", "B"),
            pieceFactory("Q", "B"),
            pieceFactory("K", "B"),
            pieceFactory("B", "B"),
            pieceFactory("N", "B"),
            pieceFactory("R", "B")
        ]
    };
}

module.exports = {
    initialPositionFactory: getInitialPosition,
    clone: clone
};
