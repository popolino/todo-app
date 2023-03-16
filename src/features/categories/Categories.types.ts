import { TColors } from "../../consts/colors";
import { TUser } from "../../components/avatar/Avatar";

export type TCategory = {
  id: string;
  creatorId: string;
  name: string;
  color: TColors;
  members: TUser[];
  taskCount?: number;
  completedTaskCount?: number;
};
