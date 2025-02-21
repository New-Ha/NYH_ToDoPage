import React from "react";
import Icon from "../UI/Icon";
import { formatDate } from "@/lib/dateUtils";
import { IconType } from "@/types/icon.type";

const ToDoItem = () => {
  const date = new Date();
  const { createdAt, iconType } = formatDate(date);

  return (
    <div className="bg-white rounded-md shadow-lg p-4">
      <div className="text-[1rem] font-medium pt-1">
        일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십
      </div>
      <div className="flex flex-row justify-between items-center mt-2">
        <p className="flex flex-row gap-2">
          <Icon type={iconType as IconType} className="w-5 h-5" />
          <span className="text-[0.9rem] font-light">{createdAt}</span>
        </p>
        <button type="button" className="py-1 px-1 rounded-md hover:bg-border">
          <Icon type="dots-row" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ToDoItem;
