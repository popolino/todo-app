import { createSlice } from "@reduxjs/toolkit";
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from "../../utils";
import { TUser } from "../friends/Friends.types";

export interface IFriendsState {
  user: TUser | null;
  status: "idle" | "loading" | "failed";
  message: any;
  meta: {
    fetching: boolean;
    creating: boolean;
    updating: boolean;
    deleting: boolean;
  };
}
export const initialState: IFriendsState = {
  user: null,
  status: "idle",
  message: "",
  meta: {
    fetching: false,
    creating: false,
    updating: false,
    deleting: false,
  },
};

const settingsSlice = createSlice({
  name: "settingsReducer",
  initialState,
  reducers: {
    // setAllUsers: (state, action) => {
    //   state.allUsers = action.payload;
    // },
  },
  extraReducers: (builder) => {
    // CANCEL

    // builder.addCase(cancelInRequestAsync.pending, (state) => {
    //   state.meta.updating = true;
    // });
    // builder.addCase(cancelInRequestAsync.fulfilled, (state, { payload }) => {
    //   state.meta.updating = false;
    // });
    // builder.addCase(cancelInRequestAsync.rejected, (state, { payload }) => {
    //   state.meta.updating = false;
    // });

    // MATCHER
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

export const { actions: settingsActions, reducer: settingsReducer } =
  settingsSlice;
