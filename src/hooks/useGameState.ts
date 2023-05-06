import { ModeState } from '../store/reducers/modeReducer';
import { selectMode } from '../store/reselect/modeSelector';
import { useAppSelector } from '../store/hooks/useAppSelector';
import { selectCount } from '../store/reselect/counterSelector';
import { CounterState } from '../store/reducers/counterReducer';


export interface GameStateProps extends CounterState, Omit<ModeState, 'extraModeTime' | 'isExtraModeEnabled'> { }

export const useGameState = (): GameStateProps => {
  const count = useAppSelector(selectCount);
  const { isIdle } = useAppSelector(selectMode);
  return {
    count: count,
    isIdle: isIdle,
  };
};
