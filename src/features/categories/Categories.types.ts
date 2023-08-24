import { TColors } from "../../consts/colors";
import { TUser } from "../friends/Friends.types";

export type TCategory = {
  id: string;
  creatorId: string;
  name: string;
  color: TColors;
  members: TUser[];
  totalTasks: number;
  completedTasks: number;
};

export interface ICreateCategoryRequest extends Partial<TCategory> {
  name: string;
  color: TColors;
  memberIds: string[];
}
export type TEditCategoryRequest = {
  id: string;
  name: string;
  color: TColors;
  memberIds: string[];
};
export type TDeleteCategoryRequest = {
  categoryIds: string[];
};
