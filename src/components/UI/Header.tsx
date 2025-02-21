import React from "react";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <header className="h-16 fixed top-0 left-0 right-0 border-b-[1px] border-border shadow-sm z-10">
      <div className="max-w-[80rem] mx-auto h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-bold">Subject</h1>
          <h1 className="text-lg font-bold">Subject</h1>
          <h1 className="text-lg font-bold">Subject</h1>
          <button type="button">+</button>
        </div>
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
