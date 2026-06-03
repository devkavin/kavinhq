import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownProps {
  content: string;
}

export function Markdown({ content }: MarkdownProps) {
  return (
    <div className="prose prose-invert max-w-none prose-sm sm:prose-base font-sans leading-relaxed text-muted-foreground prose-headings:text-foreground prose-headings:font-bold prose-headings:font-sans prose-h1:text-2xl sm:prose-h1:text-3xl prose-h2:text-xl sm:prose-h2:text-2xl prose-h3:text-lg prose-strong:text-foreground prose-code:text-primary prose-code:font-mono prose-code:bg-secondary/60 prose-code:border prose-code:border-border/30 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-secondary/40 prose-pre:border prose-pre:border-border/40 prose-pre:p-4 prose-pre:rounded-lg prose-pre:font-mono prose-a:text-primary prose-a:hover:underline prose-ul:list-disc prose-ol:list-decimal prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
