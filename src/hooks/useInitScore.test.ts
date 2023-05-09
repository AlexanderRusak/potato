import { renderHook } from '@testing-library/react-hooks';
import { useInitScore } from './useInitScore';
import { increment } from '../store/reducers/counterReducer';
import { useAppDispatch } from '../store/hooks/useAppDispatch';
import { getScoreFromLocalStorage } from '../helpers/helpers';

jest.mock('../store/hooks/useAppDispatch', () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock('../helpers/helpers');

describe('useInitScore', () => {
  const dispatchMock = jest.fn();
  const getScoreFromLocalStorageMock = getScoreFromLocalStorage as jest.MockedFunction<typeof getScoreFromLocalStorage>;

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);
    getScoreFromLocalStorageMock.mockReturnValue(42);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('it should dispatch increment action with stored count', () => {
    renderHook(() => useInitScore());

    expect(getScoreFromLocalStorageMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(increment(42));
  });

  it('it should not dispatch increment action if there is no stored count', () => {
    getScoreFromLocalStorageMock.mockReturnValue(null);

    renderHook(() => useInitScore());

    expect(getScoreFromLocalStorageMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).not.toHaveBeenCalled();
  });
});
