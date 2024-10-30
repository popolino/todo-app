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

const allActions = {
  fetchLogout,
  ...authorizationActions,
};
const Main = () => {
  const boundActions = useBoundActions(allActions);

  const isAuth = useAppSelector((state) => state.authorizationReducer.isAuth);

  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <CategoriesMain />
      <Tasks />
    </>
  );
};
export default Main;
