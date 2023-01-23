import { useCallback, useEffect, useRef } from 'react';

interface Times {
  minMs: number;
  startMs: number;
  /**
   * @description
   * 시간이 줄어드는 간격
   */
  interval: number;
}

export function useAccelerateInterval(callback: VoidFunction, times: Times) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const callbackRef = useRef<typeof callback>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const executeCallback = ({ minMs, startMs, interval }: Times) => {
    timerRef.current = setTimeout(() => {
      if (callbackRef.current) {
        callbackRef.current();
      }
      executeCallback({ startMs: startMs * interval, interval, minMs });
    }, Math.max(startMs, minMs));
  };

  const startInterval = useCallback(() => {
    if (!timerRef.current) {
      executeCallback(times);
    }
  }, []);

  const stopInterval = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);

  return { startInterval, stopInterval };
}
