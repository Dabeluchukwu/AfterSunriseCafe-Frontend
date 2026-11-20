"use client";

export default function Textarea({ label, error, className = "", rows = 5, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-ink mb-1.5">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        className={`w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-ink placeholder:text-ink-muted focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition resize-y ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-secondary">{error}</p>}
    </div>
  );
}