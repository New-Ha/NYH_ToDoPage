"use client";

import { useState } from "react";
import Board from "./Board";
import Icon from "../UI/Icon";
import AddBoardForm from "./AddBoardForm";
import { useBoard } from "@/context/BoardProvider";

type BoardListPropsType = {
  subjectId: string;
  boards: string[];
};

const BoardList = ({ subjectId }: BoardListPropsType) => {
  const { boards: boardList } = useBoard();
  const [isAddingBoard, setIsAddingBoard] = useState(false);

  return (
    <div className="w-max flex flex-row items-start gap-6">
      <div className="flex gap-6 w-max">
        {boardList.map((board) => (
          <Board key={board.id} subjectId={subjectId} board={board} />
        ))}
      </div>
      {isAddingBoard ? (
        <AddBoardForm
          subjectId={subjectId}
          onCancel={() => setIsAddingBoard(false)}
        />
      ) : null}
      <button
        type="button"
        onClick={() => setIsAddingBoard(true)}
        className="size-[4rem] flex justify-center items-center bg-boardBG rounded-md border-border border-[1px] hover:bg-border"
      >
        <Icon type="plus" />
      </button>
    </div>
  );
};

export default BoardList;
