'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from './AppContext';
import { Terminal, FileText, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Home', path: '#hero' },
  { name: 'About', path: '#about' },
  { name: 'Experience', path: '#experience' },
  { name: 'Projects', path: '#projects' },
  { name: 'Forecast Lab', path: '#forecast-lab' },
  { name: 'Blog', path: '#blog' },
  { name: 'Contact', path: '#contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { setChatOpen } = useApp();
  const isHome = pathname === '/';
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');

  // Track scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section via Intersection Observer
  useEffect(() => {
    if (!isHome) return;
    const sections = ['hero', 'about', 'experience', 'projects', 'forecast-lab', 'blog', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (isHome && path.startsWith('#')) {
      e.preventDefault();
      const target = document.getElementById(path.substring(1));
      if (target) {
        const offset = 80; // height of sticky navbar + safety margin
        const elementPosition = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth',
        });
      }
    }
  };

  const isGlass = !isHome || isScrolled;
  const headerClass = isGlass
    ? 'sticky top-0 z-50 w-full bg-white/80 border-b border-zinc-200 text-zinc-900 backdrop-blur-md transition-all duration-300'
    : 'sticky top-0 z-50 w-full bg-transparent border-b border-transparent text-white transition-all duration-300';

  return (
    <header className={headerClass}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo/Name */}
        <Link 
          href="/" 
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center space-x-2 group"
        >
          <div className={`h-8 w-8 rounded-md flex items-center justify-center border transition-colors duration-300 ${
            isGlass 
              ? 'bg-zinc-100 border-zinc-200 group-hover:border-zinc-300' 
              : 'bg-white/10 border-white/10 group-hover:border-white/40'
          }`}>
            <Terminal className={`h-4 w-4 transition-colors duration-300 ${
              isGlass ? 'text-zinc-800' : 'text-white'
            }`} />
          </div>
          <span className={`font-mono text-sm font-semibold tracking-tight transition-colors duration-300 ${
            isGlass ? 'text-zinc-800' : 'text-white'
          }`}>
            abhinav<span className={isGlass ? 'text-[#782849] font-bold' : 'text-white font-bold'}>.</span>yadav
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = isHome 
              ? (activeSection === item.path) 
              : (pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path)));
            
            const linkPath = isHome ? item.path : '/' + item.path;

            return (
              <Link
                key={item.path}
                href={linkPath}
                onClick={(e) => handleNavClick(e, item.path)}
                className={`relative px-3 py-1.5 font-mono text-xs transition-colors duration-300 ${
                  isActive 
                    ? (isGlass ? 'text-[#782849] font-semibold' : 'text-white font-semibold')
                    : (isGlass ? 'text-zinc-500 hover:text-zinc-900' : 'text-white/70 hover:text-white')
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNav"
                    className={`absolute inset-0 rounded-md -z-10 border ${
                      isGlass 
                        ? 'bg-[#782849]/5 border-[#782849]/10' 
                        : 'bg-white/5 border-white/10'
                    }`}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2.5">
          {/* AI Chat Button */}
          <button
            onClick={() => setChatOpen(true)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md border text-xs font-mono transition-all duration-300 cursor-pointer ${
              isGlass
                ? 'border-zinc-200 bg-zinc-50 text-[#782849] hover:bg-zinc-100 hover:border-zinc-300'
                : 'border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40'
            }`}
            title="Ask my AI Resume Assistant"
          >
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            <span className="font-mono text-xs font-medium hidden sm:inline">Ask AI</span>
          </button>

          {/* Download Resume Button */}
          <a
            href="/Abhinav_DS.pdf"
            download
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md border text-xs font-semibold font-mono transition-all duration-300 cursor-pointer ${
              isGlass
                ? 'bg-[#782849] border-[#782849] text-white hover:bg-[#5d1f38] hover:border-[#5d1f38]'
                : 'bg-white border-white text-[#782849] hover:bg-white/90'
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>CV</span>
          </a>
        </div>
      </div>
    </header>
  );
}
