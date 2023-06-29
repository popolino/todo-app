export type TCreateUserDto = {
  email: string;
  name: string;
  surname: string;
  password: string;
};
export type TLoginUserDto = {
  email: string;
  password: string;
  rememberMe: boolean;
};
