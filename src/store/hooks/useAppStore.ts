import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';

export const useAppStore = (): [RootState, AppDispatch] => {
  const appState = useSelector((state: RootState) => state);
  const appDispatch = useDispatch<AppDispatch>();
  return [appState, appDispatch];
};
