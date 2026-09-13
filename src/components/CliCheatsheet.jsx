import React, { useState } from 'react';
import { Terminal, Copy, Check, Search, Zap } from 'lucide-react';
import { CLI_CHEATSHEET_CATEGORIES } from '../data/content';

export default function CliCheatsheet({ externalSearch }) {
  const [filter, setFilter] = useState('');
  const [copiedIdx, setCopiedIdx] = useState(null);

  const activeSearch = externalSearch || filter;

  const handleCopy = (cmd, idx) => {
    navigator.clipboard.writeText(cmd);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div>
      {/* Header Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, var(--bg-secondary) 0%, rgba(56, 189, 248, 0.1) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--accent-blue)', fontWeight: 700, fontSize: '0.85rem' }}>
          <Zap size={18} /> EX280 Speed Drills
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.2rem' }}>Interactive oc CLI Cheatsheet</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
          Instant search and 1-click copying for high-frequency imperative commands. Use <code>--dry-run=client -o yaml</code> to generate clean YAML fast.
        </p>

        <div className="search-box" style={{ width: '100%', maxWidth: '500px', marginTop: '1.25rem' }}>
          <Search size={16} />
          <input
            type="text"
            placeholder="Filter commands (e.g. expose, scc, role, pvc, quota)..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Categories & Command Cards */}
      <div style={{ display: 'grid', gap: '2rem' }}>
        {CLI_CHEATSHEET_CATEGORIES.map((cat, catIdx) => {
          const matchingCmds = cat.commands.filter(
            (c) =>
              c.title.toLowerCase().includes(activeSearch.toLowerCase()) ||
              c.cmd.toLowerCase().includes(activeSearch.toLowerCase())
          );

          if (matchingCmds.length === 0) return null;

          return (
            <div key={cat.name} className="card" style={{ marginBottom: 0 }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                {cat.name}
              </h3>

              <div style={{ display: 'grid', gap: '1rem' }}>
                {matchingCmds.map((item, itemIdx) => {
                  const globalIdx = `${catIdx}-${itemIdx}`;
                  const isCopied = copiedIdx === globalIdx;

                  return (
                    <div
                      key={globalIdx}
                      style={{
                        background: 'var(--bg-primary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        padding: '1rem'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {item.title}
                        </span>
                        <button
                          className="btn btn-outline"
                          onClick={() => handleCopy(item.cmd, globalIdx)}
                          style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', gap: '0.3rem' }}
                        >
                          {isCopied ? <Check size={14} color="var(--accent-green)" /> : <Copy size={14} />}
                          {isCopied ? 'Copied!' : 'Copy'}
                        </button>
                      </div>

                      <pre style={{ margin: 0, fontSize: '0.85rem', padding: '0.75rem' }}>
                        <code>{item.cmd}</code>
                      </pre>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
