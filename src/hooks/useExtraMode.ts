import { DEFAULT_EXTRA_TIMEOUT_DECREMENT, TIMER_COUNTDOWN_VALUE } from '../settings';
import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks/useAppDispatch';
import { extraTime } from '../store/reducers/modeReducer';
import { selectMode } from '../store/reselect/modeSelector';
import { useAppSelector } from '../store/hooks/useAppSelector';



export const useExtraMode = (): void => {
  const { extraModeTime, isExtraModeEnabled } = useAppSelector(selectMode)
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isExtraModeEnabled) return
    const intervalId = setInterval(() => {
      dispatch(extraTime(extraModeTime - DEFAULT_EXTRA_TIMEOUT_DECREMENT))
    }, TIMER_COUNTDOWN_VALUE);

    return () => clearInterval(intervalId);
  }, [extraModeTime, dispatch]);

} 