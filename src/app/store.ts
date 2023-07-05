import { configureStore, ActionCreatorsMapObject } from "@reduxjs/toolkit";
import { tasksReducer } from "src/features/main/tasks/Tasks.slice";
import { friendsReducer } from "src/features/friends/Friends.slice";
import { useAppDispatch } from "./hooks";
import bindActionCreators from "react-redux/es/utils/bindActionCreators";
import { useMemo } from "react";
import { BoundActions } from "./store.types";
import { categoriesReducer } from "src/features/categories/Categories.slice";
import { authorizationReducer } from "src/features/authorization/Authorization.slice";

export const store = configureStore({
  reducer: {
    categoriesReducer,
    tasksReducer,
    friendsReducer,
    authorizationReducer,
  },
});

export const useBoundActions = <Actions extends ActionCreatorsMapObject>(
  actions: Actions
): BoundActions<Actions> => {
  const dispatch = useAppDispatch();

  // @ts-ignore
  return useMemo(() => bindActionCreators(actions, dispatch), []);
};
