import { axiosInstance } from "../index";
import { TUser, TUserRelations } from "src/features/friends/Friends.types";

export const friendsApi = {
  getAllUsers: () => axiosInstance.get<TUser[]>("users/test"),
  getFriends: () => axiosInstance.get<TUser[]>("users"),

  fetchRelationsAsync: () =>
    axiosInstance.get<TUserRelations>("users/relations"),
  addFriend: (email: string) =>
    axiosInstance.post<TUser>(`users/Relations/${email}`),
  acceptFriend: (id: string) => axiosInstance.put(`users/Relations/${id}`),
  deleteFriend: (id: string) => axiosInstance.delete(`users/Relations/${id}`),
};
