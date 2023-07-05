import {
  ICreateCategoryRequest,
  TCategory,
} from "../../features/categories/Categories.types";
import { axiosInstance } from "../index";
import { TColors } from "../../consts/colors";

export const categoriesApi = {
  getCategories: () => axiosInstance.get<TCategory[]>("categories"),
  addCategory: (category: ICreateCategoryRequest) =>
    axiosInstance.post<TCategory>("categories", category),
  editCategory: (category: {
    id: string;
    name: string;
    color: TColors;
    memberIds: string[];
  }) =>
    axiosInstance.patch<{
      id: string;
      name: string;
      color: TColors;
      memberIds: string[];
    }>("categories", category),
  deleteTodo: (id: string) => axiosInstance.delete(`categories/${id}`),
};
