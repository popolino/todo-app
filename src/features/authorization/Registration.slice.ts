import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from "../../utils";
import { addCategoryAsync } from "../categories/Categories.slice";
import { RootState } from "../../app/store.types";
import {
  ICreateCategoryRequest,
  TCategory,
} from "../categories/Categories.types";
import { v4 as uuidv4 } from "uuid";
import { TCreateUserDto } from "./Authorization.types";
import { authorizationApi } from "../../api/authorizationApi/authorization.api";
import { TRegistrationFields } from "./Registration";

export interface IRegistrationState {
  registrationData: TRegistrationFields;
  message: any;
  status: "idle" | "loading" | "failed";
  meta: {
    fetching: boolean;
    creating: boolean;
    updating: boolean;
    deleting: boolean;
  };
}

export const initialState: IRegistrationState = {
  registrationData: { email: "", name: "", surname: "", password: "" },
  message: "",
  status: "idle",
  meta: {
    fetching: false,
    creating: false,
    updating: false,
    deleting: false,
  },
};

const registrationSlice = createSlice({
  name: "registrationReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ADD
    builder.addCase(createUser.pending, (state) => {
      state.meta.creating = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      // state.registrationData = action.payload;
      state.meta.creating = false;
    });
    builder.addCase(createUser.rejected, (state) => {
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
// export const createUser = createAsyncThunk(
//   "registrationReducer/createUser",
//   async (formValues: TRegistrationFields, { rejectWithValue, getState }) => {
//     try {
//       const response: any = await authorizationApi.createUser(formValues);
//       return data;
//     } catch (e: any) {
//       return rejectWithValue(e.message);
//     }
//   }
// );
export const createUser = createAsyncThunk<
  void,
  TRegistrationFields,
  { rejectValue: string }
>(
  "registrationReducer/createUser",
  async (formValues, { rejectWithValue, dispatch }) => {
    try {
      const response: any = await authorizationApi.createUser(formValues);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);
export const { actions: registrationActions, reducer: registrationReducer } =
  registrationSlice;
