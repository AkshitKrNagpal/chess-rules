'use strict';

var positions = require('./position');
var coordinates = require('./coordinates');
var Coord = coordinates.BoardCoordinates;


function computeDiffs(position, move) {
    var diffs = [];
    var src = new Coord(move.src);
    var dst = new Coord(move.dst);
    var delta = dst.sub(src);

    var destinationPiece = position.board[move.dst];

    if (destinationPiece != null) {
        diffs.push({action: 'remove', src: move.dst});
    }

    diffs.push({action: 'move', src: move.src, dst: move.dst});

    // Special case for 'en passant'
    if (destinationPiece == null && position.board[move.src].type == 'P' && Math.abs(delta.x)) {
        var takenPieceCoord = src.add(new Coord(delta.x, 0));
        diffs.push({action: 'remove', src: takenPieceCoord.offset});
    }

    if (position.board[move.src].type == 'P' && Math.abs(delta.y) == 2) {
        diffs.push({action: 'pawnColumn', col: move.src % 8});
    } else {
        diffs.push({action: 'pawnColumn', col: null});
    }

    return diffs;
}

function applyDiffs(position, diffs) {
    var targetPosition = positions.clone(position);

    diffs.forEach(function (diff) {
        if (diff.action === 'remove') {
            var offset = diff.src;
            targetPosition.board[offset] = null;
        } else if (diff.action === 'move') {
            targetPosition.board[diff.dst] = targetPosition.board[diff.src];
            targetPosition.board[diff.src] = null;
        } else if (diff.action === 'pawnColumn') {
            targetPosition.lastPawnMoveColumn = diff.col;
        }
    });

    targetPosition.turn = position.turn === 'W' ? 'B' : 'W';

    return targetPosition;
}

function applyMove(position, move) {
    var diffs = computeDiffs(position, move);
    return applyDiffs(position, diffs);
}

module.exports = {
    applyMove: applyMove
};
