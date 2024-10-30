import {
  ICreateCategoryRequest,
  IGetCategoryRequest,
  TCategory,
  TDeleteCategoryRequest,
  TEditCategoryRequest,
} from "../../features/categories/Categories.types";
import { axiosInstance } from "../index";

export const categoriesApi = {
  getCategories: (userId: string) =>
    axiosInstance.get<TCategory[]>(`categories/?userId=${userId}`),
  addCategory: (category: ICreateCategoryRequest) =>
    axiosInstance.post<TCategory>("categories", category),
  editCategory: (category: TEditCategoryRequest) =>
    axiosInstance.patch<TEditCategoryRequest>("categories", category),
  deleteCategory: (id: string) => axiosInstance.delete(`categories/${id}`),
};
