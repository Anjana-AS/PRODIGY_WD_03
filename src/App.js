import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); 
  const [xIsNext, setXIsNext] = useState(true); 
  const [firstPlayer, setFirstPlayer] = useState('Player 1'); 
  const [secondPlayer, setSecondPlayer] = useState('Player 2'); 
  const [gameStarted, setGameStarted] = useState(false);
  const winner = calculateWinner(board); 

  const handleClick = (index) => {
 
    if (board[index] || winner || !gameStarted) return;

    const newBoard = board.slice();
    newBoard[index] = xIsNext ? 'X' : 'O';
    
    setBoard(newBoard);
    setXIsNext(!xIsNext); 
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null)); 
    setXIsNext(true);
    setGameStarted(false); 
  };

  const startGame = () => {
    setGameStarted(true); 
  };


  const renderSquare = (index) => (
    <button className="square" onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
      {!gameStarted && (
        <div className="player-setup">
          <input
            type="text"
            placeholder="First Player Name"
            value={firstPlayer}
            onChange={(e) => setFirstPlayer(e.target.value)}
          />
          <input
            type="text"
            placeholder="Second Player Name"
            value={secondPlayer}
            onChange={(e) => setSecondPlayer(e.target.value)}
          />
          <button className='startgame' onClick={startGame}>Start Game</button>
        </div>
      )}
      {gameStarted && (
        <>
          <div className="board">
            <div className="board-row">
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </div>
            <div className="board-row">
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </div>
            <div className="board-row">
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </div>
          </div>
          <div className="status">
            {winner
              ? `Winner: ${winner === 'X' ? firstPlayer : secondPlayer}`
              : board.every(Boolean)
              ? 'Draw'
              : `Next player: ${xIsNext ? firstPlayer : secondPlayer}`}
          </div>
          <button className="reset-button" onClick={handleReset}>
            Reset Game
          </button>
        </>
      )}
    </div>
  );
};


const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], 
    [3, 4, 5], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8],
    [0, 4, 8], 
    [2, 4, 6], 
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; 
    }
  }
  return null; 
};

export default App;
