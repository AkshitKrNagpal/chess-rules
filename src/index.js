'use strict';

var factories = require('./chess/position');

var moves = require('./chess/moves');

var chessRules = {
    getInitialPosition: factories.initialPositionFactory,
    getAvailableMoves: moves.getAvailableMoves
};

module.exports = chessRules;
