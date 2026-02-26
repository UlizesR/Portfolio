import type { ContentItem } from '../lib/content';

interface BlogCardProps {
  blog: ContentItem;
  showCategory?: boolean;
}

export default function BlogCard({ blog, showCategory = true }: BlogCardProps) {
  return (
    <a href={`#/blogs/${blog.slug.split('/').map(encodeURIComponent).join('/')}`} className="group block">
      <div className="aspect-[4/5] bg-tn-bg-alt rounded-3xl mb-6 overflow-hidden relative border border-tn-border">
        {showCategory && blog.category && (
          <span className="absolute top-4 left-4 bg-tn-bg/90 px-3 py-1 text-[10px] font-bold uppercase z-10 rounded-full shadow-sm text-tn-fg">
            {blog.category}
          </span>
        )}
        <img src={blog.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700" alt={blog.title} />
      </div>
      <time className="text-[10px] uppercase text-tn-fg-muted font-bold">{blog.date}</time>
      <h2 className="text-xl font-bold mt-2 group-hover:text-tn-accent transition leading-tight">{blog.title}</h2>
      <p className="text-tn-fg-muted mt-2 text-sm line-clamp-2">{blog.description}</p>
    </a>
  );
}
