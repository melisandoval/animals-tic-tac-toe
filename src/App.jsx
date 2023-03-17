import { useState } from "react";
import "./App.css";
import { Square } from "./components/Square";
import { PLAYERS } from "./constants";

const initialBoard = Array(9).fill(null);
const { playerOne, playerTwo } = PLAYERS; // destructuring the two players

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [turn, setTurn] = useState(playerOne); // turn can be playerOne or playerTwo.

  // this function is called everytime a cell is clicked:

  const updateBoard = (cellNumber) => {
    // (cellNumber is the same as the index of the array "board")

    // Prevent from updating the board if the clicked cell already has a value:
    if (board[cellNumber]) return;
    // (if the element in this position of the array board is true: return)
    // (the default of the cell is null, so if now already has value is because a player already clicked the cell before)
    // We should prevent any of the two players from changing the cell value again,
    // and this is easy to do with just an early return of this function.

    const newBoard = [...board];
    // ↑ copying the previous board state because we never have to mutate the state
    // if the state is an array, we should never change it. We have to always create a new array,
    // and then use the "setState" function.
    // If we update the array of the state "board" we will be updating the state without calling
    // "setBoard", and that could cause discrepancies in the rendering
    // the data of the new state always has to be new.

    newBoard[cellNumber] = turn; // state turn can be playerOne or playerTwo.
    // cellNumber is the same as the index of the element in the array newBoard,
    // so with this we update that specific cell/index with playerOne or playerTwo
    // if necessary, instead of spread operator we can use structuredClone()

    setBoard(newBoard); // now we update the UI board with the updated board

    // update the turn:
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
