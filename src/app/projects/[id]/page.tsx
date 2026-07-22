import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { serverDatabases, DATABASE_ID, COLLECTIONS } from '@/lib/appwrite-server';
import { ArrowLeft, ExternalLink, Sparkles, AlertTriangle, Lightbulb, Compass, Award } from 'lucide-react';
import { GithubIcon } from '@/components/ui/SocialIcons';

interface ProjectDoc {
  $id: string;
  title: string;
  subtitle: string;
  content: string;
  architecture: string;
  techStack: string[];
  screenshots: string[];
  businessResults: string[];
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
  order: number;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

// Dynamically generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const doc: any = await serverDatabases.getDocument(DATABASE_ID, COLLECTIONS.projects, id);
    return {
      title: `${doc.title} | Abhinav Yadav`,
      description: doc.subtitle,
    };
  } catch {
    return {
      title: 'Project Detail | Abhinav Yadav',
    };
  }
}

export const revalidate = 60; // Revalidate every minute

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  let project: ProjectDoc | null = null;

  try {
    const doc: any = await serverDatabases.getDocument(DATABASE_ID, COLLECTIONS.projects, id);
    project = {
      $id: doc.$id,
      title: doc.title,
      subtitle: doc.subtitle,
      content: doc.content || '',
      architecture: doc.architecture || '',
      techStack: doc.techStack || [],
      screenshots: doc.screenshots || [],
      businessResults: doc.businessResults || [],
      demoUrl: doc.demoUrl || '',
      githubUrl: doc.githubUrl || '',
      featured: doc.featured || false,
      order: doc.order || 99,
    };
  } catch (error) {
    console.error('Failed to fetch project detail:', error);
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Back Button */}
      <Link
        href="/projects"
        className="inline-flex items-center space-x-2 text-xs font-mono text-zinc-500 hover:text-[#782849] transition-colors duration-300 mb-8 group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
        <span>Back to Projects</span>
      </Link>

      {/* Main Header */}
      <div className="border-b border-zinc-200 pb-8 mb-10">
        <h1 className="text-3xl sm:text-5xl font-sans font-bold text-zinc-800 tracking-tight mb-3">
          {project.title}
        </h1>
        <p className="text-sm sm:text-base text-zinc-500 font-sans leading-relaxed max-w-2xl mb-6">
          {project.subtitle}
        </p>

        {/* Links & CTA */}
        <div className="flex flex-wrap items-center gap-3">
          {project.demoUrl && (
            <Link
              href={project.demoUrl}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-md bg-[#782849] border border-[#782849] text-white font-semibold font-mono text-xs hover:bg-[#5d1f38] transition-all duration-150 shadow-sm cursor-pointer"
            >
              <Compass className="h-3.5 w-3.5" />
              <span>Launch Live Simulator</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-md bg-white border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 text-zinc-650 font-mono text-xs transition-all duration-150 shadow-sm"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              <span>View Source Code</span>
            </a>
          )}
        </div>
      </div>

      {/* Content & Side Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Markdown Details & Architecture */}
        <div className="md:col-span-2 space-y-10">
          {/* Main Content Markdown Render */}
          <div className="prose max-w-none text-zinc-650 text-sm leading-relaxed space-y-6">
            {/* Simple Markdown Parsing for Headings, lists, etc. */}
            {project.content.split('\n\n').map((paragraph, i) => {
              if (paragraph.startsWith('### ')) {
                const heading = paragraph.replace('### ', '');
                return (
                  <h3 key={i} className="text-lg font-bold text-zinc-800 font-sans mt-8 mb-4 border-b border-zinc-200 pb-2">
                    {heading}
                  </h3>
                );
              }
              if (paragraph.startsWith('*   ')) {
                const items = paragraph.split('\n');
                return (
                  <ul key={i} className="space-y-2.5 my-4">
                    {items.map((item, idx) => {
                      const text = item.replace('*   ', '').replace('**', '').replace('**', '');
                      return (
                        <li key={idx} className="flex items-start text-xs text-zinc-600">
                          <span className="text-[#782849] mr-2.5 font-bold">•</span>
                          <span>{text}</span>
                        </li>
                      );
                    })}
                  </ul>
                );
              }
              return (
                <p key={i} className="leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Architecture Diagram */}
          {project.architecture && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-zinc-800 font-sans border-b border-zinc-200 pb-2">
                System Architecture
              </h3>
              <pre className="p-5 rounded-md bg-zinc-100 border border-zinc-200 font-mono text-xs text-zinc-700 overflow-x-auto whitespace-pre shadow-sm">
                {project.architecture.replace(/```/g, '')}
              </pre>
            </div>
          )}
        </div>

        {/* Right Column: Sidebar (Tech Stack & Business Impact) */}
        <div className="space-y-6">
          {/* Business Impact Widget */}
          <div className="bg-white rounded-md p-5 border border-zinc-200 shadow-sm">
            <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-wider mb-4 flex items-center space-x-2 font-semibold">
              <Award className="h-4 w-4 text-[#782849]" />
              <span>Business Results</span>
            </h4>
            <div className="space-y-4">
              {project.businessResults.map((result, i) => (
                <div key={i} className="flex items-start space-x-2">
                  <span className="text-[#782849] mr-2 mt-0.5 font-semibold">↳</span>
                  <span className="text-xs text-zinc-600 leading-normal">{result}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Widget */}
          <div className="bg-white rounded-md p-5 border border-zinc-200 shadow-sm">
            <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-wider mb-4 flex items-center space-x-2 font-semibold">
              <Sparkles className="h-4 w-4 text-[#782849]" />
              <span>Technology Stack</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-zinc-50 border border-zinc-200 font-mono text-xs text-zinc-600"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
