import { useState, useRef, useCallback, useEffect } from "react";

interface PriceRangeFilterProps {
  min: number;
  max: number;
  currentMin?: number;
  currentMax?: number;
  currency?: string;
  onChange: (min: number, max: number) => void;
}

export default function PriceRangeFilter({
  min,
  max,
  currentMin,
  currentMax,
  currency = "₹",
  onChange,
}: PriceRangeFilterProps) {
  const [minVal, setMinVal] = useState(currentMin ?? min);
  const [maxVal, setMaxVal] = useState(currentMax ?? max);
  const rangeRef = useRef<HTMLDivElement>(null);

  // Keep thumb positions in sync with state
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Update the highlighted range track
  useEffect(() => {
    if (rangeRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxVal);
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, getPercent]);

  const formatPrice = (val: number) =>
    val === max ? `${currency}${val.toLocaleString()}+` : `${currency}${val.toLocaleString()}`;

  return (
    <div className="w-full px-2 py-4">
      {/* Label */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide">
          Price
        </span>
        <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
          {formatPrice(minVal)} &ndash; {formatPrice(maxVal)}
        </span>
      </div>

      {/* Slider track */}
      <div className="relative h-2 w-full">
        {/* Base track */}
        <div className="absolute top-0 left-0 right-0 h-2 rounded-full bg-neutral-200 dark:bg-neutral-700" />

        {/* Active range track */}
        <div
          ref={rangeRef}
          className="absolute top-0 h-2 rounded-full bg-blue-600 dark:bg-blue-500"
        />

        {/* Min thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(e) => {
            const value = Math.min(Number(e.target.value), maxVal - 1);
            setMinVal(value);
            onChange(value, maxVal);
          }}
          className="
            absolute top-0 left-0 w-full h-2
            appearance-none bg-transparent pointer-events-none
            [&::-webkit-slider-thumb]:pointer-events-auto
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-[3px]
            [&::-webkit-slider-thumb]:border-blue-600
            [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-moz-range-thumb]:pointer-events-auto
            [&::-moz-range-thumb]:appearance-none
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border-[3px]
            [&::-moz-range-thumb]:border-blue-600
            [&::-moz-range-thumb]:shadow-md
            [&::-moz-range-thumb]:cursor-pointer
            z-[3]
          "
          style={{ zIndex: minVal > max - 100 ? 5 : 3 }}
        />

        {/* Max thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(e) => {
            const value = Math.max(Number(e.target.value), minVal + 1);
            setMaxVal(value);
            onChange(minVal, value);
          }}
          className="
            absolute top-0 left-0 w-full h-2
            appearance-none bg-transparent pointer-events-none
            [&::-webkit-slider-thumb]:pointer-events-auto
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-blue-600
            [&::-webkit-slider-thumb]:border-[3px]
            [&::-webkit-slider-thumb]:border-blue-600
            [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,0.15)]
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-moz-range-thumb]:pointer-events-auto
            [&::-moz-range-thumb]:appearance-none
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-blue-600
            [&::-moz-range-thumb]:border-[3px]
            [&::-moz-range-thumb]:border-blue-600
            [&::-moz-range-thumb]:cursor-pointer
            z-[4]
          "
        />
      </div>

      {/* Min/Max labels */}
      <div className="flex justify-between mt-3">
        <span className="text-xs text-neutral-500 dark:text-neutral-500">
          {currency}{min.toLocaleString()}
        </span>
        <span className="text-xs text-neutral-500 dark:text-neutral-500">
          {currency}{max.toLocaleString()}+
        </span>
      </div>
    </div>
  );
}
