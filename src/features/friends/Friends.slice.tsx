import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { friendsApi } from "../../api/friendsApi/friends.api";
import { TUser, TUserRelations } from "./Friends.types";
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from "../../utils";
import { RootState } from "../../app/store.types";
import { tasksApi } from "../../api/tasksApi/tasks.api";

export interface IFriendsState {
  users: TUser[];
  friends: TUser[];
  pending: TUser[];
  outgoing: TUser[];
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
  friends: [],
  pending: [],
  outgoing: [],
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
  reducers: {
    // setAllUsers: (state, action) => {
    //   state.allUsers = action.payload;
    // },
  },
  extraReducers: (builder) => {
    // FETCH
    builder.addCase(fetchRelationsAsync.pending, (state) => {
      state.meta.fetching = true;
    });
    builder.addCase(fetchRelationsAsync.fulfilled, (state, { payload }) => {
      state.friends = payload.friends;
      state.pending = payload.pending;
      state.outgoing = payload.outgoing;
      console.log(payload);
      state.meta.fetching = false;
    });
    builder.addCase(fetchRelationsAsync.rejected, (state, { payload }) => {
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

    // ACCEPT

    builder.addCase(acceptFriendAsync.pending, (state) => {
      state.meta.updating = true;
    });
    builder.addCase(acceptFriendAsync.fulfilled, (state, { payload }) => {
      state.meta.updating = false;
      const user = state.users.find((user) => payload === user.id);
      state.users.map(
        (user) =>
          user.id === payload && [...state.users, (user.status = "friends")],
      );
      if (!user) return;
      state.message = `User with name "${user.name}" add`;
    });
    builder.addCase(acceptFriendAsync.rejected, (state, { payload }) => {
      state.meta.updating = false;
    });

    // ADD

    builder.addCase(addFriendAsync.pending, (state) => {
      state.meta.updating = true;
    });
    builder.addCase(addFriendAsync.fulfilled, (state, { payload }) => {
      state.meta.updating = false;
      state.users.push(payload);
      state.message = `User with name "${payload.name}" add`;
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

export const fetchRelationsAsync = createAsyncThunk<
  TUserRelations,
  void,
  { rejectValue: string }
>("friendsReducer/fetchRelationsAsync", async (_, { rejectWithValue }) => {
  try {
    const { data } = await friendsApi.fetchRelationsAsync();
    return data;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
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
  async (email: string, { rejectWithValue }) => {
    try {
      const { data } = await friendsApi.addFriend(email);
      return data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  },
);

export const acceptFriendAsync = createAsyncThunk(
  "friendsReducer/acceptFriendAsync",
  async (id: string, { rejectWithValue }) => {
    try {
      await friendsApi.acceptFriend(id);
      return id;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  },
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
  },
);
// export const fetchAllUsersAsync = createAsyncThunk<
//   TUser[],
//   void,
//   { rejectValue: string }
// >(
//   "friendsReducer/fetchAllUsersAsync",
//   async (_, { rejectWithValue, dispatch }) => {
//     try {
//       const { data } = await friendsApi.getAllUsers();
//       dispatch(friendsActions.setAllUsers(data));
//       return data;
//     } catch (e: any) {
//       return rejectWithValue(e.message);
//     }
//   },
// );

export const { actions: friendsActions, reducer: friendsReducer } =
  friendsSlice;
