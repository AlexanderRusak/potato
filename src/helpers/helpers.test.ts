import { calculateRandomTime } from './helpers';
import { CHANCE_TIME_MAX } from '../settings';
import { updateScoreInLocalStorage, getScoreFromLocalStorage, removeFromFromLocalStorage } from '../helpers/helpers';

describe('calculateRandomTime', () => {
  it(`it should return a number between 1 and ${CHANCE_TIME_MAX}`, () => {
    const result = calculateRandomTime();
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(CHANCE_TIME_MAX);
    expect(Number.isInteger(result)).toBe(true);
  });
});


describe('updateScoreInLocalStorage', () => {
  it('it should update the score in local storage', () => {
    updateScoreInLocalStorage(42);
    expect(localStorage.getItem('score')).toBe('42');
  });
});

describe('getScoreFromLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('it should return null if the score is not set in local storage', () => {
    expect(getScoreFromLocalStorage()).toBe(null);
  });

  it('it should return the score from local storage', () => {
    localStorage.setItem('score', '42');
    expect(getScoreFromLocalStorage()).toBe(42);
  });
});

describe('removeFromFromLocalStorage', () => {
  it('it should remove the score from local storage', () => {
    localStorage.setItem('score', '42');
    removeFromFromLocalStorage();
    expect(localStorage.getItem('score')).toBe(null);
  });
});







