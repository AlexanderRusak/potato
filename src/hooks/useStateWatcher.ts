
import { useEffect } from 'react';

import { removeFromFromLocalStorage, updateScoreInLocalStorage } from '../helpers/helpers';
import { useGameState } from './useGameState';


export const useStateWatcher = (): void => {
  const { count, isIdle } = useGameState();

  useEffect(() => {
    if (!count && isIdle) {
      removeFromFromLocalStorage()
    } else {
      updateScoreInLocalStorage(count)
    }

  }, [count])


};
