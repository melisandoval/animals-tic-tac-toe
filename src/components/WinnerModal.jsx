import React from "react";

export function WinnerModal({ winner, resetGame }) {
  if (winner === null) return null;

  const winnerText =
    winner === false ? "There was been a tie" : "The winner is " + winner;

  return (
    <section className="winner">
      <div className="text">{winnerText}</div>
      <div>
        <button onClick={resetGame}>Start a new game!</button>
      </div>
    </section>
  );
}
