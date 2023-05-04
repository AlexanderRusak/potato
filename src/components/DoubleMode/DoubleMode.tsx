import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { doubleMode } from '../../store/reducers/modeReducer';
import { TIMER_COUNTDOWN_VALUE } from '../../settings';

interface DoubleModeProps {
  timer: number;
}

export const DoubleMode = ({ timer }: DoubleModeProps): JSX.Element => {
  const [timeLeft, setTimeLeft] = useState(timer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, TIMER_COUNTDOWN_VALUE);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    dispatch(doubleMode(timeLeft));
  }, [timeLeft, dispatch]);

  return <div>Time Left: {timeLeft}</div>;
};
