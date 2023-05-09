import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks/useAppDispatch';
import { getScoreFromLocalStorage } from '../helpers/helpers';
import { increment } from '../store/reducers/counterReducer';

export const useInitScore = (): void => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const storedCount = getScoreFromLocalStorage()
    storedCount ? dispatch(increment(storedCount)) : null;
  }, [])
};
