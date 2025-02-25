export type ToDoType = {
  id: string;
  content: string;
  createdAt: Date;
};

export type BoardType = {
  id: string;
  name: string;
  todos: ToDoType[];
};

export type SubjectType = {
  id: string;
  title: string;
  boards: string[];
};

export type SubjectsType = {
  id: string;
  title: string;
}[];
