import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useThrottled } from '../../../hooks/useThrottled';
import { useButtonHandler } from '../../../hooks/useButtonHandler';
import { selectMode } from '../../../store/reselect/modeSelector';
import styles from './Button.module.css';

interface ButtonProps {
  children: JSX.Element
}

export const Button = ({ children }: ButtonProps): JSX.Element => {
  const { handleClick } = useButtonHandler();
  const throttledClick = useThrottled(handleClick);
  const { isIdle } = useSelector(selectMode)

  const styleButtonIdle: [string, string?] = useMemo(() => (
    isIdle ? [styles.button, styles.buttonIdle] : [styles.button]
  ), [isIdle])



  return (<button onClick={throttledClick} className={styleButtonIdle.join(' ')}> {children}  </button>);
};
