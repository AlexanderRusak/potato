import React from 'react'
import { useSelector } from 'react-redux'
import { selectAchievements } from '../../store/reselect/achievementsSelector'


export const Achievements = (): JSX.Element => {

  const achievmnets = useSelector(selectAchievements)


  return <div>
    {achievmnets.map((achievmnet) => <span key={achievmnet}>{achievmnet}</span>)}
  </div>
}