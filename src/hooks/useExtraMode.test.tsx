import { renderHook } from '@testing-library/react-hooks';
import { useAppSelector } from '../store/hooks/useAppSelector';
import { useAppDispatch } from '../store/hooks/useAppDispatch';
import { extraTime } from '../store/reducers/modeReducer';
import { selectMode } from '../store/reselect/modeSelector';
import { useExtraMode } from './useExtraMode';
import { DEFAULT_EXTRA_TIMEOUT_DECREMENT, TIMER_COUNTDOWN_VALUE } from '../settings';

jest.mock('../store/hooks/useAppSelector');
jest.mock('../store/hooks/useAppDispatch');
jest.mock('../store/reducers/modeReducer');
jest.mock('../store/reselect/modeSelector');

describe('useExtraMode', () => {
  const mockExtraTime = extraTime as unknown as jest.Mock;
  const mockUseSelector = useAppSelector as jest.MockedFunction<typeof useAppSelector>;
  const mockUseDispatch = useAppDispatch as jest.MockedFunction<typeof useAppDispatch>;

  beforeEach(() => {
    mockExtraTime.mockClear();
    mockUseSelector.mockClear();
    mockUseDispatch.mockClear();
  });

  it('it should not start a timer if extra mode is not enabled', () => {
    mockUseSelector.mockReturnValue({
      extraModeTime: 10000,
      isExtraModeEnabled: false,
      isIdle: false
    });

    renderHook(() => useExtraMode());

    expect(mockUseSelector).toHaveBeenCalledWith(selectMode);
    expect(mockExtraTime).not.toHaveBeenCalled();
  });

  it('it should start a timer and dispatch an extraTime action every TIMER_COUNTDOWN_VALUE milliseconds', () => {
    jest.useFakeTimers();

    mockUseSelector.mockReturnValue({
      extraModeTime: 10000,
      isExtraModeEnabled: true,
      isIdle: false
    });

    const dispatch = jest.fn();
    mockUseDispatch.mockReturnValue(dispatch);

    const { rerender } = renderHook(() => useExtraMode());

    expect(mockUseSelector).toHaveBeenCalledWith(selectMode);
    expect(mockUseDispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).not.toHaveBeenCalled();
    expect(mockExtraTime).not.toHaveBeenCalled();

    jest.advanceTimersByTime(TIMER_COUNTDOWN_VALUE);

    expect(mockExtraTime).toHaveBeenCalledWith(10000 - DEFAULT_EXTRA_TIMEOUT_DECREMENT);
    expect(dispatch).toHaveBeenCalledWith(extraTime(10000 - DEFAULT_EXTRA_TIMEOUT_DECREMENT));

    jest.advanceTimersByTime(TIMER_COUNTDOWN_VALUE);

    expect(dispatch).toHaveBeenCalledWith(extraTime(10000 - 2 * DEFAULT_EXTRA_TIMEOUT_DECREMENT));

    mockUseSelector.mockReturnValue({
      extraModeTime: 5000,
      isExtraModeEnabled: false,
      isIdle: false
    });
    rerender();

    jest.advanceTimersByTime(TIMER_COUNTDOWN_VALUE);

    expect(dispatch).toHaveBeenCalledTimes(2);
    jest.useRealTimers();
  });
});
