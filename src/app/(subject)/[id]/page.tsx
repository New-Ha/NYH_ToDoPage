import { BoardProvider } from "@/contexts/BoardContext";
import React from "react";
import SubjectClientPage from "./SubjectClientPage";

const SubjectPage = () => {
  return (
    <BoardProvider>
      <SubjectClientPage />
    </BoardProvider>
  );
};

export default SubjectPage;
