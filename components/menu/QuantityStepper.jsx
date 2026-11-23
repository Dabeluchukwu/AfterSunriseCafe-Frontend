"use client";

import { HiMinus, HiPlus } from "react-icons/hi";

export default function QuantityStepper({ value, onChange, min = 0, size = "sm" }) {
  const iconSize = size === "sm" ? 14 : 16;
  const pad = size === "sm" ? "p-1" : "p-1.5";

  return (
    <div className="inline-flex items-center border border-gray-200 rounded-pill bg-white">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={`${pad} text-ink-soft hover:text-secondary disabled:opacity-30 disabled:cursor-not-allowed`}
        aria-label="Decrease quantity"
      >
        <HiMinus size={iconSize} />
      </button>
      <span className="min-w-[1.75rem] text-center text-sm font-medium text-ink">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className={`${pad} text-ink-soft hover:text-secondary`}
        aria-label="Increase quantity"
      >
        <HiPlus size={iconSize} />
      </button>
    </div>
  );
}