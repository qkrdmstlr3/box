import { EffectCallback, useEffect } from 'react';

export function useEffectOnce(callbackFn: EffectCallback) {
  useEffect(callbackFn, []);
}
