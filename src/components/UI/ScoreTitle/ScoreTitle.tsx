import React, { useMemo } from 'react';
import styles from './ScoreTitle.module.css'

interface ScoreTitleProps {
  score: number,
  isIdle?: boolean
}

export const ScoreTitle = ({ isIdle = false, score }: ScoreTitleProps): JSX.Element => {

  const scoreStyle: [string, string?] = useMemo(() => (
    isIdle ? [styles.score, styles.scoreIdle] : [styles.score]
  ), [isIdle])

  return <span className={scoreStyle.join(' ')}>{score}</span>
}
