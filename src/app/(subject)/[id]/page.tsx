"use client";

import BoardList from "@/components/board/BoardList";
import Icon from "@/components/UI/Icon";
import { useSubject } from "@/context/SubjectProvider";
import { SubjectType } from "@/types/kanban.type";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SubjectPage = () => {
  const { id: subjectId } = useParams();
  const { updateSubjectName, deleteSubject } = useSubject();
  const [subject, setSubject] = useState<SubjectType | null>(null);
  const [isEditName, setIsEditName] = useState(false);
  const [newName, setNewName] = useState("");

  const handleEditSubjectName = () => {
    if (!newName.trim()) {
      setIsEditName(false);
      return;
    }

    updateSubjectName(subjectId as string, newName);
    setNewName("");
    setIsEditName(false);
  };

  useEffect(() => {
    if (subjectId) {
      const storedSubject = JSON.parse(
        localStorage.getItem(`subject_${subjectId}`) || "null"
      );
      setSubject(storedSubject);
    }
  }, [subjectId]);

  if (!subject) {
    return (
      <div className="text-center mt-10 text-lg font-semibold">
        주제를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center flex-1 min-h-0 px-2">
      <div className="w-full max-w-[80rem] flex items-center justify-between my-10">
        <div className="flex flex-row gap-2">
          <button
            type="button"
            className="py-2 px-2 rounded-full hover:bg-border"
          >
            <Icon type="undo" className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="py-2 px-2 rounded-full hover:bg-border"
          >
            <Icon type="redo" className="w-5 h-5" />
          </button>
        </div>
        <h1 className="font-bold text-primary text-xl text-[1.4rem]">
          {subject.name}
        </h1>
        <div className="flex flex-row gap-2">
          {isEditName ? (
            <div className="flex flex-row gap-2">
              <input
                type="text"
                onChange={(e) => setNewName(e.target.value)}
                className="border-[1px] border-primary rounded-md text-[0.9rem] px-4 focus:outline-none"
                placeholder="변경할 주제명"
              />
              <button
                type="button"
                onClick={handleEditSubjectName}
                className="px-2 rounded-full hover:bg-border"
              >
                <Icon type="check-circle" className="w-6 h-6" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditName(true)}
              className="py-2 px-2 rounded-full hover:bg-border"
            >
              <Icon type="pencil" />
            </button>
          )}
          <button
            type="button"
            className="py-2 px-2 rounded-full hover:bg-border"
            onClick={() => deleteSubject(subject.id)}
          >
            <Icon type="trash" />
          </button>
        </div>
      </div>
      <div className="w-full max-w-[80rem] overflow-x-auto flex-1 min-h-0">
        <BoardList boards={subject.boards} />
      </div>
    </div>
  );
};

export default SubjectPage;
