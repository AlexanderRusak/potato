import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks/useAppDispatch';
import { useAppSelector } from '../store/hooks/useAppSelector';
import { decrement } from '../store/reducers/counterReducer';
import { selectCount } from '../store/reselect/counterSelector';
import { IDLE_DECREMENT_TIMEOUT } from '../settings';
import { selectMode } from '../store/reselect/modeSelector';

export const useIdleDecrement = (): void => {
  const dispatch = useAppDispatch();
  const { isIdle } = useAppSelector(selectMode);
  const count = useAppSelector(selectCount)

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;

    if (isIdle) {
      timerId = setInterval(() => {
        if (count === 1) {
          dispatch(decrement(1));
        } else if (count === 0) {
          clearInterval(timerId as NodeJS.Timeout);
        } else {
          dispatch(decrement(2));
        }
      }, IDLE_DECREMENT_TIMEOUT);
    }
    return () => {
      clearInterval(timerId as NodeJS.Timeout);
    };
  }, [isIdle, dispatch, count]);
};
