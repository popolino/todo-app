import { friends } from "../friends/Friends.mock";

export const findUser = (id: string) =>
  friends.find((friend) => friend.id === id);
