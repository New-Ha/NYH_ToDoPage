import React from "react";
import Icon from "../UI/Icon";
import ToDoList from "../todo/ToDoList";

const Board = () => {
  return (
    <section className="w-[20rem] bg-boardBG rounded-md border-border border-[1px]">
      <div className="h-[4rem] px-4 text-lg flex flex-row justify-between items-center border-b-[1px] border-[#C0C1CC] border-dashed">
        <p className="text-[1.2rem] text-primary font-bold px-2">
          board title
          <span className="px-2 py-1 ml-2 bg-border rounded-lg text-[1rem] font-thin">
            2
          </span>
        </p>
        <button type="button">
          <Icon
            type="dots-row"
            className="w-[2.2rem] h-[2.2rem] py-1 px-2 rounded-xl hover:bg-border "
          />
        </button>
      </div>
      <div className="p-4">
        <ToDoList />
      </div>
      <div className="p-4 my-2">
        <button
          type="button"
          className="flex flex-row justify-center items-center gap-2 w-full py-3 text-center border-border border-[1px] rounded-md hover:bg-white hover:shadow-sm"
        >
          <Icon type="plus-circle" className="w-5 h-5" />
          <span className="text-[0.9rem]">New Task</span>
        </button>
      </div>
    </section>
  );
};

export default Board;
