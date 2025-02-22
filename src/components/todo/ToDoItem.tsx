import React, { useState } from "react";
import Icon from "../UI/Icon";
import { formatDate } from "@/lib/dateUtils";
import { IconType } from "@/types/icon.type";
import { ToDoType } from "@/types/kanban.type";
import { useTodo } from "@/context/TodoProvider";

const ToDoItem = ({ todo }: { todo: ToDoType }) => {
  const { createdAt, iconType } = formatDate(todo.createdAt);
  const { deleteTodo, updateTodo } = useTodo();
  const [isEditToDoContent, setIsEditToDoContent] = useState(false);
  const [isEditToDo, setIsEditToDo] = useState(false);
  const [newContent, setNewContent] = useState("");

  const handleEditTodoContent = () => {
    if (!newContent.trim()) {
      setIsEditToDoContent(false);
      setIsEditToDo(false);
      return;
    }
    updateTodo(todo.id, newContent);
    setIsEditToDoContent(false);
    setIsEditToDo(false);
  };

  return (
    <div className="bg-white rounded-md shadow-lg p-4">
      {isEditToDoContent ? (
        <input
          type="text"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          maxLength={50}
          className="mb-4 pt-1 text-[1rem] w-full focus:outline-none"
          placeholder={`${todo.content}`}
        />
      ) : (
        <div className="text-[1rem] font-medium pt-1 mb-4">{todo.content}</div>
      )}
      <div className="flex flex-row justify-between items-center mt-2">
        <p className="flex flex-row gap-2">
          <Icon type={iconType as IconType} className="w-5 h-5" />
          <span className="text-[0.9rem] text-grayText">{createdAt}</span>
        </p>
        {isEditToDo ? (
          <div>
            {isEditToDoContent ? (
              <button
                type="button"
                onClick={handleEditTodoContent}
                className="px-2 py-2 rounded-full hover:bg-border"
              >
                <Icon type="check-circle" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditToDoContent(true)}
                className="py-2 px-2 rounded-full hover:bg-border"
              >
                <Icon type="pencil" />
              </button>
            )}
            <button
              type="button"
              className="py-2 px-2 rounded-full hover:bg-border"
              onClick={() => deleteTodo(todo.boardId, todo.id)}
            >
              <Icon type="trash" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditToDo(true)}
            className="py-1 px-1 rounded-md hover:bg-border"
          >
            <Icon type="dots-row" className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ToDoItem;
