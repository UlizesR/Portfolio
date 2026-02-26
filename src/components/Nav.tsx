export default function Nav() {
  return (
    <nav className="flex justify-between items-center mb-20">
      <a href="#" className="font-bold text-xl tracking-tighter uppercase">Uli Rodriguez</a>
      <div className="hidden md:flex space-x-8 text-sm font-medium text-tn-fg-muted uppercase tracking-widest">
        <a href="#projects" className="hover:text-tn-fg transition">Projects</a>
        <a href="#/blogs" className="hover:text-tn-fg transition">Blogs</a>
        <a href="#about" className="hover:text-tn-fg transition">About</a>
      </div>
    </nav>
  );
}
