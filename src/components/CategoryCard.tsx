interface CategoryCardProps {
  name: string;
  count: number;
  image: string;
}

export default function CategoryCard({ name, count, image }: CategoryCardProps) {
  return (
    <a href={`#/blogs/${encodeURIComponent(name)}`} className="group block">
      <div className="aspect-[4/5] bg-tn-bg-alt rounded-3xl mb-6 overflow-hidden border border-tn-border">
        <img src={image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700" alt={name} />
      </div>
      <h4 className="text-xl font-bold group-hover:text-tn-accent transition leading-tight">{name}</h4>
      <p className="text-sm text-tn-fg-muted mt-1">{count} {count === 1 ? 'post' : 'posts'}</p>
    </a>
  );
}
