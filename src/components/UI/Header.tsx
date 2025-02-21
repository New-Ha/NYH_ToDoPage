"use client";

import React from "react";
import SearchBar from "./SearchBar";
import { useKanban } from "@/context/kanbanProvider";

const Header = () => {
  const { kanbanData } = useKanban();

  return (
    <header className="h-16 fixed top-0 left-0 right-0 border-b-[1px] border-border shadow-sm z-10">
      <div className="max-w-[80rem] mx-auto h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          {Object.entries(kanbanData).map(([subjectId, subject]) => (
            <span key={subjectId} className="font-bold text-lg">
              {subject.name}
            </span>
          ))}
          <button type="button">+</button>
        </div>
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
