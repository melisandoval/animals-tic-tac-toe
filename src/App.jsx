import "./App.css";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { INITIAL_EMPTY_BOARD } from "./constants";
import { getRandomPlayers } from "./utils/players";
import { checkWinner, checkEndGame } from "./utils/board.js";
import { Square } from "./components/Square";
import { WinnerModal } from "./components/WinnerModal";

function App() {
  // Set the two emogis animals players for the game:
  const [players, setPlayers] = useState(getRandomPlayers());

  // Create BOARD state:
  const [board, setBoard] = useState(INITIAL_EMPTY_BOARD);

  // Create TURN state (turn can be playerOne or playerTwo):
  const [turn, setTurn] = useState(players?.playerOne);

  // Create WINNER state:
  const [winner, setWinner] = useState(null);
  // null = no winner, false = tie, playerOne or PlayerTwo

  useEffect(() => {
    setTurn(players.playerOne);
  }, [players]);

  // Function resetGame is called by "Reset game" button and "Start new game" (winner modal) button:
  const resetGame = () => {
    setPlayers(getRandomPlayers());
    setBoard(INITIAL_EMPTY_BOARD);
    setWinner(null);
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

    // set the next turn:
    const newTurn =
      turn === players.playerOne ? players.playerTwo : players.playerOne;
    setTurn(newTurn);

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
    <div className="page-container">
      <header>
        <h1>Animals Tic-Tac-Toe!</h1>
        <section className="header-players-and-button">
          <p>
            Players: <span>{players.playerOne} </span>
            <span>{players.playerTwo}</span>
          </p>
          <button onClick={resetGame}>Reset game</button>
        </section>
      </header>
      <main className="board">
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
          <h2>
            Turn:
            {turn === players?.playerOne ? (
              <span>{players.playerOne}</span>
            ) : (
              <span>{players.playerTwo}</span>
            )}
          </h2>
        </section>

        <WinnerModal winner={winner} resetGame={resetGame} />
      </main>
    </div>
  );
}

export default App;
