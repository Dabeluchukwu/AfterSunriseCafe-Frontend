"use client";

export default function Input({ label, error, className = "", ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-ink mb-1.5">
          {label}
        </label>
      )}
      <input
        className={`w-full h-11 px-3 rounded-lg border border-gray-200 bg-white text-ink placeholder:text-ink-muted focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-secondary">{error}</p>}
    </div>
  );
}