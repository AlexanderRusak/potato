import { renderHook } from '@testing-library/react-hooks';
import { useAppSelector } from '../store/hooks/useAppSelector';
import { useAppDispatch } from '../store/hooks/useAppDispatch';
import { addAchievement } from '../store/reducers/achievementReducer';
import { selectCount } from '../store/reselect/counterSelector';
import { selectAchievements } from '../store/reselect/achievementsSelector';
import { useAchievementsHandler } from './useAchievementsHandler';
import { getAchievedNumber } from '../helpers/helpers';

jest.mock('../store/hooks/useAppDispatch', () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock('../store/hooks/useAppSelector', () => ({
  useAppSelector: jest.fn(),
}));

jest.mock('../helpers/helpers', () => ({
  getAchievedNumber: jest.fn(),
}));

describe('useAchievementsHandler', () => {
  let dispatch: jest.Mock;

  beforeEach(() => {
    dispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('it should not add an achievement when getAchievedNumber returns 0', () => {
    (useAppSelector as jest.Mock).mockReturnValue(0);

    renderHook(() => useAchievementsHandler());

    expect(getAchievedNumber).toHaveBeenCalledWith(0);
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('it should add an achievement when getAchievedNumber returns a non-zero value', () => {
    const counter = 10;
    const achievementNumber = 1;
    const achievements: number[] = [];

    (useAppSelector as jest.Mock).mockImplementation((selector) => {
      if (selector === selectCount) {
        return counter;
      } else if (selector === selectAchievements) {
        return achievements;
      } else {
        throw new Error('Unknown selector');
      }
    });

    (getAchievedNumber as jest.Mock).mockReturnValue(achievementNumber);

    renderHook(() => useAchievementsHandler());

    expect(getAchievedNumber).toHaveBeenCalledWith(counter);
    expect(dispatch).toHaveBeenCalledWith(addAchievement(achievementNumber));
  });
});
