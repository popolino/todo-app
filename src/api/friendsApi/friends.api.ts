import axios from "../index";
import { TUser } from "src/features/friends/Friends.types";

export const friendsApi = {
  getFriends: () => axios.get<TUser[]>("users"),
  deleteFriend: (id: string) => axios.delete(`users/${id}`),
  acceptFriend: (id: string) => axios.put(`users/${id}`),
};
