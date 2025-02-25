"use client";

import {
  BoardType,
  SubjectsType,
  SubjectType,
  ToDoType,
} from "@/types/kanban.type";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

type SubjectContextType = {
  subjects: SubjectsType;
  addSubject: (title: string) => string | null;
  deleteSubject: (subjectId: string) => void;
  updateSubjectTitle: (subjectId: string, newTitle: string) => void;
};

const SubjectContext = createContext<SubjectContextType | null>(null);

export const SubjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [subjects, setSubjects] = useState<SubjectsType>([]);

  useEffect(() => {
    const storedSubjects = JSON.parse(localStorage.getItem("subjects") || "[]");
    setSubjects(storedSubjects);
  }, []);

  const addSubject = (title: string): string | null => {
    if (subjects.length >= 5) {
      alert("최대 5개의 주제만 추가할 수 있습니다. 기존 주제를 정리해주세요.");
      return null;
    }

    // 새로운 subject 기본 값
    const subjectId = crypto.randomUUID();
    const defaultBoardId = crypto.randomUUID();
    const newTodo: ToDoType = {
      id: crypto.randomUUID(),
      content: "할 일을 정리해보세요!",
      createdAt: new Date(),
    };
    const newBoard: BoardType = {
      id: defaultBoardId,
      name: "할 일",
      todos: [newTodo],
    };
    const newSubject: SubjectType = {
      id: subjectId,
      title,
      boards: [defaultBoardId],
    };

    const updatedSubjects = [...subjects, { id: subjectId, title }];

    localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
    localStorage.setItem(`subject_${subjectId}`, JSON.stringify(newSubject));
    localStorage.setItem(`board_${defaultBoardId}`, JSON.stringify(newBoard));

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
      if (board) localStorage.removeItem(`board_${boardId}`);
    });

    localStorage.removeItem(`subject_${subjectId}`);

    const updatedSubjects = subjects.filter(
      (subject) => subject.id !== subjectId
    );
    localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
    setSubjects(updatedSubjects);

    router.push("/");
  };

  const updateSubjectTitle = (subjectId: string, newTitle: string) => {
    const subject = JSON.parse(
      localStorage.getItem(`subject_${subjectId}`) || "null"
    );
    if (!subject) return;

    subject.title = newTitle;
    localStorage.setItem(`subject_${subjectId}`, JSON.stringify(subject));

    const updatedSubjects = subjects.map((subject) =>
      subject.id === subjectId ? { ...subject, title: newTitle } : subject
    );
    localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
    setSubjects(updatedSubjects);
  };

  return (
    <SubjectContext.Provider
      value={{
        subjects,
        addSubject,
        deleteSubject,
        updateSubjectTitle,
      }}
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
