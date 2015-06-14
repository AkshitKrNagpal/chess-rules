'use strict';

var factories = require('./chess/factories');

var moves = require('./chess/moves');

var chessRules = {
    getInitialPosition: factories.initialPositionFactory,
    getAvailableMoves: moves.getAvailableMoves
};

module.exports = chessRules;
