import React, { useState } from 'react';
import { marked } from 'marked';
import { Copy, Check, Clock, Tag } from 'lucide-react';
import { CONCEPT_DOCS } from '../data/content';

export default function DocsViewer({ docId }) {
  const doc = CONCEPT_DOCS.find((d) => d.id === docId) || CONCEPT_DOCS[0];
  const [copiedCodeIndex, setCopiedCodeIndex] = useState(null);

  // Convert markdown to HTML
  const rawHtml = marked.parse(doc.content || '');

  // Helper for copy buttons on code snippets
  const handleCopyCode = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeIndex(idx);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  return (
    <div>
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: 'var(--accent-blue)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            <Tag size={12} /> {doc.category}
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            <Clock size={12} /> {doc.readTime}
          </span>
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>{doc.title}</h2>
      </div>

      <div className="card markdown-body" dangerouslySetInnerHTML={{ __html: rawHtml }} />
    </div>
  );
}
