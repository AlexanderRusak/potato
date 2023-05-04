import { useCallback, useRef } from "react";
import { THROTTLED_LIMIT } from '../settings';

type ClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

export const useThrottled = (callback: ClickHandler, limit = THROTTLED_LIMIT): ClickHandler => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const throttledCallback = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (!timeoutRef.current) {
        callback(event);
        timeoutRef.current = setTimeout(() => {
          timeoutRef.current = null;
        }, limit);
      }
      return false;
    },
    [callback, limit]
  );

  return throttledCallback;
};
