"use client";

import { useMemo } from "react";
import { useTodo } from "@/context/TodoProvider";
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
    <div className="flex flex-col gap-3">
      {todoList.length === 0 && !isAddingTodo ? (
        <div className="border-[1px] border-border rounded-md text-center text-grayText select-none py-3">
          할 일을 등록해주세요.
        </div>
      ) : (
        todoList.map((todo) => <ToDoItem key={todo.id} todo={todo} />)
      )}
    </div>
  );
};

export default ToDoList;
