'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Search, Sparkles } from 'lucide-react';
import { searchProjects, SearchableProject } from '@/lib/ai/search';

interface ProjectGridItem extends SearchableProject {
  subtitle: string;
  businessResults: string[];
  featured: boolean;
  order: number;
}

export default function ProjectsGrid({ projects }: { projects: ProjectGridItem[] }) {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) {
      return [...projects].sort((a, b) => a.order - b.order);
    }
    
    // Run TF-IDF search
    const results = searchProjects(searchQuery, projects);
    
    // Filter out items with score = 0, sort by score descending
    return results
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.project as ProjectGridItem);
  }, [searchQuery, projects]);

  return (
    <div className="space-y-8">
      {/* Search Console Input */}
      <div className="relative max-w-xl">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
          <Search className="h-4 w-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Try semantic search (e.g. 'forecasting models' or 'recommender')..."
          className="w-full bg-white border border-zinc-200 rounded-md py-3 pl-10 pr-4 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-[#782849] focus:ring-1 focus:ring-[#782849] transition-all duration-150 shadow-sm"
        />
        {searchQuery && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="font-mono text-[9px] text-[#782849] uppercase tracking-wider bg-[#782849]/5 px-2 py-0.5 rounded-md border border-[#782849]/15">
              Semantic Filter
            </span>
          </div>
        )}
      </div>

      {/* Grid List */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Link
              key={project.$id}
              href={`/projects/${project.$id}`}
              className="bg-white rounded-md p-6 border border-zinc-200 hover:border-[#782849]/40 hover:shadow-md transition-all duration-300 group flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Accent Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[9px] text-[#782849] font-semibold tracking-wider uppercase bg-[#782849]/5 px-2 py-0.5 rounded-md border border-[#782849]/15">
                    Production AI
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-zinc-400 group-hover:text-[#782849] transition-colors duration-150" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-zinc-800 leading-snug mb-2 font-sans group-hover:text-[#782849] transition-colors duration-150">
                  {project.title}
                </h3>
                <p className="text-xs text-zinc-500 font-sans leading-relaxed mb-6">
                  {project.subtitle}
                </p>

                {/* Key Metrics */}
                <div className="space-y-2 mb-6">
                  {project.businessResults.slice(0, 2).map((res, i) => (
                    <div key={i} className="flex items-start text-[11px] text-zinc-600 leading-normal">
                      <span className="text-[#782849]/60 mr-2 shrink-0 select-none">↳</span>
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Tech List */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-100 mt-auto">
                {project.techStack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md bg-zinc-50 border border-zinc-200 font-mono text-[9px] text-zinc-500"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="px-2 py-0.5 rounded-md bg-zinc-50 border border-zinc-200 font-mono text-[9px] text-zinc-400">
                    +{project.techStack.length - 3} more
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-zinc-50 border border-zinc-200 rounded-md">
          <p className="text-sm text-zinc-500 font-mono">No matching projects found.</p>
          <p className="text-xs text-zinc-400 mt-2 font-mono">Try searching for keywords like forecasting, recommender, or embeddings.</p>
        </div>
      )}
    </div>
  );
}
