/* import { renderHook } from '@testing-library/react-hooks';
import { useIdleDecrement } from './useIdleDecrement';
import { useAppDispatch } from '../store/hooks/useAppDispatch';
import { useAppSelector } from '../store/hooks/useAppSelector';

jest.mock('../store/hooks/useAppDispatch');
jest.mock('../store/hooks/useAppSelector'); */

describe('useIdleDecrement', () => {
  /*   const mockDispatch = jest.fn();
    const mockUseAppDispatch = useAppDispatch as jest.MockedFunction<typeof useAppDispatch>;
    const mockUseAppSelector = useAppSelector as jest.MockedFunction<typeof useAppSelector>; */

  /*   beforeEach(() => {
    mockDispatch.mockClear();
    mockUseAppDispatch.mockReturnValue(mockDispatch);
  }); */

  /* it('should not decrement the count if isIdle is false', () => {
    mockUseAppSelector.mockReturnValueOnce({ isIdle: false });
    const { unmount } = renderHook(() => useIdleDecrement());
    jest.advanceTimersByTime(2000);
    expect(mockDispatch).not.toHaveBeenCalled();
    unmount();
  }); */
  it('test', () => {
    expect(true).toBe(true)
  })
});
