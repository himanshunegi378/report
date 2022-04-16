export enum taskStatus {
  ongoing = "ongoing",
  done = "done",
  cancelled = "cancelled",
}

export type TaskStruct = {
  id: string;
  description: string;
  status: taskStatus;
};

export type ReportStruct = {
  id: string;
  date: string;
  time: number;
  tasks: TaskStruct[];
};
