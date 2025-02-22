"use client";

import { useEffect, useState } from "react";
import ToDoItem from "./ToDoItem";
import { useTodo } from "@/context/TodoProvider";
import { ToDoType } from "@/types/kanban.type";

const ToDoList = ({
  boardId,
  isAddingTodo,
}: {
  boardId: string;
  isAddingTodo: boolean;
}) => {
  const { todos, getTodos } = useTodo();
  const [todoList, setTodoList] = useState<ToDoType[]>([]);

  useEffect(() => {
    if (!boardId) return;
    setTodoList(getTodos(boardId));
  }, [todos]);

  return (
    <div className="flex flex-col gap-3">
      {todoList.length === 0 && !isAddingTodo ? (
        <div className="border-[1px] border-border rounded-md shadow-sm text-center text-grayText py-3">
          할 일을 등록해주세요.
        </div>
      ) : (
        todoList.map((todo) => <ToDoItem key={todo.id} todo={todo} />)
      )}
    </div>
  );
};

export default ToDoList;
