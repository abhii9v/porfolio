import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { serverDatabases, DATABASE_ID, COLLECTIONS } from '@/lib/appwrite-server';
import { Query } from 'node-appwrite';
import { ArrowLeft, Calendar, Clock, BookOpen } from 'lucide-react';

interface BlogPostDoc {
  $id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  categories: string[];
  readingTime: string;
  publishedAt: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const response = await serverDatabases.listDocuments(DATABASE_ID, COLLECTIONS.blog_posts);
    return response.documents.map((doc: any) => ({
      slug: doc.slug,
    }));
  } catch {
    return [
      { slug: 'scaling-time-series-forecasting-production' },
      { slug: 'building-session-level-recommender-systems' },
      { slug: 'hybrid-vector-search-llm-agents' },
    ];
  }
}

// Dynamically generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const response = await serverDatabases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.blog_posts,
      [Query.equal('slug', slug), Query.limit(1)]
    );
    const doc = response.documents[0];
    if (!doc) return { title: 'Article | Abhinav Yadav' };
    return {
      title: `${doc.title} | Abhinav Yadav`,
      description: doc.summary,
    };
  } catch {
    return {
      title: 'Article | Abhinav Yadav',
    };
  }
}

function parseInlineFormatting(text: string): React.ReactNode {
  const regex = /(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g;
  const parts = text.split(regex);
  
  if (parts.length === 1) return text;

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold text-zinc-950">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={index} className="bg-zinc-150 border border-zinc-200/50 px-1.5 py-0.5 rounded-sm text-[11px] font-mono text-zinc-800">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
      const closingBracketIndex = part.indexOf('](');
      const linkText = part.slice(1, closingBracketIndex);
      const url = part.slice(closingBracketIndex + 2, -1);
      return (
        <a 
          key={index} 
          href={url} 
          className="text-[#782849] hover:underline font-semibold"
        >
          {linkText}
        </a>
      );
    }
    return part;
  });
}

function renderMarkdown(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  
  let currentParagraph: string[] = [];
  let currentList: string[] = [];
  let currentCode: string[] = [];
  let codeLang = '';
  let inCodeBlock = false;
  let inList = false;
  let currentListType: 'ul' | 'ol' = 'ul';
  let skippingTOC = false;

  const flushParagraph = (key: string | number) => {
    if (currentParagraph.length > 0) {
      elements.push(
        <p key={`p-${key}`} className="leading-relaxed text-sm text-zinc-650 mb-4 font-sans">
          {parseInlineFormatting(currentParagraph.join(' '))}
        </p>
      );
      currentParagraph = [];
    }
  };

  const flushList = (key: string | number) => {
    if (currentList.length > 0) {
      const Tag = currentListType === 'ol' ? 'ol' : 'ul';
      const listClass = currentListType === 'ol' 
        ? "space-y-2.5 my-4 pl-5 list-decimal text-zinc-650 text-xs" 
        : "space-y-2.5 my-4 pl-5 list-disc text-zinc-650 text-xs";
      elements.push(
        <Tag key={`list-${key}`} className={listClass}>
          {currentList.map((item, idx) => (
            <li key={idx} className="font-sans leading-relaxed">
              {parseInlineFormatting(item)}
            </li>
          ))}
        </Tag>
      );
      currentList = [];
      inList = false;
    }
  };

  const flushCode = (key: string | number) => {
    if (currentCode.length > 0) {
      elements.push(
        <pre
          key={`code-${key}`}
          className="p-4 rounded-md bg-zinc-100 border border-zinc-200 font-mono text-[11px] text-zinc-800 overflow-x-auto whitespace-pre my-6 shadow-sm"
        >
          <code>{currentCode.join('\n')}</code>
        </pre>
      );
      currentCode = [];
      inCodeBlock = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if we need to skip Table of Contents list
    if (line.startsWith('## ')) {
      const headingText = line.replace('## ', '').trim();
      if (headingText.toLowerCase().startsWith('table of contents')) {
        skippingTOC = true;
        continue;
      } else {
        skippingTOC = false;
      }
    }

    if (skippingTOC) {
      continue;
    }

    // Code Block Check
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        flushCode(i);
      } else {
        flushParagraph(i);
        flushList(i);
        inCodeBlock = true;
        codeLang = line.trim().replace('```', '');
      }
      continue;
    }

    if (inCodeBlock) {
      currentCode.push(line);
      continue;
    }

    // Heading Checks
    if (line.startsWith('### ')) {
      flushParagraph(i);
      flushList(i);
      const headingText = line.replace('### ', '').trim();
      const anchor = headingText.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
      elements.push(
        <h3
          id={anchor}
          key={`h3-${i}`}
          className="text-base font-bold text-zinc-800 font-sans mt-6 mb-3"
        >
          {headingText}
        </h3>
      );
      continue;
    }

    if (line.startsWith('## ')) {
      flushParagraph(i);
      flushList(i);
      const headingText = line.replace('## ', '').trim();
      const anchor = headingText.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
      elements.push(
        <h2
          id={anchor}
          key={`h2-${i}`}
          className="text-lg font-bold text-zinc-800 font-sans mt-8 mb-4 border-b border-zinc-200 pb-1"
        >
          {headingText}
        </h2>
      );
      continue;
    }

    // List Checks (unordered: *, -, ordered: 1., 2.)
    const unorderedMatch = line.match(/^(\*\s+|\-\s+|\*\s{3})/);
    const orderedMatch = line.match(/^(\d+\.\s+)/);

    if (unorderedMatch || orderedMatch) {
      flushParagraph(i);
      
      const listType = unorderedMatch ? 'ul' : 'ol';
      if (inList && currentListType !== listType) {
        flushList(i);
      }
      
      inList = true;
      currentListType = listType;
      
      const cleanLine = line.replace(/^(\*\s+|\-\s+|\*\s{3}|\d+\.\s+)/, '').trim();
      currentList.push(cleanLine);
      continue;
    }

    // Empty line check
    if (line.trim() === '') {
      flushParagraph(i);
      flushList(i);
      continue;
    }

    // Normal text line
    if (inList) {
      if (line.startsWith('  ') || line.startsWith('\t')) {
        currentList[currentList.length - 1] += ' ' + line.trim();
      } else {
        flushList(i);
        currentParagraph.push(line.trim());
      }
    } else {
      currentParagraph.push(line.trim());
    }
  }

  // Flush remaining
  flushParagraph('end');
  flushList('end');
  flushCode('end');

  return elements;
}

