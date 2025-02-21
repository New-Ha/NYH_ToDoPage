import React from "react";
import Board from "./Board";
import Icon from "../UI/Icon";

const BoardList = () => {
  return (
    <div className="flex flex-row items-start gap-6">
      <div className="flex gap-6 w-max">
        <Board />
        <Board />
        <Board />
      </div>
      <button
        type="button"
        className="size-[4rem] flex justify-center items-center bg-boardBG rounded-md border-border border-[1px] hover:bg-border"
      >
        <Icon type="plus" />
      </button>
    </div>
  );
};

export default BoardList;
