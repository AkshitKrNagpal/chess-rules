'use strict';

var position = require('./chess/position');
var moves = require('./chess/moves');
var updates = require('./chess/updates');
var pgn = require('./chess/pgn');

var chessRules = {
    getInitialPosition: position.getInitialPosition,
    positionToString: position.positionToString,
    getAvailableMoves: moves.getAvailableMoves,
    applyMove: updates.applyMove,
    pgnToMove: pgn.pgnToMove,
    moveToPgn: pgn.moveToPgn
};

module.exports = chessRules;
