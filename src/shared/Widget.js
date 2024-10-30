import React from 'react';
import "./Widget.css";

export default function Widget({ time, startTimer, stopTimer, resetTimer, isRunning }) {
  const formatTime = (totalSeconds) => {
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    return `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  return (
    <div>
      <p>Time: {formatTime(time)}</p>
      <button onClick={startTimer} disabled={isRunning}>Start Timer</button>
      <button onClick={stopTimer} disabled={!isRunning}>Stop Timer</button>
      <button onClick={resetTimer} disabled={isRunning}>Reset Timer</button>
    </div>
  );
}
