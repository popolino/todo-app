import { ICreateCategoryRequest, TCategory } from "./Categories.types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { categoriesApi } from "../../api/categoriesApi/categories.api";
import { colors, TColors } from "../../consts/colors";
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from "../../utils";
import { RootState } from "../../app/store.types";
import { v4 as uuidv4 } from "uuid";

const userId = "1";
const initialColor = colors[0].name;
export interface ICategoriesState {
  categories: TCategory[];
  input: string;
  color: TColors;
  members: string[];
  message: any;
  status: "idle" | "loading" | "failed";
  creationModalOpen: boolean;
  editModalOpen: boolean;
  meta: {
    fetching: boolean;
    creating: boolean;
    updating: boolean;
    deleting: boolean;
  };
}

export const initialState: ICategoriesState = {
  categories: [],
  input: "",
  color: initialColor,
  members: [],
  message: "",
  status: "idle",
  creationModalOpen: false,
  editModalOpen: false,
  meta: {
    fetching: false,
    creating: false,
    updating: false,
    deleting: false,
  },
};

const categoriesSlice = createSlice({
  name: "categoriesReducer",
  initialState,
  reducers: {
    setInput: (state, action: PayloadAction<string>) => {
      state.input = action.payload;
    },
    changeColor: (state, action: PayloadAction<TColors>) => {
      state.color = action.payload;
    },
    changeMembers: (state, action: PayloadAction<string[]>) => {
      state.members = action.payload;
    },
    closeCreationModal: (state) => {
      state.creationModalOpen = false;
    },
    openCreationModal: (state) => {
      state.creationModalOpen = true;
      state.input = "";
      state.members = [];
      state.color = initialColor;
    },
    closeEditModal: (state) => {
      state.editModalOpen = false;
    },
    openEditModal: (state, action: PayloadAction<TCategory>) => {
      state.editModalOpen = true;
      state.input = action.payload.name;
      state.members = action.payload.members.map((m) => m.id);
      state.color = action.payload.color;
    },
  },
  extraReducers: (builder) => {
    // FETCH

    builder.addCase(fetchCategories.pending, (state) => {
      state.meta.fetching = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, { payload }) => {
      state.categories = payload;
      state.meta.fetching = false;
    });
    builder.addCase(fetchCategories.rejected, (state, { payload }) => {
      state.meta.fetching = false;
    });
    // ADD

    builder.addCase(addCategoryAsync.pending, (state) => {
      state.meta.creating = true;
    });
    builder.addCase(addCategoryAsync.fulfilled, (state, { payload }) => {
      state.meta.creating = false;
      state.categories.push(payload);
      state.input = "";
      state.creationModalOpen = false;
    });
    builder.addCase(addCategoryAsync.rejected, (state, { payload }) => {
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

export const fetchCategories = createAsyncThunk<
  TCategory[],
  void,
  { rejectValue: string }
>("categoriesReducer/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    const { data } = await categoriesApi.getCategories();
    return data;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const addCategoryAsync = createAsyncThunk(
  "categoriesReducer/addCategoryAsync",
  async (_, { rejectWithValue, getState }) => {
    const globalState = getState() as RootState;
    const category: ICreateCategoryRequest = {
      name: globalState.categoriesReducer.input,
      color: globalState.categoriesReducer.color,
      memberIds: globalState.categoriesReducer.members,
    };
    try {
      // const { data } = await categoriesApi.addCategory(category);
      // на момент пока фейковая апишка
      const fakeData: TCategory = {
        id: uuidv4(),
        name: category.name,
        color: category.color,
        members: [],
        creatorId: userId,
        completedTaskCount: 0,
        taskCount: 0,
      };
      return fakeData;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);
export const deleteCategoryAsync = createAsyncThunk<
  undefined,
  string,
  { rejectValue: string }
>("categoriesReducer/deleteCategoryAsync", async (id, { rejectWithValue }) => {
  try {
    await categoriesApi.deleteTodo(id);
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const { actions: categoriesActions, reducer: categoriesReducer } =
  categoriesSlice;
