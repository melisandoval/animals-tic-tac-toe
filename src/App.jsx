import "./App.css";
import { useState } from "react";
import confetti from "canvas-confetti";
import { PLAYERS, INITIAL_EMPTY_BOARD } from "./constants";
import { checkWinner, checkEndGame } from "./utils/board.js";
import { Square } from "./components/Square";
import { WinnerModal } from "./components/WinnerModal";

const { playerOne, playerTwo } = PLAYERS; // destructuring the two players from the constant PLAYERS.

function App() {
  // Create BOARD state:
  const [board, setBoard] = useState(() => {
    // VERY IMPORTANT read from localStorafe INSIDE useState*:
    const boardFromStorage = window.localStorage.getItem("board");
    // *(NEVER read the local storage outside useState and inside the component body because that will cause
    // the reading of localStorage in EVERY render of the component! That is slow, synchronous and blocks the rest of the code):

    // Then: if we have something in localStorage set state with that, if not, use initial empty board:
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : INITIAL_EMPTY_BOARD;
  });

  // Create TURN state (turn can be playerOne or playerTwo):
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    // if we have a turn from localStorage from a previous game return that, if not, set one player one as the first:
    console.log(turnFromStorage);
    return JSON.parse(turnFromStorage) ?? playerOne; // Nullish coalescing operator: ??
  });

  // Create WINNER state:
  const [winner, setWinner] = useState(null); // null = no winner, false = tie, playerOne or PlayerTwo

  // Function resetGame is called by "Start new game" button and "Reset game" button:
  const resetGame = () => {
    setBoard(INITIAL_EMPTY_BOARD);
    setWinner(null);
    setTurn(playerOne);

    // IMPORTANT! Reset localStorage too! (is best practice to use removeItem() and remove the SPECIFIC things that we need,
    // instead of using localStorage.clear() and remove everything. Just in case is best to use removeItem())
    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

  // Function updateBoard is called everytime a cell is clicked on Square component:
  const updateBoard = (cellNumber) => {
    // (cellNumber is the same as the index number of the array "board")

    // Prevent from updating the board if the clicked cell already has a value:
    if (board[cellNumber] || winner) return;
    // if element is true, return (the default of the cell is null (false),
    // so if now already has a value (true) is because a player already clicked the cell before)
    // We should prevent any of the two players from changing the cell value again,
    // and this is easy to do with just an early return of this updateBoard function.

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

    // Now we update state board (the UI board) with the new updated board
    setBoard(newBoard);
    // Save current game in localstorage:
    window.localStorage.setItem("board", JSON.stringify(newBoard));

    // set the next turn:
    const newTurn = turn === playerOne ? playerTwo : playerOne;
    setTurn(newTurn);
    // save in local storage the new turn:
    window.localStorage.setItem("turn", JSON.stringify(newTurn));

    // Check if we have a winner
    // (we still have to use the newBoard because the "board" state is not updated yet in the current render):
    const newWinner = checkWinner(newBoard);

    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <header>
        <h1>Tic - Tac - Toe !</h1>
        <button onClick={resetGame}>Reset game</button>
      </header>

      <section className="game">
        {board?.map((element, index) => {
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
          {turn === playerOne && <h2>{playerOne}</h2>}
          {turn === playerTwo && <h2>{playerTwo}</h2>}
        </div>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
