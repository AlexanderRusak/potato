import { useEffect, useState } from 'react';
import { useAppDispatch } from '../store/hooks/useAppDispatch';

import { idleMode } from '../store/reducers/modeReducer';
import { useAppSelector } from '../store/hooks/useAppSelector';
import { selectCount } from '../store/reselect/counterSelector';
import { IDLE_TIMEOUT } from '../settings';

export const useDetectIdle = (timeout = IDLE_TIMEOUT): void => {
  const [lastCount, setLastCount] = useState(0);
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout> | null = null;

    const handleIdle = (): void => {
      dispatch(idleMode(true));
    };

    const handleUpdate = (): void => {
      if (count !== lastCount) {
        setLastCount(count);
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
  }, [timeout, dispatch, lastCount, count]);

};
