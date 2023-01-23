import { useEffect, useRef } from 'react';

export function useIsMount() {
  const mounted = useRef<boolean>(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    }
  }, []);

  return mounted.current;
}
