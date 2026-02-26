export interface ContentItem {
  slug: string;
  category?: string;
  title: string;
  date: string;
  description: string;
  image: string;
  content: string;
  tags?: string[];
  series?: string;
  part?: number;
}

const contentImages = import.meta.glob<string>('/src/content/assets/*.{jpg,jpeg,png,gif,webp}', {
  query: '?url',
  import: 'default',
  eager: true,
});

function resolveImage(imagePath: string, mdPath: string): string {
  if (!imagePath || imagePath.startsWith('http')) return imagePath || 'https://via.placeholder.com/800/450';
  const normalized = imagePath.replace(/\/assests\//, '/assets/');
  const mdDir = mdPath.replace(/\/[^/]+\.md$/, '');
  const parts = (mdDir + '/' + normalized).split('/').filter(Boolean);
  const resolved: string[] = [];
  for (const p of parts) {
    if (p === '..') resolved.pop();
    else if (p !== '.') resolved.push(p);
  }
  const key = '/src/content/' + resolved.slice(resolved.indexOf('content') + 1).join('/');
  return (contentImages[key] as string) || imagePath || 'https://via.placeholder.com/800/450';
}

export async function getContent(type: 'blogs' | 'projects'): Promise<ContentItem[]> {
  const modules =
    type === 'blogs'
      ? import.meta.glob('/src/content/Blogs/**/*.md', { query: '?raw', import: 'default', eager: true })
      : import.meta.glob('/src/content/Projects/*.md', { query: '?raw', import: 'default', eager: true });

  return Object.entries(modules)
    .filter(([path]) => type !== 'blogs' || !path.includes('/assets/'))
    .map(([path, rawContent]) => {
      const parts = path.split('/');
      const filename = parts.pop()?.replace('.md', '') || '';
      const category = type === 'blogs' ? parts.pop() : undefined;
      const slug = category && category !== 'content' ? `${category}/${filename}` : filename;

    const raw = rawContent as string;
    const data: Record<string, string> = {};
    let content = raw;

    if (raw.startsWith('---')) {
      const endOfFrontmatter = raw.indexOf('---', 3);
      if (endOfFrontmatter !== -1) {
        const yamlBlock = raw.substring(3, endOfFrontmatter).trim();
        content = raw.substring(endOfFrontmatter + 3).trim();
        yamlBlock.split('\n').forEach(line => {
          const [key, ...val] = line.split(':');
          if (key && val) data[key.trim()] = val.join(':').trim().replace(/^["']|["']$/g, '');
        });
      }
    }

    const partNum = data.part ? parseInt(data.part, 10) : undefined;
    const imagePath = data.image || '';
    const resolvedImage = type === 'blogs' ? resolveImage(imagePath, path) : (imagePath || 'https://via.placeholder.com/800/450');

    return {
      slug,
      category,
      content,
      title: data.title || filename,
      date: data.date || '',
      description: data.description || '',
      image: resolvedImage,
      tags: data.tags ? data.tags.split(',').map(t => t.trim()) : [],
      series: data.series,
      part: !isNaN(partNum as number) ? partNum : undefined,
    };
  });
}

export function getCategories(blogs: ContentItem[]): { name: string; count: number; image: string }[] {
  const byCategory = new Map<string, ContentItem[]>();
  for (const blog of blogs) {
    const cat = blog.category ?? 'Uncategorized';
    if (!byCategory.has(cat)) byCategory.set(cat, []);
    byCategory.get(cat)!.push(blog);
  }
  return Array.from(byCategory.entries()).map(([name, items]) => ({
    name,
    count: items.length,
    image: items[0]?.image ?? 'https://via.placeholder.com/800/450',
  }));
}

export function getPrevNext(
  items: ContentItem[],
  current: ContentItem
): { prev?: ContentItem; next?: ContentItem } {
  if (!current.category) return {};

  const inCategory = items
    .filter(i => i.category === current.category)
    .sort((a, b) => a.slug.localeCompare(b.slug));

  const idx = inCategory.findIndex(i => i.slug === current.slug);
  if (idx < 0) return {};

  return {
    prev: idx > 0 ? inCategory[idx - 1] : undefined,
    next: idx < inCategory.length - 1 ? inCategory[idx + 1] : undefined,
  };
}
