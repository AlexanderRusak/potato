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
import styles from './Game.module.css';


export const Game = (): JSX.Element => {
  const { count, isIdle } = useGameState();

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