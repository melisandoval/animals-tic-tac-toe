import React from "react";
import { Square } from "./Square";

export function WinnerModal({ winner, resetGame }) {
  if (winner === null) return null;

  return (
    <section className="winner">
      <div className="text">
        {!winner && <h2>There was been a tie 🙊 </h2>}
        {winner && (
          <div className="winner-modal-content">
            <h2>The winner is:</h2>
            <Square> {winner}</Square>
          </div>
        )}
        <button onClick={resetGame} className="winner-modal-button">
          Start a new game!
        </button>
      </div>
    </section>
  );
}
