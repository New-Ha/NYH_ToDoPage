"use client";

import { useMemo } from "react";
import { useTodo } from "@/context/TodoProvider";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = todoList.findIndex((todo) => todo.id === active.id);
    const newIndex = todoList.findIndex((todo) => todo.id === over.id);

    const newTodoList = arrayMove(todoList, oldIndex, newIndex);

    const boardData = JSON.parse(
      localStorage.getItem(`board_${boardId}`) || "null"
    );
    if (boardData) {
      boardData.todos = newTodoList.map((todo) => todo.id);
      localStorage.setItem(`board_${boardId}`, JSON.stringify(boardData));
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
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
            todoList.map((todo) => <ToDoItem key={todo.id} todo={todo} />)
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default ToDoList;
