import {
  ICreateCategoryRequest,
  TCategory,
  TDeleteCategoryRequest,
  TEditCategoryRequest,
} from "../../features/categories/Categories.types";
import { axiosInstance } from "../index";

export const categoriesApi = {
  getCategories: () => axiosInstance.get<TCategory[]>("categories"),
  addCategory: (category: ICreateCategoryRequest) =>
    axiosInstance.post<TCategory>("categories", category),
  editCategory: (category: TEditCategoryRequest) =>
    axiosInstance.patch<TEditCategoryRequest>("categories", category),
  deleteCategory: (id: string) => axiosInstance.delete(`categories/${id}`),
};
