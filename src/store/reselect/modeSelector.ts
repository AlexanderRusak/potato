import { createSelector } from 'reselect';
import { RootState } from '../store';
import { ModeState } from '../reducers/modeReducer';

export const getModeState = (state: RootState): ModeState => state.mode;

export const selectMode = createSelector(
  getModeState,
  (modeState) => ({
    extraModeTime: modeState.extraModeTime,
    isExtraModeEnabled: modeState.isExtraModeEnabled,
    isIdle: modeState.isIdle
  })
);
