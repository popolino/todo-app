export type TUser = {
  id: string;
  name: string;
  surname: string;
  email: string;
  picture: string | null;
  status?: "friends" | "pending" | "outgoing";
};

export interface TUserRelations {
  id: string; // ID авторизованного пользователя (ID отношений)
  userId: string; // ID авторизованного пользователя
  friends: TUser[]; // Массив друзей
  pending: TUser[]; // Массив запросов в ожидании
  outgoing: TUser[]; // Массив исходящих запросов
}
