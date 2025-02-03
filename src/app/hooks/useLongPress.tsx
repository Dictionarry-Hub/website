import { useCallback, useRef } from 'react';

interface UseLongPressProps {
  onLongPress: () => void;
  onClick?: () => void;
  ms?: number;
}

export const useLongPress = ({ onLongPress, onClick, ms = 500 }: UseLongPressProps) => {
  const timerRef = useRef<NodeJS.Timeout>();
  const isLongPress = useRef(false);

  const start = useCallback(() => {
    isLongPress.current = false;
    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
      onLongPress();
    }, ms);
  }, [onLongPress, ms]);

  const stop = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (!isLongPress.current && onClick) {
        onClick();
      }
    },
    [onClick]
  );

  return {
    onMouseDown: start,
    onTouchStart: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchEnd: stop,
  };
};
