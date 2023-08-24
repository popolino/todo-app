import { colors, TColors } from "src/consts/colors";
import { TTask } from "./Tasks.types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tasksApi } from "src/api/tasksApi/tasks.api";
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from "src/utils";
import { RootState } from "src/app/store.types";

const initialColor = colors[0].name;
export interface ITasksState {
  tasks: TTask[];
  input: string;
  color: TColors;
  creationModalOpen: boolean;
  editModalOpen: boolean;
  status: "idle" | "loading" | "failed";
  message: any;
  meta: {
    fetching: boolean;
    creating: boolean;
    updating: boolean;
    deleting: boolean;
  };
}
export const initialState: ITasksState = {
  tasks: [],
  input: "",
  color: initialColor,
  status: "idle",
  creationModalOpen: false,
  editModalOpen: false,
  message: "",
  meta: {
    fetching: false,
    creating: false,
    updating: false,
    deleting: false,
  },
};

const tasksSlice = createSlice({
  name: "tasksReducer",
  initialState,
  reducers: {
    setInput: (state, action: PayloadAction<string>) => {
      state.input = action.payload;
    },
    closeCreationModal: (state) => {
      state.creationModalOpen = false;
    },
    openCreationModal: (state) => {
      state.creationModalOpen = true;
      state.input = "";
    },
    openEditModal: (state, action: PayloadAction<string>) => {
      state.editModalOpen = true;
      state.input = action.payload;
    },
    closeEditModal: (state) => {
      state.editModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    // FETCH

    builder.addCase(fetchTasks.pending, (state) => {
      state.meta.fetching = true;
    });
    builder.addCase(fetchTasks.fulfilled, (state, { payload }) => {
      state.tasks = payload;
      state.meta.fetching = false;
    });
    builder.addCase(fetchTasks.rejected, (state, { payload }) => {
      state.meta.fetching = false;
    });
    // ADD

    builder.addCase(addTaskAsync.pending, (state) => {
      state.meta.creating = true;
    });
    builder.addCase(addTaskAsync.fulfilled, (state, { payload }) => {
      state.meta.creating = false;
      state.tasks.push(payload);
      state.input = "";
      state.creationModalOpen = false;
    });
    builder.addCase(addTaskAsync.rejected, (state, { payload }) => {
      state.meta.creating = false;
    });

    // EDIT

    builder.addCase(editTaskAsync.pending, (state) => {
      state.meta.updating = true;
    });
    builder.addCase(editTaskAsync.fulfilled, (state, { payload }) => {
      state.meta.updating = false;
      state.tasks = state.tasks.map((task) =>
        task.id === payload.id ? payload : task
      );
      state.input = "";
      state.editModalOpen = false;
    });
    builder.addCase(editTaskAsync.rejected, (state, { payload }) => {
      state.meta.updating = false;
    });

    // DELETE

    builder.addCase(deleteTaskAsync.pending, (state) => {
      state.meta.deleting = true;
    });
    builder.addCase(deleteTaskAsync.fulfilled, (state, { payload }) => {
      state.meta.deleting = false;
      const task = state.tasks.find((task) => payload === task.id);
      state.tasks = state.tasks.filter((task) => task.id !== payload);
      if (!task) return;
      state.message = `Task with name "${task.text}" deleted`;
    });
    builder.addCase(deleteTaskAsync.rejected, (state, { payload }) => {
      state.meta.deleting = false;
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

export const fetchTasks = createAsyncThunk<
  TTask[],
  string,
  { rejectValue: string }
>("tasksReducer/fetchTasks", async (id, { rejectWithValue }) => {
  try {
    const { data } = await tasksApi.getTasks(id);
    return data;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});
export const addTaskAsync = createAsyncThunk(
  "tasksReducer/addTaskAsync",
  async (_, { rejectWithValue, getState }) => {
    const globalState = getState() as RootState;
    try {
      const task = {
        categoryId: "9d5ae48b-9d9a-4a07-afa7-f748ca28bd3c",
        text: globalState.tasksReducer.input,
      };
      const { data } = await tasksApi.addTask(task);
      return data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);
export const completeTaskAsync = createAsyncThunk(
  "tasksReducer/completeTaskAsync",
  async (task: TTask, { rejectWithValue, getState }) => {
    const globalState = getState() as RootState;
    try {
      const { data } = await tasksApi.completeTask(task.id, task);
      return data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);
export const deleteTaskAsync = createAsyncThunk(
  "tasksReducer/deleteTaskAsync",
  async (id: string, { rejectWithValue }) => {
    try {
      await tasksApi.deleteTask(id);
      return id;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const editTaskAsync = createAsyncThunk(
  "tasksReducer/editTaskAsync",
  async (task: TTask, { rejectWithValue }) => {
    try {
      await tasksApi.editTask(
        { text: task.text, color: "blue", isCompleted: task.isCompleted },
        task.id
      );
      return task;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const { actions: tasksActions, reducer: tasksReducer } = tasksSlice;
