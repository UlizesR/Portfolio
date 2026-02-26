import type { ContentItem } from '../lib/content';
import { BreadcrumbNav, PageLayout, BlogCard } from '../components';

interface CategoryBlogsProps {
  category: string;
  blogs: ContentItem[];
}

export default function CategoryBlogs({ category, blogs }: CategoryBlogsProps) {
  const sorted = [...blogs].sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  return (
    <PageLayout>
      <BreadcrumbNav items={[{ label: 'All Blogs', href: '#/blogs' }]} />
      <header className="mb-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">{category}</h1>
        <p className="text-tn-fg-muted text-lg">{blogs.length} {blogs.length === 1 ? 'post' : 'posts'}</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {sorted.map(blog => (
          <BlogCard key={blog.slug} blog={blog} showCategory={false} />
        ))}
      </div>
    </PageLayout>
  );
}
