"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSubject } from "@/contexts/SubjectContext";

const HomePage = () => {
  const router = useRouter();
  const { subjectNames } = useSubject();

  useEffect(() => {
    if (subjectNames.length > 0) {
      router.push(`/${subjectNames[0].id}`);
    }
  }, [subjectNames, router]);

  return (
    <div className="mx-auto mt-20 bg-boardBG py-5 px-10 rounded-md text-[1rem] text-grayText">
      아직 아무런 주제가 없습니다. 칸반 보드를 사용할 주제를 추가해주세요.
    </div>
  );
};

export default HomePage;
