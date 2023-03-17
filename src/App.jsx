import { useState } from "react";
import "./App.css";
import { Square } from "./components/Square";
import { PLAYERS } from "./constants";

const initialBoard = Array(9).fill(null);
const { playerOne, playerTwo } = PLAYERS; // destructuring the two players

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [turn, setTurn] = useState(playerOne);

  const updateBoard = (cellNumber) => {
    const newBoard = [...board];
    newBoard[cellNumber] = turn; // turn can be playerOne or playerTwo.
    // cellNumber is the same as the index of the element in the array newBoard,
    // so with this we update that specific cell/index with playerOne or playerTwo
    setBoard(newBoard); // now we update the UI board with the updated board

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
          <Square isSelected={turn === playerOne}>{playerOne}</Square>
          <Square isSelected={turn === playerTwo}>{playerTwo}</Square>
        </div>
      </section>
    </main>
  );
}

export default App;
