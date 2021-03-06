'use strict';

var position = require('./chess/position');
var moves = require('./chess/moves');
var updates = require('./chess/updates');
var pgn = require('./chess/pgn');
var statusMod = require('./chess/status');
var locator = require('./chess/locator');

var chessRules = {
    getInitialPosition: position.getInitialPosition,
    positionToString: position.positionToString,
    getAvailableMoves: moves.getAvailableMoves,
    applyMove: updates.applyMove,
    computeDiffs: updates.computeDiffs,
    applyDiffs: updates.applyDiffs,
    pgnToMove: pgn.pgnToMove,
    moveToPgn: pgn.moveToPgn,
    getGameStatus: statusMod.getGameStatus,
    findPiece: locator.findPiece
};

module.exports = chessRules;
