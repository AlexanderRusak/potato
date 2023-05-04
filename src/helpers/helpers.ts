import { CAHNCE_TIME_MAX } from '../settings';
import { achievements } from '../settings'

export const calculateRandomTime = (): number => Math.floor(Math.random() * CAHNCE_TIME_MAX) + 1;

export const getAchievedNumber = (counter: number): number | undefined => {
  const achieved = achievements.find((a) => counter >= a);
  if (achieved) {
    const index = achievements.indexOf(achieved);
    achievements.splice(index, 1);
  }
  return achieved;
};
