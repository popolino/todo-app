import React, { useEffect } from "react";
import Tasks from "./tasks/Tasks";
import CategoriesMain from "./categories-main/CategoriesMain";
import { useAppSelector } from "../../app/hooks";
import { Navigate } from "react-router-dom";
import { useBoundActions } from "../../app/store";
import {
  authorizationActions,
  fetchLogout,
} from "../authorization/Authorization.slice";
import { fetchCategories } from "../categories/Categories.slice";

const allActions = {
  fetchLogout,
  fetchCategories,
  ...authorizationActions,
};
const Main = () => {
  const boundActions = useBoundActions(allActions);

  const isAuth = useAppSelector((state) => state.authorizationReducer.isAuth);
  const categories = useAppSelector(
    (state) => state.categoriesReducer.categories
  );

  useEffect(() => {
    boundActions.fetchCategories();
  }, []);

  console.log(categories);
  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <CategoriesMain categories={categories} />
      <Tasks />
    </>
  );
};
export default Main;
