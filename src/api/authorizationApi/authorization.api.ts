import axios from "../index";
import {
  TCreateUserDto,
  TLoginUserDto,
} from "../../features/authorization/Authorization.types";
import { TRegistrationFields } from "../../features/authorization/Registration";

export const authorizationApi = {
  createUser: (formValues: TRegistrationFields) => {
    return axios.post<TCreateUserDto>("auth/registration", formValues);
  },
  // loginUser: () => axios.post<TLoginUserDto>("auth/login"),
  // refreshUser: () => axios.put<TCreateUserDto>("auth/refresh"),
  // logoutUser: () => axios.delete("auth/logout"),
};
