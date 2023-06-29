import {
  ICreateCategoryRequest,
  TCategory,
} from "../../features/categories/Categories.types";
import axios from "../index";

export const categoriesApi = {
  getCategories: () => axios.get<TCategory[]>("categories"),
  addCategory: (category: ICreateCategoryRequest) =>
    axios.post<TCategory>("categories", category),
  deleteTodo: (id: string) => axios.delete(`categories/${id}`),
};
