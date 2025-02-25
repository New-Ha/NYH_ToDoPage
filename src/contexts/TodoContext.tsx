"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ToDoType } from "@/types/kanban.type";

type TodoContextType = {
  todos: ToDoType[];
  getTodos: (boardId: string) => ToDoType[];
  addTodo: (boardId: string, content: string) => void;
  deleteTodo: (boardId: string, todoId: string) => void;
  updateTodo: (boardId: string, todoId: string, newContent: string) => void;
  reorderTodos: (boardId: string, newOrder: ToDoType[]) => void;
  moveTodo: (
    fromBoardId: string,
    toBoardId: string,
    todoId: string,
    newIndex: number
  ) => void;
};

const TodoContext = createContext<TodoContextType | null>(null);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<ToDoType[]>([]);

  const getTodos = (boardId: string): ToDoType[] => {
    const board = JSON.parse(
      localStorage.getItem(`board_${boardId}`) || "null"
    );
    if (!board || !board.todos) return [];
    return board.todos;
  };

  useEffect(() => {
    const boardKeys = Object.keys(localStorage).filter((key) =>
      key.startsWith("board_")
    );

    let allTodos: ToDoType[] = [];

    boardKeys.forEach((key) => {
      const board = JSON.parse(localStorage.getItem(key) || "null");
      if (board && board.todos) {
        allTodos = allTodos.concat(board.todos);
      }
    });

    setTodos(allTodos);
  }, []);

  const addTodo = (boardId: string, content: string) => {
    const newTodo: ToDoType = {
      id: crypto.randomUUID(),
      content,
      createdAt: new Date(),
    };

    const boardKey = `board_${boardId}`;
    const board = JSON.parse(localStorage.getItem(boardKey) || "null");
    if (!board) return;

    if (board.todos.length >= 20) {
      alert(
        "한 보드에는 최대 20개의 할 일만 추가할 수 있습니다. 보드를 세분화하세요."
      );
      return;
    }

    board.todos.push(newTodo);
    localStorage.setItem(boardKey, JSON.stringify(board));

    refreshGlobalTodos();
  };

  const deleteTodo = (boardId: string, todoId: string) => {
    const boardKey = `board_${boardId}`;
    const board = JSON.parse(localStorage.getItem(boardKey) || "null");
    if (!board) return;

    board.todos = board.todos.filter((todo: ToDoType) => todo.id !== todoId);
    localStorage.setItem(boardKey, JSON.stringify(board));

    refreshGlobalTodos();
  };

  const updateTodo = (boardId: string, todoId: string, newContent: string) => {
    const boardKey = `board_${boardId}`;
    const board = JSON.parse(localStorage.getItem(boardKey) || "null");
    if (!board) return;

    board.todos = board.todos.map((todo: ToDoType) =>
      todo.id === todoId ? { ...todo, content: newContent } : todo
    );
    localStorage.setItem(boardKey, JSON.stringify(board));

    refreshGlobalTodos();
  };

  const reorderTodos = (boardId: string, newOrder: ToDoType[]) => {
    const boardKey = `board_${boardId}`;
    const board = JSON.parse(localStorage.getItem(boardKey) || "null");
    if (!board) return;

    board.todos = newOrder;
    localStorage.setItem(boardKey, JSON.stringify(board));

    refreshGlobalTodos();
  };

  const refreshGlobalTodos = () => {
    const boardKeys = Object.keys(localStorage).filter((key) =>
      key.startsWith("board_")
    );
    let allTodos: ToDoType[] = [];
    boardKeys.forEach((key) => {
      const board = JSON.parse(localStorage.getItem(key) || "null");
      if (board && board.todos) {
        allTodos = allTodos.concat(board.todos);
      }
    });
    setTodos(allTodos);
  };

  const moveTodo = (
    fromBoardId: string,
    toBoardId: string,
    todoId: string,
    newIndex: number // newIndex가 -1이면 대상 보드의 맨 뒤에 추가
  ) => {
    const sourceKey = `board_${fromBoardId}`;
    const destKey = `board_${toBoardId}`;
    const sourceBoard = JSON.parse(localStorage.getItem(sourceKey) || "null");
    const destBoard = JSON.parse(localStorage.getItem(destKey) || "null");
    if (!sourceBoard || !destBoard) return;

    // source 보드에서 todo 찾기
    const todo = sourceBoard.todos.find((t: any) => t.id === todoId);
    if (!todo) return;

    // source 보드에서 todo 제거
    sourceBoard.todos = sourceBoard.todos.filter((t: any) => t.id !== todoId);
    localStorage.setItem(sourceKey, JSON.stringify(sourceBoard));

    // newIndex가 -1이면 맨 뒤에 추가, 아니면 해당 위치에 삽입
    if (newIndex === -1) {
      destBoard.todos.push(todo);
    } else {
      destBoard.todos.splice(newIndex, 0, todo);
    }
    localStorage.setItem(destKey, JSON.stringify(destBoard));

    refreshGlobalTodos();
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        getTodos,
        addTodo,
        deleteTodo,
        updateTodo,
        reorderTodos,
        moveTodo,
      }}
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
