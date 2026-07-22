'use client';

import { Mail, Cpu } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-zinc-200 py-8 mt-auto bg-zinc-50/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Section */}
        <div className="flex items-center space-x-2">
          <Cpu className="h-4 w-4 text-zinc-400" />
          <span className="font-mono text-xs text-zinc-500">
            © {year} Abhinav Yadav. All ML systems operational.
          </span>
        </div>

        {/* Right Section - Socials */}
        <div className="flex items-center space-x-6">
          <a
            href="https://github.com/abhii9v"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-[#782849] transition-colors duration-300"
            aria-label="GitHub"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/abhii9v"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-[#782849] transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <a
            href="mailto:abhi9v2204@gmail.com"
            className="text-zinc-400 hover:text-[#782849] transition-colors duration-300"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
