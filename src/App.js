import React, { useState } from 'react';
import whitePawnImage from './pieces/whitePawn.png';
import whiteRookImage from './pieces/whiteRook.png';
import whiteKnightImage from './pieces/whiteKnight.png';
import whiteBishopImage from './pieces/whiteBishop.png';
import whiteKingImage from './pieces/whiteKing.png';
import whiteQueenImage from './pieces/whiteQueen.png';
import blackPawnImage from './pieces/blackPawn.png';
import blackRookImage from './pieces/blackRook.png';
import blackKnightImage from './pieces/blackKnight.png';
import blackBishopImage from './pieces/blackBishop.png';
import blackKingImage from './pieces/blackKing.png';
import blackQueenImage from './pieces/blackQueen.png';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {
        value === 'whitePawn' ? <img className="piece" src={whitePawnImage} alt="whitePawn" /> :
        value === 'whiteRook' ? <img className="piece" src={whiteRookImage} alt="whiteRook" /> :
        value === 'whiteKnight' ? <img className="piece" src={whiteKnightImage} alt="whiteKnight" /> :
        value === 'whiteBishop' ? <img className="piece" src={whiteBishopImage} alt="whiteBishop" /> :
        value === 'whiteKing' ? <img className="piece" src={whiteKingImage} alt="whiteKing" /> :
        value === 'whiteQueen' ? <img className="piece" src={whiteQueenImage} alt="whiteQueen" /> :
        value === 'blackPawn' ? <img className="piece" src={blackPawnImage} alt="blackPawn" /> :
        value === 'blackRook' ? <img className="piece" src={blackRookImage} alt="blackRook" /> :
        value === 'blackKnight' ? <img className="piece" src={blackKnightImage} alt="blackKnight" /> :
        value === 'blackBishop' ? <img className="piece" src={blackBishopImage} alt="blackBishop" /> :
        value === 'blackKing' ? <img className="piece" src={blackKingImage} alt="blackKing" /> :
        value === 'blackQueen' ? <img className="piece" src={blackQueenImage} alt="blackQueen" /> : value
      }
    </button>
  );
}

export default function Board() {
  const [whiteIsNext, setWhiteIsNext] = useState(true);
  const initialSquares = Array(64).fill(null).map((_, index) =>
    (48 <= index && index < 56) ? "whitePawn" :
    (56 == index || index == 63) ? "whiteRook" :
    (57 == index || index == 62) ? "whiteKnight" :
    (58 == index || index == 61) ? "whiteBishop" :
    (59 == index) ? "whiteKing" :
    (60 == index) ? "whiteQueen" :
    (8 <= index && index < 16) ? "blackPawn" : 
    (0 == index || index == 7) ? "blackRook" :
    (1 == index || index == 6) ? "blackKnight" :
    (2 == index || index == 5) ? "blackBishop" :
    (3 == index) ? "blackKing" :
    (4 == index) ? "blackQueen" : null
  );
  const [squares, setSquares] = useState(initialSquares);

  function handleClick(i) {
    if (squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = whiteIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setWhiteIsNext(!whiteIsNext);
  }

  
  let status;
  status = 'Next player: ' + (whiteIsNext ? 'White' : 'Black');

  const boardRows = [];
  for (let row = 0; row < 8; row++) {
    const squaresInRow = [];
    for (let col = 0; col < 8; col++) {
      const squareIndex = row * 8 + col;
      squaresInRow.push(
        <Square
          key={squareIndex}
          value={squares[squareIndex]}
          onSquareClick={() => handleClick(squareIndex)}
        />
      );
    }
    boardRows.push(
      <div key={row} className="board-row">
        {squaresInRow}
      </div>
    );
  }

  return (
    <div className="board-container">
      <div classname="game">
        <div className="status">{status}</div>
        <div className="board">{boardRows}</div>
      </div>
    </div>
  );
}
