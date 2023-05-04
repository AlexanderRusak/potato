import { calculateRandomTime } from './helpers';
import { CAHNCE_TIME_MAX } from '../settings';

describe('calculateRandomTime', () => {
  it(`it should return a number between 1 and ${CAHNCE_TIME_MAX}`, () => {
    const result = calculateRandomTime();
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(CAHNCE_TIME_MAX);
    expect(Number.isInteger(result)).toBe(true);
  });
});










