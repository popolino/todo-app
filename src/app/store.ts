import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import categoriesReducer from 'src/features/categories/Categories.slice'

export const store = configureStore({
  reducer: {
    categoriesReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
