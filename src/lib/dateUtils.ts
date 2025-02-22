export const formatDate = (date: Date | string) => {
  const now = new Date();
  const parsedDate = new Date(date);

  const diffInMilliseconds = now.getTime() - parsedDate.getTime();
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60)); // 밀리초 → 분 변환
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60)); // 밀리초 → 시간 변환

  if (diffInMinutes < 60) {
    return {
      createdAt: diffInMinutes === 0 ? "방금 전" : `${diffInMinutes}분 전`,
      iconType: "clock",
    };
  }

  if (diffInHours < 24) {
    return {
      createdAt: `${diffInHours}시간 전`,
      iconType: "clock",
    };
  }

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");

  return {
    createdAt: `${year}/${month}/${day}`,
    iconType: "calendar",
  };
};
