'use strict';

var coordinates = require('./coordinates');

var Coord = coordinates.BoardCoordinates;

/*
 * Board access utility functions
 */

function isFree(position, coord) {
    return coord.isValid() && position.board[coord.offset] == null;
}

function isOpponent(position, coord) {
    if (!coord.isValid()) {
        return false;
    }

    var piece = position.board[coord.offset];

    return piece != null
        && position.turn !== piece.side;
}

function isFreeOrOpponent(position, coord) {
    if (!coord.isValid()) {
        return false;
    }

    var piece = position.board[coord.offset];

    return piece == null
        || position.turn !== piece.side;
}

/*
 * Piece movement logic
 */

var pieceDestinationsEvaluator = [];

pieceDestinationsEvaluator.P = function (position, coord) {
    // Movement vector
    var dy = position.turn == 'W' ? 1 : -1;
    // Original row of a pawn
    var iy = position.turn == 'W' ? 1 : 6;

    var coordAhead1 = coord.add(new Coord(0, dy));
    var coordAhead2 = coordAhead1.add(new Coord(0, dy));
    var coordSide1 = coord.add(new Coord(1, dy));
    var coordSide2 = coord.add(new Coord(-1, dy));

    var destinations = [];

    if (isFree(position, coordAhead1)) {
        destinations.push(coordAhead1);
    }

    if (isOpponent(position, coordSide1)) {
        destinations.push(coordSide1);
    }

    if (isOpponent(position, coordSide2)) {
        destinations.push(coordSide2);
    }

    if (coord.y == iy
        && isFree(position, coordAhead1)
        && isFree(position, coordAhead2)) {
        destinations.push(coordAhead2);
    }

    return destinations;
};

pieceDestinationsEvaluator.N = function (position, coord) {
    var destinations = [];

    [
        coord.add(new Coord(-1, 2)),
        coord.add(new Coord(1, 2)),
        coord.add(new Coord(2, -1)),
        coord.add(new Coord(2, 1)),
        coord.add(new Coord(1, -2)),
        coord.add(new Coord(-1, -2)),
        coord.add(new Coord(-2, 1)),
        coord.add(new Coord(-2, -1))
    ].forEach(function (potentialDestination) {
            if (isFreeOrOpponent(position, potentialDestination)) {
                destinations.push(potentialDestination);
            }
        });

    return destinations;
};

pieceDestinationsEvaluator.B = function (position, coord) {
    return [];
};

pieceDestinationsEvaluator.R = function (position, coord) {
    return [];
};

pieceDestinationsEvaluator.K = function (position, coord) {
    return [];
};

pieceDestinationsEvaluator.Q = function (position, coord) {
    return [];
};

/*
 * Exported functions
 */

function getAvailableMoves(position) {

    var availableMoves = [];

    for (var offset = 0; offset <= 64; offset++) {
        var piece = position.board[offset];
        var coord = new Coord(offset);

        if (piece != null && piece.side === position.turn) {
            var targets = pieceDestinationsEvaluator[piece.type](position, coord);
            availableMoves = availableMoves.concat(targets);
        }

    }

    return availableMoves;
}

module.exports = {
    getAvailableMoves: getAvailableMoves
};
