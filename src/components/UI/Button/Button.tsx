import React from 'react';
import styles from './Button.module.css';
import { useThrottled } from '../../../hooks/useThrottled';
import { useButtonHandler } from '../../../hooks/useButtonHandler';

export const Button = (): JSX.Element => {
  const { handleClick } = useButtonHandler();
  const throttledClick = useThrottled(handleClick);



  return (
    <button onClick={throttledClick} className={styles.button} type="button">
      Click me
    </button>
  );
};
