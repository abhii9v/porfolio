'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, Layers, Plus, Check, ArrowRight } from 'lucide-react';

interface CatalogItem {
  id: string;
  title: string;
  category: string;
  description: string;
  vector: Record<string, number>; // Keyword weights representing the item embedding
  imageUrl: string;
}

const ITEM_CATALOG: CatalogItem[] = [
  {
    id: 'ts_adv',
    title: 'Advanced Time Series Forecasting',
    category: 'Time Series',
    description: 'Learn stacked regressor pipelines, seasonality adjustments, and PSI drift monitoring.',
    vector: { forecasting: 0.9, ml: 0.4, engineering: 0.3, statistics: 0.5 },
    imageUrl: '📈',
  },
  {
    id: 'llm_prompt',
    title: 'LLM Prompt Engineering & RAG',
    category: 'GenAI',
    description: 'Master prompt templates, dense embeddings search, and semantic routing architectures.',
    vector: { llm: 0.9, embeddings: 0.8, nlp: 0.7, ml: 0.4 },
    imageUrl: '🤖',
  },
  {
    id: 'vector_db',
    title: 'Vector Databases & Semantic Search',
    category: 'NLP',
    description: 'Index high-dimensional vectors, optimize Elasticsearch index maps, and measure NDCG metrics.',
    vector: { embeddings: 0.9, nlp: 0.8, db: 0.7, engineering: 0.5 },
    imageUrl: '🔍',
  },
  {
    id: 'pyspark_data',
    title: 'Data Pipelines at Scale with PySpark',
    category: 'Engineering',
    description: 'Distribute computations, manage large SQL data warehouses, and build ETL jobs.',
    vector: { engineering: 0.9, db: 0.6, sql: 0.8 },
    imageUrl: '⚙️',
  },
  {
    id: 'mlflow_deploy',
    title: 'MLOps: Deployment & Pipelines',
    category: 'Engineering',
    description: 'Track model experiments with MLflow, containerize with Docker, and run auto-retraining.',
    vector: { engineering: 0.8, ml: 0.7, monitoring: 0.9 },
    imageUrl: '🚀',
  },
  {
    id: 'ab_stats',
    title: 'Statistics & A/B Testing',
    category: 'Statistics',
    description: 'Formulate hypotheses, calculate sample sizes, and evaluate A/B experiments.',
    vector: { statistics: 0.9, business: 0.6, analysis: 0.7 },
    imageUrl: '📊',
  },
];

// Calculate Cosine Similarity between user profile vector and item vector
function getCosineSimilarity(userVec: Record<string, number>, itemVec: Record<string, number>): number {
  let dotProduct = 0;
  let userNormSq = 0;
  let itemNormSq = 0;

  // Union of keys
  const keys = new Set([...Object.keys(userVec), ...Object.keys(itemVec)]);

  keys.forEach((key) => {
    const u = userVec[key] || 0;
    const v = itemVec[key] || 0;
    dotProduct += u * v;
    userNormSq += u * u;
    itemNormSq += v * v;
  });

  if (userNormSq === 0 || itemNormSq === 0) return 0;
  return dotProduct / (Math.sqrt(userNormSq) * Math.sqrt(itemNormSq));
}

