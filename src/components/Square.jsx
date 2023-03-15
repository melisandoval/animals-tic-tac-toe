import React from "react";

export function Square({ children, updateBoard, index }) {
  return (
    <div className="square" key={index}>
      <span>{children}</span>
    </div>
  );
}
