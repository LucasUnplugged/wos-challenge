import { useRef, useState } from 'react';

export function useAnimationState() {
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const [isAnimating, setAnimation] = useState<Record<string, boolean>>({});

  const animate = (id: string) => {
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }

    setAnimation((current) => {
      return {
        ...current,
        [id]: true,
      };
    });

    timers.current[id] = setTimeout(() => {
      delete timers.current[id];
      setAnimation((current) => {
        return {
          ...current,
          [id]: false,
        };
      });
    }, 2500);
  };

  return { isAnimating, animate };
}
