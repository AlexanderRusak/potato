import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_EXTRA_TIMEOUT } from '../../settings';

export interface ModeState {
  doubleModeTime: number;
  isIdle: boolean;
}

const initialState: ModeState = {
  doubleModeTime: DEFAULT_EXTRA_TIMEOUT,
  isIdle: false
};

const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    doubleMode: (state, action: PayloadAction<number>) => {
      state.doubleModeTime = action.payload;
    },
    idleMode: (state, action: PayloadAction<boolean>) => {
      state.isIdle = action.payload;
    },
  },
});

export const { doubleMode, idleMode } = modeSlice.actions;

export default modeSlice.reducer;
