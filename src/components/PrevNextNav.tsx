import type { ContentItem } from '../lib/content';

interface PrevNextNavProps {
  prev?: ContentItem;
  next?: ContentItem;
}

export default function PrevNextNav({ prev, next }: PrevNextNavProps) {
  if (!prev && !next) return null;

  return (
    <nav className="mt-16 pt-12 border-t border-tn-border flex justify-between gap-6">
      {prev ? (
        <a href={`#/essay/${prev.slug}`} className="group flex-1 min-w-0">
          <span className="text-xs font-bold uppercase text-tn-fg-muted">← Previous</span>
          <p className="font-bold mt-1 truncate group-hover:text-tn-accent transition">{prev.title}</p>
        </a>
      ) : <span />}
      {next ? (
        <a href={`#/essay/${next.slug}`} className="group flex-1 min-w-0 text-right">
          <span className="text-xs font-bold uppercase text-tn-fg-muted">Next →</span>
          <p className="font-bold mt-1 truncate group-hover:text-tn-accent transition">{next.title}</p>
        </a>
      ) : <span />}
    </nav>
  );
}
