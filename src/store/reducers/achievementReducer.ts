import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AchievementsState {
  achievements: number[]
}

const initialState: AchievementsState = {
  achievements: []
};

const achievementsSlice = createSlice({
  name: 'achievments',
  initialState,
  reducers: {
    addAchievement: (state, action: PayloadAction<number>) => {
      state.achievements.push(action.payload);
    },
  },
});

export const { addAchievement } = achievementsSlice.actions;

export default achievementsSlice.reducer;
