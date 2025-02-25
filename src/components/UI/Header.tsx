"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import SearchBar from "./SearchBar";
import { useSubject } from "@/context/SubjectProvider";

const Header = () => {
  const router = useRouter();
  const { id: subjectId } = useParams();
  const [isAddingSubject, setIsAddingSubject] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const { subjectNames, addSubject } = useSubject();

  const handleAddSubject = (name: string) => {
    if (!name.trim()) {
      setIsAddingSubject(false);
      return;
    }

    const newSubjectId = addSubject(name);
    setSubjectName("");
    setIsAddingSubject(false);
    router.push(`/${newSubjectId}`);
  };

  return (
    <header className="h-16 fixed top-0 left-0 right-0 border-b-[1px] border-border shadow-sm z-10">
      <div className="max-w-[80rem] mx-auto h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          {subjectNames.map(({ id, name }) => (
            <button
              type="button"
              key={id}
              onClick={() => router.push(`/${id}`)}
              className={`py-[0.9rem] px-2 font-semibold text-[1.4rem] ${
                id === subjectId && "border-b-[4px] border-primary text-primary"
              }`}
            >
              {name}
            </button>
          ))}
          {isAddingSubject ? (
            <>
              <input
                type="text"
                className="w-[14rem] border-[1px] border-primary rounded-md py-1 px-2 text-[1rem] focus:outline-none"
                onChange={(e) => setSubjectName(e.target.value)}
                placeholder="주제명을 작성해주세요."
              />
              <button
                type="button"
                onClick={() => handleAddSubject(subjectName)}
                className="text-[0.9rem] text-primary border-[1px] border-primary rounded-full py-1 px-2 hover:bg-primary hover:text-white"
              >
                추가
              </button>
            </>
          ) : (
            <button type="button" onClick={() => setIsAddingSubject(true)}>
              +
            </button>
          )}
        </div>
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
