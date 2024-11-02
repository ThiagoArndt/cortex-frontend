import { Columns, TaskResponse, TaskDtoStatusEnum } from "../types/Api";

export const COLUMN_TITLE_TO_STATUS: { [key: string]: TaskDtoStatusEnum } = {
  "A Fazer": TaskDtoStatusEnum.TODO,
  "Em Andamento": TaskDtoStatusEnum.IN_PROGRESS,
  Concluído: TaskDtoStatusEnum.DONE,
};

export const STATUS_MAPPINGS = {
  TODO: "A Fazer",
  IN_PROGRESS: "Em Andamento",
  DONE: "Concluído",
};

export const transformTasksToColumns = (tasks: TaskResponse[]): Columns => {
  return {
    "column-1": {
      title: "A Fazer",
      items: tasks.filter((item) => item.status === "TODO"),
    },
    "column-2": {
      title: "Em Andamento",
      items: tasks.filter((item) => item.status === "IN_PROGRESS"),
    },
    "column-3": {
      title: "Concluído",
      items: tasks.filter((item) => item.status === "DONE"),
    },
  };
};

export const transformColumnsToTasks = (columns: Columns): TaskResponse[] => {
  return [
    ...columns["column-1"].items.map((item) => ({
      ...item,
      status: "TODO" as TaskDtoStatusEnum,
    })),
    ...columns["column-2"].items.map((item) => ({
      ...item,
      status: "IN_PROGRESS" as TaskDtoStatusEnum,
    })),
    ...columns["column-3"].items.map((item) => ({
      ...item,
      status: "DONE" as TaskDtoStatusEnum,
    })),
  ];
};

export const transformTaskToColumn = (task: TaskResponse): TaskResponse => {
  return {
    ...task,
    status: COLUMN_TITLE_TO_STATUS[task.status as unknown as string],
  };
};
