import React, { useEffect } from "react";
import classes from "./CategoriesMain.module.scss";

import CategoryMain from "./category-main/CategoryMain";
import { TColors } from "../../../consts/colors";
import { useHorizontalScroll } from "src/hooks";
import { useBoundActions } from "../../../app/store";
import { useSnackbar } from "notistack";
import { fetchFriends } from "../../friends/Friends.slice";
import {
  addCategoryAsync,
  categoriesActions,
  deleteCategoryAsync,
  editCategoryAsync,
  fetchCategories,
} from "../../categories/Categories.slice";
import { fetchTasks, tasksActions } from "../tasks/Tasks.slice";
import { useAppSelector } from "../../../app/hooks";
import login from "../../authorization/Login";
type TCategory = {
  id: string;
  tasks: number;
  completedTasks: number;
  color: TColors;
  name: string;
};

const allActions = {
  fetchFriends,
  addCategoryAsync,
  deleteCategoryAsync,
  editCategoryAsync,
  fetchCategories,
  fetchTasks,
  ...categoriesActions,
  ...tasksActions,
};

const CategoriesMain = () => {
  const scrollArea = useHorizontalScroll();
  const boundActions = useBoundActions(allActions);
  const categories = useAppSelector(
    (state) => state.categoriesReducer.categories,
  );

  const authUser = useAppSelector(
    (state) => state.authorizationReducer.authUser,
  );

  useEffect(() => {
    authUser && boundActions.fetchCategories(authUser?.id);
    authUser && console.log("check");
  }, [authUser]);
  useEffect(() => {
    console.log(categories);
  }, [categories]);
  return (
    <>
      <div className="container">
        <div className="chapter">What’s up, {authUser?.name}?</div>
        <div className="title">CATEGORIES</div>
      </div>
      <div className={classes.gradient}>
        <div className={classes.categories} ref={scrollArea}>
          {categories
            .slice()
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
            .map((category) => (
              <CategoryMain
                setCategory={(category) =>
                  boundActions.setCurrentCategory(category)
                }
                setColor={(color) => boundActions.setColorCategory(color)}
                getTasks={(id) => boundActions.fetchTasks(id)}
                categories={categories}
                key={category.id}
                category={category}
                authUser={authUser}
              />
            ))}
        </div>
      </div>
    </>
  );
};
export default CategoriesMain;
