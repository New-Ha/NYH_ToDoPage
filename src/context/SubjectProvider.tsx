"use client";

import {
  BoardType,
  SubjectsType,
  SubjectType,
  ToDoType,
} from "@/types/kanban.type";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

type SubjectNameType = {
  id: string;
  name: string;
};

type SubjectContextType = {
  subjectNames: SubjectNameType[];
  addSubject: (name: string) => void;
  deleteSubject: (subjectId: string) => void;
  updateSubjectName: (subjectId: string, newName: string) => void;
};

const SubjectContext = createContext<SubjectContextType | null>(null);

export const SubjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [subjects, setSubjects] = useState<SubjectsType>([]);
  const [subjectNames, setSubjectNames] = useState<SubjectNameType[]>([]);

  useEffect(() => {
    const storedSubjects = JSON.parse(localStorage.getItem("subjects") || "[]");
    setSubjects(storedSubjects);
  }, []);

  useEffect(() => {
    const updatedSubjectNames = subjects
      .map((id) => JSON.parse(localStorage.getItem(`subject_${id}`) || "null"))
      .filter(Boolean)
      .map((subject) => ({ id: subject.id, name: subject.name }));

    setSubjectNames(updatedSubjectNames);
  }, [subjects]);

  const addSubject = (name: string): string => {
    const subjectId = crypto.randomUUID();
    const defaultBoardId = crypto.randomUUID();
    const defaultToDoId = crypto.randomUUID();
    const newTodo: ToDoType = {
      id: defaultToDoId,
      boardId: defaultBoardId,
      content: "할 일을 정리해보세요!",
      createdAt: new Date(),
    };
    const newBoard: BoardType = {
      id: defaultBoardId,
      title: "할 일",
      todos: [defaultToDoId],
    };
    const newSubject: SubjectType = {
      id: subjectId,
      name,
      boards: [defaultBoardId],
    };

    const updatedSubjects = [...subjects, subjectId];

    localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
    localStorage.setItem(`subject_${subjectId}`, JSON.stringify(newSubject));
    localStorage.setItem(`board_${defaultBoardId}`, JSON.stringify(newBoard));
    localStorage.setItem(`todo_${defaultToDoId}`, JSON.stringify(newTodo));

    setSubjects(updatedSubjects);
    return subjectId;
  };

  const deleteSubject = (subjectId: string) => {
    const subject = JSON.parse(
      localStorage.getItem(`subject_${subjectId}`) || "null"
    );
    if (!subject) return;

    subject.boards.forEach((boardId: string) => {
      const board = JSON.parse(
        localStorage.getItem(`board_${boardId}`) || "null"
      );
      if (board) {
        board.todos.forEach((todoId: string) => {
          localStorage.removeItem(`todo_${todoId}`);
        });
      }
      localStorage.removeItem(`board_${boardId}`);
    });

    localStorage.removeItem(`subject_${subjectId}`);

    const updatedSubjects = subjects.filter((id) => id !== subjectId);
    localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
    setSubjects(updatedSubjects);

    setSubjectNames((prev) => prev.filter((s) => s.id !== subjectId));

    router.push("/");
  };

  const updateSubjectName = (subjectId: string, newName: string) => {
    const subject = JSON.parse(
      localStorage.getItem(`subject_${subjectId}`) || "null"
    );
    if (!subject) return;

    subject.name = newName;
    localStorage.setItem(`subject_${subjectId}`, JSON.stringify(subject));

    setSubjects((prev) =>
      prev.map((id) => (id === subjectId ? subjectId : id))
    );

    setSubjectNames((prev) =>
      prev.map((s) => (s.id === subjectId ? { ...s, name: newName } : s))
    );
  };

  return (
    <SubjectContext.Provider
      value={{ subjectNames, addSubject, deleteSubject, updateSubjectName }}
    >
      {children}
    </SubjectContext.Provider>
  );
};

export const useSubject = (): SubjectContextType => {
  const context = useContext(SubjectContext);
  if (!context) {
    throw new Error("useSubject must be used within a SubjectProvider");
  }
  return context;
};
