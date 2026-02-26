import type { ContentItem } from '../lib/content';
import { getCategories } from '../lib/content';
import { BackNav, PageLayout, BlogCard } from '../components';

interface AllBlogsProps {
  blogs: ContentItem[];
}

export default function AllBlogs({ blogs }: AllBlogsProps) {
  const categories = getCategories(blogs);
  const sorted = [...blogs].sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  return (
    <PageLayout>
      <BackNav />
      <header className="mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-3">All Blogs</h1>
        <p className="text-tn-fg-muted text-lg max-w-2xl">
          Thoughts and ideas on computer science, math, and physics. I hope you find something interesting.
        </p>
      </header>

      {categories.length > 1 && (
        <nav className="mb-12 flex flex-wrap gap-2">
          <span className="text-tn-fg-dim text-sm font-medium mr-2 self-center">Browse by:</span>
          {categories.map(cat => (
            <a
              key={cat.name}
              href={`#/blogs/${encodeURIComponent(cat.name)}`}
              className="px-4 py-2 rounded-full bg-tn-bg-elevated border border-tn-border text-tn-fg-muted hover:text-tn-accent hover:border-tn-accent/50 text-sm font-medium transition-colors"
            >
              {cat.name} <span className="text-tn-fg-dim">({cat.count})</span>
            </a>
          ))}
        </nav>
      )}

      <section>
        <h2 className="sr-only">All posts</h2>
        {sorted.length === 0 ? (
          <p className="text-tn-fg-muted py-12">No posts yet. Check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {sorted.map(blog => (
              <BlogCard key={blog.slug} blog={blog} showCategory />
            ))}
          </div>
        )}
      </section>
    </PageLayout>
  );
}
