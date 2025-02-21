import React from "react";
import Board from "./Board";

const BoardList = () => {
  return (
    <div className="flex gap-10 w-max">
      <Board />
      <Board />
      <Board />
      <Board />
      <Board />
    </div>
  );
};

export default BoardList;
