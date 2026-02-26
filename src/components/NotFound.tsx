export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6">
      <span className="text-6xl font-bold text-tn-fg-dim">404</span>
      <p className="text-tn-fg-muted">Page not found</p>
      <a href="#" className="text-sm font-bold text-tn-fg-muted hover:text-tn-accent transition uppercase">
        ← Back home
      </a>
    </div>
  );
}
