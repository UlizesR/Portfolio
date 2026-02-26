import type { ContentItem } from '../lib/content';
import { renderMarkdownWithMath } from '../lib/markdown';
import { BackNav, PrevNextNav } from '../components';
import 'katex/dist/katex.min.css';

interface PostProps {
  essay: ContentItem;
  prev?: ContentItem;
  next?: ContentItem;
}

const PROSE_CLASSES = 'prose prose-invert prose-lg max-w-none prose-headings:text-tn-fg prose-p:text-tn-fg prose-a:text-tn-accent prose-strong:text-tn-fg prose-code:text-tn-cyan prose-code:bg-tn-bg-alt prose-pre:bg-tn-bg-alt prose-blockquote:border-tn-accent prose-blockquote:text-tn-fg-muted prose-hr:border-tn-border';

export default function Post({ essay, prev, next }: PostProps) {
  const htmlContent = renderMarkdownWithMath(essay.content);

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <BackNav />
      <article>
        <header className="mb-12">
          {essay.image && (
            <div className="aspect-video rounded-2xl overflow-hidden border border-tn-border mb-8">
              <img src={essay.image} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          <span className="text-tn-accent font-bold text-xs uppercase tracking-widest">{essay.category}</span>
          <h1 className="text-4xl md:text-6xl font-bold mt-4 leading-tight">{essay.title}</h1>
          <time className="block mt-4 text-sm text-tn-fg-muted">{essay.date}</time>
        </header>
        <div
          className={PROSE_CLASSES}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
        <PrevNextNav prev={prev} next={next} />
      </article>
    </div>
  );
}
