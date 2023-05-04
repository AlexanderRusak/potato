import { useDispatch } from 'react-redux';
import { useAppDispatch } from './useAppDispatch';
import { store } from '../store';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('useAppDispatch', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('returns the store.dispatch function', () => {
    (useDispatch as jest.Mock).mockReturnValue(store.dispatch);

    const appDispatch = useAppDispatch();

    expect(appDispatch).toBe(store.dispatch);
  });
});
