import React, { useMemo } from 'react';
import LazyLoad from 'react-lazyload';
import { selectAchievements } from '../../store/reselect/achievementsSelector';
import { Rewards } from './Rewards/Rewards';
import { AchievementImage } from '../../components/UI/AchievmentImage/AchievmnetImage';
import classes from './Achievments.module.css';
import { useAppSelector } from '../../store/hooks/useAppSelector';

export const Achievements = (): JSX.Element => {
  const achievements = useAppSelector(selectAchievements);

  const achievementElements = useMemo(() => {
    return achievements.length
      ? achievements.map((achievement) => (
        <LazyLoad key={achievement}>
          <AchievementImage
            alt={achievement}
            src={Rewards[achievement]}
          />
        </LazyLoad>
      ))
      : null;
  }, [achievements]);

  return <div className={classes.achievmnets}>{achievementElements}</div>;
};
