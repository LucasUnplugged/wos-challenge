import { CSS } from '@withneutron/quarks';
import { useRef, useState } from 'react';

export function useAnimationState() {
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const [animationName, setAnimation] = useState<Record<string, CSS['animation']>>({});

  const animate = (id: string, animation: CSS['animation']) => {
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }

    setAnimation((current) => {
      return {
        ...current,
        [id]: animation,
      };
    });

    timers.current[id] = setTimeout(() => {
      delete timers.current[id];
      setAnimation((current) => {
        return {
          ...current,
          [id]: undefined,
        };
      });
    }, 2500);
  };

  return { animationName, animate };
}
