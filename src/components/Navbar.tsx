'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Wallet, Sun, Moon, LayoutDashboard, BarChart3, ReceiptText, Activity } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem('vitta_theme') as 'dark' | 'light') || 'dark';
    setThemeMode(savedTheme);
    document.body.className = `${savedTheme}-mode`;
  }, []);

  const toggleTheme = () => {
    const nextTheme = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(nextTheme);
    document.body.className = `${nextTheme}-mode`;
    localStorage.setItem('vitta_theme', nextTheme);
  };

  const navLinks = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/ledger', label: 'Ledger', icon: ReceiptText },
    { href: '/health', label: 'Health', icon: Activity },
  ];

  return (
    <header className="w-full bg-[var(--bg-app)] border-b border-[var(--border-app)] backdrop-blur-xl sticky top-0 z-50 px-4 md:px-8 py-4 transition-all">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand Logo & Subtitle */}
        <div className="flex items-center gap-3">
          <Wallet className="w-8 h-8 text-[#10b981] animate-pulse" />
          <div>
            <Link href="/" className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-[#a7f3d0] via-[#10b981] to-[#047857] bg-clip-text text-transparent">
              Vitta
            </Link>
            <p className="text-xs font-semibold text-[#10b981] m-0">
              Next.js Financial Analytics Hub
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-[var(--bg-input)] border border-[var(--border-card)] p-1.5 rounded-xl">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-all ${
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

        {/* Right Section: Theme Toggle */}
        <div className="flex items-center gap-3">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--badge-bg)] border border-[var(--border-card)] text-[#10b981] hover:border-[var(--accent-color)] transition-all cursor-pointer"
              aria-label="Toggle Light and Dark Mode"
              title={themeMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {themeMode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
