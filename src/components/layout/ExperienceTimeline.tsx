'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Briefcase, ChevronDown, ChevronUp, Cpu, Award, Zap, Star } from 'lucide-react';
import SystemArchitectureDiagram from './SystemArchitectureDiagram';

interface ExperienceDoc {
  $id: string;
  company: string;
  role: string;
  period: string;
  order: number;
  responsibilities: string[];
  architecture: string;
  technologies: string[];
  businessImpact: string[];
  metrics: string[];
}

export default function ExperienceTimeline({ experiences }: { experiences: ExperienceDoc[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(experiences[0]?.$id || null);
  const [activeTab, setActiveTab] = useState<'impact' | 'arch' | 'tech'>('impact');

  const handleToggle = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      setActiveTab('impact'); // Reset tab on change
    }
  };

  // Sort by order ascending
  const sortedExperiences = [...experiences].sort((a, b) => a.order - b.order);

  return (
    <div className="relative border-l border-zinc-200 ml-4 md:ml-6 space-y-12">
      {sortedExperiences.map((exp, index) => {
        const isExpanded = expandedId === exp.$id;

        return (
          <div key={exp.$id} className="relative pl-8 md:pl-10">
            {/* Timeline Dot */}
            <span className="absolute -left-[11px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white border-2 border-[#782849] shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#782849]" />
            </span>

            {/* Header Area */}
            <div
              onClick={() => handleToggle(exp.$id)}
              className="bg-white rounded-md p-5 border border-zinc-200 hover:border-[#782849]/40 hover:shadow-sm transition-all duration-300 cursor-pointer flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div>
                <span className="font-mono text-[10px] text-[#782849] font-semibold tracking-widest uppercase mb-1 block">
                  {exp.period}
                </span>
                <h3 className="text-lg font-bold text-zinc-800 leading-tight font-sans">
                  {exp.role} <span className="text-zinc-400 font-normal">@</span> <span className="text-zinc-600">{exp.company}</span>
                </h3>
              </div>
              <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex gap-1.5">
                  {exp.metrics.slice(0, 2).map((m, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-zinc-50 border border-zinc-200 font-mono text-[10px] text-zinc-500"
                    >
                      {m}
                    </span>
                  ))}
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-zinc-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-zinc-400" />
                )}
              </div>
            </div>

            {/* Expanded Content Area */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="bg-zinc-50/50 border-t-0 rounded-b-md border border-zinc-200 p-6 space-y-6">
                    {/* Tabs Navigation */}
                    <div className="flex border-b border-zinc-200 pb-2 overflow-x-auto gap-2">
                      <button
                        onClick={() => setActiveTab('impact')}
                        className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md cursor-pointer transition-all duration-150 shrink-0 ${
                          activeTab === 'impact'
                            ? 'bg-[#782849] border border-[#782849] text-white'
                            : 'text-zinc-500 hover:text-[#782849] hover:bg-zinc-100 border border-transparent'
                        }`}
                      >
                        Impact & Highlights
                      </button>
                      <button
                        onClick={() => setActiveTab('arch')}
                        className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md cursor-pointer transition-all duration-150 shrink-0 ${
                          activeTab === 'arch'
                            ? 'bg-[#782849] border border-[#782849] text-white'
                            : 'text-zinc-500 hover:text-[#782849] hover:bg-zinc-100 border border-transparent'
                        }`}
                      >
                        System Architecture
                      </button>
                      <button
                        onClick={() => setActiveTab('tech')}
                        className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md cursor-pointer transition-all duration-150 shrink-0 ${
                          activeTab === 'tech'
                            ? 'bg-[#782849] border border-[#782849] text-white'
                            : 'text-zinc-500 hover:text-[#782849] hover:bg-zinc-100 border border-transparent'
                        }`}
                      >
                        Technologies Used
                      </button>
                    </div>

                    {/* Tab Panels */}
                    <div className="min-h-[200px]">
                      {activeTab === 'impact' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-6"
                        >
                          {/* Business Results Cards */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {exp.businessImpact.map((impact, i) => (
                              <div
                                key={i}
                                className="p-4 rounded-md bg-white border border-zinc-200 flex items-start space-x-3 shadow-sm"
                              >
                                <div className="h-6 w-6 rounded-md bg-[#782849]/5 flex items-center justify-center text-[#782849] shrink-0 mt-0.5">
                                  <Star className="h-3.5 w-3.5" />
                                </div>
                                <p className="text-xs text-zinc-600 leading-normal">{impact}</p>
                              </div>
                            ))}
                          </div>

                          {/* Detailed Responsibilities */}
                          <div>
                            <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-wider mb-3">
                              Detailed Responsibilities
                            </h4>
                            <ul className="space-y-2.5">
                              {exp.responsibilities.map((resp, i) => (
                                <li key={i} className="flex items-start text-xs text-zinc-500 leading-relaxed">
                                  <span className="text-[#782849] mr-2.5 shrink-0 select-none">•</span>
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}

                      {activeTab === 'arch' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="w-full"
                        >
                          <SystemArchitectureDiagram company={exp.company} />
                        </motion.div>
                      )}

                      {activeTab === 'tech' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex flex-wrap gap-2"
                        >
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1.5 rounded-md bg-white border border-zinc-200 hover:border-[#782849]/40 text-xs font-mono text-zinc-600 hover:text-[#782849] transition-colors duration-150 cursor-default"
                            >
                              {tech}
                            </span>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
