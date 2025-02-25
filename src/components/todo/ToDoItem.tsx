"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "../UI/Icon";
import { formatDate } from "@/lib/dateUtils";
import { IconType } from "@/types/icon.type";
import { ToDoType } from "@/types/kanban.type";
import { useTodo } from "@/contexts/TodoContext";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const ToDoItem = ({
  boardId,
  todo,
  isDragging,
}: {
  boardId: string;
  todo: ToDoType;
  isDragging?: boolean;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { createdAt, iconType } = formatDate(todo.createdAt);
  const { deleteTodo, updateTodo } = useTodo();

  const [isEditingMode, setIsEditingMode] = useState(false);
  const [contentEditState, setContentEditState] = useState({
    isEditing: false,
    content: "",
  });

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: todo.id,
      data: { type: "todo", boardId: boardId, todo },
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleStartEditMode = () => {
    setIsEditingMode(true);
  };

  const handleStartContentEdit = () => {
    setContentEditState({ isEditing: true, content: todo.content });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContentEditState((prev) => ({
      ...prev,
      content: e.target.value,
    }));
  };

  const handleSaveEdit = () => {
    if (!contentEditState.content.trim()) {
      setContentEditState({ isEditing: false, content: "" });
      return;
    }
    const newContent = contentEditState.content.trim() || todo.content;
    updateTodo(boardId, todo.id, newContent);
    setContentEditState({ isEditing: false, content: "" });
    setIsEditingMode(false);
  };

  const handleCancelEdit = () => {
    setContentEditState({ isEditing: false, content: "" });
    setIsEditingMode(false);
  };

  useEffect(() => {
    if (contentEditState.isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [contentEditState.isEditing]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-md shadow-lg p-4 ${
        isDragging ? "scale-110" : ""
      }`}
    >
      {contentEditState.isEditing ? (
        <input
          type="text"
          ref={inputRef}
          value={contentEditState.content}
          onChange={handleContentChange}
          onPointerDown={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          maxLength={50}
          className="mb-2 pt-1 text-base w-full focus:outline-none"
          placeholder={todo.content}
        />
      ) : (
        <div className="w-full h-full text-base font-medium pt-1 mb-4">
          {todo.content}
        </div>
      )}
      <div className="flex flex-row justify-between items-center mt-2">
        <p className="flex flex-row items-center gap-1">
          <Icon type={iconType as IconType} className="text-gray-500" />
          <span className="text-sm text-gray-400">{createdAt}</span>
        </p>
        {isEditingMode ? (
          <div className="flex flex-row gap-1">
            {contentEditState.isEditing ? (
              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={handleSaveEdit}
                className="p-1 rounded-full hover:bg-primary hover:text-white"
              >
                <Icon type="check" />
              </button>
            ) : (
              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={handleStartContentEdit}
                className="p-1 rounded-md hover:bg-border"
              >
                <Icon type="pencil" />
              </button>
            )}
            {!contentEditState.isEditing && (
              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => deleteTodo(boardId, todo.id)}
                className="p-1 rounded-md hover:bg-border hover:text-rose-600"
              >
                <Icon type="trash" />
              </button>
            )}
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={handleCancelEdit}
              className="p-1 rounded-md hover:bg-border"
            >
              <Icon type="x" className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={handleStartEditMode}
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
