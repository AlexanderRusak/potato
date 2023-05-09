import { useCallback } from 'react';
import { useAppSelector } from '../store/hooks/useAppSelector';
import { increment } from '../store/reducers/counterReducer';
import { extraTime, idleMode } from '../store/reducers/modeReducer';
import { useAppDispatch } from '../store/hooks/useAppDispatch';
import { CHANCE_VALUE, DEFAULT_INCREMENT_VALUE, EXTRA_INCREMENT } from '../settings';
import { calculateRandomTime } from '../helpers/helpers';
import { selectMode } from '../store/reselect/modeSelector';

interface ButtonHandlerProps {
  handleClick: () => void;
}

export const useButtonHandler = (): ButtonHandlerProps => {
  const { extraModeTime, isIdle, isExtraModeEnabled } = useAppSelector(selectMode);
  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => {
    isIdle && dispatch(idleMode(false));
    const randomNum = Math.random();
    if (randomNum < CHANCE_VALUE) {
      !isExtraModeEnabled && dispatch(extraTime(calculateRandomTime()));
      dispatch(increment(DEFAULT_INCREMENT_VALUE))
    } else {
      dispatch(increment(extraModeTime ? EXTRA_INCREMENT : DEFAULT_INCREMENT_VALUE));
    }


  }, [extraModeTime, isIdle]);

  return {
    handleClick,
  };
};
