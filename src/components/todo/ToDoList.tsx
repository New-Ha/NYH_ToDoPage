import React from "react";
import ToDoItem from "./ToDoItem";

const ToDoList = () => {
  return (
    <div className="flex flex-col gap-3">
      <ToDoItem />
      <ToDoItem />
    </div>
  );
};

export default ToDoList;
