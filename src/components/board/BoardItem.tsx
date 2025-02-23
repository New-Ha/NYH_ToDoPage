"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BoardType } from "@/types/kanban.type";
import Board from "./Board";

interface BoardItemProp {
  subjectId: string;
  board: BoardType;
}

const BoardItem = ({ subjectId, board }: BoardItemProp) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: board.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="h-full">
      <Board subjectId={subjectId} board={board} dragHandleProps={listeners} />
    </div>
  );
};

export default BoardItem;
