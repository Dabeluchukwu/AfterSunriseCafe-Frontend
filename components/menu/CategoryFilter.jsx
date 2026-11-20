"use client";

export default function CategoryFilter({ categories, active, onChange }) {
  const all = ["All", ...categories];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {all.map((cat) => {
        const isActive = active === cat || (cat === "All" && !active);
        return (
          <button
            key={cat}
            onClick={() => onChange(cat === "All" ? "" : cat)}
            className={`px-4 py-2 rounded-pill text-sm font-medium transition-colors border ${
              isActive
                ? "bg-secondary text-white border-secondary"
                : "bg-white text-ink-soft border-gray-200 hover:border-secondary hover:text-secondary"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}