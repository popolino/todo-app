import axios from "axios";
import { TLoginFields } from "../../features/authorization/Login";
import { TAuthResponse } from "../../features/authorization/Authorization.types";
import { axiosInstance } from "../index";
import { TRegistrationFields } from "../../features/authorization/Registration";
import { TUser } from "../../features/friends/Friends.types";

const BASE_URL = "http://localhost:3002";

interface LoginResponse {
  message: string;
  access_token: string;
  user: {
    id: number;
    name: string;
    surname: string;
    email: string;
    picture?: string | null;
    status?: "friends" | "pending" | "outgoing";
    createdAt: string;
    updatedAt: string;
  };
}

interface LoginData {
  email: string;
  password: string;
}

export const authorizationApi = {
  createUser: (formValues: TRegistrationFields) => {
    return axiosInstance.post<TAuthResponse>("/registration", formValues);
  },
  loginUser: (formValues: TLoginFields) => {
    return axiosInstance.post<TAuthResponse>("/login", formValues);
  },
  logoutUser: () => {
    return axiosInstance.delete("/logout");
  },
  authMe: () => {
    return axiosInstance.get<TUser>("/authMe");
  },
  refresh: () => {
    return axios.put<TAuthResponse>(`${BASE_URL}auth/refresh`, null, {
      withCredentials: true,
    });
  },
};

export const loginUser = async (
  loginData: LoginData,
): Promise<LoginResponse | null> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${BASE_URL}/login`,
      loginData,
    );
    console.log("Успешный вход:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Ошибка при входе:", error.response?.data || error.message);
    } else {
      console.error("Непредвиденная ошибка:", error);
    }
    return null;
  }
};

// import { axiosInstance, BASE_URL } from "../index";
// import { TAuthResponse } from "../../features/authorization/Authorization.types";
// import { TRegistrationFields } from "../../features/authorization/Registration";
// import { TLoginFields } from "../../features/authorization/Login";
// import { TUser } from "../../features/friends/Friends.types";
// import axios from "axios";
//
// export const authorizationApi = {
//   createUser: (formValues: TRegistrationFields) => {
//     return axiosInstance.post<TAuthResponse>("/registration", formValues);
//   },
//   loginUser: (formValues: TLoginFields) => {
//     return axiosInstance.post<TAuthResponse>("/login", formValues);
//   },
//   logoutUser: () => {
//     return axiosInstance.delete("auth/logout");
//   },
//   authMe: () => {
//     return axiosInstance.get<TUser>("auth/me");
//   },
//   refresh: () => {
//     return axios.put<TAuthResponse>(`${BASE_URL}auth/refresh`, null, {
//       withCredentials: true,
//     });
//   },
// };
// //email: polino@gmail.com
// //name: Po
// //surname: Lino
// //password:123456
