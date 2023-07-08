import { axiosInstance } from "../index";
import { TUser } from "src/features/friends/Friends.types";

export const friendsApi = {
  getAllUsers: () => axiosInstance.get<TUser[]>("users/test"),

  getFriends: () => axiosInstance.get<TUser[]>("users"),

  addFriend: (email: string) => axiosInstance.post<TUser>(`users/relations/${email}` ),
  acceptFriend: (id: string) => axiosInstance.put(`users/relations/${id}`),
  deleteFriend: (id: string) => axiosInstance.delete(`users/relations/${id}`),
};
