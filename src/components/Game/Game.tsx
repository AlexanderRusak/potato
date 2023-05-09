import React from 'react'
import { Button } from '../UI/Button/Button';
import { useGameState } from '../../hooks/useGameState';
import { useDetectIdle } from '../../hooks/useDetectIdle';
import { useIdleDecrement } from '../../hooks/useIdleDecrement';
import { useAchievementsHandler } from '../../hooks/useAchievementsHandler';
import { Achievements } from '../Achievements/Achievements';
import { ScoreTitle } from '../UI/ScoreTitle/ScoreTitle';
import { ExtraMode } from '../../components/ExtraMode/ExtraMode';
import { useExtraMode } from '../../hooks/useExtraMode';
import { useStateWatcher } from '../../hooks/useStateWatcher';
import styles from './Game.module.css';
import { useInitScore } from '../../hooks/useInitScore';


export const Game = (): JSX.Element => {
  useInitScore();
  const { count, isIdle } = useGameState();
  useStateWatcher()
  useDetectIdle();
  useIdleDecrement();
  useAchievementsHandler();
  useExtraMode();

  return (
    <div className={styles.game}>
      <Achievements />
      <ExtraMode />
      <Button>
        <ScoreTitle score={count} isIdle={isIdle} />
      </Button>
    </div>
  );
};