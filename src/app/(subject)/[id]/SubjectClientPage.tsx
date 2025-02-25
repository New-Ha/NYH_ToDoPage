"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useSubject } from "@/contexts/SubjectContext";
import { SubjectType } from "@/types/kanban.type";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useBoard } from "@/contexts/BoardContext";
import { useTodo } from "@/contexts/TodoContext";
import BoardList from "@/components/board/BoardList";
import ToDoItem from "@/components/todo/ToDoItem";
import Icon from "@/components/UI/Icon";

const SubjectClientPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { id: subjectId } = useParams();
  const { updateSubjectTitle, deleteSubject } = useSubject();
  const { reorderBoards } = useBoard();
  const { getTodos, moveTodo, reorderTodos } = useTodo();

  const [subject, setSubject] = useState<SubjectType | null>(null);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [subjectTitleEditState, setSubjectTitleEditState] = useState({
    isEditing: false,
    title: "",
  });
  const [isAddingBoard, setIsAddingBoard] = useState(false);
  const [activeTodo, setActiveTodo] = useState(null);

  const handleStartEditMode = () => {
    setIsEditingMode(true);
  };

  const handleStartSubjectTitleEdit = () => {
    setSubjectTitleEditState({ isEditing: true, title: "" });
  };

  const handleSubjectTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubjectTitleEditState((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleSaveEdit = () => {
    if (!subjectTitleEditState.title.trim()) {
      setSubjectTitleEditState({ isEditing: false, title: "" });
      return;
    }

    updateSubjectTitle(subjectId as string, subjectTitleEditState.title);
    setSubjectTitleEditState({ isEditing: false, title: "" });
    setIsEditingMode(false);
  };

  const handleCancelEdit = () => {
    setSubjectTitleEditState({ isEditing: false, title: "" });
    setIsEditingMode(false);
  };

  const handleStartAddingBoard = () => {
    setIsAddingBoard(true);
  };

  const handleCancelAddingBoard = () => {
    setIsAddingBoard(false);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    if (active.data.current?.type === "todo") {
      setActiveTodo({
        ...active.data.current.todo,
        boardId: active.data.current.boardId,
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTodo(null);
    if (!over) return;

    const activeType = active.data.current?.type;

    if (activeType === "todo") {
      const sourceBoardId = active.data.current?.boardId;
      let targetBoardId: string | undefined;

      if (typeof over.id === "string") {
        if (over.id.startsWith("todoContainer-")) {
          targetBoardId = over.id.replace("todoContainer-", "");
        } else if (over.data.current?.type === "board") {
          targetBoardId = over.data.current.boardId;
        }
      }

      if (!targetBoardId) return;

      if (sourceBoardId === targetBoardId) {
        const currentTodos = getTodos(sourceBoardId);
        const activeIndex = currentTodos.findIndex(
          (todo) => todo.id === active.id
        );
        const overIndex = currentTodos.findIndex((todo) => todo.id === over.id);
        if (activeIndex === -1 || overIndex === -1) return;
        const newTodosOrder = arrayMove(currentTodos, activeIndex, overIndex);
        reorderTodos(sourceBoardId, newTodosOrder);
      } else {
        moveTodo(sourceBoardId, targetBoardId, active.id as string, -1);
      }
    } else {
      if (active.id === over.id) return;
      if (!subject || !subject.boards) return;
      const oldIndex = subject.boards.indexOf(String(active.id));
      const newIndex = subject.boards.indexOf(String(over.id));
      if (oldIndex === -1 || newIndex === -1) return;
      const newBoardsOrder = arrayMove(subject.boards, oldIndex, newIndex);
      reorderBoards(newBoardsOrder);
    }
  };

  useEffect(() => {
    if (subjectId) {
      const storedSubject = JSON.parse(
        localStorage.getItem(`subject_${subjectId as string}`) || "null"
      );
      setSubject(storedSubject);
    }
  }, [subjectId]);

  if (!subject) {
    return (
      <div className="text-center mt-10 text-lg font-semibold">
        아직 아무런 주제가 없습니다. 새로운 주제를 추가해주세요.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center flex-1 min-h-0 px-2">
      <div className="w-full max-w-[80rem] grid grid-cols-[1fr_auto_1fr] items-center justify-between my-10">
        <div className="flex flex-row gap-2 py-2">
          <button
            type="button"
            className="py-2 px-2 rounded-full hover:bg-border "
          >
            <Icon type="undo" className="w-5 h-5 text-gray-500" />
          </button>
          <button
            type="button"
            className="py-2 px-2 rounded-full hover:bg-border"
          >
            <Icon type="redo" className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <h1 className="font-bold text-primary text-xl text-[1.5rem] z-10">
          {subjectTitleEditState.isEditing ? (
            <div className="flex flex-row gap-3">
              <input
                type="text"
                ref={inputRef}
                value={subjectTitleEditState.title}
                onChange={(e) => handleSubjectTitleChange(e)}
                className="w-full border-b-[1px] border-primary text-[1.4rem] px-4 py-1 focus:outline-none"
                placeholder={`${subject.title}`}
              />
              <button
                type="button"
                onClick={handleSaveEdit}
                className="p-2 rounded-full text-grayText hover:bg-primary hover:text-white"
              >
                <Icon type="check" />
              </button>
            </div>
          ) : (
            <span className="text-[1.5rem]">{subject.title}</span>
          )}
        </h1>
        <div className="flex flex-row justify-end">
          {!isEditingMode && (
            <button
              type="button"
              onClick={handleStartAddingBoard}
              className="py-1 px-2 rounded-full text-gray-400 hover:bg-border hover:text-primary"
            >
              <Icon type="plus" />
            </button>
          )}
          {isEditingMode ? (
            <div>
              {!subjectTitleEditState.isEditing && (
                <button
                  type="button"
                  onClick={handleStartSubjectTitleEdit}
                  className="p-2 rounded-full text-gray-400 hover:bg-border hover:text-primary"
                >
                  <Icon type="pencil" />
                </button>
              )}
              {!subjectTitleEditState.isEditing && (
                <button
                  type="button"
                  className="p-2 rounded-full text-gray-400 hover:bg-border hover:text-rose-600"
                  onClick={() => deleteSubject(subject.id)}
                >
                  <Icon type="trash" />
                </button>
              )}
              <button
                type="button"
                className="p-2 rounded-full text-gray-400 hover:bg-border hover:text-black"
                onClick={handleCancelEdit}
              >
                <Icon type="x" />
              </button>
            </div>
          ) : (
            <button type="button" onClick={handleStartEditMode}>
              <Icon
                type="dots-row"
                className="w-[2.4rem] h-[2.4rem] py-1 px-2 rounded-full hover:bg-border "
              />
            </button>
          )}
        </div>
      </div>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="w-full overflow-x-auto flex-1 min-h-0">
          <BoardList
            subjectId={subjectId as string}
            isAddingBoard={isAddingBoard}
            onClickStartAddingBoard={handleStartAddingBoard}
            onCancelAddingBoard={handleCancelAddingBoard}
          />
          <DragOverlay>
            {activeTodo ? (
              <ToDoItem
                todo={activeTodo}
                boardId={activeTodo.boardId}
                isDragging
              />
            ) : null}
          </DragOverlay>
        </div>
      </DndContext>
    </div>
  );
};

export default SubjectClientPage;
