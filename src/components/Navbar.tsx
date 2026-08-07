'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Wallet,
  Sun,
  Moon,
  LayoutDashboard,
  BarChart3,
  ReceiptText,
  Activity,
  Bot,
  Code2,
  Menu,
  X,
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem('vitta_theme') as 'dark' | 'light') || 'dark';
    setThemeMode(savedTheme);
    document.body.className = `${savedTheme}-mode`;
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    const nextTheme = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(nextTheme);
    document.body.className = `${nextTheme}-mode`;
    localStorage.setItem('vitta_theme', nextTheme);
  };

  const navLinks = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/chat', label: 'AI Chat', icon: Bot },
    { href: '/playground', label: 'Playground', icon: Code2 },
    { href: '/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/ledger', label: 'Ledger', icon: ReceiptText },
    { href: '/health', label: 'Health', icon: Activity },
  ];

  return (
    <header className="w-full bg-[var(--bg-app)] border-b border-[var(--border-app)] backdrop-blur-xl sticky top-0 z-50 px-4 md:px-8 py-3.5 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Subtitle */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="p-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 group-hover:scale-105 transition-transform">
            <Wallet className="w-6 h-6 md:w-7 md:h-7 text-[#10b981]" />
          </div>
          <div>
            <span className="text-xl md:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-[#a7f3d0] via-[#10b981] to-[#047857] bg-clip-text text-transparent">
              Vitta
            </span>
            <span className="hidden sm:inline-block text-[10px] font-semibold text-[#10b981] ml-2 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              Next.js Finance
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[var(--bg-input)] border border-[var(--border-card)] p-1.5 rounded-xl">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#10b981] to-[#059669] text-white shadow-md'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--badge-bg)]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Controls (Theme Toggle & Mobile Hamburger) */}
        <div className="flex items-center gap-2.5">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-[var(--badge-bg)] border border-[var(--border-card)] text-[#10b981] hover:border-[var(--accent-color)] transition-all cursor-pointer"
              aria-label="Toggle Light and Dark Mode"
              title={themeMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {themeMode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle mobile menu navigation"
            className="lg:hidden p-2 rounded-xl bg-[var(--badge-bg)] border border-[var(--border-card)] text-emerald-400 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-[#10b981]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-[var(--border-card)] animate-fade-in">
          <nav className="flex flex-col space-y-1 bg-[#022c22]/95 border border-emerald-800/60 p-3 rounded-2xl shadow-2xl backdrop-blur-xl">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#10b981] to-[#059669] text-emerald-950 font-extrabold shadow-md'
                      : 'text-emerald-200 hover:bg-emerald-900/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 text-emerald-400" />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
