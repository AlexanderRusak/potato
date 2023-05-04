import { createSelector } from 'reselect';
import { RootState } from '../store';
import { AchievementsState } from '../reducers/achievementReducer';

const selectAchievmentsState = (state: RootState): AchievementsState => state.achievments;

export const selectAchievements = createSelector(
  selectAchievmentsState,
  (achievmnentsState) => achievmnentsState.achievements
);
