import { Rewards, RewardsType } from './Rewards';
import { achievements } from '../../../settings';

describe('Rewards', () => {
  test('should generate correct paths for achievements images', () => {
    const expectedRewards: RewardsType = {};
    achievements.forEach((achievement) => {
      expectedRewards[achievement] = `./static/achievements/${achievement}.png`;
    });

    expect(Rewards).toEqual(expectedRewards);
  });
});