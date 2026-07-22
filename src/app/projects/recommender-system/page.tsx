import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import RecommenderDemo from '@/components/recommendation/RecommenderDemo';
import { ArrowLeft, Cpu } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Recommendation Engine Sandbox | Abhinav Yadav',
  description: 'Interactive session-level recommendation engine simulator demonstrating cosine similarity vector matching in real-time.',
};

export default function RecommenderSystemPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Back to Project */}
      <Link
        href="/projects/recommender_system"
        className="inline-flex items-center space-x-2 text-xs font-mono text-muted-foreground hover:text-white transition-colors duration-300 mb-8 group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
        <span>Back to Project Case Study</span>
      </Link>

      {/* Header */}
      <div className="flex items-center space-x-3 mb-10">
        <div className="h-10 w-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
          <Cpu className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Recommender Sandbox</h1>
          <p className="text-xs text-zinc-500 font-mono">Session-Level Interest Vectorizer & Cosine Retrieval</p>
        </div>
      </div>

      {/* Demo Component */}
      <RecommenderDemo />
    </div>
  );
}
