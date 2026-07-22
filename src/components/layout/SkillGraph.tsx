'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, Target, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

interface SkillNode {
  id: string;
  name: string;
  category: string;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  textAnchor: 'start' | 'middle' | 'end';
  projects: { name: string; url: string }[];
  experiences: string[];
  certifications: string[];
}

const SKILL_NODES: SkillNode[] = [
  {
    id: 'stats',
    name: 'Core AI & Solutions Hub',
    category: 'Center Hub',
    x: 425,
    y: 240,
    labelX: 425,
    labelY: 195,
    textAnchor: 'middle',
    projects: [
      { name: 'Custom Business Automation', url: '/#contact' },
      { name: 'Academic Tutoring Services', url: '/#contact' }
    ],
    experiences: ['Freelance Solutions Architect', '500+ Students Mentored'],
    certifications: ['ML/AI, Full-Stack Dev, Advanced Excel & SQL Systems'],
  },
  {
    id: 'forecasting',
    name: 'Time Series Forecasting',
    category: 'Data Science',
    x: 425,
    y: 75,
    labelX: 425,
    labelY: 42,
    textAnchor: 'middle',
    projects: [{ name: 'Claims Cost Forecast Lab', url: '/forecast-lab' }],
    experiences: ['Cognitio Analytics Inc', 'ShyftLabs'],
    certifications: ['Python for Data Science and AI (IBM)'],
  },
  {
    id: 'nlp',
    name: 'LLMs & GenAI Agents',
    category: 'Artificial Intelligence',
    x: 575,
    y: 125,
    labelX: 605,
    labelY: 129,
    textAnchor: 'start',
    projects: [{ name: 'Hybrid Semantic Vector Search', url: '/projects/semantic_search' }],
    experiences: ['ShyftLabs'],
    certifications: ['Natural Language Processing Specialization (DeepLearning.AI)'],
  },
  {
    id: 'excel',
    name: 'Excel & VBA Automation',
    category: 'Business Automation',
    x: 625,
    y: 240,
    labelX: 655,
    labelY: 244,
    textAnchor: 'start',
    projects: [{ name: 'Automated Financial Reporting Systems', url: '/#contact' }],
    experiences: ['VBA Macros, Complex Formulas, ETL Pipelines'],
    certifications: ['Advanced Excel Automation Expert'],
  },
  {
    id: 'tableau',
    name: 'Tableau & BI Dashboards',
    category: 'Business Intelligence',
    x: 575,
    y: 355,
    labelX: 605,
    labelY: 359,
    textAnchor: 'start',
    projects: [{ name: 'Interactive Executive Reporting', url: '/#contact' }],
    experiences: ['Calculated Fields, Data Joins, BI Analytics'],
    certifications: ['BI & Tableau Dashboard Specialist'],
  },
  {
    id: 'academic',
    name: 'Academic & Project Help',
    category: 'Tutoring & Mentoring',
    x: 425,
    y: 405,
    labelX: 425,
    labelY: 442,
    textAnchor: 'middle',
    projects: [{ name: 'CS/ML Curriculum & Assignment Guide', url: '/#contact' }],
    experiences: ['Mentored 500+ University Students globally'],
    certifications: ['Machine Learning & Database Instructor'],
  },
  {
    id: 'db_sql',
    name: 'Access DB & SQL Setup',
    category: 'Database Systems',
    x: 275,
    y: 355,
    labelX: 245,
    labelY: 359,
    textAnchor: 'end',
    projects: [{ name: 'Relational Database Inventories', url: '/#contact' }],
    experiences: ['MS Access Forms, Relational Schemas, Complex SQL Queries'],
    certifications: ['Database Administration Specialist'],
  },
  {
    id: 'webdev',
    name: 'Website & SaaS Dev',
    category: 'Full-Stack Development',
    x: 225,
    y: 240,
    labelX: 195,
    labelY: 244,
    textAnchor: 'end',
    projects: [{ name: 'Next.js & React Web Portals', url: '/' }],
    experiences: ['Full-Stack SaaS, API Connections, Serverless setups'],
    certifications: ['Full-Stack Web Engineering Certificate'],
  },
  {
    id: 'recsys',
    name: 'Recommendation Systems',
    category: 'Machine Learning',
    x: 275,
    y: 125,
    labelX: 245,
    labelY: 129,
    textAnchor: 'end',
    projects: [{ name: 'Session-Level Recommender Engine', url: '/projects/recommender-system' }],
    experiences: ['ShyftLabs'],
    certifications: [],
  },
];

