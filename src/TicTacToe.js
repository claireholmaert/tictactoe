import { useState } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    setWinner(calculateWinner(newBoard));
  };

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Tic Tac Toe</h1>
      <div className="grid grid-cols-3 gap-2">
        {board.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-20 h-20 bg-white border-2 border-gray-300 text-2xl font-bold flex items-center justify-center"
          >
            {value}
          </button>
        ))}
      </div>
      {winner && (
        <p className="mt-4 text-xl font-semibold text-green-600">
          Joueur {winner === 'X' ? '1' : '2'} a gagné !
        </p>
      )}
      {!winner && !board.includes(null) && (
        <p className="mt-4 text-xl font-semibold text-red-600">
          Match nul !
        </p>
      )}
      <button
        onClick={handleReset}
        className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded"
      >
        Réinitialiser le jeu
      </button>
    </div>
  );
};

export default TicTacToe;
