"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BoardType, ToDoType } from "@/types/kanban.type";
import ToDoItem from "@/components/todo/ToDoItem";

interface BoardWithSubject extends BoardType {
  subjectId: string;
}

interface ToDoWithBoardAndSubject extends ToDoType {
  boardId: string;
  subjectId: string;
}

const SearchPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("query")?.toLowerCase() || "";

  const [filteredBoards, setFilteredBoards] = useState<BoardWithSubject[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<ToDoWithBoardAndSubject[]>(
    []
  );

  useEffect(() => {
    if (!query) {
      setFilteredBoards([]);
      setFilteredTodos([]);
      return;
    }

    const subjectIds = JSON.parse(localStorage.getItem("subjects") || "[]");

    let allBoards: BoardWithSubject[] = [];
    let allTodos: ToDoWithBoardAndSubject[] = [];

    subjectIds.forEach((subject: { id: string }) => {
      const subjectData = JSON.parse(
        localStorage.getItem(`subject_${subject.id}`) || "null"
      );
      if (subjectData?.boards) {
        const subjectBoards = subjectData.boards
          .map((boardId: string) => {
            const board = JSON.parse(
              localStorage.getItem(`board_${boardId}`) || "null"
            );
            return board ? { ...board, subjectId: subject.id } : null;
          })
          .filter(Boolean);
        allBoards = [...allBoards, ...subjectBoards];
      }
    });

    allBoards.forEach((board) => {
      const boardData = JSON.parse(
        localStorage.getItem(`board_${board.id}`) || "null"
      );
      if (boardData?.todos) {
        const boardTodos = boardData.todos.map((todo: ToDoType) => ({
          ...todo,
          boardId: board.id,
          subjectId: board.subjectId,
        }));
        allTodos = [...allTodos, ...boardTodos];
      }
    });

    const matchedBoards = allBoards.filter((board) =>
      board.name.toLowerCase().includes(query)
    );
    const matchedTodos = allTodos.filter((todo) =>
      todo.content.toLowerCase().includes(query)
    );

    setFilteredBoards(matchedBoards);
    setFilteredTodos(matchedTodos);
  }, [query]);

  const handleBoardClick = (board: BoardWithSubject) => {
    router.push(`/${board.subjectId}#board-${board.id}`);
  };

  const handleTodoClick = (todo: ToDoWithBoardAndSubject) => {
    router.push(`/${todo.subjectId}#todo-${todo.id}`);
  };

  return (
    <div className="w-full max-w-[80rem] flex flex-col items-center flex-1 min-h-0 px-2">
      <h1 className="font-bold text-primary text-xl text-[1.5rem] z-10 mt-12">
        검색 결과
      </h1>

      {filteredBoards.length > 0 && (
        <div className="w-full">
          <h3 className="text-xl font-semibold mb-4">보드</h3>
          <div className="flex flex-row gap-5">
            {filteredBoards.map((board) => (
              <div
                key={board.id}
                onClick={() => handleBoardClick(board)}
                className="cursor-pointer"
              >
                <div className="w-[20rem] h-full bg-boardBG rounded-md border-border border-[1px]">
                  <div className="h-[4rem] px-4 text-lg flex flex-row justify-between items-center border-b-[1px] border-[#C0C1CC] border-dashed">
                    <p className="w-full text-[1.2rem] text-primary font-bold flex flex-row items-center">
                      {board.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {filteredTodos.length > 0 && (
        <div className="w-full mt-10">
          <h3 className="text-xl font-semibold mb-4">할 일</h3>
          <div className="flex flex-row gap-5">
            {filteredTodos.map((todo) => (
              <div
                key={todo.id}
                onClick={() => handleTodoClick(todo)}
                className="w-[18rem] cursor-pointer"
              >
                <ToDoItem boardId={todo.boardId} todo={todo} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="my-10 border-border border-[1px] rounded-md">
        {filteredBoards.length === 0 && filteredTodos.length === 0 && (
          <p className="w-[20rem] text-gray-500 text-center p-4">
            검색 결과가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
