import { renderHook } from '@testing-library/react-hooks';
import { useIdleDecrement } from './useIdleDecrement';
import { useAppDispatch } from '../store/hooks/useAppDispatch';
import { useAppSelector } from '../store/hooks/useAppSelector';
import { DEFAULT_COUNT_STATE, DEFAULT_DECREMENT_VALUE, IDLE_DECREMENT_TIMEOUT } from '../settings';
import { selectMode } from '../store/reselect/modeSelector';
import { selectCount } from '../store/reselect/counterSelector';
import { decrement } from '../store/reducers/counterReducer';
import { RootState } from '../store/store';

jest.useFakeTimers();

jest.mock('../store/hooks/useAppDispatch', () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock('../store/hooks/useAppSelector', () => ({
  useAppSelector: jest.fn(),
}));

describe('useIdleDecrement', () => {
  let dispatch: jest.Mock;
  let isIdle: boolean;
  let count: number;

  beforeEach(() => {
    dispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);

    isIdle = true;
    count = 5;
    (useAppSelector as jest.Mock).mockImplementation((selector) => {
      if (selector === selectMode) {
        return { isIdle };
      } else if (selector === selectCount) {
        return count;
      } else {
        throw new Error('Unknown selector');
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('it should not dispatch anything if isIdle is false', () => {
    count = 2;
    isIdle = false;
    (useAppSelector as jest.Mock).mockImplementation((selector: (state: RootState) => unknown) => {
      if (selector === selectMode) {
        return { isIdle };
      }
      if (selector === selectCount) {
        return count;
      }
      return null;
    });
    renderHook(() => useIdleDecrement());
    jest.advanceTimersByTime(IDLE_DECREMENT_TIMEOUT);
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('it should dispatch a decrement action with DEFAULT_DECREMENT_VALUE if IDLE_DECREMENT_TIMEOUT is up', () => {
    count = 2;
    isIdle = true;
    (useAppSelector as jest.Mock).mockImplementation((selector: (state: RootState) => unknown) => {
      if (selector === selectMode) {
        return { isIdle };
      }
      if (selector === selectCount) {
        return count;
      }
      return null;
    });
    renderHook(() => useIdleDecrement());
    jest.advanceTimersByTime(IDLE_DECREMENT_TIMEOUT);
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(decrement(DEFAULT_DECREMENT_VALUE));
  });


  it('it should clear the interval if count reaches the default count state', () => {
    count = DEFAULT_COUNT_STATE;
    isIdle = true;
    (useAppSelector as jest.Mock).mockImplementation((selector: (state: RootState) => unknown) => {
      if (selector === selectMode) {
        return { isIdle };
      }
      if (selector === selectCount) {
        return count;
      }
      return null;
    });
    const { unmount } = renderHook(() => useIdleDecrement());
    jest.advanceTimersByTime(IDLE_DECREMENT_TIMEOUT);
    expect(dispatch).not.toHaveBeenCalled();
    unmount();
  });
});
