export type TUser = {
  id: string;
  name: string;
  surname: string;
  email: string;
  picture: string | null;
  status: "friends" | "pending" | "outgoing";
};
