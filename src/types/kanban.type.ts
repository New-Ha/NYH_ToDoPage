export type ToDoType = {
  id: string;
  boardId: string;
  content: string;
  createdAt: string;
};

export type BoardType = {
  [boardId: string]: ToDoType[];
};

export type SubjectType = {
  name: string;
  boards: BoardType;
};

export type KanbanType = {
  [subjectId: string]: SubjectType;
};
