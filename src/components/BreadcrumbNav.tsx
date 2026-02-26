interface BreadcrumbNavProps {
  items: { label: string; href: string }[];
}

export default function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  return (
    <nav className="mb-12 flex items-center gap-4">
      <a href="#" className="text-sm font-bold text-tn-fg-muted hover:text-tn-fg transition uppercase">← Home</a>
      {items.map(item => (
        <span key={item.href} className="flex items-center gap-4">
          <span className="text-tn-fg-dim">/</span>
          <a href={item.href} className="text-sm font-bold text-tn-fg-muted hover:text-tn-fg transition uppercase">
            {item.label}
          </a>
        </span>
      ))}
    </nav>
  );
}
