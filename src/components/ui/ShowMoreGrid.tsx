"use client";

import { useState } from "react";
import type { ReactNode } from "react";

type ShowMoreGridProps = {
  items: ReactNode[];
  initial?: number;
  step?: number;
  gridClassName: string;
  buttonClassName: string;
};

export default function ShowMoreGrid(props: ShowMoreGridProps) {
  const { items, gridClassName, buttonClassName } = props;
  const initial = props.initial ? props.initial : 3;
  const step = props.step ? props.step : 3;
  const [visible, setVisible] = useState(initial);

  const total = items.length;
  const hasMore = visible < total;
  const canCollapse = !hasMore && total > initial;
  const remaining = total - visible;
  const nextCount = remaining < step ? remaining : step;

  return (
    <div>
      <div className={gridClassName}>{items.slice(0, visible)}</div>

      {(hasMore || canCollapse) && (
        <div className="mt-8 flex justify-center">
          {hasMore ? (
            <button
              type="button"
              onClick={() => setVisible(visible + step)}
              className={buttonClassName}
            >
              See more · {nextCount} more
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setVisible(initial)}
              className={buttonClassName}
            >
              Show less
            </button>
          )}
        </div>
      )}
    </div>
  );
}