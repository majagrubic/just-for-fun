import React, { useState, useEffect } from 'react';
import './clock.css';

export function Clock() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const secondsInterval = setInterval(() => {
      const s = new Date().getSeconds();
      setSeconds(s);
    }, 1000);

    return () => {
      clearInterval(secondsInterval);
    };
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      const m = new Date().getMinutes();
      setMinutes(m);
    }
  }, [seconds]);

  useEffect(() => {
    if (minutes === 0) {
      const h = new Date().getHours();
      setHours(h);
    }
  }, [minutes]);

  const zeroPad = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="clock-container">
      <div className="container">
        <div className="time_unit">{zeroPad(hours)}</div>
        <div className="time_unit separator">:</div>
        <div className="time_unit">{zeroPad(minutes)}</div>
        <div className="time_unit separator">:</div>
        <div className="time_unit">{zeroPad(seconds)}</div>
      </div>
    </div>
  );
}
