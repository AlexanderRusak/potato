import { renderHook, act } from '@testing-library/react-hooks';
import { useButtonHandler } from './useButtonHandler';
import { calculateRandomTime } from '../helpers/helpers';
import { useAppSelector } from '../store/hooks/useAppSelector';
import { useAppDispatch } from '../store/hooks/useAppDispatch';

jest.mock('../store/hooks/useAppSelector');
jest.mock('../store/hooks/useAppDispatch');
jest.mock('../helpers/helpers');

describe('useButtonHandler', () => {
  const dispatchMock = jest.fn();
  const mockUseSelector = useAppSelector as jest.MockedFunction<typeof useAppSelector>;
  const mockUseDispatch = useAppDispatch as jest.MockedFunction<typeof useAppDispatch>;
  const calculateRandomTimeMock = calculateRandomTime as jest.MockedFunction<typeof calculateRandomTime>;

  beforeEach(() => {
    mockUseDispatch.mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('handleClick dispatches extraTime action when random number is less than CHANCE_VALUE and extra mode is not enabled', () => {
    mockUseSelector.mockReturnValueOnce({ extraModeTime: 0, isIdle: false, isExtraModeEnabled: false });
    calculateRandomTimeMock.mockReturnValueOnce(10);

    const { result } = renderHook(() => useButtonHandler());
    act(() => {
      result.current.handleClick();
    });


    expect(mockUseDispatch).toHaveBeenCalledTimes(1);
    expect(mockUseDispatch).toHaveBeenCalledWith();

  });

});


