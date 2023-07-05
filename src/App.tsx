import React, { useEffect } from "react";
import "src/assets/scss/reset.scss";
import "./assets/scss/global.scss";
import Router from "./routes/Router";
import {
  authorizationActions,
  fetchAuthMe,
  fetchLogin,
} from "./features/authorization/Authorization.slice";
import { useBoundActions } from "./app/store";
import { useAppSelector } from "./app/hooks";
const allActions = {
  fetchAuthMe,
  ...authorizationActions,
};
const App = () => {
  const boundActions = useBoundActions(allActions);

  const authUser = useAppSelector(
    (state) => state.authorizationReducer.authUser
  );
  useEffect(() => {
    boundActions.fetchAuthMe();
  }, []);
  return <Router />;
};
export default App;
