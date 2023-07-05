import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from "../../utils";

import { TCreateUserDto, TLoginUserDto } from "./Authorization.types";
import { authorizationApi } from "../../api/authorizationApi/authorization.api";
import { TRegistrationFields } from "./Registration";
import { TLoginFields } from "./Login";
import { TUser } from "../friends/Friends.types";

export interface IAuthorizationState {
  registrationData: TRegistrationFields;
  loginData: TLoginUserDto;
  authUser: TUser | null;
  isAuth: boolean;
  token: string;
  message: any;
  status: "idle" | "loading" | "failed";
  meta: {
    fetching: boolean;
    creating: boolean;
    updating: boolean;
    deleting: boolean;
  };
}

export const initialState: IAuthorizationState = {
  registrationData: { email: "", name: "", surname: "", password: "" },
  loginData: {
    email: "",
    password: "",
    rememberMe: false,
  },
  authUser: null,
  isAuth: false,
  token: "",
  message: "",
  status: "idle",
  meta: {
    fetching: false,
    creating: false,
    updating: false,
    deleting: false,
  },
};

const authorizationSlice = createSlice({
  name: "authorizationReducer",
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setLogout: (state) => {
      state.loginData = { ...state.loginData, email: "", password: "" };
    },
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    // POST
    builder.addCase(fetchCreateUser.pending, (state) => {
      state.meta.creating = true;
    });
    builder.addCase(fetchCreateUser.fulfilled, (state, action) => {
      // state.registrationData = action.payload;
      state.meta.creating = false;
    });
    builder.addCase(fetchCreateUser.rejected, (state) => {
      state.meta.creating = false;
    });
    // POST
    builder.addCase(fetchLogin.pending, (state) => {
      state.meta.creating = true;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      // state.registrationData = action.payload;
      state.meta.creating = false;
    });
    builder.addCase(fetchLogin.rejected, (state) => {
      state.meta.creating = false;
    });

    builder.addMatcher(isPendingAction, (state) => {
      state.status = "loading";
      state.message = "";
    });
    builder.addMatcher(isFulfilledAction, (state) => {
      state.status = "idle";
    });
    builder.addMatcher(isRejectedAction, (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    });
  },
});

export const fetchCreateUser = createAsyncThunk(
  "authorizationReducer/createUser",
  async (formValues: TRegistrationFields, { rejectWithValue, dispatch }) => {
    try {
      const response = await authorizationApi.createUser(formValues);
      const loginData = {
        email: formValues.email,
        password: formValues.password,
        rememberMe: false,
      };
      dispatch(fetchLogin(loginData));
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchLogin = createAsyncThunk(
  "authorizationReducer/fetchLogin",
  async (formValues: TLoginFields, { rejectWithValue, dispatch }) => {
    try {
      const response = await authorizationApi.loginUser(formValues);
      dispatch(authorizationSlice.actions.setIsAuth(true));
      localStorage.setItem("access_token", `${response.data.access_token}`);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchLogout = createAsyncThunk(
  "authReducer/fetchLogout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await authorizationApi.logoutUser();
      dispatch(authorizationSlice.actions.setLogout());
      dispatch(authorizationSlice.actions.setIsAuth(false));
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchAuthMe = createAsyncThunk(
  "authReducer/fetchAuthMe",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await authorizationApi.authMe();
      dispatch(authorizationSlice.actions.setIsAuth(true));
      dispatch(authorizationActions.setAuthUser(response.data));
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const { actions: authorizationActions, reducer: authorizationReducer } =
  authorizationSlice;
