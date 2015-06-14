'use strict';

var factories = require('./chess/factories');

var chessRules = {
    getInitialPosition: factories.initialPositionFactory
};

module.exports = chessRules;
