import React from 'react';
import { Search, Moon, Sun, ShieldCheck, Menu } from 'lucide-react';
import { APP_METADATA } from '../data/content';

export default function Navbar({ searchFilter, setSearchFilter, theme, toggleTheme, completedCount, totalCount, onToggleMobileSidebar }) {
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <header className="top-navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button className="btn-icon mobile-menu-btn" onClick={onToggleMobileSidebar} style={{ display: 'none' }}>
          <Menu size={18} />
        </button>
        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search docs, CLI commands, labs..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="nav-actions">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--bg-primary)', padding: '0.4rem 0.85rem', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
          <ShieldCheck size={16} color="var(--accent-green)" />
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Progress: {completedCount}/{totalCount} ({percent}%)
          </span>
        </div>

        <button className="btn-icon" onClick={toggleTheme} title="Toggle Dark/Light Mode">
          {theme === 'dark' ? <Sun size={18} color="var(--accent-yellow)" /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
