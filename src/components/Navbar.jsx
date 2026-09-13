import React from 'react';
import { Search, Moon, Sun, ShieldCheck, Menu, Server, ArrowLeftRight } from 'lucide-react';
import { APP_METADATA } from '../data/content';

export default function Navbar({
  searchFilter,
  setSearchFilter,
  theme,
  toggleTheme,
  completedCount,
  totalCount,
  onToggleMobileSidebar,
  platformMode,
  setPlatformMode
}) {
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <header className="top-navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
        <button className="btn-icon mobile-menu-btn" onClick={onToggleMobileSidebar} title="Open Menu">
          <Menu size={20} />
        </button>

        {/* Platform Mode Switcher Button */}
        <div style={{ display: 'flex', background: 'var(--bg-primary)', padding: '0.2rem', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
          <button
            onClick={() => setPlatformMode('openshift')}
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: '16px',
              border: 'none',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              background: platformMode === 'openshift' ? 'var(--accent-red)' : 'transparent',
              color: platformMode === 'openshift' ? '#fff' : 'var(--text-secondary)',
              transition: 'all 0.2s ease'
            }}
          >
            Red Hat OpenShift
          </button>
          <button
            onClick={() => setPlatformMode('sfg')}
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: '16px',
              border: 'none',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              background: platformMode === 'sfg' ? 'var(--accent-blue)' : 'transparent',
              color: platformMode === 'sfg' ? '#fff' : 'var(--text-secondary)',
              transition: 'all 0.2s ease'
            }}
          >
            IBM Sterling SFG
          </button>
        </div>

        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder={platformMode === 'openshift' ? "Search OpenShift docs, CLI..." : "Search Sterling SFG guides, BPML..."}
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="nav-actions">
        <div className="progress-badge-mobile" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-primary)', padding: '0.4rem 0.85rem', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
          <ShieldCheck size={16} color="var(--accent-green)" />
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
            {completedCount}/{totalCount} ({percent}%)
          </span>
        </div>

        <button className="btn-icon" onClick={toggleTheme} title="Toggle Dark/Light Mode">
          {theme === 'dark' ? <Sun size={18} color="var(--accent-yellow)" /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
