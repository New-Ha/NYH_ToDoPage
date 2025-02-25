"use client";

import { useBoard } from "@/contexts/BoardContext";
import { TodoProvider } from "@/contexts/TodoContext";
import Icon from "../UI/Icon";
import AddBoardForm from "./AddBoardForm";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import BoardItem from "./BoardItem";
import { useEffect, useState } from "react";
import { BoardType } from "@/types/kanban.type";
import Board from "./Board";

interface BoardListProps {
  subjectId: string;
  boards: string[];
  isAddingBoard: boolean;
  onClickStartAddingBoard: () => void;
  onCancelAddingBoard: () => void;
}

const BoardList = ({
  subjectId,
  isAddingBoard,
  onClickStartAddingBoard,
  onCancelAddingBoard,
}: BoardListProps) => {
  const { boards, getBoards } = useBoard();
  const [boardList, setBoardList] = useState<BoardType[]>([]);

  useEffect(() => {
    setBoardList(getBoards(subjectId));
  }, [boards]);

  return (
    <div className="w-max flex flex-row items-start gap-6">
      <div className="flex gap-6 w-max">
        <SortableContext
          items={boardList.map((board) => board.id)}
          strategy={horizontalListSortingStrategy}
        >
          <TodoProvider>
            {boardList.map((board) => (
              <Board key={board.id} subjectId={subjectId} board={board} />
            ))}
          </TodoProvider>
        </SortableContext>
      </div>
      {isAddingBoard && (
        <AddBoardForm subjectId={subjectId} onCancel={onCancelAddingBoard} />
      )}
      <button
        type="button"
        onClick={onClickStartAddingBoard}
        className="size-[4rem] flex justify-center items-center rounded-md text-grayText border-border border-[1px] hover:bg-primary hover:text-white"
      >
        <Icon type="plus" className="w-6 h-6" />
      </button>
    </div>
  );
};

export default BoardList;
