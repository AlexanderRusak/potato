import React from 'react'
import classes from './AchievmnetImage.module.css'

interface AchievementImageProps {
  src: string,
  alt: string | number
}


export const AchievementImage = ({ alt, src }: AchievementImageProps): JSX.Element => {
  return <img
    className={classes.image}
    src={src}
    alt={alt.toString()}
  />
}