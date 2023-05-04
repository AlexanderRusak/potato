import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { useAppSelector } from './useAppSelector';
import { rootReducer, RootState } from '../store';
import React from 'react';

describe('useAppSelector', () => {
  it('should select the correct state from the store', () => {
    const store = createStore(rootReducer, { counter: { count: 10 } }) as any;
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );
    const { result } = renderHook(() => useAppSelector((state: RootState) => state.counter), {
      wrapper,
    });
    expect(result.current.count).toBe(10);
  });
});
