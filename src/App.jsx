import { useState, useRef } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const startStopwatch = () => {
    if (isRunning) return;
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 10);
  };

  const stopStopwatch = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetStopwatch = () => {
    stopStopwatch();
    setTime(0);
  };

  // Convert time in milliseconds (centiseconds) to display format MM:SS.MS
  const getDisplayTime = () => {
    const minutes = Math.floor(time / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const milliseconds = time % 100;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
  };

  return (
    <div className="container">
      <h1>Stopwatch</h1>
      <div className="display">
        <span>{getDisplayTime()}</span>
      </div>
      <div className="buttons">
        <button
          className="btn btn-start"
          onClick={startStopwatch}
          disabled={isRunning}
        >
          Start
        </button>
        <button
          className="btn btn-stop"
          onClick={stopStopwatch}
          disabled={!isRunning}
        >
          Stop
        </button>
        <button
          className="btn btn-reset"
          onClick={resetStopwatch}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
