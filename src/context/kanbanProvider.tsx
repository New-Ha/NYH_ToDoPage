"use client";

import { KanbanType } from "@/types/kanban.type";
import React, { createContext, useContext, useEffect, useState } from "react";

type kanbanContextType = {
  kanbanData: KanbanType;
  setKanbanData: (data: KanbanType) => void;
};

const KanbanContext = createContext<kanbanContextType | undefined>(undefined);

export const KanbanProvider = ({ children }: { children: React.ReactNode }) => {
  const [kanbanData, setKanbanData] = useState<KanbanType>({});

  useEffect(() => {
    const storedDate = localStorage.getItem("kanban");
    if (storedDate) {
      setKanbanData(JSON.parse(storedDate));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(kanbanData).length > 0) {
      localStorage.setItem("kanban", JSON.stringify(kanbanData));
    }
  }, [kanbanData]);

  return (
    <KanbanContext.Provider value={{ kanbanData, setKanbanData }}>
      {children}
    </KanbanContext.Provider>
  );
};

export const useKanban = () => {
  const context = useContext(KanbanContext);
  if (!context) {
    throw new Error("context 범위 밖에서의 호출입니다.");
  }
  return context;
};
