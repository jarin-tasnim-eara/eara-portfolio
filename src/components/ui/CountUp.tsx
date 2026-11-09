"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

export default function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reduceMotion) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const duration = 1200;
    const startTime = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    }

    setDisplay(0);
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [inView, value, reduceMotion]);

  return <span ref={ref}>{String(display).padStart(2, "0")}</span>;
}