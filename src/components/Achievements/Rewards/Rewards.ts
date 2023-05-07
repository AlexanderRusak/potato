import { achievements } from '../../../settings';

export type RewardsType = { [key: number]: string };

export const Rewards = achievements.reduce((acc, curr) => {
  acc[curr] = `./static/achievements/${curr}.png`;
  return acc;
}, {} as RewardsType);
