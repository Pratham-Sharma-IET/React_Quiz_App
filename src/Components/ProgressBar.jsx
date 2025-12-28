import { useState, useEffect } from "react";

export default function ProgressBar({ skipQuestion, timer }) {
  const [timeRemaining, setTimeRemaning] = useState(timer);

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("timeout");
      skipQuestion();
    }, timer);

    return () => {
      clearTimeout(timeout);
    };
  }, [timer, skipQuestion]);

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("interval");
      if (timeRemaining <= 0) {
        // console.log("interval ended");
        clearInterval(interval);
      }
      setTimeRemaning((prevTime) => prevTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [timeRemaining]);

  return <progress id="question-time" max={timer} value={timeRemaining} />;
}
