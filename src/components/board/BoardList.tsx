"use client";

import { useBoard } from "@/context/BoardProvider";
import { TodoProvider } from "@/context/TodoProvider";
import Board from "./Board";
import Icon from "../UI/Icon";
import AddBoardForm from "./AddBoardForm";

interface BoardListProps {
  subjectId: string;
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
  const { boards: boardList } = useBoard();

  return (
    <div className="w-max flex flex-row items-start gap-6">
      <div className="flex gap-6 w-max">
        <TodoProvider>
          {boardList.map((board) => (
            <Board key={board.id} subjectId={subjectId} board={board} />
          ))}
        </TodoProvider>
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
