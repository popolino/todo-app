import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { friendsApi } from "../../api/friendsApi/friends.api";
import { TUser } from "./Friends.types";
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from "../../utils";
import { RootState } from "../../app/store.types";
import { tasksApi } from "../../api/tasksApi/tasks.api";

export interface IFriendsState {
  users: TUser[];
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
  users: [],
  status: "idle",
  message: "",
  meta: {
    fetching: false,
    creating: false,
    updating: false,
    deleting: false,
  },
};

const friendsSlice = createSlice({
  name: "friendsReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // FETCH
    builder.addCase(fetchFriends.pending, (state) => {
      state.meta.fetching = true;
    });
    builder.addCase(fetchFriends.fulfilled, (state, { payload }) => {
      state.users = payload;
      state.meta.fetching = false;
    });
    builder.addCase(fetchFriends.rejected, (state, { payload }) => {
      state.meta.fetching = false;
    });

    // DELETE

    builder.addCase(deleteFriendAsync.pending, (state) => {
      state.meta.deleting = true;
    });
    builder.addCase(deleteFriendAsync.fulfilled, (state, { payload }) => {
      state.meta.deleting = false;
      const user = state.users.find((user) => payload === user.id);
      state.users = state.users.filter((user) => user.id !== payload);
      if (!user) return;
      state.message = `Task with name "${user.name}" deleted`;
    });
    builder.addCase(deleteFriendAsync.rejected, (state, { payload }) => {
      state.meta.deleting = false;
    });

    // ADD

    builder.addCase(addFriendAsync.pending, (state) => {
      state.meta.updating = true;
    });
    builder.addCase(addFriendAsync.fulfilled, (state, { payload }) => {
      state.meta.updating = false;
      const user = state.users.find((user) => payload === user.id);
      state.users.map(
        (user) =>
          user.id === payload && [...state.users, (user.status = "friends")]
      );
      if (!user) return;
      state.message = `Task with name "${user.name}" add`;
    });
    builder.addCase(addFriendAsync.rejected, (state, { payload }) => {
      state.meta.updating = false;
    });

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
export const fetchFriends = createAsyncThunk<
  TUser[],
  void,
  { rejectValue: string }
>("friendsReducer/fetchFriends", async (_, { rejectWithValue }) => {
  try {
    const { data } = await friendsApi.getFriends();
    return data;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const addFriendAsync = createAsyncThunk(
  "friendsReducer/addFriendAsync",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await friendsApi.acceptFriend(id);
      return id;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const deleteFriendAsync = createAsyncThunk(
  "friendsReducer/deleteFriendAsync",
  async (id: string, { rejectWithValue }) => {
    try {
      await friendsApi.deleteFriend(id);
      return id;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const { actions: friendsActions, reducer: friendsReducer } =
  friendsSlice;
