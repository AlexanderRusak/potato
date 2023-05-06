import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectAchievements } from '../../store/reselect/achievementsSelector'
import { Rewards } from './Rewards/Rewards'
import { AchievementImage } from '../../components/UI/AchievmentImage/AchievmnetImage'
import classes from './Achievments.module.css'


export const Achievements = (): JSX.Element => {

  const achievmnets = useSelector(selectAchievements)

  const achievmnetsElement = useMemo(() => {
    return achievmnets.length ? achievmnets.map((achievmnet) => <AchievementImage
      key={achievmnet}
      alt={achievmnet}
      src={Rewards[achievmnet]}
    />) : null
  }, [achievmnets])

  return <div className={classes.achievmnets}>
    {achievmnetsElement}
  </div>
}