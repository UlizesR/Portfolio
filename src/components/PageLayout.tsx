interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageLayout({ children, className = '' }: PageLayoutProps) {
  return (
    <div className={`max-w-6xl mx-auto px-6 py-12 md:py-20 ${className}`}>
      {children}
    </div>
  );
}
