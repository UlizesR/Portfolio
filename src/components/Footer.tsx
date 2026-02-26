export default function Footer() {
  const base = import.meta.env.BASE_URL;
  const links = [
    { href: 'https://github.com/UlizesR', icon: `${base}github.svg`, label: 'GitHub' },
    { href: 'https://linkedin.com/in/yourusername', icon: `${base}linkedin.svg`, label: 'LinkedIn' },
  ];

  return (
    <footer id="links" className="bg-tn-bg-alt rounded-2xl p-6 md:p-8 text-center border border-tn-border">
      <h3 className="text-lg font-bold mb-4">Thanks for visiting!</h3>
      <div className="flex justify-center gap-4 flex-wrap">
        {links.map(({ href, icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-tn-bg-elevated border border-tn-border text-tn-fg-muted hover:text-tn-accent hover:border-tn-accent/50 hover:bg-tn-accent/10 transition-all duration-300"
          >
            <img src={icon} alt={label} className="w-4 h-4 opacity-80 group-hover:opacity-100 transition-opacity" />
            <span className="font-medium text-xs">{label}</span>
          </a>
        ))}
      </div>
    </footer>
  );
}
