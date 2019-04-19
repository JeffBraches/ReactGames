import React from "react";
import Square from "./Square";
const Board = ({ gameBoard, handleSelection }) => {
  let square0 = gameBoard[0];
  let square1 = gameBoard[1];
  let square2 = gameBoard[2];
  let square3 = gameBoard[3];
  let square4 = gameBoard[4];
  let square5 = gameBoard[5];
  let square6 = gameBoard[6];
  let square7 = gameBoard[7];
  let square8 = gameBoard[8];

  return (
    <div className="board">
      <div>
        <Square
          value={square0}
          handleSelection={handleSelection}
          location={0}
        />
        <Square
          value={square1}
          handleSelection={handleSelection}
          location={1}
        />
        <Square
          value={square2}
          handleSelection={handleSelection}
          location={2}
        />
      </div>
      <div>
        <Square
          value={square3}
          handleSelection={handleSelection}
          location={3}
        />
        <Square
          value={square4}
          handleSelection={handleSelection}
          location={4}
        />
        <Square
          value={square5}
          handleSelection={handleSelection}
          location={5}
        />
      </div>
      <div>
        <Square
          value={square6}
          handleSelection={handleSelection}
          location={6}
        />
        <Square
          value={square7}
          handleSelection={handleSelection}
          location={7}
        />
        <Square
          value={square8}
          handleSelection={handleSelection}
          location={8}
        />
      </div>
    </div>
  );
};

export default Board;
