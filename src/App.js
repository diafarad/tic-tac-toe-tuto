import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  let status;
  const theWinner = calculWinner(squares);
  if (theWinner) {
    status = theWinner + " is the winner";
  } else {
    status = "Next round is " + (xIsNext ? "X" : "O");
  }

  function handleClickSquare(i) {
    const nextSquares = squares.slice();
    if (null != nextSquares[i] || calculWinner(squares)) {
      return;
    }

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClickSquare(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClickSquare(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClickSquare(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClickSquare(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClickSquare(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClickSquare(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClickSquare(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClickSquare(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClickSquare(8)} />
      </div>
    </>
  );
}

function calculWinner(squares) {
  const winnerLine = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winnerLine.length; i++) {
    const [a, b, c] = winnerLine[i];
    if (squares[a] && squares[a] == squares[b] && squares[b] == squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Aller au coup #" + move;
    } else {
      description = "Revenir au début";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
