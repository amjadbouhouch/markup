import { useMemo, useRef } from 'react';
import isEqual from 'fast-deep-equal';

/**
 * Memorize a value. Only invalidate if the value in it did change. Does a deep equal.
 * @param option Options to memorize.
 */
export function useDeepMemo<T>(option: T): T {
  const last = useRef(option);
  return useMemo(() => {
    if (isEqual(last.current, option)) {
      return last.current;
    }
    last.current = option;
    return option;
  }, [option]);
}
