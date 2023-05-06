import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks/useAppDispatch';
import { useAppSelector } from '../store/hooks/useAppSelector'
import { selectCount } from '../store/reselect/counterSelector'
import { addAchievement } from '../store/reducers/achievementReducer';
import { getAchievedNumber } from '../helpers/helpers';
import { selectAchievements } from '../store/reselect/achievementsSelector';


export const useAchievementsHandler = (): void => {
  const counter = useAppSelector(selectCount);
  const achievements = useAppSelector(selectAchievements);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const achieve = getAchievedNumber(counter)
    achieve && dispatch(addAchievement(achieve))

  }, [counter, achievements.length, dispatch]);
};


