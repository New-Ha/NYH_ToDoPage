"use client";

import { useState } from "react";
import Icon from "../UI/Icon";
import ToDoList from "../todo/ToDoList";
import { BoardType } from "@/types/kanban.type";
import { useBoard } from "@/context/BoardProvider";

type BoardPropsType = {
  subjectId: string;
  board: BoardType;
};

const Board = ({ subjectId, board }: BoardPropsType) => {
  const { deleteBoard, updateBoardTitle } = useBoard();
  const [isEditBoard, setIsEditBoard] = useState(false);
  const [isEditBoardName, setIsEditBoardName] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");

  const handleEditBoardName = () => {
    if (!newBoardName.trim()) {
      setIsEditBoardName(false);
      setIsEditBoard(false);
      return;
    }

    updateBoardTitle(board.id, newBoardName);
    setIsEditBoardName(false);
    setIsEditBoard(false);
  };

  return (
    <section className="w-[20rem] bg-boardBG rounded-md border-border border-[1px]">
      <div className="h-[4rem] px-4 text-lg flex flex-row justify-between items-center border-b-[1px] border-[#C0C1CC] border-dashed">
        {isEditBoardName ? (
          <div className="flex flex-row gap-2">
            <input
              type="text"
              onChange={(e) => setNewBoardName(e.target.value)}
              className="bg-transparent border-b-[1px] border-primary text-[1rem] font-semibold text-primary px-2 py-1 focus:outline-none"
              placeholder={`${board.title}`}
            />
          </div>
        ) : (
          <p className="text-[1.2rem] text-primary font-bold px-2">
            {board.title}
            <span className="px-2 py-1 ml-2 bg-border rounded-lg text-[1rem] font-thin">
              {board.todos.length}
            </span>
          </p>
        )}
        {isEditBoard ? (
          <div>
            {isEditBoardName ? (
              <button
                type="button"
                onClick={handleEditBoardName}
                className="px-2 py-2 rounded-full hover:bg-border"
              >
                <Icon type="check-circle" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditBoardName(true)}
                className="py-2 px-2 rounded-full hover:bg-border"
              >
                <Icon type="pencil" />
              </button>
            )}
            <button
              type="button"
              className="py-2 px-2 rounded-full hover:bg-border"
              onClick={() => deleteBoard(subjectId, board.id)}
            >
              <Icon type="trash" />
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => setIsEditBoard(true)}>
            <Icon
              type="dots-row"
              className="w-[2.2rem] h-[2.2rem] py-1 px-2 rounded-xl hover:bg-border "
            />
          </button>
        )}
      </div>
      <div className="p-4">
        <ToDoList />
      </div>
      <div className="p-4 my-2">
        <button
          type="button"
          className="flex flex-row justify-center items-center gap-2 w-full py-3 text-center border-border border-[1px] rounded-md hover:bg-white hover:shadow-sm"
        >
          <Icon type="plus-circle" className="w-5 h-5" />
          <span className="text-[0.9rem]">New Task</span>
        </button>
      </div>
    </section>
  );
};

export default Board;
