'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Calendar, Clock, BookOpen, ArrowRight } from 'lucide-react';

interface BlogPost {
  $id: string;
  title: string;
  slug: string;
  summary: string;
  categories: string[];
  readingTime: string;
  publishedAt: string;
}

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Extract unique categories
  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    posts.forEach((post) => {
      post.categories.forEach((cat) => categories.add(cat));
    });
    return Array.from(categories);
  }, [posts]);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory 
        ? post.categories.includes(selectedCategory) 
        : true;

      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Search and Category Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full bg-white border border-zinc-200 rounded-md py-2 pl-10 pr-4 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-[#782849] focus:ring-1 focus:ring-[#782849] transition-all duration-150 shadow-sm"
          />
        </div>

        {/* Categories Chips */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 rounded-md font-mono text-[10px] font-medium transition-all duration-150 cursor-pointer ${
              selectedCategory === null
                ? 'bg-[#782849] border border-[#782849] text-white'
                : 'bg-zinc-50 border border-zinc-200 text-zinc-600 hover:bg-[#782849]/5 hover:text-[#782849]'
            }`}
          >
            All Posts
          </button>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md font-mono text-[10px] font-medium transition-all duration-150 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#782849] border border-[#782849] text-white'
                  : 'bg-zinc-50 border border-zinc-200 text-zinc-600 hover:bg-[#782849]/5 hover:text-[#782849]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of posts */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <Link
              key={post.$id}
              href={`/blog/${post.slug}`}
              className="bg-white rounded-md p-6 border border-zinc-200 hover:border-[#782849]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-400 mb-3">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  <span>•</span>
                  <Clock className="h-3.5 w-3.5" />
                  <span>{post.readingTime}</span>
                </div>

                <h3 className="text-xl font-bold text-zinc-800 mb-2 leading-tight group-hover:text-[#782849] transition-colors duration-150">
                  {post.title}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed mb-6">
                  {post.summary}
                </p>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-100 mt-auto">
                <div className="flex flex-wrap gap-1.5">
                  {post.categories.map((cat) => (
                    <span
                      key={cat}
                      className="px-2 py-0.5 rounded-md bg-zinc-50 border border-zinc-100 text-[9px] font-mono text-zinc-500"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] font-mono text-zinc-400 group-hover:text-[#782849] transition-colors duration-150 flex items-center space-x-1">
                  <span>Read Article</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-zinc-50 border border-zinc-200 rounded-md">
          <p className="text-sm text-zinc-500 font-mono">No matching articles found.</p>
        </div>
      )}
    </div>
  );
}
