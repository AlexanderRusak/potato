import { renderHook } from '@testing-library/react-hooks';
import { removeFromFromLocalStorage, updateScoreInLocalStorage } from '../helpers/helpers';
import { useGameState } from './useGameState';
import { useStateWatcher } from './useStateWatcher';

jest.mock('../helpers/helpers', () => ({
  removeFromFromLocalStorage: jest.fn(),
  updateScoreInLocalStorage: jest.fn(),
}));

jest.mock('./useGameState', () => ({
  useGameState: jest.fn(),
}));

describe('useStateWatcher', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('it should call removeFromFromLocalStorage when count is falsy and isIdle is true', () => {
    (useGameState as jest.Mock).mockReturnValueOnce({ count: 0, isIdle: true });

    renderHook(() => useStateWatcher());

    expect(removeFromFromLocalStorage).toHaveBeenCalledTimes(1);
    expect(updateScoreInLocalStorage).not.toHaveBeenCalled();
  });

  it('it should call updateScoreInLocalStorage when count is truthy', () => {
    (useGameState as jest.Mock).mockReturnValueOnce({ count: 42, isIdle: false });

    renderHook(() => useStateWatcher());

    expect(updateScoreInLocalStorage).toHaveBeenCalledTimes(1);
    expect(updateScoreInLocalStorage).toHaveBeenCalledWith(42);
    expect(removeFromFromLocalStorage).not.toHaveBeenCalled();
  });

  it('it should call only removeFromFromLocalStorage function when count is falsy and isIdle is false', () => {
    (useGameState as jest.Mock).mockReturnValueOnce({ count: 0, isIdle: false });

    renderHook(() => useStateWatcher());

    expect(updateScoreInLocalStorage).toHaveBeenCalled();
    expect(removeFromFromLocalStorage).not.toHaveBeenCalled();
  });
});
