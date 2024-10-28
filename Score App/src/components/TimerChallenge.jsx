import { useRef, useState, useEffect } from "react";
import ResultModal from "./ResultModal";

export default function TimeChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();
  const [remainingTime, setRemainingTime] = useState(targetTime * 1000);
  const [timerStarted, setTimerStarted] = useState(false);

  const timeIsActive = timerStarted && remainingTime > 0;

  // Effect to handle dialog opening when time runs out
  useEffect(() => {
    if (remainingTime <= 0 && timerStarted) {
      clearInterval(timer.current);
      setTimerStarted(false);
      dialog.current.open();
    }
  }, [remainingTime, timerStarted, targetTime]);

  function handleReset() {
    setRemainingTime(targetTime * 1000);
  }

  function handleStart() {
    setTimerStarted(true);
    timer.current = setInterval(() => {
      setRemainingTime((prev) => prev - 10);
    }, 10);
  }

  function handleStop() {
    clearInterval(timer.current);
    setTimerStarted(false);
    dialog.current.open();
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={remainingTime}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timeIsActive ? handleStop : handleStart}>
            {timeIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timeIsActive ? "active" : undefined}>
          {timeIsActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
