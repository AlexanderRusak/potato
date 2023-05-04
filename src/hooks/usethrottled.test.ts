import { renderHook } from '@testing-library/react-hooks';
import { useThrottled } from './useThrottled';

describe('useThrottled', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('it should call the provided callback function when the button is clicked and not throttled', () => {
    const onClick = jest.fn();
    const { result } = renderHook(() => useThrottled(onClick));
    const throttledOnClick = result.current;

    throttledOnClick({} as React.MouseEvent<HTMLButtonElement, MouseEvent>);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('it should not call the provided callback function when the button is clicked and throttled', () => {
    const onClick = jest.fn();
    const { result } = renderHook(() => useThrottled(onClick));
    const throttledOnClick = result.current;

    throttledOnClick({} as React.MouseEvent<HTMLButtonElement, MouseEvent>);
    throttledOnClick({} as React.MouseEvent<HTMLButtonElement, MouseEvent>);
    throttledOnClick({} as React.MouseEvent<HTMLButtonElement, MouseEvent>);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('it should call the provided callback function again after the throttling period has ended', () => {
    const onClick = jest.fn();
    const { result } = renderHook(() => useThrottled(onClick, 1000));
    const throttledOnClick = result.current;

    throttledOnClick({} as React.MouseEvent<HTMLButtonElement, MouseEvent>);
    throttledOnClick({} as React.MouseEvent<HTMLButtonElement, MouseEvent>);
    throttledOnClick({} as React.MouseEvent<HTMLButtonElement, MouseEvent>);
    jest.advanceTimersByTime(1000);
    throttledOnClick({} as React.MouseEvent<HTMLButtonElement, MouseEvent>);

    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
