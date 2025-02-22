"use client";

import { useBoard } from "@/context/BoardProvider";
import { BoardType } from "@/types/kanban.type";
import { SetStateAction, useState } from "react";

type AddBoardFormPropsType = {
  subjectId: string;
  onCancel: () => void;
  setBoardList: React.Dispatch<SetStateAction<BoardType[]>>;
};

const AddBoardForm = ({
  subjectId,
  onCancel,
  setBoardList,
}: AddBoardFormPropsType) => {
  const { addBoard } = useBoard();
  const [newBoardName, setNewBoardName] = useState("");

  const handleAddBoard = () => {
    if (!newBoardName.trim()) {
      onCancel();
      return;
    }

    const newBoard = addBoard(subjectId, newBoardName);
    setBoardList((prev) => [...prev, newBoard]);
    setNewBoardName("");

    onCancel();
  };

  return (
    <section className="w-[20rem] bg-boardBG rounded-md border-border border-[1px]">
      <div className="h-[4rem] px-4 text-lg flex flex-row justify-between items-center border-b-[1px] border-[#C0C1CC] border-dashed">
        <input
          type="text"
          onChange={(e) => setNewBoardName(e.target.value)}
          className="w-full py-1 px-2 bg-transparent border-b-[1px] border-primary text-[1rem] font-semibold text-primary focus:outline-none"
          placeholder="보드명"
        />
      </div>
      <div className="p-4 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex flex-row justify-center items-center gap-2 w-full py-2 text-center border-border border-[1px] rounded-md hover:bg-white hover:shadow-sm hover:text-redText"
        >
          취소
        </button>
        <button
          type="button"
          onClick={handleAddBoard}
          className="flex flex-row justify-center items-center gap-2 w-full py-2 text-center border-border border-[1px] rounded-md hover:bg-white hover:shadow-sm hover:text-primary"
        >
          생성
        </button>
      </div>
    </section>
  );
};

export default AddBoardForm;
