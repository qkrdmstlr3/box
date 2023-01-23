import { isClient } from '@shell-box/utils';
import { useEffect, useLayoutEffect } from 'react';

export const useIsomorphicLayoutEffect = isClient() ? useLayoutEffect : useEffect;
