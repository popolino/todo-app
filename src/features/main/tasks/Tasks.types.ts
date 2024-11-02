import { TColors } from "src/consts/colors";

export type TTask = {
  id: string;
  color: TColors;
  text: string;
  isCompleted: boolean;
  categoryId: string;
};

export interface ICreateTaskRequest extends Partial<TTask> {
  text: string;
  isCompleted: boolean;
}

export type TCreateTaskRequest = {
  categoryId: string;
  text: string;
};
