import { axiosInstance } from "../index";
import {
  ICreateTaskRequest,
  TCreateTaskRequest,
  TTask,
} from "../../features/main/tasks/Tasks.types";

export const tasksApi = {
  getTasks: (id: string) =>
    axiosInstance.get<TTask[]>(`/categories/${id}/tasks`),
  addTask: (task: TCreateTaskRequest) =>
    axiosInstance.post<TTask>("tasks", task),
  deleteTask: (id: string) => axiosInstance.delete(`tasks/${id}`),
  editTask: (task: ICreateTaskRequest, id: string) =>
    axiosInstance.put(`tasks/${id}`, task),
  completeTask: (id: string, task: TTask) =>
    axiosInstance.put(`tasks/${id}/completed`, task),
};
