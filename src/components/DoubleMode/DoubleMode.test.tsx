import React from 'react';
import { render, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { DoubleMode } from './DoubleMode';
import { doubleMode } from '../../store/reducers/modeReducer';
import { Store, AnyAction } from '@reduxjs/toolkit';

const mockStore = configureStore([]);

describe('DoubleMode component', () => {
  let store: Store<unknown, AnyAction>;
  let dispatchSpy: jest.SpyInstance<AnyAction, [action: AnyAction]>;

  beforeEach(() => {
    store = mockStore({});
    dispatchSpy = jest.spyOn(store, 'dispatch');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render with initial time value', () => {
    const timer = 10;
    const { getByText } = render(
      <Provider store={store}>
        <DoubleMode timer={timer} />
      </Provider>
    );

    expect(getByText(`Time Left: ${timer}`)).toBeInTheDocument();
  });

  it('should dispatch doubleMode action with correct payload when timeLeft is 0', async () => {
    const timer = 1;
    const { getByText } = render(
      <Provider store={store}>
        <DoubleMode timer={timer} />
      </Provider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, timer * 1000));
    });

    expect(dispatchSpy).toHaveBeenCalledWith(doubleMode(timer));
    expect(getByText(`Time Left: 0`)).toBeInTheDocument();
  });
});