export default function SkillGraph() {
  const [selectedId, setSelectedId] = useState<string>('stats');

  const selectedNode = SKILL_NODES.find((node) => node.id === selectedId) || SKILL_NODES[0];

  return (
    <div className="w-full space-y-8">
      {/* Quick Selection Chip Bar */}
      <div className="flex flex-wrap items-center gap-2 pb-2">
        {SKILL_NODES.map((node) => {
          const isSelected = selectedId === node.id;
          return (
            <button
              key={node.id}
              onClick={() => setSelectedId(node.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-sans font-medium transition-all flex items-center space-x-1.5 border ${
                isSelected
                  ? 'bg-[#782849] text-white border-[#782849] shadow-sm'
                  : 'bg-white text-zinc-600 border-zinc-200 hover:border-[#782849]/50 hover:text-[#782849]'
              }`}
            >
              {isSelected && <CheckCircle2 className="h-3 w-3 text-white" />}
              <span>{node.name}</span>
            </button>
          );
        })}
      </div>

      {/* SVG Visualization Canvas */}
      <div className="bg-white border border-zinc-200 rounded-md p-4 sm:p-6 flex flex-col items-center shadow-sm">
        <div className="w-full flex items-center justify-between mb-4">
          <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-wider flex items-center space-x-2">
            <Layers className="h-4 w-4 text-[#782849]" />
            <span>Interactive Skill Map</span>
          </h4>
          <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline-block">Click nodes to inspect details</span>
        </div>

        {/* Graph Container */}
        <div className="relative w-full h-[380px] sm:h-[460px] border border-zinc-200 bg-zinc-50/50 rounded-md overflow-hidden flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 850 480">
            {/* Connection Rays from Hub (425, 240) */}
            {SKILL_NODES.map((node) => {
              if (node.id === 'stats') return null;
              const isSelected = selectedId === node.id;
              return (
                <line
                  key={`link-${node.id}`}
                  x1={425}
                  y1={240}
                  x2={node.x}
                  y2={node.y}
                  stroke={isSelected ? '#782849' : '#e4e4e7'}
                  strokeWidth={isSelected ? 2 : 1}
                  strokeDasharray={isSelected ? 'none' : '4 4'}
                  className="transition-all duration-300"
                />
              );
            })}

            {/* Skill Nodes Rendering */}
            {SKILL_NODES.map((node) => {
              const isSelected = selectedId === node.id;
              const isHub = node.id === 'stats';

              return (
                <g
                  key={node.id}
                  onClick={() => setSelectedId(node.id)}
                  className="cursor-pointer group"
                >
                  {/* Outer Ring */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isHub ? 32 : 24}
                    fill="transparent"
                    stroke={isSelected ? '#782849' : '#e4e4e7'}
                    strokeWidth={isSelected ? 2 : 1}
                    className="group-hover:stroke-[#782849] transition-all duration-300"
                  />

                  {/* Core Circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isHub ? 24 : 18}
                    fill={isSelected ? '#782849' : isHub ? '#782849' : '#ffffff'}
                    stroke={isSelected ? '#782849' : '#d4d4d8'}
                    strokeWidth={1.5}
                    className="group-hover:scale-105 transition-all duration-300"
                  />

                  {/* Icon / Character symbol inside circle */}
                  <text
                    x={node.x}
                    y={node.y + 4}
                    fill={isSelected || isHub ? '#ffffff' : '#782849'}
                    fontSize={isHub ? 10 : 11}
                    fontWeight="bold"
                    fontFamily="monospace"
                    textAnchor="middle"
                    className="pointer-events-none uppercase"
                  >
                    {isHub ? 'HUB' : node.name.charAt(0)}
                  </text>

                  {/* Non-overlapping directional text label */}
                  <text
                    x={node.labelX}
                    y={node.labelY}
                    fill={isSelected ? '#782849' : '#475569'}
                    fontSize={11}
                    fontWeight={isSelected ? '700' : '500'}
                    textAnchor={node.textAnchor}
                    className="pointer-events-none font-sans tracking-tight transition-colors duration-200"
                  >
                    {node.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Details Box */}
      <AnimatePresence mode="wait">
        {selectedNode && (
          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Left: Experiences & Certifications */}
            <div className="bg-white border border-zinc-200 rounded-md p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <h4 className="font-mono text-xs text-[#782849] uppercase tracking-wider flex items-center space-x-2 font-bold">
                  <Target className="h-4 w-4 text-[#782849]" />
                  <span>{selectedNode.name}</span>
                </h4>
                <span className="px-2 py-0.5 rounded bg-[#782849]/10 text-[10px] font-mono text-[#782849] font-semibold">
                  {selectedNode.category}
                </span>
              </div>

              {selectedNode.experiences.length > 0 && (
                <div>
                  <span className="text-[10px] text-zinc-400 block mb-2 font-mono uppercase tracking-wider">Capabilities & Scope</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.experiences.map((exp) => (
                      <span
                        key={exp}
                        className="px-2.5 py-1 rounded-md bg-zinc-50 border border-zinc-200 text-xs text-zinc-700 font-sans"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedNode.certifications.length > 0 && (
                <div className="pt-2">
                  <span className="text-[10px] text-zinc-400 block mb-2 font-mono uppercase tracking-wider">Accreditation & Stack</span>
                  <div className="flex flex-col gap-2">
                    {selectedNode.certifications.map((cert) => (
                      <div
                        key={cert}
                        className="flex items-center space-x-2 text-xs text-zinc-600 font-sans"
                      >
                        <Zap className="h-3.5 w-3.5 text-[#782849] shrink-0" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Related Projects */}
            <div className="bg-white border border-zinc-200 rounded-md p-5 space-y-4 shadow-sm">
              <h4 className="font-mono text-xs text-zinc-500 uppercase tracking-wider flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-[#782849]" />
                <span>Featured Project & Services</span>
              </h4>
              {selectedNode.projects.length > 0 ? (
                <div className="space-y-3">
                  {selectedNode.projects.map((proj) => (
                    <a
                      key={proj.name}
                      href={proj.url}
                      className="flex items-center justify-between p-3 rounded-md bg-zinc-50 hover:bg-zinc-100/70 border border-zinc-200 hover:border-[#782849]/40 text-xs text-zinc-700 hover:text-[#782849] transition-all group font-sans font-medium"
                    >
                      <span>{proj.name}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-[#782849] group-hover:translate-x-1 transition-all" />
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-zinc-500 italic font-sans">No specific projects linked to this skill cluster.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
