import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import { Game } from './components/Game/Game';

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
}

export default App;
