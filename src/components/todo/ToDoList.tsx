"use client";

import { useMemo } from "react";
import { useTodo } from "@/contexts/TodoContext";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ToDoItem from "./ToDoItem";

const ToDoList = ({
  boardId,
  isAddingTodo,
}: {
  boardId: string;
  isAddingTodo: boolean;
}) => {
  const { todos, getTodos } = useTodo();

  const todoList = useMemo(() => {
    if (!boardId) return [];
    return getTodos(boardId);
  }, [boardId, todos]);

  return (
    <SortableContext
      items={todoList.map((todo) => todo.id)}
      strategy={verticalListSortingStrategy}
    >
      <div className="flex flex-col gap-3">
        {todoList.length === 0 && !isAddingTodo ? (
          <div className="border-[1px] border-border rounded-md text-center text-grayText select-none py-3">
            할 일을 등록해주세요.
          </div>
        ) : (
          todoList.map((todo) => (
            <ToDoItem key={todo.id} boardId={boardId} todo={todo} />
          ))
        )}
      </div>
    </SortableContext>
  );
};

export default ToDoList;
