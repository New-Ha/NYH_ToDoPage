"use client";

import { useTodo } from "@/contexts/TodoContext";
import { useState } from "react";

interface AddToDoFormProps {
  boardId: string;
  onCancel: () => void;
}

const AddToDoForm = ({ boardId, onCancel }: AddToDoFormProps) => {
  const [content, setContent] = useState("");
  const { addTodo } = useTodo();

  const handleAddToDo = () => {
    addTodo(boardId, content);

    setContent("");
    onCancel();
  };

  return (
    <div className="bg-white rounded-md shadow-lg p-4 mt-3">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={50}
        className="mb-4 text-[1rem] w-full focus:outline-none"
        placeholder="새로운 할 일을 입력하세요"
      />
      <div className="flex flex-row justify-between items-center">
        <span className="text-grayText font-light text-[0.9rem]">{`${content.length} / 50`}</span>
        <div className="flex flex-row gap-2 items-center">
          <button
            onClick={onCancel}
            className="text-grayText text-[0.8rem] py-1 px-2 border-[1px] border-grayText hover:border-redText hover:text-redText rounded-full"
          >
            취소
          </button>
          <button
            onClick={handleAddToDo}
            className="text-grayText text-[0.8rem] py-1 px-2 border-[1px] border-grayText hover:bg-primary hover:text-white rounded-full"
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToDoForm;
