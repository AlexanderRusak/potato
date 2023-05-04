import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_COUNT_STATE } from '../../settings';

export interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: DEFAULT_COUNT_STATE,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
    decrement: (state, action: PayloadAction<number>) => {
      state.count -= action.payload;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
