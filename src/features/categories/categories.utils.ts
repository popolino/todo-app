import { TUser } from "../friends/Friends.types";

export const findUser = (friends: TUser[], id: string) =>
  friends.find((friend) => friend.id === id);
