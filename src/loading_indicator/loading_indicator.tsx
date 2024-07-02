import React, { useState, useEffect, useRef } from 'react';
import './loading_indicator.css';

export const LoadingIndicator = () => {
  const [width, setWidth] = useState<number>(0);
  const interval = useRef<ReturnType<typeof setInterval> | undefined>();

  useEffect(() => {
    if (width === 100) {
      clearInterval(interval.current);
    }
  }, [width]);

  const onClick = () => {
    if (interval.current) {
      clearInterval(interval.current);
    }
    interval.current = setInterval(() => {
      setWidth((prev) => {
        if (prev === 100) {
          return 0;
        }
        return prev + 20;
      });
    }, 1500);
  };

  return (
    <div className="li-container">
      <div className="child1">
        <div className="loader" style={{ width: `${width}%` }} />
        <button onClick={onClick}>Click me</button>
      </div>
      <div className="child2">{width} %</div>
    </div>
  );
};
