interface SectionHeaderProps {
  children: React.ReactNode;
}

export default function SectionHeader({ children }: SectionHeaderProps) {
  return (
    <h3 className="text-sm font-black uppercase tracking-widest text-tn-fg-muted mb-12 border-b border-tn-border pb-4">
      {children}
    </h3>
  );
}
