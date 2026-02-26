import { marked } from 'marked';
import katex from 'katex';

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

export function renderMarkdownWithMath(markdown: string): string {
  const rawHtml = marked.parse(markdown) as string;
  let out = rawHtml
    .replace(/\$\$([\s\S]*?)\$\$/g, (_, math) => {
      try {
        const decoded = decodeHtmlEntities(math.trim());
        return katex.renderToString(decoded, { displayMode: true, throwOnError: false });
      } catch {
        return `$$${math}$$`;
      }
    })
    .replace(/\$([^$]+)\$/g, (_, math) => {
      try {
        const decoded = decodeHtmlEntities(math.trim());
        return katex.renderToString(decoded, { displayMode: false, throwOnError: false });
      } catch {
        return `$${math}$`;
      }
    });
  return out;
}
