import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log";
import Player from "./components/Player";
import { useState, useEffect } from "react";
import { WINNING_COMBINATIONS } from "./WINNING_COMBINATIONS.js";
import GameOver from "./components/GameOver.jsx";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  return gameTurns.length % 2 === 0 ? 'X' : 'O';
}


function App() {
  const [players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2',
  });
  const [gameTurns, setGameTurns] = useState([]);
  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  const [winner, setWinner] = useState(null);
  const activePlayer = deriveActivePlayer(gameTurns);

  useEffect(() => {
    const updatedBoard = initialGameBoard.map(row => row.slice());
    for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;
      updatedBoard[row][col] = player;
    }
    setGameBoard(updatedBoard);

    for (const com of WINNING_COMBINATIONS) {
      const firstSquareSymbol = updatedBoard[com[0].row][com[0].column];
      const secondSquareSymbol = updatedBoard[com[1].row][com[1].column];
      const thirdSquareSymbol = updatedBoard[com[2].row][com[2].column];

      if (
        firstSquareSymbol &&
        firstSquareSymbol === secondSquareSymbol &&
        firstSquareSymbol === thirdSquareSymbol
      ) {
        setWinner(players[firstSquareSymbol]);
      }
    }
  }, [gameTurns, players]);

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    if (winner || gameBoard[rowIndex][colIndex]) {
      return;
    }
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRematch() {
    setGameTurns([]);
    setWinner(null);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [symbol]: newName,
    }));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={players.X}
            symbol="X"
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={players.O}
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRematch} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
