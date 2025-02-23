function truncateString(text: string, maxLength: number) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}

export function formatSubjectName(subjectName: string) {
  return truncateString(subjectName, 5);
}

export function formatBoardName(boardName: string) {
  return truncateString(boardName, 10);
}
