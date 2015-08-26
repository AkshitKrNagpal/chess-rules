[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage Status](https://coveralls.io/repos/ChessCorp/chess-rules/badge.svg?branch=master&service=github)](https://coveralls.io/github/ChessCorp/chess-rules?branch=master)

Chess Rules implementation as a standalone module.

# Install

## As a Node module


```sh
$ npm install chess-rules
```

This will install rules module in the node_modules folder.

## Using Bower

```sh
$ bower install chess-rules
bower chess-rules#*             cached git://github.com/ChessCorp/chess-rules.git#0.8.0
bower chess-rules#*           validate 0.8.0 against git://github.com/ChessCorp/chess-rules.git#*
bower chess-rules#*                new version for git://github.com/ChessCorp/chess-rules.git#*
bower chess-rules#*            resolve git://github.com/ChessCorp/chess-rules.git#*
bower chess-rules#*           download https://github.com/ChessCorp/chess-rules/archive/0.10.1.tar.gz
bower chess-rules#*            extract archive.tar.gz
bower chess-rules#*           resolved git://github.com/ChessCorp/chess-rules.git#0.10.1
bower chess-rules#~0.10.1      install chess-rules#0.10.1

chess-rules#0.10.1 bower_components/chess-rules
```

# Usage

## Import the main rules object

```js
> var chessRules = require('chess-rules');

> chessRules
{ getInitialPosition: [Function: getInitialPosition],
  positionToString: [Function: positionToString],
  getAvailableMoves: [Function: getAvailableMoves],
  applyMove: [Function: applyMove],
  computeDiffs: [Function: computeDiffs],
  applyDiffs: [Function: applyDiffs],
  pgnToMove: [Function: pgnToMove],
  moveToPgn: [Function: moveToPgn],
  getGameStatus: [Function: getGameStatus] 
  }
```

## Instantiate an initial position model

```js
var position = chessRules.getInitialPosition();
```

The position model used by the internal engine has the following structure:

```js
{ turn: 'W',
  castlingFlags: { W: { K: true, Q: true }, B: { K: true, Q: true } },
  lastPawnMoveColumn: null,
  check: false,
  board: 
   [ { type: 'R', side: 'W' },
     { type: 'N', side: 'W' },
     { type: 'B', side: 'W' },
     { type: 'Q', side: 'W' },
     { type: 'K', side: 'W' },
     { type: 'B', side: 'W' },
     { type: 'N', side: 'W' },
     { type: 'R', side: 'W' },
     { type: 'P', side: 'W' },
     { type: 'P', side: 'W' },
     { type: 'P', side: 'W' },
     { type: 'P', side: 'W' },
     { type: 'P', side: 'W' },
     { type: 'P', side: 'W' },
     { type: 'P', side: 'W' },
     { type: 'P', side: 'W' },
     null,
     null,
     null,
     ...
   ]
}
```

The position can be logged more conveniently using the provided function positionToString:

```js
> console.log(chessRules.positionToString(position))
WHITE KQkq
8 r n b q k b n r 
7 p p p p p p p p 
6 . . . . . . . . 
5 . . . . . . . . 
4 . . . . . . . . 
3 . . . . . . . . 
2 P P P P P P P P 
1 R N B Q K B N R 
  a b c d e f g h  
```

An extra parameter can be provided to use extended charsets but may not be supported by all terminals:

```js
> console.log(chessRules.positionToString(position, true))
WHITE KQkq
8 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜ 
7 ♟ ♟ ♟ ♟ ♟ ♟ ♟ ♟ 
6                 
5                 
4                 
3                 
2 ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙ 
1 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
  a b c d e f g h 
```

## Get available moves for a given position

Moves are expressed as a pair of coordinates on the board. The offset value is computed row by row starting at A1.

```js
> var availableMoves = chessRules.getAvailableMoves(position);
undefined

> availableMoves
[ { src: 1, dst: 16 },
  { src: 1, dst: 18 },
  { src: 6, dst: 21 },
  { src: 6, dst: 23 },
  { src: 8, dst: 16 },
  { src: 8, dst: 24 },
  { src: 9, dst: 17 },
  { src: 9, dst: 25 },
  { src: 10, dst: 18 },
  { src: 10, dst: 26 },
  { src: 11, dst: 19 },
  { src: 11, dst: 27 },
  { src: 12, dst: 20 },
  { src: 12, dst: 28 },
  { src: 13, dst: 21 },
  { src: 13, dst: 29 },
  { src: 14, dst: 22 },
  { src: 14, dst: 30 },
  { src: 15, dst: 23 },
  { src: 15, dst: 31 } ]
> 
```

## Converting a move from / to PGN movetext notation

PGN move text is described here [https://en.wikipedia.org/wiki/Portable_Game_Notation](https://en.wikipedia.org/wiki/Portable_Game_Notation)

Converting move text to move vector:

```js
> chessRules.pgnToMove(position, 'e4')
{ src: 12, dst: 28 }

> chessRules.pgnToMove(position, 'Pe2e4')
{ src: 12, dst: 28 }

> chessRules.pgnToMove(position, 'Nf3')
{ src: 6, dst: 21 }
```


Converting move vector to PGN move text:

```js
> chessRules.moveToPgn(position, { src: 6, dst: 23 });
'Nh3'
```

Note: the position must always be provided because the way that the moves are shortened requires access to the current piece positions to make these transforms.

## Update the position by playing moves

The **applyMove** will apply a move vector to create a new updated position structure. The original position object remains unchanged.

```js
> var moveE4 = chessRules.pgnToMove(position,'e4');
undefined

> var updatedPosition = chessRules.applyMove(position, moveE4);
undefined

> console.log(chessRules.positionToString(position))
WHITE KQkq
8 r n b q k b n r 
7 p p p p p p p p 
6 . . . . . . . . 
5 . . . . . . . . 
4 . . . . . . . . 
3 . . . . . . . . 
2 P P P P P P P P 
1 R N B Q K B N R 
  a b c d e f g h 
undefined

> console.log(chessRules.positionToString(updatedPosition))
BLACK KQkq
8 r n b q k b n r 
7 p p p p p p p p 
6 . . . . . . . . 
5 . . . . . . . . 
4 . . . . P . . . 
3 . . . . . . . . 
2 P P P P . P P P 
1 R N B Q K B N R 
  a b c d e f g h 
undefined
> 
```

## Determine game status

A game status can be either:
* OPEN - The game is still in progress
* PAT - The game has ended as one of the players couldn't move anymore while not being checkmate
* WHITEWON - The white player won
* BLACKWON - The black player won

```js
> chessRules.getGameStatus(position)
'OPEN'
```

## License

MIT © [Yannick Kirschhoffer](http://www.alcibiade.org/)


[npm-image]: https://badge.fury.io/js/chess-rules.svg
[npm-url]: https://npmjs.org/package/chess-rules
[travis-image]: https://travis-ci.org/ChessCorp/chess-rules.svg?branch=master
[travis-url]: https://travis-ci.org/ChessCorp/chess-rules
[daviddm-image]: https://david-dm.org/ChessCorp/chess-rules.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/ChessCorp/chess-rules
