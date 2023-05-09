import { renderHook } from '@testing-library/react-hooks';
import { useGameState } from './useGameState';
import { useAppSelector } from '../store/hooks/useAppSelector';


jest.mock('../store/hooks/useAppSelector', () => ({
  useAppSelector: jest.fn(),
}));

describe('useGameState', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('it should return count and isIdle from Redux store', () => {
    (useAppSelector as jest.Mock)
      .mockReturnValueOnce(5)
      .mockReturnValueOnce({ isIdle: true });

    const { result } = renderHook(() => useGameState());
    /*   console.log(result.current); */

    expect(result.current.count).toEqual(5);
    expect(result.current.isIdle).toEqual(true);
  });

});
