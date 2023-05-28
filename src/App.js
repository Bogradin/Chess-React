import React, { useState } from 'react';
import whitePawnImage from './pieces/whitePawn.png';
import whiteRookImage from './pieces/whiteRook.png';
import blackPawnImage from './pieces/blackPawn.png';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {
        value === 'whitePawn' ? <img className="piece" src={whitePawnImage} alt="whitePawn" /> :
        value === 'whiteRook' ? <img className="piece" src={whiteRookImage} alt="whiteRook" /> :
        value === 'blackPawn' ? <img className="piece" src={blackPawnImage} alt="blackPawn" /> : value
      }
    </button>
  );
}

export default function Board() {
  const [whiteIsNext, setWhiteIsNext] = useState(true);
  const initialSquares = Array(64).fill(null).map((_, index) =>
    (48 <= index && index < 56) ? "whitePawn" :
    (56 == index || index == 63) ? "whiteRook" :
    (8 <= index && index < 16) ? "blackPawn" : null
  );
  const [squares, setSquares] = useState(initialSquares);

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = whiteIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setWhiteIsNext(!whiteIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (whiteIsNext ? 'White' : 'Black');
  }

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
      <div calssname="game">
        <div className="status">{status}</div>
        <div className="board">{boardRows}</div>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
