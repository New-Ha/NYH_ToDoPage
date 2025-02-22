import { BoardProvider } from "@/context/BoardProvider";
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
