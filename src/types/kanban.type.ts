export type ToDoType = {
  id: string;
  boardId: string;
  content: string;
  createdAt: Date;
};

export type BoardType = {
  id: string;
  title: string;
  todos: string[];
};

export type SubjectType = {
  id: string;
  name: string;
  boards: string[];
};

export type SubjectsType = string[];

export type KanbanType = {
  [subjectId: string]: SubjectType;
};
