import React, { useState } from 'react';
import { marked } from 'marked';
import { Clock, Tag } from 'lucide-react';
import { CONCEPT_DOCS } from '../data/content';
import { SFG_CONCEPT_DOCS } from '../data/sfgContent';
import { OpenShiftArchDiagram, SfgArchDiagram, RouteTypesDiagram } from './ArchitectureDiagrams';

export default function DocsViewer({ docId }) {
  const allDocs = [...CONCEPT_DOCS, ...SFG_CONCEPT_DOCS];
  const doc = allDocs.find((d) => d.id === docId) || allDocs[0];

  const rawHtml = marked.parse(doc.content || '');

  return (
    <div>
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: 'var(--accent-blue)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            <Tag size={12} /> {doc.category}
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            <Clock size={12} /> {doc.readTime}
          </span>
        </div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>{doc.title}</h2>
      </div>

      {/* Render Graphical Architecture Diagram if relevant */}
      {doc.id === 'doc-01' && <OpenShiftArchDiagram />}
      {doc.id === 'doc-05' && <RouteTypesDiagram />}
      {doc.id === 'sfg-doc-01' && <SfgArchDiagram />}

      <div className="card markdown-body" dangerouslySetInnerHTML={{ __html: rawHtml }} />
    </div>
  );
}
