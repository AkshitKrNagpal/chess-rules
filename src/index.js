'use strict';

var position = require('./chess/position');
var moves = require('./chess/moves');
var updates = require('./chess/updates');

var chessRules = {
    getInitialPosition: position.initialPositionFactory,
    getAvailableMoves: moves.getAvailableMoves,
    applyMove: updates.applyMove
};

module.exports = chessRules;
