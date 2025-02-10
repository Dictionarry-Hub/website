// src/app/hooks/useLongPress.tsx

import { useCallback, useRef } from 'react';

interface UseLongPressProps {
  onLongPress: () => void;
  onClick?: () => void;
  ms?: number;
}

export const useLongPress = ({ onLongPress, onClick, ms = 500 }: UseLongPressProps) => {
  const timerRef = useRef<NodeJS.Timeout>();
  const isLongPress = useRef(false);

  const start = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      // If it's a touch event, prevent mouse events from firing
      if ('touches' in e) {
        e.preventDefault();
      }

      isLongPress.current = false;

      timerRef.current = setTimeout(() => {
        isLongPress.current = true;
        onLongPress();
      }, ms);
    },
    [onLongPress, ms]
  );

  const stop = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      // For touch events, need to prevent default to avoid ghost clicks
      if ('touches' in e || 'changedTouches' in e) {
        e.preventDefault();
      }

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // If it wasn't a long press, trigger click
      if (!isLongPress.current && onClick) {
        onClick();
      }
    },
    [onClick]
  );

  const cancel = useCallback((e?: React.TouchEvent | React.MouseEvent) => {
    if (e && ('touches' in e || 'changedTouches' in e)) {
      e.preventDefault();
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  return {
    onTouchStart: start,
    onTouchEnd: stop,
    onTouchCancel: cancel,
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: cancel,
    // Prevent long-press context menu on mobile
    onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
  };
};
