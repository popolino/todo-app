import {
  ICreateCategoryRequest,
  TCategory,
  TDeleteCategoryRequest,
  TEditCategoryRequest,
} from "./Categories.types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { categoriesApi } from "../../api/categoriesApi/categories.api";
import { colors, TColors } from "../../consts/colors";
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from "../../utils";
import { RootState } from "../../app/store.types";
import categories from "./Categories";
import login from "../authorization/Login";

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
    editModal: (state, action: PayloadAction<TEditCategoryRequest>) => {
      state.categories = [
        ...state.categories.map((category) =>
          action.payload && category.id === action.payload.id
            ? {
                ...category,
                name: state.input,
                // members: action.payload.memberIds,
                color: state.color,
              }
            : category,
        ),
      ];
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
    builder.addCase(deleteCategoryAsync.pending, (state) => {
      state.meta.creating = true;
    });
    builder.addCase(deleteCategoryAsync.fulfilled, (state, { payload }) => {
      state.meta.creating = false;
      state.categories = state.categories.filter(
        (category) => category.id !== payload,
      );
    });
    builder.addCase(deleteCategoryAsync.rejected, (state, { payload }) => {
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
  string,
  { rejectValue: string }
>("categoriesReducer/fetchCategories", async (userId, { rejectWithValue }) => {
  try {
    const { data } = await categoriesApi.getCategories(userId);
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
      const { data } = await categoriesApi.addCategory(category);
      return data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  },
);

export const deleteCategoryAsync = createAsyncThunk(
  "categoriesReducer/deleteCategoryAsync",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      await categoriesApi.deleteCategory(id);
      return id;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  },
);

export const editCategoryAsync = createAsyncThunk(
  "categoriesReducer/editCategoryAsync",
  async (
    currentCategory: TEditCategoryRequest,
    { rejectWithValue, dispatch },
  ) => {
    try {
      const { data } = await categoriesApi.editCategory(currentCategory);
      dispatch(categoriesActions.editModal(data));
      return data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  },
);

export const { actions: categoriesActions, reducer: categoriesReducer } =
  categoriesSlice;
