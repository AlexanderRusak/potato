import { renderHook } from '@testing-library/react-hooks';
import { useDetectIdle } from './useDetectIdle';
import { useAppDispatch } from '../store/hooks/useAppDispatch';


jest.mock('../store/hooks/useAppDispatch');
jest.mock('../store/hooks/useAppSelector');

describe('useDetectIdle', () => {
  const dispatchMock = jest.fn();
  const mockUseDispatch = useAppDispatch as jest.MockedFunction<typeof useAppDispatch>;

  beforeEach(() => {
    mockUseDispatch.mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should not dispatch idleMode action before timeout', () => {
    renderHook(() => useDetectIdle());
    expect(mockUseDispatch).not.toHaveBeenCalled();
  });
});
