import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_EXTRA_TIMEOUT } from '../../settings';

export interface ModeState {
  extraModeTime: number;
  isExtraModeEnabled: boolean;
  isIdle: boolean
}

const initialState: ModeState = {
  extraModeTime: DEFAULT_EXTRA_TIMEOUT,
  isIdle: false,
  isExtraModeEnabled: false
};

const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    extraTime: (state, action: PayloadAction<number>) => {
      state.isExtraModeEnabled = !!action.payload
      state.extraModeTime = action.payload;
    },
    idleMode: (state, action: PayloadAction<boolean>) => {
      state.isIdle = action.payload;
    },
  },
});

export const { extraTime, idleMode } = modeSlice.actions;

export default modeSlice.reducer;
