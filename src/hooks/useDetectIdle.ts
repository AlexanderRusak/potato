import { useEffect, useState } from 'react';
import { useAppDispatch } from '../store/hooks/useAppDispatch';
import { idleMode } from '../store/reducers/modeReducer';
import { DEFAULT_COUNT_STATE, IDLE_TIMEOUT } from '../settings';
import { useGameState } from './useGameState';

export const useDetectIdle = (timeout = IDLE_TIMEOUT): void => {
  const [previousCount, setPreviousCount] = useState(DEFAULT_COUNT_STATE);
  const { count, isIdle } = useGameState()
  const dispatch = useAppDispatch();

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout> | null = null;

    const handleIdle = (): void => {
      isIdle || dispatch(idleMode(true));
    };

    const handleUpdate = (): void => {
      if (count !== previousCount) {
        setPreviousCount(count);
        if (timerId) {
          clearTimeout(timerId);
        }
        timerId = setTimeout(handleIdle, timeout);
      }
    };

    timerId = setTimeout(handleIdle, timeout);

    const intervalId = setInterval(handleUpdate, timeout);

    return () => {
      clearInterval(intervalId);
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timeout, dispatch, previousCount, count, isIdle]);
};
