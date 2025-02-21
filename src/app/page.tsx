"use client";

import { useKanban } from "@/context/kanbanProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  const { kanbanData } = useKanban();
  const router = useRouter();

  useEffect(() => {
    const subjectIds = Object.keys(kanbanData);
    if (subjectIds.length > 0) {
      router.replace(`/subject/${subjectIds[0]}`);
  }, [kanbanData]);

  return <p>로딩 중...</p>;
};

export default HomePage;
