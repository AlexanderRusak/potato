import { calculateRandomTime } from './helpers';
import { CHANCE_TIME_MAX } from '../settings';

describe('calculateRandomTime', () => {
  it(`it should return a number between 1 and ${CHANCE_TIME_MAX}`, () => {
    const result = calculateRandomTime();
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(CHANCE_TIME_MAX);
    expect(Number.isInteger(result)).toBe(true);
  });
});










