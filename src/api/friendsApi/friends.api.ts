import { axiosInstance } from "../index";
import { TUser, TUserRelations } from "src/features/friends/Friends.types";

export const friendsApi = {
  getAllUsers: () => axiosInstance.get<TUser[]>("users/test"),
  getFriends: () => axiosInstance.get<TUser[]>("users"),

  fetchRelationsAsync: () =>
    axiosInstance.get<TUserRelations>("users/relations"),
  addFriend: (email: string) =>
    axiosInstance.post<TUser>(`users/relations/${email}`),
  acceptFriend: (email: string) =>
    axiosInstance.post<TUser>(`users/relations/accept/${email}`),
  deleteFriend: (email: string) =>
    axiosInstance.delete(`users/relations/${email}`),
  cancelRequest: (email: string) =>
    axiosInstance.delete(`users/relations/cancel/${email}`),
  cancelInRequest: (email: string) =>
    axiosInstance.delete(`users/relations/incoming/cancel/${email}`),
};
