'use strict';

function pieceFactory(piece, side) {
    return {type: piece, side: side};
}

function pieceToUTF8(piece) {
    var code;
    switch(piece.type.concat(piece.side)) {
        case 'PW':
            code = '\u2659';
            break;
        case 'PB':
            code = '\u265F';
            break;
        case 'NW':
            code = '\u2658';
            break;
        case 'NB':
            code = '\u265E';
            break;
        case 'BW':
            code = '\u2657';
            break;
        case 'BB':
            code = '\u265D';
            break;
        case 'RW':
            code = '\u2656';
            break;
        case 'RB':
            code = '\u265C';
            break;
        case 'QW':
            code = '\u2655';
            break;
        case 'QB':
            code = '\u265B';
            break;
        case 'KW':
            code = '\u2654';
            break;
        case 'KB':
            code = '\u265A';
            break;
        default:
            code = null;
            break;
    }
    return code;
}

module.exports = {
    pieceFactory: pieceFactory,
    pieceToUTF8: pieceToUTF8
};
