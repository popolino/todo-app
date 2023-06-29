import { TColors } from "src/consts/colors";

export type TTask = {
  id: string;
  color: TColors;
  text: string;
  isCompleted: boolean;
};

export interface ICreateTaskRequest extends Partial<TTask> {
  color: TColors;
  text: string;
  isCompleted: boolean;
}
