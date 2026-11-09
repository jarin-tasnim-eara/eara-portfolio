"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "framer-motion";
import type { Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type SliderProps = {
  items: ReactNode[];
  dotClass: string;
  label: string;
  intervalMs?: number;
};

const variants: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -40 : 40 }),
};

const sideArrowClass =
  "absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-soft/60 bg-page text-ink shadow-lg transition hover:bg-ink hover:text-page md:flex";

const smallArrowClass =
  "flex h-10 w-10 items-center justify-center rounded-full border border-soft/60 bg-page text-ink shadow-md transition hover:bg-ink hover:text-page md:hidden";

function useColumns(): number {
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    function update() {
      const width = window.innerWidth;
      if (width >= 1024) {
        setColumns(3);
      } else if (width >= 640) {
        setColumns(2);
      } else {
        setColumns(1);
      }
    }

    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  return columns;
}

export default function Slider(props: SliderProps) {
  const { items, dotClass, label } = props;
  const intervalMs = props.intervalMs ? props.intervalMs : 7000;

  const columns = useColumns();
  const reduceMotion = useReducedMotion();
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / columns));
  const safePage = Math.min(page, pageCount - 1);

  function goTo(next: number, dir: number) {
    setDirection(dir);
    setPage((next + pageCount) % pageCount);
  }

  useEffect(() => {
    if (pageCount <= 1 || paused || reduceMotion) return;

    const timer = setTimeout(() => {
      setDirection(1);
      setPage((current) => (Math.min(current, pageCount - 1) + 1) % pageCount);
    }, intervalMs);

    return () => clearTimeout(timer);
  }, [safePage, paused, pageCount, reduceMotion, intervalMs]);

  const maxStart = Math.max(0, total - columns);
  const start = Math.min(safePage * columns, maxStart);
  const visible = items.slice(start, start + columns);

  return (
    <MotionConfig reducedMotion="user">
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div className="relative">
          {pageCount > 1 && (
            <button
              type="button"
              aria-label="Previous"
              onClick={() => goTo(safePage - 1, -1)}
              className={sideArrowClass + " md:-left-5"}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          <div className="-mx-1 overflow-hidden px-1 py-2">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={safePage}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                drag={pageCount > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_event, info) => {
                  if (info.offset.x < -60) {
                    goTo(safePage + 1, 1);
                  } else if (info.offset.x > 60) {
                    goTo(safePage - 1, -1);
                  }
                }}
                style={{
                  touchAction: "pan-y",
                  gridTemplateColumns:
                    "repeat(" + columns + ", minmax(0, 1fr))",
                }}
                className="grid gap-6"
              >
                {visible}
              </motion.div>
            </AnimatePresence>
          </div>

          {pageCount > 1 && (
            <button
              type="button"
              aria-label="Next"
              onClick={() => goTo(safePage + 1, 1)}
              className={sideArrowClass + " md:-right-5"}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>

        {pageCount > 1 && (
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => goTo(safePage - 1, -1)}
              className={smallArrowClass}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: pageCount }).map((_, index) => {
                const isActive = index === safePage;
                const dotStateClass = isActive
                  ? "h-2 w-7 rounded-full transition-all " + dotClass
                  : "h-2 w-2 rounded-full bg-soft/30 transition-all hover:bg-soft/60";

                return (
                  <button
                    key={index}
                    type="button"
                    aria-label={"Go to page " + (index + 1)}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => goTo(index, index > safePage ? 1 : -1)}
                    className={dotStateClass}
                  />
                );
              })}
            </div>

            <button
              type="button"
              aria-label="Next"
              onClick={() => goTo(safePage + 1, 1)}
              className={smallArrowClass}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </MotionConfig>
  );
}