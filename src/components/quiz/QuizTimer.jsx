import React, { useState, useEffect } from "react";
import Styles from "./Quiz.module.css";

const Timer = ({ onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeout();
      return; 
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeout]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className={Styles.timerflex}>
      {timeLeft > 0 ? (
        <span>Time Left: {formatTime(timeLeft)}</span>
      ) : (
        <span>Time up!</span>
      )}
    </div>
  );
};

export default Timer;
