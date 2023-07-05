import { axiosInstance, BASE_URL } from "../index";
import {
  TAuthResponse,
  TCreateUserDto,
  TLoginUserDto,
} from "../../features/authorization/Authorization.types";
import { TRegistrationFields } from "../../features/authorization/Registration";
import { TLoginFields } from "../../features/authorization/Login";
import { TUser } from "../../features/friends/Friends.types";
import axios from "axios";

export const authorizationApi = {
  createUser: (formValues: TRegistrationFields) => {
    return axiosInstance.post<TAuthResponse>("auth/registration", formValues);
  },
  loginUser: (formValues: TLoginFields) => {
    return axiosInstance.post<TAuthResponse>("auth/login", formValues);
  },
  logoutUser: () => {
    return axiosInstance.delete("auth/logout");
  },
  authMe: () => {
    return axiosInstance.get<TUser>("auth/me");
  },
  refresh: () => {
    return axios.put<TAuthResponse>(`${BASE_URL}auth/refresh`, null, {
      withCredentials: true,
    });
  },
};
//email: polino@gmail.com
//name: Po
//surname: Lino
//password:123456
