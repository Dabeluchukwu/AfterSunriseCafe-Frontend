import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="font-display text-6xl font-bold text-secondary">404</h1>
      <p className="mt-4 text-xl text-ink">This page went stale.</p>
      <p className="mt-2 text-ink-muted">Let's get you back to the fresh stuff.</p>
      <div className="mt-8">
        <Button href="/" variant="primary">Back to Home</Button>
      </div>
    </div>
  );
}