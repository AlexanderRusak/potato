/* eslint-disable @typescript-eslint/indent */
import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import counterReducer from './reducers/counterReducer';
import modeReducer from './reducers/modeReducer';
import achievmentReducer from './reducers/achievementReducer';

export const rootReducer = combineReducers({
  counter: counterReducer,
  mode: modeReducer,
  achievments: achievmentReducer
});



export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
