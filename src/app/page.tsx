import BoardList from "@/components/board/BoardList";
import Icon from "@/components/UI/Icon";
import React from "react";

const HomePage = () => {
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
          Subject title
        </h1>
        <button
          type="button"
          className="py-2 px-2 rounded-full hover:bg-border"
        >
          <Icon type="dots-row" className="w-6 h-6" />
        </button>
      </div>
      <div className="w-full max-w-[80rem] overflow-x-auto flex-1 min-h-0">
        <BoardList />
      </div>
    </div>
  );
};

export default HomePage;