export const revalidate = 60; // Revalidate every minute

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  let post: BlogPostDoc | null = null;

  try {
    const response = await serverDatabases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.blog_posts,
      [Query.equal('slug', slug), Query.limit(1)]
    );
    const doc: any = response.documents[0];
    if (doc) {
      post = {
        $id: doc.$id,
        title: doc.title,
        slug: doc.slug,
        summary: doc.summary,
        content: doc.content || '',
        categories: doc.categories || [],
        readingTime: doc.readingTime || '5 min read',
        publishedAt: doc.publishedAt,
      };
    }
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
  }

  if (!post) {
    notFound();
  }

  // Parse Table of Contents items dynamically from markdown headers (e.g. ## Header)
  const tocItems = post.content
    .split('\n')
    .filter((line) => line.startsWith('## ') && !line.toLowerCase().includes('table of contents'))
    .map((line) => {
      const title = line.replace('## ', '');
      const anchor = title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
      return { title, anchor };
    });

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Back Button */}
      <Link
        href="/blog"
        className="inline-flex items-center space-x-2 text-xs font-mono text-zinc-500 hover:text-[#782849] transition-colors duration-300 mb-8 group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
        <span>Back to Articles</span>
      </Link>

      {/* Main Header */}
      <div className="border-b border-zinc-200 pb-8 mb-10">
        <div className="flex items-center space-x-3 text-xs font-mono text-zinc-400 mb-3">
          <Calendar className="h-4 w-4" />
          <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span>•</span>
          <Clock className="h-4 w-4" />
          <span>{post.readingTime}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-sans font-bold text-zinc-800 tracking-tight leading-tight">
          {post.title}
        </h1>
      </div>

      {/* Grid Content with Table of Contents sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Table of Contents sidebar */}
        {tocItems.length > 0 && (
          <aside className="md:col-span-1 space-y-4 md:sticky md:top-24 h-fit">
            <h4 className="font-mono text-[10px] text-zinc-450 uppercase tracking-widest flex items-center space-x-1.5 font-semibold">
              <BookOpen className="h-3.5 w-3.5 text-[#782849]" />
              <span>On This Page</span>
            </h4>
            <nav className="flex flex-col space-y-2 border-l border-zinc-200 pl-3">
              {tocItems.map((item) => (
                <a
                  key={item.anchor}
                  href={`#${item.anchor}`}
                  className="text-[11px] font-sans text-zinc-500 hover:text-[#782849] transition-colors duration-300 block"
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </aside>
        )}

        {/* Article Body */}
        <div className={`${tocItems.length > 0 ? 'md:col-span-3' : 'md:col-span-4'} space-y-6`}>
          <article className="prose max-w-none text-zinc-700 text-sm leading-relaxed space-y-6">
            {renderMarkdown(post.content)}
          </article>
        </div>
      </div>
    </div>
  );
}
