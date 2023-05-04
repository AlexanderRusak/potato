import React from 'react'
import { Button } from '../UI/Button/Button';
import styles from './Game.module.css';
import { DoubleMode } from '../DoubleMode/DoubleMode';
import { useGameSelector } from '../../hooks/useGameSelector';
import { useDetectIdle } from '../../hooks/useDetectIdle';
import { useIdleDecrement } from '../../hooks/useIdleDecrement';
import { useAchievementsHandler } from '../../hooks/useAchievementsHandler';
import { Achievements } from '../Achievements/Achievements';


export const Game = (): JSX.Element => {
  const { count, doubleModeTime, isIdle } = useGameSelector();

  useDetectIdle();
  useIdleDecrement();
  useAchievementsHandler();

  return (
    <div className={styles.game}>
      <Achievements />
      <h1>{count}</h1>
      {isIdle ? <h1>Idle</h1> : null}
      {doubleModeTime ? <DoubleMode timer={doubleModeTime} /> : null}
      <Button />
    </div>
  );
};