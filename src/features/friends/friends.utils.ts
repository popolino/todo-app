import { TUser } from "./Friends.types";

export const getUsers = (
  users: TUser[],
  status: "friends" | "pending" | "outgoing"
): TUser[] => users.filter((user) => user.status === status);
