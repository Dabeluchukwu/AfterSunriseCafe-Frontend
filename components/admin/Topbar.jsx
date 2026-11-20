export default function Topbar({ title }) {
  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4">
      <h1 className="font-display text-xl font-semibold text-ink">{title}</h1>
    </header>
  );
}