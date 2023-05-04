import { useCallback } from 'react';
import { useAppSelector } from '../store/hooks/useAppSelector';
import { increment } from '../store/reducers/counterReducer';
import { doubleMode, idleMode } from '../store/reducers/modeReducer';
import { useAppDispatch } from '../store/hooks/useAppDispatch';
import { CHANCE_VALUE, DEFAULT_INCREMENT_VALUE, EXTRA_INCREMENT } from '../settings';
import { calculateRandomTime } from '../helpers/helpers';
import { selectMode } from '../store/reselect/modeSelector';

interface ButtonHandlerProps {
  handleClick: () => void;
}

export const useButtonHandler = (): ButtonHandlerProps => {
  const { doubleModeTime, isIdle } = useAppSelector(selectMode);
  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => {
    isIdle ? dispatch(idleMode(false)) : null
    const randomNum = Math.random();
    if (randomNum < CHANCE_VALUE) {
      dispatch(doubleMode(calculateRandomTime()));
    } else {
      dispatch(increment(doubleModeTime ? EXTRA_INCREMENT : DEFAULT_INCREMENT_VALUE));
    }


  }, [doubleModeTime, isIdle]);




  return {
    handleClick,
  };
};
