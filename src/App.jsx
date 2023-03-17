import { useState } from "react";
import "./App.css";
import { Square } from "./components/Square";
import { PLAYERS } from "./constants";

const initialBoard = Array(9).fill(null);
const { playerOne, playerTwo } = PLAYERS;

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [turn, setTurn] = useState(playerOne);

  const updateBoard = (cellNumber) => {
    const newBoard = [...board];
    newBoard[cellNumber] = turn;
    setBoard(newBoard);

    const newTurn = turn === playerOne ? playerTwo : playerOne;
    setTurn(newTurn);
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>

      <section className="game">
        {board.map((element, index) => {
          return (
            <Square key={index} cellNumber={index} updateBoard={updateBoard}>
              {element}
            </Square>
          );
        })}
      </section>

      <section className="turn-section">
        <h2>Turn:</h2>
        <div className="turn">
          <Square isSelected={turn === PLAYERS.playerOne}>
            {PLAYERS.playerOne}
          </Square>
          <Square isSelected={turn === PLAYERS.playerTwo}>
            {PLAYERS.playerTwo}
          </Square>
        </div>
      </section>
    </main>
  );
}

export default App;
