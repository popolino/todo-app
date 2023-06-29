import axios from "../index";
import {
  ICreateTaskRequest,
  TTask,
} from "../../features/main/tasks/Tasks.types";

export const tasksApi = {
  getTasks: () => axios.get<TTask[]>("tasks"),
  addTask: (task: ICreateTaskRequest) => axios.post<TTask>("tasks", task),
  deleteTask: (id: string) => axios.delete(`tasks/${id}`),
  editTask: (task: ICreateTaskRequest, id: string) =>
    axios.put(`tasks/${id}`, task),
};
