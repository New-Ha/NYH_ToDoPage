import BoardList from "@/components/board/BoardList";
import React from "react";

const HomePage = () => {
  return (
    <div className="w-full flex flex-col items-center flex-1 min-h-0">
      {/* 내부 헤더 */}
      <div className="w-full max-w-[80rem] flex items-center justify-between my-10 px-10">
        <div>
          <button type="button">👈🏻</button>
          <button type="button">👉🏻</button>
        </div>
        <h1 className="font-bold text-primary text-xl">주제명</h1>
        <button type="button">...</button>
      </div>

      <div className="w-full max-w-[80rem] overflow-x-auto flex-1 min-h-0 px-10">
        <BoardList />
      </div>
    </div>
  );
};

export default HomePage;
