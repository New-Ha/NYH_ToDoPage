import React from "react";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <header className="h-16 flex items-center justify-between px-6 fixed top-0 left-0 right-0 border-b-[1px] border-[#ECEBEE] shadow-sm z-10">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-bold">Subject</h1>
        <h1 className="text-lg font-bold">Subject</h1>
        <h1 className="text-lg font-bold">Subject</h1>
        <button type="button">+</button>
      </div>
      <SearchBar />
    </header>
  );
};

export default Header;
