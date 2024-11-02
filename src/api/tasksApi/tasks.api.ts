import { axiosInstance } from "../index";
import {
  ICreateTaskRequest,
  TCreateTaskRequest,
  TTask,
} from "../../features/main/tasks/Tasks.types";

export const tasksApi = {
  getTasks: (id: string) =>
    axiosInstance.get<TTask[]>(`categories/${id}/tasks`),
  addTask: (task: TCreateTaskRequest) =>
    axiosInstance.post<TTask>("tasks", task),
  deleteTask: (id: string) => axiosInstance.delete(`tasks/${id}`),
  deleteTasks: (ids: string[]) =>
    axiosInstance.delete(`tasks`, {
      data: { ids }, // Обязательно передавайте объект с ключом "ids"
    }),
  editTask: (task: ICreateTaskRequest, id: string) =>
    axiosInstance.put(`tasks/${id}`, task),
};
