/* eslint-disable @typescript-eslint/strict-boolean-expressions */
"use client";
import { type FC, useEffect, useState } from "react";

interface Props {
  endValue: number;
  duration: number;
}

const CountUpNumber: FC<Props> = ({ endValue, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrameId: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      if (progress < duration) {
        setCount(Math.min(endValue, (progress / duration) * endValue));
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setCount(endValue);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [endValue, duration]);

  return (
    <p className="text-lg font-medium md:font-bold xl:text-5xl">
      {Math.round(count)}
    </p>
  );
};

export default CountUpNumber;
