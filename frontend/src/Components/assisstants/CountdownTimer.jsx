import React, { useState, useEffect } from "react";
import { toPersianDigits } from "./ToPersianDigits";
import classes from "./CountdownTimer.module.css";

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) return <h2>Time's up!</h2>;

  return (
    <div style={{ direction: "ltr" }}>
      <h2>
        <span className={classes.spanholder}>
          {toPersianDigits(timeLeft.days)}
        </span>{" "}
        :{" "}
        <span className={classes.spanholder}>
          {toPersianDigits(timeLeft.hours)}
        </span>{" "}
        :{" "}
        <span className={classes.spanholder}>
          {toPersianDigits(timeLeft.minutes)}
        </span>{" "}
        :{" "}
        <span className={classes.spanholder}>
          {toPersianDigits(timeLeft.seconds)}
        </span>{" "}
      </h2>
    </div>
  );
};

export default CountdownTimer;
