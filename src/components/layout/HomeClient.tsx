'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  ChevronDown, 
  FileText, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  Cpu,
  Award,
  GraduationCap,
  FileSpreadsheet,
  Microscope,
  BarChart3,
  Code2,
  GitBranch,
  Box,
  Presentation,
  PencilLine,
  MessageSquare,
  Send,
  Database,
  BookOpen
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons';
import InteractiveBackground from '@/components/ui/InteractiveBackground';
import ExperienceTimeline from '@/components/layout/ExperienceTimeline';
import ProjectsGrid from '@/components/layout/ProjectsGrid';
import ForecastDashboard from '@/components/forecast/ForecastDashboard';
import BlogList from '@/components/layout/BlogList';
import SkillGraph from '@/components/layout/SkillGraph';

interface HomeClientProps {
  experiences: any[];
  projects: any[];
  posts: any[];
}

export default function HomeClient({ experiences, projects, posts }: HomeClientProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleScrollToAbout = () => {
    const target = document.getElementById('about');
    if (target) {
      const offset = 80;
      const elementPosition = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setLoading(true);
    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitted(true);
    setLoading(false);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="w-full flex flex-col">
      {/* 1. HERO LANDING SECTION */}
      <section 
        id="hero" 
        className="relative min-h-[calc(100vh-4rem)] w-full hero-gradient flex flex-col justify-center items-center text-center overflow-hidden px-4"
      >
        {/* Constellation Canvas Backdrop */}
        <InteractiveBackground />

        {/* Content Container */}
        <div className="z-10 flex flex-col items-center max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-mono mb-8"
          >
            <Sparkles className="h-3.5 w-3.5 text-white animate-pulse" />
            <span>Production-ready Data Science & ML Systems</span>
          </motion.div>

          {/* Name */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-8xl font-sans font-extrabold tracking-tight text-white mb-4"
          >
            Abhinav Yadav
          </motion.h1>

          {/* Shifting Titles */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-10 overflow-hidden mb-4"
          >
            <motion.div
              animate={{ y: [0, -40, -80, -120, -160, 0] }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: 'easeInOut',
                times: [0, 0.2, 0.4, 0.6, 0.8, 1],
              }}
              className="font-mono text-xl sm:text-2xl text-white/80 font-medium"
            >
              <div className="h-10 flex items-center justify-center">AI & ML Engineer</div>
              <div className="h-10 flex items-center justify-center">Full-Stack Developer</div>
              <div className="h-10 flex items-center justify-center">Excel & VBA Expert</div>
              <div className="h-10 flex items-center justify-center">Database & SQL Architect</div>
              <div className="h-10 flex items-center justify-center">Academic Mentoring Partner</div>
            </motion.div>
          </motion.div>

          {/* Subtitle / Pitch */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-xs sm:text-sm text-white/70 max-w-lg mb-8 font-sans leading-relaxed text-center"
          >
            Custom AI/ML pipelines, automated Excel & VBA sheet tooling, relational SQL/Access databases, Tableau dashboards, and 1-on-1 tutoring. Deliver premium results on time.
          </motion.p>

          {/* Social Icons (Dominik style) */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center space-x-4 mb-8"
          >
            <a 
              href="mailto:abhi9v2204@gmail.com" 
              className="h-10 w-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#782849] hover:border-white transition-all duration-300 shadow-md"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a 
              href="https://github.com/abhii9v" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="h-10 w-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#782849] hover:border-white transition-all duration-300 shadow-md"
              aria-label="GitHub"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a 
              href="https://www.linkedin.com/in/abhii9v" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="h-10 w-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#782849] hover:border-white transition-all duration-300 shadow-md"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Navigation Anchors (Dominik style) */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center space-x-3 text-sm font-mono text-white/70"
          >
            <button onClick={() => {
              const el = document.getElementById('about');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }} className="hover:text-white transition-colors duration-150">About</button>
            <span>·</span>
            <button onClick={() => {
              const el = document.getElementById('projects');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }} className="hover:text-white transition-colors duration-150">Projects</button>
          </motion.div>
        </div>

        {/* Pulse Chevron Down Arrow */}
        <motion.button 
          onClick={handleScrollToAbout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors cursor-pointer"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-8 w-8" />
          </motion.div>
        </motion.button>
      </section>


      {/* 2. ABOUT SECTION */}
      <section id="about" className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-100">
        <div className="max-w-6xl mx-auto">
          {/* Avatar and Intro */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
            <div className="relative mb-6">
              <img 
                src="/linkedin_image_abhinav.png" 
                alt="Abhinav Yadav" 
                className="w-40 h-40 rounded-full object-cover border-4 border-[#782849]/10 shadow-lg"
              />
              <div className="absolute bottom-1 right-2 bg-[#782849] p-2 rounded-full border-2 border-white text-white shadow-md">
                <Cpu className="h-4 w-4" />
              </div>
            </div>
            <p className="text-zinc-700 text-lg leading-relaxed font-sans">
              I'm Abhinav Yadav, a freelance AI/ML Consultant and Technical Solutions Architect. I help businesses automate complex spreadsheet workflows, develop and deploy custom AI/ML applications, build relational database systems, and create modern web apps. Additionally, I mentor university students globally in computer science, database design (Access DB/SQL), and data analytics (Tableau/Statistics). I focus on translating complex data problems into robust, clean code that creates immediate value.
            </p>
          </div>

          {/* Three Custom Pillars (Dominik style) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 text-center md:text-left">
            {/* AI, ML & Web Dev Column */}
            <div className="flex flex-col items-center md:items-start p-4">
              <h3 className="text-2xl font-bold text-zinc-800 mb-4 flex items-center gap-2">
                AI, ML & Web Dev
              </h3>
              <div className="flex items-center space-x-3 mb-4 text-[#782849]">
                <Cpu className="h-6 w-6" />
                <Code2 className="h-6 w-6" />
                <Box className="h-6 w-6" />
              </div>
              <p className="text-sm text-zinc-600 leading-relaxed font-sans">
                From time series forecasting models and custom recommendation systems to generative AI agent workflows and responsive Next.js apps, I develop production-grade code that solves actual business problems.
              </p>
            </div>

            {/* Excel & BI Automation Column */}
            <div className="flex flex-col items-center md:items-start p-4">
              <h3 className="text-2xl font-bold text-zinc-800 mb-4 flex items-center gap-2">
                Excel & BI Automation
              </h3>
              <div className="flex items-center space-x-3 mb-4 text-[#782849]">
                <FileSpreadsheet className="h-6 w-6" />
                <TrendingUp className="h-6 w-6" />
                <BarChart3 className="h-6 w-6" />
              </div>
              <p className="text-sm text-zinc-600 leading-relaxed font-sans">
                Boost your productivity with custom VBA macros, advanced workbook models, dynamic formulas, and interactive Tableau/BI dashboards. I streamline your data workflows and eliminate manual spreadsheets errors.
              </p>
            </div>

            {/* DB & Academic Support Column */}
            <div className="flex flex-col items-center md:items-start p-4">
              <h3 className="text-2xl font-bold text-zinc-800 mb-4 flex items-center gap-2">
                DB & Tutoring Support
              </h3>
              <div className="flex items-center space-x-3 mb-4 text-[#782849]">
                <Database className="h-6 w-6" />
                <BookOpen className="h-6 w-6" />
                <MessageSquare className="h-6 w-6" />
              </div>
              <p className="text-sm text-zinc-600 leading-relaxed font-sans">
                Need help designing Access DB structures, writing complex SQL queries, or setting up relational schemas? I also offer 1-on-1 tutoring, code reviews, and academic project mentoring to help you succeed.
              </p>
            </div>
          </div>

          {/* Interactive Skill Graph */}
          <div className="w-full mt-12 bg-zinc-50 border border-zinc-200 rounded-lg p-6 sm:p-8">
            <div className="max-w-xl mb-6">
              <span className="font-mono text-[10px] text-[#782849] uppercase tracking-wider font-semibold">Interactive Architecture</span>
              <h4 className="text-2xl font-bold text-zinc-800 mt-1">Interactive Skill Graph</h4>
              <p className="text-xs text-zinc-500 mt-1 font-sans leading-relaxed">
                Click on the core skill nodes to discover sub-skills, libraries, and frameworks within my technical stack. Drag nodes to explore connections.
              </p>
            </div>
            <div className="w-full mt-4">
              <SkillGraph />
            </div>
          </div>

          {/* Education & Credentials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-zinc-200 mt-12">
            {/* Education */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-zinc-800 flex items-center space-x-2">
                <GraduationCap className="h-5 w-5 text-[#782849]" />
                <span>Education</span>
              </h3>
              <div className="bg-white border border-zinc-200 rounded-md p-5 shadow-sm">
                <span className="font-mono text-[9px] text-[#782849] uppercase tracking-wider block mb-1 font-semibold">
                  Aug 2020 – Jul 2024
                </span>
                <h4 className="text-sm font-bold text-zinc-800 leading-snug">
                  Lovely Professional University
                </h4>
                <p className="text-xs text-zinc-500 font-sans mt-1">B.Tech in Computer Science</p>
                <div className="text-[11px] text-zinc-500 font-mono mt-3 space-y-1">
                  <div>• ML & Deep Learning Core</div>
                  <div>• Natural Language Processing</div>
                  <div>• Statistics & Database Systems</div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-zinc-800 flex items-center space-x-2">
                <Award className="h-5 w-5 text-[#782849]" />
                <span>Certifications</span>
              </h3>
              <div className="space-y-3">
                <div className="bg-white border border-zinc-200 rounded-md p-4 flex items-start space-x-3 shadow-sm">
                  <div className="h-6 w-6 rounded-md bg-[#782849]/5 flex items-center justify-center text-[#782849] shrink-0 mt-0.5">
                    <Award className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-800 font-sans">
                      Natural Language Processing Specialization
                    </h4>
                    <span className="text-[10px] text-zinc-500 block font-mono mt-0.5">DeepLearning.AI</span>
                  </div>
                </div>

                <div className="bg-white border border-zinc-200 rounded-md p-4 flex items-start space-x-3 shadow-sm">
                  <div className="h-6 w-6 rounded-md bg-[#782849]/5 flex items-center justify-center text-[#782849] shrink-0 mt-0.5">
                    <Award className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-800 font-sans">
                      Python for Data Science and AI
                    </h4>
                    <span className="text-[10px] text-zinc-500 block font-mono mt-0.5">IBM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 3. EXPERIENCE TIMELINE SECTION */}
      <section id="experience" className="w-full bg-zinc-50/50 py-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-100">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-12">
            <div className="h-10 w-10 rounded-md bg-[#782849]/5 border border-[#782849]/15 flex items-center justify-center text-[#782849]">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Work History</h2>
              <p className="text-xs text-zinc-500 font-mono">2.5+ Years of Designing & Deploying ML Pipelines</p>
            </div>
          </div>

          {experiences.length > 0 ? (
            <ExperienceTimeline experiences={experiences} />
          ) : (
            <div className="text-center py-16 bg-white border border-zinc-200 rounded-md">
              <p className="text-sm text-zinc-500 font-mono">No work history records found.</p>
            </div>
          )}
        </div>
      </section>


      {/* 4. PROJECTS SECTION */}
      <section id="projects" className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-100">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-12">
            <div className="h-10 w-10 rounded-md bg-[#782849]/5 border border-[#782849]/15 flex items-center justify-center text-[#782849]">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Featured Projects</h2>
              <p className="text-xs text-zinc-500 font-mono">Production-Ready Applications & Architectures</p>
            </div>
          </div>

          {projects.length > 0 ? (
            <ProjectsGrid projects={projects} />
          ) : (
            <div className="text-center py-16 bg-zinc-50 border border-zinc-200 rounded-md">
              <p className="text-sm text-zinc-500 font-mono">No projects found in database.</p>
            </div>
          )}
        </div>
      </section>


      {/* 5. FORECAST LAB SECTION */}
      <section id="forecast-lab" className="w-full bg-zinc-50/50 py-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-100">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-12">
            <div className="h-10 w-10 rounded-md bg-[#782849]/5 border border-[#782849]/15 flex items-center justify-center text-[#782849]">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Forecast Lab</h2>
              <p className="text-xs text-zinc-500 font-mono">Simulate Mathematical Time Series Algorithms</p>
            </div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-lg p-1 sm:p-4 shadow-sm">
            <ForecastDashboard />
          </div>
        </div>
      </section>


      {/* 6. BLOG SECTION */}
      <section id="blog" className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-100">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-12">
            <div className="h-10 w-10 rounded-md bg-[#782849]/5 border border-[#782849]/15 flex items-center justify-center text-[#782849]">
              <PencilLine className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Research & Articles</h2>
              <p className="text-xs text-zinc-500 font-mono">Technical Guides on Production AI, Time Series, & MLOps</p>
            </div>
          </div>

          <BlogList posts={posts} />
        </div>
      </section>


      {/* 7. CONTACT SECTION */}
      <section id="contact" className="w-full bg-zinc-50/50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-12">
            <div className="h-10 w-10 rounded-md bg-[#782849]/5 border border-[#782849]/15 flex items-center justify-center text-[#782849]">
              <Mail className="h-5 w-5" />
            </div>
             <div>
              <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Get In Touch</h2>
              <p className="text-xs text-zinc-500 font-mono">Let's build your next project, automate your spreadsheets, or solve your database needs</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Direct Info */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white border border-zinc-200 rounded-md p-6 shadow-sm">
                <h4 className="text-sm font-semibold font-mono uppercase tracking-wider text-[#782849] mb-4">Direct Contact</h4>
                <div className="space-y-4 text-xs font-mono text-zinc-600">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-zinc-400" />
                    <a href="mailto:abhi9v2204@gmail.com" className="hover:text-[#782849] transition-colors">abhi9v2204@gmail.com</a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <LinkedinIcon className="h-4 w-4 text-zinc-400" />
                    <a href="https://www.linkedin.com/in/abhii9v" target="_blank" rel="noopener noreferrer" className="hover:text-[#782849] transition-colors">linkedin.com/in/abhii9v</a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <GithubIcon className="h-4 w-4 text-zinc-400" />
                    <a href="https://github.com/abhii9v" target="_blank" rel="noopener noreferrer" className="hover:text-[#782849] transition-colors">github.com/abhii9v</a>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-zinc-200 rounded-md p-6 shadow-sm">
                <h4 className="text-sm font-semibold font-mono uppercase tracking-wider text-[#782849] mb-2">Location</h4>
                <p className="text-xs text-zinc-600 font-mono">Hyderabad, India / Remote Available</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-3">
              <form onSubmit={handleContactSubmit} className="bg-white border border-zinc-200 rounded-md p-6 shadow-sm space-y-4">
                <div>
                  <label htmlFor="name" className="block font-mono text-[10px] uppercase text-zinc-500 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-zinc-200 rounded-md p-2.5 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-[#782849] focus:ring-1 focus:ring-[#782849] transition-all"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block font-mono text-[10px] uppercase text-zinc-500 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-zinc-200 rounded-md p-2.5 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-[#782849] focus:ring-1 focus:ring-[#782849] transition-all"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-mono text-[10px] uppercase text-zinc-500 mb-1">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-zinc-200 rounded-md p-2.5 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-[#782849] focus:ring-1 focus:ring-[#782849] transition-all resize-none"
                    placeholder="Describe your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || submitted}
                  className={`w-full font-mono text-xs font-semibold py-3 px-4 rounded-md border flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                    submitted 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : 'bg-[#782849] border-[#782849] text-white hover:bg-[#5d1f38] disabled:opacity-50'
                  }`}
                >
                  {loading ? (
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : submitted ? (
                    <span>Message Sent Successfully!</span>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      <span>Send Connection Request</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
