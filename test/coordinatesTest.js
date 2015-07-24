'use strict';
var assert = require('assert');
var Coord = require('../src/chess/coordinates').BoardCoordinates;


describe('coordinates module', function () {
    it('must have a consistent behaviour', function () {
        var cE2xy = new Coord(4, 1);
        var cE2of = new Coord(12);

        assert.deepEqual(cE2xy, cE2of);

        var dest = cE2xy.add(new Coord(-2, 1));
        assert.deepEqual(cE2xy, cE2of);
        assert.equal(dest.offset, 18);
        assert.equal(dest.x, 2);
        assert.equal(dest.y, 2);

        dest = dest.sub(new Coord(-2, 1));
        assert.deepEqual(dest, cE2xy);
    });
});
