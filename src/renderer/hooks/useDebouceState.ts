import { useEffect, useRef, useState } from 'react';

type Options = {
  leading?: boolean;
  onUpdate?: (newVal: any) => void;
};
function useDebouncedState<T = any>(
  defaultValue: T,
  wait: number,
  options: Options = { leading: false }
) {
  const [value, setValue] = useState(defaultValue);
  const timeoutRef = useRef<number>(null);
  const leadingRef = useRef(true);

  const clearTime = () => clearTimeout(timeoutRef.current);

  useEffect(() => clearTime, []);

  const debouncedSetValue = (newValue: T) => {
    clearTime();

    if (leadingRef.current && options.leading) {
      setValue(newValue);
      if (options && options?.onUpdate) options?.onUpdate(newValue);
    } else {
      timeoutRef.current = setTimeout(() => {
        leadingRef.current = true;
        setValue(newValue);
        if (options && options?.onUpdate) options?.onUpdate(newValue);
      }, wait);
    }

    leadingRef.current = false;
  };

  return [value, debouncedSetValue] as const;
}
export default useDebouncedState;
