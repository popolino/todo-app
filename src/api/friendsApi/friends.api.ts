import { axiosInstance } from "../index";
import { TUser } from "src/features/friends/Friends.types";

export const friendsApi = {
  getFriends: () => axiosInstance.get<TUser[]>("users"),
  deleteFriend: (id: string) => axiosInstance.delete(`users/${id}`),
  acceptFriend: (id: string) => axiosInstance.put(`users/${id}`),
};
