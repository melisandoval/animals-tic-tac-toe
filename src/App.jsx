import { useState } from "react";
import "./App.css";
import { Square } from "./components/Square";
import { PLAYERS } from "./constants";

const board = Array(9).fill(null);

function App() {
  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <section className="game">
        {board.map((element, index) => {
          return (
            <Square key={index} index={index}>
              {index}
            </Square>
          );
        })}
      </section>
    </main>
  );
}

export default App;
