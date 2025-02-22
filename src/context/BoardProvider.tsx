"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BoardType } from "@/types/kanban.type";

type BoardContextType = {
  boards: BoardType[];
  addBoard: (subjectId: string, title: string) => BoardType;
  deleteBoard: (subjectId: string, boardId: string) => void;
  updateBoardTitle: (boardId: string, newTitle: string) => void;
};

const BoardContext = createContext<BoardContextType | null>(null);

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const { id: subjectId } = useParams();
  const [boards, setBoards] = useState<BoardType[]>([]);

  useEffect(() => {
    if (!subjectId) return;

    const subject = JSON.parse(
      localStorage.getItem(`subject_${subjectId}`) || "null"
    );
    if (!subject) return;

    const boardList = subject.boards
      .map((boardId: string) =>
        JSON.parse(localStorage.getItem(`board_${boardId}`) || "null")
      )
      .filter(Boolean);

    setBoards(boardList);
  }, [subjectId]);

  const addBoard = (subjectId: string, title: string): BoardType => {
    const newBoardId = crypto.randomUUID();
    const newBoard: BoardType = { id: newBoardId, title, todos: [] };

    const subject = JSON.parse(
      localStorage.getItem(`subject_${subjectId}`) || "null"
    );

    const updatedBoards = [...subject.boards, newBoardId];
    subject.boards = updatedBoards;

    localStorage.setItem(`subject_${subjectId}`, JSON.stringify(subject));
    localStorage.setItem(`board_${newBoardId}`, JSON.stringify(newBoard));

    setBoards((prev) => [...prev, newBoard]);

    return newBoard;
  };

  const deleteBoard = (subjectId: string, boardId: string) => {
    const board = JSON.parse(
      localStorage.getItem(`board_${boardId}`) || "null"
    );

    if (board) {
      board.todos.forEach((todoId: string) => {
        localStorage.removeItem(`todo_${todoId}`);
      });
    }

    localStorage.removeItem(`board_${boardId}`);

    const subject = JSON.parse(
      localStorage.getItem(`subject_${subjectId}`) || "null"
    );
    if (!subject) return;

    subject.boards = subject.boards.filter((id: string) => id !== boardId);
    localStorage.setItem(`subject_${subjectId}`, JSON.stringify(subject));

    setBoards((prev) => prev.filter((b) => b.id !== boardId));
  };

  const updateBoardTitle = (boardId: string, newTitle: string) => {
    const board = JSON.parse(
      localStorage.getItem(`board_${boardId}`) || "null"
    );
    if (!board) return;

    board.title = newTitle;
    localStorage.setItem(`board_${boardId}`, JSON.stringify(board));

    setBoards((prev) =>
      prev.map((b) => (b.id === boardId ? { ...b, title: newTitle } : b))
    );
  };

  return (
    <BoardContext.Provider
      value={{ boards, addBoard, deleteBoard, updateBoardTitle }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = (): BoardContextType => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoard must be used within a BoardProvider");
  }
  return context;
};
