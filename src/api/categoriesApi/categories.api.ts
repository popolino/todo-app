import { TCategory } from "../../features/categories/Categories.types";
import { CategoriesMock } from "../../features/categories/Categories.mock";

export const categoriesApi = {
  getFakeCategories: () =>
    new Promise<{ data: TCategory[] }>((resolve) =>
      setTimeout(() => resolve({ data: CategoriesMock }), 1000)
    ),
};
