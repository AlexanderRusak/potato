import React, { useMemo } from 'react'
import styles from './ExtraMode.module.css'
import { useAppSelector } from '../../store/hooks/useAppSelector'
import { selectMode } from '../../store/reselect/modeSelector'
import { EXTRA_INCREMENT } from '../../settings'

export const ExtraMode = (): JSX.Element => {

  const { extraModeTime } = useAppSelector(selectMode);

  const extraModeElement: JSX.Element | null = useMemo(() => {
    return extraModeTime ? <span>X{EXTRA_INCREMENT} Mode: {extraModeTime} seconds left </span> : null
  }, [extraModeTime])

  return <div className={styles.containerExtra}>
    {extraModeElement}
  </div>
}