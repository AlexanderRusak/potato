import { createSelector } from 'reselect';
import { RootState } from '../store';
import { CounterState } from '../reducers/counterReducer';

const selectCounterState = (state: RootState): CounterState => state.counter;

export const selectCount = createSelector(
  selectCounterState,
  (counterState) => counterState.count
);
