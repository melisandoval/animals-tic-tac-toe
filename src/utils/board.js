import { WINNING_COMBOS } from "../constants";

//Function checkWinner will be called by function updateBoard:
export const checkWinner = (boardToCheck) => {
  // check all the winning combos to see if there is a winner, if not, return null:
  for (const combo of WINNING_COMBOS) {
    const [a, b, c] = combo;

    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]; // return de value of first position of the combo and this one will be the winner
    }
  }
  return null; // if there is no winner return null
};

export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null);
  // if all are not null the return will be true
  // if every square is not null, it means that the game already ended
};
