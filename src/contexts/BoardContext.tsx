"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BoardType } from "@/types/kanban.type";

type BoardContextType = {
  boards: BoardType[];
  getBoards: (boardId: string) => BoardType[];
  addBoard: (subjectId: string, name: string) => BoardType | null;
  deleteBoard: (subjectId: string, boardId: string) => void;
  updateBoardName: (boardId: string, newName: string) => void;
  reorderBoards: (newOrder: string[]) => void;
};

const BoardContext = createContext<BoardContextType | null>(null);

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const { id: subjectId } = useParams();
  const [boards, setBoards] = useState<BoardType[]>([]);

  const getBoards = (subjectId: string): BoardType[] => {
    const subject = JSON.parse(
      localStorage.getItem(`subject_${subjectId}`) || "null"
    );
    if (!subject) return [];

    return subject.boards
      .map((boardId: string) =>
        JSON.parse(localStorage.getItem(`board_${boardId}`) || "null")
      )
      .filter(Boolean);
  };

  useEffect(() => {
    if (!subjectId) return;
    setBoards(getBoards(subjectId as string));
  }, [subjectId]);

  const addBoard = (subjectId: string, name: string): BoardType | null => {
    const newBoardId = crypto.randomUUID();
    const newBoard: BoardType = { id: newBoardId, name, todos: [] };

    const subject = JSON.parse(
      localStorage.getItem(`subject_${subjectId}`) || "null"
    );
    if (!subject) return newBoard;

    if (subject.boards.length >= 10) {
      alert("최대 10개의 보드만 추가할 수 있습니다.");
      return null;
    }

    subject.boards.push(newBoardId);
    localStorage.setItem(`subject_${subjectId}`, JSON.stringify(subject));
    localStorage.setItem(`board_${newBoardId}`, JSON.stringify(newBoard));

    setBoards(getBoards(subjectId));
    return newBoard;
  };

  const deleteBoard = (subjectId: string, boardId: string) => {
    localStorage.removeItem(`board_${boardId}`);

    const subject = JSON.parse(
      localStorage.getItem(`subject_${subjectId}`) || "null"
    );
    if (!subject) return;

    subject.boards = subject.boards.filter((id: string) => id !== boardId);
    localStorage.setItem(`subject_${subjectId}`, JSON.stringify(subject));

    setBoards(getBoards(subjectId));
  };

  const updateBoardName = (boardId: string, newName: string) => {
    const board = JSON.parse(
      localStorage.getItem(`board_${boardId}`) || "null"
    );
    if (!board) return;

    board.name = newName;
    localStorage.setItem(`board_${boardId}`, JSON.stringify(board));

    setBoards(getBoards(subjectId as string));
  };

  const reorderBoards = (newOrder: string[]) => {
    if (!subjectId) return;
    const subject = JSON.parse(
      localStorage.getItem(`subject_${subjectId}`) || "null"
    );
    if (!subject) return;

    subject.boards = newOrder;
    localStorage.setItem(`subject_${subjectId}`, JSON.stringify(subject));
    setBoards(getBoards(subjectId as string));
  };

  return (
    <BoardContext.Provider
      value={{
        boards,
        getBoards,
        addBoard,
        deleteBoard,
        updateBoardName,
        reorderBoards,
      }}
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
