import React from "react";

export function Square(props) {
  const { children, isSelected, updateBoard, cellNumber } = props;

  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleSquareClick = () => {
    updateBoard(cellNumber);
  };

  return (
    <div onClick={handleSquareClick} className={className} key={cellNumber}>
      <span>{children}</span>
    </div>
  );
}
