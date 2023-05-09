import { CHANCE_TIME_MAX } from '../settings';
import { achievements } from '../settings'

export const calculateRandomTime = (): number => Math.floor(Math.random() * CHANCE_TIME_MAX) + 1;

export const getAchievedNumber = (counter: number): number | undefined => {
  const achieved = achievements.find((a) => counter >= a);
  if (achieved) {
    const index = achievements.indexOf(achieved);
    achievements.splice(index, 1);
  }
  return achieved;
};


export const updateScoreInLocalStorage = (score: number): void => {
  localStorage.setItem('score', String(score));
}

export const getScoreFromLocalStorage = (): number | null => {
  const scoreStr = localStorage.getItem('score');
  return scoreStr ? Number.parseInt(scoreStr, 10) : null;
}

export const removeFromFromLocalStorage = (): void => {
  localStorage.removeItem('score');
}
