"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "../UI/Icon";
import ToDoList from "../todo/ToDoList";
import { BoardType } from "@/types/kanban.type";
import { useBoard } from "@/context/BoardProvider";
import { useTodo } from "@/context/TodoProvider";
import AddToDoForm from "../todo/AddToDoForm";
import { formatBoardName } from "@/lib/truncateUtils";

interface BoardProps {
  subjectId: string;
  board: BoardType;
}

const Board = ({ subjectId, board }: BoardProps) => {
  const { todos } = useTodo();
  const { deleteBoard, updateBoardTitle } = useBoard();
  const todoCount = todos.filter((todo) => todo.boardId === board.id).length;
  const inputRef = useRef<HTMLInputElement>(null);

  const [isEditingMode, setIsEditingMode] = useState(false);
  const [boardNameEditState, setBoardNameEditState] = useState({
    isEditing: false,
    name: "",
  });
  const [isAddingTodo, setIsAddingTodo] = useState(false);

  const handleStartEditMode = () => {
    setIsEditingMode(true);
  };

  const handleStartBoardNameEdit = () => {
    setBoardNameEditState({ isEditing: true, name: board.title });
  };

  const handleBoardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardNameEditState((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleSaveEdit = () => {
    if (!boardNameEditState.name.trim()) {
      setBoardNameEditState({ isEditing: false, name: "" });
      return;
    }

    const newBoardName = boardNameEditState.name.trim()
      ? boardNameEditState.name
      : board.title;

    updateBoardTitle(board.id, newBoardName);
    setBoardNameEditState({ isEditing: false, name: "" });
    setIsEditingMode(false);
  };

  const handleCancelEdit = () => {
    setBoardNameEditState({ isEditing: false, name: "" });
    setIsEditingMode(false);
  };

  useEffect(() => {
    if (boardNameEditState.isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [boardNameEditState.isEditing]);

  return (
    <section className="w-[20rem] h-full bg-boardBG rounded-md border-border border-[1px] ">
      <div className="h-[4rem] px-4 text-lg flex flex-row justify-between items-center border-b-[1px] border-[#C0C1CC] border-dashed">
        {boardNameEditState.isEditing ? (
          <div className="flex flex-row gap-2">
            <input
              type="text"
              ref={inputRef}
              value={boardNameEditState.name}
              onChange={(e) => handleBoardNameChange(e)}
              className="bg-transparent border-b-[1px] border-primary text-[1rem] font-semibold text-primary px-2 py-1 focus:outline-none"
              placeholder={`${board.title}`}
            />
          </div>
        ) : (
          <p className="text-[1.2rem] text-primary font-bold flex flex-row items-center">
            {formatBoardName(board.title)}
            <span className="px-2 ml-2 bg-border rounded-lg text-[1rem] font-thin">
              {todoCount}
            </span>
          </p>
        )}
        {isEditingMode ? (
          <div>
            {boardNameEditState.isEditing ? (
              <button
                type="button"
                onClick={handleSaveEdit}
                className="p-2 rounded-xl text-grayText hover:bg-primary hover:text-white"
              >
                <Icon type="check" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleStartBoardNameEdit}
                className="p-2 rounded-xl text-gray-400 hover:bg-border hover:text-primary"
              >
                <Icon type="pencil" />
              </button>
            )}
            {!boardNameEditState.isEditing && (
              <button
                type="button"
                className="p-2 rounded-xl text-gray-400 hover:bg-border hover:text-rose-600"
                onClick={() => deleteBoard(subjectId, board.id)}
              >
                <Icon type="trash" />
              </button>
            )}
            <button
              type="button"
              className="p-2 rounded-xl text-gray-400 hover:bg-border hover:text-black"
              onClick={handleCancelEdit}
            >
              <Icon type="x" />
            </button>
          </div>
        ) : (
          <button type="button" onClick={handleStartEditMode}>
            <Icon
              type="dots-row"
              className="w-[2.2rem] h-[2.2rem] py-1 px-2 rounded-xl hover:bg-border "
            />
          </button>
        )}
      </div>
      <div className="h-full p-4 flex flex-col justify-between">
        <ToDoList boardId={board.id} isAddingTodo={isAddingTodo} />
        {isAddingTodo && (
          <AddToDoForm
            boardId={board.id}
            onCancel={() => setIsAddingTodo(false)}
          />
        )}
        <button
          type="button"
          onClick={() => setIsAddingTodo(true)}
          className="mt-5 flex flex-row justify-center items-center gap-2 w-full py-3 text-center border-border border-[1px] rounded-md hover:bg-white hover:shadow-sm"
        >
          <Icon type="plus-circle" className="w-5 h-5" />
          <span className="text-[0.9rem]">New Task</span>
        </button>
      </div>
    </section>
  );
};

export default Board;
