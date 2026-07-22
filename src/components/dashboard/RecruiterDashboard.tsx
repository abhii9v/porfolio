'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Phone, Calendar, ArrowRight, Star, Shield, Sparkles, TrendingUp } from 'lucide-react';
import { useApp } from '../layout/AppContext';

export default function RecruiterDashboard() {
  const { setChatOpen } = useApp();

  const handleDownload = () => {
    // We will place the resume file at /Abhinav_DS.pdf in the public folder
    const link = document.createElement('a');
    link.href = '/Abhinav_DS.pdf';
    link.download = 'Abhinav_Yadav_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-5xl mx-auto px-4 py-8"
    >
      {/* Banner */}
      <div className="relative glass rounded-none p-6 sm:p-8 overflow-hidden mb-8 border border-white/10">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Star className="h-40 w-40 text-white animate-spin-slow" />
        </div>
        
        <div className="max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-none bg-white/5 border border-white/10 text-white text-xs font-mono mb-4">
            <Sparkles className="h-3 w-3" />
            <span>Recruiter Executive Summary Mode Active</span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl font-sans font-bold tracking-tight text-white mb-3">
            Accelerate your review. Here is why Abhinav fits your team.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed mb-6">
            An experienced Production Data Scientist who translates complex machine learning theories into high-impact systems. Specialized in time series forecasting, recommender engines, and production LLMs.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-none bg-white text-black font-semibold font-mono text-xs hover:bg-zinc-200 border border-white transition-colors duration-150 cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>Download PDF Resume</span>
            </button>
            <button
              onClick={() => setChatOpen(true)}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-none bg-black border border-white/20 text-white font-semibold font-mono text-xs hover:bg-white/5 hover:border-white/40 transition-colors duration-150 cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>Interview Abhinav's AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Overview Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Core Profile */}
        <div className="glass rounded-none p-6 border border-white/5 flex flex-col justify-between">
          <div>
            <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">Candidate Profile</h3>
            <div className="space-y-4">
              <div>
                <span className="text-xs text-zinc-500 block">Current Role</span>
                <span className="text-sm font-semibold text-white">Data Scientist at Cognitio Analytics</span>
              </div>
              <div>
                <span className="text-xs text-zinc-500 block">Total Experience</span>
                <span className="text-sm font-semibold text-white">2.5+ Years (Production focus)</span>
              </div>
              <div>
                <span className="text-xs text-zinc-500 block">Key Core Competencies</span>
                <span className="text-sm font-semibold text-white">Time Series, GenAI, RecSys, NLP</span>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-4 mt-6 flex items-center space-x-2">
            <Shield className="h-4 w-4 text-white" />
            <span className="text-xs text-zinc-400">Security & Background Clear</span>
          </div>
        </div>

        {/* Highlight Metrics */}
        <div className="glass rounded-none p-6 border border-white/5 md:col-span-2">
          <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">Key Proven Impact</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="h-10 w-10 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <span className="text-lg font-bold text-white">&lt;10% MAPE</span>
                <span className="text-xs text-zinc-500 block">12-Month PLPM claims costs forecasting for insurance client.</span>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="h-10 w-10 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                <Star className="h-5 w-5" />
              </div>
              <div>
                <span className="text-lg font-bold text-white">Real-time Recs</span>
                <span className="text-xs text-zinc-500 block">Session-level recommendation models for cross-sell/up-sell.</span>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="h-10 w-10 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <span className="text-lg font-bold text-white">80% Accuracy</span>
                <span className="text-xs text-zinc-500 block">Unsupervised learner clustering for student cheating detection.</span>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="h-10 w-10 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <span className="text-lg font-bold text-white">Hybrid NLP</span>
                <span className="text-xs text-zinc-500 block">Dense vector search and LLM intent recognition system.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recruiter Quick Contact Row */}
      <div className="glass rounded-none p-6 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-semibold text-white">Ready to connect with Abhinav?</h4>
          <p className="text-xs text-zinc-500">Response time is typically under 12 hours.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:abhi9v2204@gmail.com?subject=Interview%20Request%20-%20Data%20Scientist"
            className="flex items-center space-x-2 px-4 py-2 rounded-none bg-white/5 border border-white/10 text-white font-mono text-xs hover:border-white/20 transition-all duration-300"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Email Directly</span>
          </a>
          <a
            href="https://www.linkedin.com/in/abhii9v"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2 rounded-none bg-white text-black font-mono text-xs hover:bg-zinc-200 border border-white transition-all duration-300"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Schedule on LinkedIn</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
