'use strict';

var coordinates = require('./coordinates');
var Coord = coordinates.BoardCoordinates;

function findPiece(position, pieceType, pieceSide) {
    var result = null;
    var searchSide = pieceSide ? pieceSide : position.turn;
    var resultOffsets = [];

    for (var offset = 0; offset < 64; offset++) {
        var piece = position.board[offset];
        if (piece != null && piece.type === pieceType && piece.side === searchSide) {
            resultOffsets.push(offset);
        }
    }

    var resultCoords = [];

    resultOffsets.forEach(function (offset) {
        resultCoords.push(new Coord(offset));
    });

    return resultCoords;
}

module.exports = {
    findPiece: findPiece
};
