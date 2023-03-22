import { TCategory } from "./Categories.types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { categoriesApi } from "../../api/categoriesApi/categories.api";
import { colors, TColors } from "../../consts/colors";
import { v4 as uuid } from "uuid";
import { findUser } from "./categories.utils";
import { friends } from "../friends/Friends.mock";

const userId = "1";
const initialColor = colors[0].name;
export interface ICategoriesState {
  categories: TCategory[];
  fetchingStatus: "idle" | "loading" | "failed";
  errorMessage: string | undefined;
  input: string;
  color: TColors;
  members: string[];
  creationModalOpen: boolean;
}

export const initialState: ICategoriesState = {
  categories: [],
  fetchingStatus: "idle",
  errorMessage: undefined,
  input: "",
  color: initialColor,
  members: [],
  creationModalOpen: false,
};

const categoriesSlice = createSlice({
  name: "categoriesReducer",
  initialState,
  reducers: {
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
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
    createCategory: (state) => {
      state.categories.push({
        id: uuid(),
        creatorId: userId,
        name: state.input,
        color: state.color,
        members:
          state.members.map((memberId) => findUser(memberId) || friends[0]) ||
          null,
      });
      state.creationModalOpen = false;
    },
  },
  // setCategories([
  //   ...categories,
  //   {
  //     id: uuid(),
  //     creatorId: userId,
  //     name: input,
  //     color: color,
  //     members:
  //       members.map((memberId) => findUser(memberId) || friends[0]) || null,
  //   },
  // ]);

  // setCategoriesCreationOpen(false);
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.fetchingStatus = "loading";
    });
    builder.addCase(fetchCategories.fulfilled, (state, { payload }) => {
      state.fetchingStatus = "idle";
      state.categories = payload;
    });
    builder.addCase(fetchCategories.rejected, (state, { payload }) => {
      state.fetchingStatus = "failed";
      state.errorMessage = payload;
    });
  },
});

export const fetchCategories = createAsyncThunk<
  TCategory[],
  void,
  { rejectValue: string }
>("categoriesReducer/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    const { data } = await categoriesApi.getFakeCategories();
    return data;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const {
  deleteCategory,
  setInput,
  changeColor,
  changeMembers,
  openCreationModal,
  closeCreationModal,
  createCategory,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
