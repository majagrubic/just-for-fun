import React, { useState, useEffect } from 'react';
import './clock.css';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

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

  const getDate = () => {
    const now = new Date();
    return `${zeroPad(now.getDay())} ${months[now.getMonth()]}`;
  };

  return (
    <div className="clock-container">
      <div className="date-container">{getDate()}</div>
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
