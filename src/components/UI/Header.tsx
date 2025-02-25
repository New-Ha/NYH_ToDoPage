"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSubject } from "@/contexts/SubjectContext";
import { formatSubjectTitle } from "@/lib/truncateUtils";
import SearchBar from "./SearchBar";
import Icon from "./Icon";

const Header = () => {
  const router = useRouter();
  const { id: subjectId } = useParams();
  const [isAddingSubject, setIsAddingSubject] = useState(false);
  const [subjectTItle, setSubjectTitle] = useState("");
  const { subjects, addSubject } = useSubject();

  const handleAddSubject = (title: string) => {
    if (!title.trim()) {
      setIsAddingSubject(false);
      return;
    }

    const newSubjectId = addSubject(title);
    setSubjectTitle("");
    setIsAddingSubject(false);
    router.push(`/${newSubjectId}`);
  };

  return (
    <header className="h-16 fixed top-0 left-0 right-0 border-b-[1px] border-border shadow-sm z-10">
      <div className="max-w-[80rem] mx-auto h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          {subjects.map(({ id, title }) => (
            <button
              type="button"
              key={id}
              onClick={() => router.push(`/${id}`)}
              className={`py-[0.9rem] px-2 font-semibold text-[1.4rem] ${
                id === subjectId && "border-b-[4px] border-primary text-primary"
              }`}
            >
              {formatSubjectTitle(title)}
            </button>
          ))}
          {isAddingSubject ? (
            <>
              <input
                type="text"
                className="w-[14rem] border-[1px] border-primary rounded-md py-2 px-3 text-[1rem] focus:outline-none placeholder:text-grayText"
                onChange={(e) => setSubjectTitle(e.target.value)}
                placeholder="주제명을 작성해주세요."
              />
              <button
                type="button"
                onClick={() => handleAddSubject(subjectTItle)}
                className="text-[0.9rem] text-primary border-[1px] border-primary rounded-full py-1 px-2 hover:bg-primary hover:text-white"
              >
                추가
              </button>
            </>
          ) : (
            <button
              type="button"
              className="size-[2.5rem] flex justify-center items-center rounded-md text-grayText border-[1px] border-border hover:bg-primary hover:text-white"
              onClick={() => setIsAddingSubject(true)}
            >
              <Icon type="plus" className="w-6 h-6" />
            </button>
          )}
        </div>
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
