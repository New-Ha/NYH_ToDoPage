import { BoardProvider } from "@/contexts/BoardContext";
import React from "react";
import SubjectClientPage from "./SubjectClientPage";
import { TodoProvider } from "@/contexts/TodoContext";

const SubjectPage = () => {
  return (
    <BoardProvider>
      <TodoProvider>
        <SubjectClientPage />
      </TodoProvider>
    </BoardProvider>
  );
};

export default SubjectPage;
