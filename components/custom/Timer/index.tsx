"use client";

import classNames from "classnames";
import React, { useState, useEffect } from "react";

import styles from "./styles.module.scss";

interface TimerProps {
  targetDate: Date;
  onTimerEnd?: () => void;
  className?: string;
}

const Timer: React.FC<TimerProps> = ({ targetDate, onTimerEnd, className }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      return Math.max(0, Math.floor(difference / 1000));
    };

    setTimeLeft(calculateTimeLeft());

    const timerId = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (newTimeLeft <= 0) {
        clearInterval(timerId);
        if (onTimerEnd) {
          onTimerEnd();
        }
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [targetDate, onTimerEnd]);

  const formatTime = (time: number): string => {
    const days = Math.floor(time / (3600 * 24));
    const hours = Math.floor((time % (3600 * 24)) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${days}d ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return <div className={classNames(styles["timer"], className)}>{formatTime(timeLeft)}</div>;
};

export default Timer;
