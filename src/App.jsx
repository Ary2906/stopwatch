import { useState, useRef } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
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
    setLaps([]);
  };

  const recordLap = () => {
    if (!isRunning && time === 0) return;
    const lapTime = laps.length > 0 ? time - laps[laps.length - 1].cumulativeTime : time;
    setLaps([...laps, { lapNumber: laps.length + 1, lapTime, cumulativeTime: time }]);
  };

  // Convert time in milliseconds (centiseconds) to display format MM:SS.MS
  const formatTime = (timeValue) => {
    const minutes = Math.floor(timeValue / 6000);
    const seconds = Math.floor((timeValue % 6000) / 100);
    const milliseconds = timeValue % 100;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
  };

  const getDisplayTime = () => {
    return formatTime(time);
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
          className="btn btn-lap"
          onClick={recordLap}
          disabled={!isRunning && time === 0}
        >
          Lap
        </button>
        <button
          className="btn btn-reset"
          onClick={resetStopwatch}
        >
          Reset
        </button>
      </div>
      {laps.length > 0 && (
        <div className="laps-container">
          <h2>Laps</h2>
          <div className="laps-list">
            {laps.map((lap) => (
              <div key={lap.lapNumber} className="lap-item">
                <span className="lap-number">Lap {lap.lapNumber}</span>
                <span className="lap-time">{formatTime(lap.lapTime)}</span>
                <span className="cumulative-time">Total: {formatTime(lap.cumulativeTime)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
