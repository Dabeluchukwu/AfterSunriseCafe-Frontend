export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {Icon && <Icon className="text-5xl text-accent mb-4" />}
      <h3 className="text-lg font-semibold text-ink mb-1">{title}</h3>
      {description && (
        <p className="text-ink-muted max-w-sm mb-4">{description}</p>
      )}
      {action}
    </div>
  );
}