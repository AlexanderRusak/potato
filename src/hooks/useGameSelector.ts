import { ModeState } from './../store/reducers/modeReducer';
import { selectMode } from '../store/reselect/modeSelector';
import { useAppSelector } from '../store/hooks/useAppSelector';
import { selectCount } from '../store/reselect/counterSelector';
import { CounterState } from '../store/reducers/counterReducer';


export interface GameSelectorProps extends CounterState, ModeState { }

export const useGameSelector = (): GameSelectorProps => {
  const count = useAppSelector(selectCount);
  const { doubleModeTime, isIdle } = useAppSelector(selectMode);
  return {
    count: count,
    doubleModeTime: doubleModeTime,
    isIdle: isIdle,
  };
};