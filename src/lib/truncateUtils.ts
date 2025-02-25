function truncateString(text: string, maxLength: number) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}

export function formatSubjectTitle(subjectTitle: string) {
  return truncateString(subjectTitle, 7);
}

export function formatBoardName(boardName: string) {
  return truncateString(boardName, 10);
}
