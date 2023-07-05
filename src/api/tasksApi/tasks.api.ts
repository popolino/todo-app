import { axiosInstance } from "../index";
import {
  ICreateTaskRequest,
  TTask,
} from "../../features/main/tasks/Tasks.types";

export const tasksApi = {
  getTasks: () => axiosInstance.get<TTask[]>("tasks"),
  addTask: (task: ICreateTaskRequest) =>
    axiosInstance.post<TTask>("tasks", task),
  deleteTask: (id: string) => axiosInstance.delete(`tasks/${id}`),
  editTask: (task: ICreateTaskRequest, id: string) =>
    axiosInstance.put(`tasks/${id}`, task),
};
