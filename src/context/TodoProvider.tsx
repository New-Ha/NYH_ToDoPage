"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ToDoType } from "@/types/kanban.type";

type TodoContextType = {
  todos: ToDoType[];
  getTodos: (boardId: string) => ToDoType[];
  addTodo: (boardId: string, content: string) => void;
  deleteTodo: (boardId: string, todoId: string) => void;
  updateTodo: (todoId: string, newContent: string) => void;
};

const TodoContext = createContext<TodoContextType | null>(null);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<ToDoType[]>([]);

  const getTodos = (boardId: string): ToDoType[] => {
    const board = JSON.parse(
      localStorage.getItem(`board_${boardId}`) || "null"
    );
    if (!board) return [];

    return board.todos
      .map((todoId: string) =>
        JSON.parse(localStorage.getItem(`todo_${todoId}`) || "null")
      )
      .filter(Boolean);
  };

  useEffect(() => {
    const allBoards = JSON.parse(localStorage.getItem("boards") || "[]");
    let allTodos: ToDoType[] = [];

    allBoards.forEach((boardId: string) => {
      allTodos = [...allTodos, ...getTodos(boardId)];
    });

    setTodos(allTodos);
  }, []);

  const addTodo = (boardId: string, content: string) => {
    const newTodo: ToDoType = {
      id: crypto.randomUUID(),
      boardId,
      content,
      createdAt: new Date(),
    };

    localStorage.setItem(`todo_${newTodo.id}`, JSON.stringify(newTodo));

    const board = JSON.parse(
      localStorage.getItem(`board_${boardId}`) || "null"
    );
    if (!board) return;

    board.todos.push(newTodo.id);
    localStorage.setItem(`board_${boardId}`, JSON.stringify(board));

    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (boardId: string, todoId: string) => {
    localStorage.removeItem(`todo_${todoId}`);

    const board = JSON.parse(
      localStorage.getItem(`board_${boardId}`) || "null"
    );
    if (!board) return;

    board.todos = board.todos.filter((id: string) => id !== todoId);
    localStorage.setItem(`board_${boardId}`, JSON.stringify(board));

    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  const updateTodo = (todoId: string, newContent: string) => {
    const todo = JSON.parse(localStorage.getItem(`todo_${todoId}`) || "null");
    if (!todo) return;

    todo.content = newContent;
    localStorage.setItem(`todo_${todoId}`, JSON.stringify(todo));

    setTodos(
      todos.map((t) => (t.id === todoId ? { ...t, content: newContent } : t))
    );
  };

  return (
    <TodoContext.Provider
      value={{ todos, getTodos, addTodo, deleteTodo, updateTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};
