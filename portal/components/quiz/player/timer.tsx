"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Timer = ({
  totalTime = 60,
  isTimerActive,
  setIsTimerActive,
}: {
  totalTime?: number;
  isTimerActive: boolean;
  setIsTimerActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [timeLeft, setTimeLeft] = useState(totalTime);

  const radius = 45;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;

  const progress = (timeLeft / totalTime) * circumference;

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!isTimerActive) {
      setTimeLeft(totalTime);
    }

    if (timeLeft === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft, totalTime]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative flex items-center justify-center">
        <svg
          width={100}
          height={100}
          viewBox="0 0 120 120"
          className="rotate-90"
        >
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="lightgray"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            stroke="tomato"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            transition={{
              duration: 1,
              ease: "linear",
            }}
          />
        </svg>
        <div className="absolute text-xl font-bold text-black">{timeLeft}s</div>
      </div>
    </div>
  );
};

export default Timer;
