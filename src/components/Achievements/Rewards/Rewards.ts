import { achievements } from '../../../settings';

type RewardsType = { [key: number]: string };

export const Rewards = achievements.reduce((acc, curr) => {
  acc[curr] = `./static/achievements/${curr}.png`;
  return acc;
}, {} as RewardsType);
