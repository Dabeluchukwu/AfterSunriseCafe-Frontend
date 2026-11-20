"use client";

export default function Select({ label, error, className = "", children, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-ink mb-1.5">
          {label}
        </label>
      )}
      <select
        className={`w-full h-11 px-3 rounded-lg border border-gray-200 bg-white text-ink focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-sm text-secondary">{error}</p>}
    </div>
  );
}