"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ToDoType } from "@/types/kanban.type";

type TodoContextType = {
  todos: ToDoType[];
  getTodos: (boardId: string) => ToDoType[];
  addTodo: (boardId: string, content: string) => void;
  deleteTodo: (boardId: string, todoId: string) => void;
  updateTodo: (todoId: string, newContent: string) => void;
  reorderTodos: (boardId: string, newOrder: ToDoType[]) => void;
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
    const todoKeys = Object.keys(localStorage).filter((key) =>
      key.startsWith("todo_")
    );
    const allTodos = todoKeys.map((key) =>
      JSON.parse(localStorage.getItem(key)!)
    );
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

    if (board.todos.length >= 20) {
      alert(
        "한 보드에는 최대 20개의 할 일만 추가할 수 있습니다. 보드를 세분화하세요."
      );
      return;
    }

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

  const reorderTodos = (boardId: string, newOrder: ToDoType[]) => {
    const boardData = JSON.parse(
      localStorage.getItem(`board_${boardId}`) || "null"
    );

    if (boardData) {
      boardData.todos = newOrder.map((todo) => todo.id);
      localStorage.setItem(`board_${boardId}`, JSON.stringify(boardData));
    }
    const otherTodos = todos.filter((todo) => todo.boardId !== boardId);
    setTodos([...otherTodos, ...newOrder]);
  };

  return (
    <TodoContext.Provider
      value={{ todos, getTodos, addTodo, deleteTodo, updateTodo, reorderTodos }}
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
