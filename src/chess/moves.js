'use strict';

var coordinates = require('./coordinates');
var updates = require('./updates');

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

function iterateMovementInDirection(position, coord, direction, destinations) {
    var c = coord;

    while (true) {
        c = c.add(direction);

        if (!c.isValid()) {
            break;
        }

        if (isFree(position, c)) {
            destinations.push(c);
        } else {
            if (isOpponent(position, c)) {
                destinations.push(c);
            }

            break;
        }
    }
}

function findPiece(position, pieceType, pieceSide) {
    var result = null;

    for (var offset = 0; offset < 64; offset++) {
        var piece = position.board[offset];
        if (piece != null && piece.type === pieceType && piece.side === pieceSide) {
            result = offset;
            break;
        }
    }

    return result;
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
    var destinations = [];

    [
        new Coord(-1, -1),
        new Coord(-1, 1),
        new Coord(1, -1),
        new Coord(1, 1)
    ].forEach(function (direction) {
            iterateMovementInDirection(position, coord, direction, destinations);
        });

    return destinations;
};

pieceDestinationsEvaluator.R = function (position, coord) {
    var destinations = [];

    [
        new Coord(-1, 0),
        new Coord(1, 0),
        new Coord(0, -1),
        new Coord(0, 1)
    ].forEach(function (direction) {
            iterateMovementInDirection(position, coord, direction, destinations);
        });

    return destinations;
};

pieceDestinationsEvaluator.K = function (position, coord) {
    var destinations = [];

    for (var dx = -1; dx < 2; dx++) {
        for (var dy = -1; dy < 2; dy++) {
            if (dx != 0 || dy != 0) {
                var delta = new Coord(dx, dy);
                var dest = coord.add(delta);

                if (isFreeOrOpponent(position, dest)) {
                    destinations.push(dest);
                }
            }
        }
    }

    return destinations;
};

pieceDestinationsEvaluator.Q = function (position, coord) {
    var destinations = [];

    [
        new Coord(-1, 0),
        new Coord(1, 0),
        new Coord(0, -1),
        new Coord(0, 1),
        new Coord(-1, -1),
        new Coord(-1, 1),
        new Coord(1, -1),
        new Coord(1, 1)
    ].forEach(function (direction) {
            iterateMovementInDirection(position, coord, direction, destinations);
        });

    return destinations;
};

/*
 * Exported functions
 */

function computeAllMoves(position) {
    // Compute possible moves based only on piece movement.
    var availableMoves = [];

    for (var offset = 0; offset <= 64; offset++) {
        var piece = position.board[offset];
        var coord = new Coord(offset);

        if (piece != null && piece.side === position.turn) {
            var targets = pieceDestinationsEvaluator[piece.type](position, coord);

            targets.forEach(function (dest) {
                availableMoves.push({src: coord.offset, dst: dest.offset});
            });
        }
    }

    return availableMoves;
}

function getAvailableMoves(position) {

    var availableMoves = computeAllMoves(position);

    // Prune moves that would lead to a check situation.

    var legalmoves = [];


    availableMoves.forEach(function (move) {
        var updatedPosition = updates.applyMove(position, move);
        var opponentMoves = computeAllMoves(updatedPosition);
        var kingOffset = findPiece(updatedPosition, 'K', position.turn);
        var kingThreat = false;

        opponentMoves.forEach(function (move) {
            if (move.dst == kingOffset) {
                kingThreat = true;
            }
        });

        if (!kingThreat) {
            legalmoves.push(move);
        }
    });

    return legalmoves;
}

module.exports = {
    getAvailableMoves: getAvailableMoves
};