export default function RecommenderDemo() {
  const [sessionHistory, setSessionHistory] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<{ item: CatalogItem; score: number; reason: string }[]>([]);

  // Update recommendations whenever history changes
  useEffect(() => {
    if (sessionHistory.length === 0) {
      setRecommendations([]);
      return;
    }

    // 1. Build User Profile Vector (sum weights of selected items)
    const userProfile: Record<string, number> = {};
    sessionHistory.forEach((itemId) => {
      const item = ITEM_CATALOG.find((x) => x.id === itemId);
      if (!item) return;
      Object.entries(item.vector).forEach(([keyword, weight]) => {
        userProfile[keyword] = (userProfile[keyword] || 0) + weight;
      });
    });

    // 2. Score remaining items in catalog
    const scored = ITEM_CATALOG.filter((item) => !sessionHistory.includes(item.id))
      .map((item) => {
        const score = getCosineSimilarity(userProfile, item.vector);
        
        // Determine strongest overlap for explanation
        let bestMatchKeyword = '';
        let maxOverlapVal = 0;
        Object.keys(item.vector).forEach((k) => {
          const overlap = (userProfile[k] || 0) * item.vector[k];
          if (overlap > maxOverlapVal) {
            maxOverlapVal = overlap;
            bestMatchKeyword = k;
          }
        });

        const reason = bestMatchKeyword 
          ? `High correlation with your interest in "${bestMatchKeyword}"`
          : 'General recommendation fallback';

        return { item, score, reason };
      })
      // Sort by similarity descending
      .sort((a, b) => b.score - a.score);

    setRecommendations(scored);
  }, [sessionHistory]);

  const toggleItem = (id: string) => {
    setSessionHistory((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const resetSession = () => {
    setSessionHistory([]);
  };

  return (
    <div className="space-y-8 w-full max-w-5xl mx-auto">
      {/* Simulation Banner */}
      <div className="bg-white border border-zinc-200 rounded-md p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div>
          <h4 className="text-sm font-semibold text-zinc-800 flex items-center space-x-2">
            <Layers className="h-4 w-4 text-[#782849] animate-pulse" />
            <span>Session-Level Recommender Sandbox</span>
          </h4>
          <p className="text-xs text-zinc-500 leading-normal mt-1">
            Simulate ad/course personalization. Select items below to build your session click history. The recommender dynamically creates a real-time interest vector and serves recommendations instantly.
          </p>
        </div>
        {sessionHistory.length > 0 && (
          <button
            onClick={resetSession}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md border border-zinc-200 hover:border-[#782849]/40 text-xs font-mono text-zinc-500 hover:text-[#782849] transition-all cursor-pointer bg-zinc-50 hover:bg-zinc-100"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Reset Session</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: catalog list */}
        <div className="space-y-4">
          <h3 className="font-mono text-xs text-zinc-400 uppercase tracking-wider mb-2">
            Item Catalog (Click to interact)
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {ITEM_CATALOG.map((item) => {
              const isSelected = sessionHistory.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`rounded-md p-4 border transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                    isSelected ? 'border-[#782849] bg-[#782849]/5' : 'border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl select-none">{item.imageUrl}</span>
                    <div>
                      <span className="font-mono text-[9px] text-[#782849] font-semibold tracking-widest uppercase block mb-0.5">
                        {item.category}
                      </span>
                      <h4 className="text-sm font-bold text-zinc-800 leading-snug">{item.title}</h4>
                      <p className="text-xs text-zinc-500 leading-normal">{item.description}</p>
                    </div>
                  </div>
                  <div className="shrink-0 ml-3">
                    <div
                      className={`h-6 w-6 rounded-md border flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-[#782849] border-[#782849] text-white'
                          : 'border-zinc-200 text-zinc-400 group-hover:border-zinc-300 bg-zinc-50'
                      }`}
                    >
                      {isSelected ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Recommendations outputs */}
        <div className="space-y-4">
          <h3 className="font-mono text-xs text-zinc-400 uppercase tracking-wider mb-2">
            Dynamic Recommendations (Real-Time Output)
          </h3>

          <div className="min-h-[300px] border border-dashed border-zinc-200 rounded-md p-6 flex flex-col justify-center bg-zinc-50/50">
            <AnimatePresence mode="popLayout">
              {sessionHistory.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center space-y-2 py-10"
                >
                  <Sparkles className="h-8 w-8 text-zinc-400 mx-auto" />
                  <p className="text-xs text-zinc-500 font-mono">No items in session history.</p>
                  <p className="text-[10px] text-zinc-400 max-w-xs mx-auto font-sans">
                    Click items in the catalog to emulate clickstream data and view live recommendations.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4 w-full"
                >
                  {recommendations.map(({ item, score, reason }) => (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-white rounded-md p-4 border border-zinc-200 flex items-start justify-between shadow-sm hover:border-zinc-300 transition-all duration-150"
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-xl select-none mt-1">{item.imageUrl}</span>
                        <div>
                          <h4 className="text-xs font-bold text-zinc-800 font-sans">{item.title}</h4>
                          <span className="text-[10px] text-zinc-500 leading-normal block mt-1">
                            {reason}
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-mono text-xs text-[#782849] font-bold block">
                          {(score * 100).toFixed(0)}% Match
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
