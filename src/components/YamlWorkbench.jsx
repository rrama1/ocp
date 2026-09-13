import React, { useState } from 'react';
import { FileCode, Copy, Check, Info, Layers, Sliders, Zap, BookOpen } from 'lucide-react';
import { YAML_STRUCTURE_EXPLANATION, YAML_TEMPLATES_CATALOG } from '../data/content';

export default function YamlWorkbench() {
  const [selectedTemplateId, setSelectedTemplateId] = useState(YAML_TEMPLATES_CATALOG[0].id);
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  // Customizer state
  const [customAppName, setCustomAppName] = useState('my-app');
  const [customNamespace, setCustomNamespace] = useState('prod-team');
  const [customReplicas, setCustomReplicas] = useState(3);
  const [customPort, setCustomPort] = useState(8080);

  const selectedTemplate = YAML_TEMPLATES_CATALOG.find((t) => t.id === selectedTemplateId) || YAML_TEMPLATES_CATALOG[0];

  // Dynamic YAML customizer replace
  const customizeYaml = (rawYaml) => {
    return rawYaml
      .replace(/name: [a-zA-Z0-9-.]+/g, (match) => match.includes('namespace') ? match : `name: ${customAppName}`)
      .replace(/namespace: [a-zA-Z0-9-.]+/g, `namespace: ${customNamespace}`)
      .replace(/replicas: \d+/g, `replicas: ${customReplicas}`)
      .replace(/containerPort: \d+/g, `containerPort: ${customPort}`)
      .replace(/targetPort: \d+/g, `targetPort: ${customPort}`);
  };

  const finalYaml = customizeYaml(selectedTemplate.yaml);

  const handleCopy = () => {
    navigator.clipboard.writeText(finalYaml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const categories = ['All', ...new Set(YAML_TEMPLATES_CATALOG.map((t) => t.category))];

  const filteredTemplates = activeCategory === 'All'
    ? YAML_TEMPLATES_CATALOG
    : YAML_TEMPLATES_CATALOG.filter((t) => t.category === activeCategory);

  return (
    <div>
      {/* Header Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, var(--bg-secondary) 0%, rgba(234, 179, 8, 0.12) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--accent-yellow)', fontWeight: 700, fontSize: '0.85rem' }}>
          <FileCode size={18} /> OpenShift & Kubernetes YAML Masterclass
        </div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '0.2rem' }}>YAML Manifests & Templates Workbench</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.3rem' }}>
          Understand YAML keys in simple language, explore 12+ pre-configured production templates, and customize values live with 1-click copying.
        </p>
      </div>

      {/* 4 Core YAML Elements Breakdown */}
      <div className="card">
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Info size={18} color="var(--accent-blue)" /> {YAML_STRUCTURE_EXPLANATION.title}
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          {YAML_STRUCTURE_EXPLANATION.description}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
          {YAML_STRUCTURE_EXPLANATION.keys.map((item, idx) => {
            const colors = ['#38bdf8', '#22c55e', '#eab308', '#ee0000'];
            return (
              <div
                key={item.key}
                style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem',
                  borderTop: `4px solid ${colors[idx % colors.length]}`
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1rem', color: colors[idx % colors.length] }}>
                  {item.key}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                  {item.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Customizer Controls & Template Selector */}
      <div className="yaml-grid-layout" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '1.25rem', marginTop: '1.5rem' }}>
        
        {/* Left Column: Template Catalog Selector */}
        <div>
          <div className="card" style={{ padding: '0.85rem', marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Filter Category
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    border: '1px solid var(--border-color)',
                    background: activeCategory === cat ? 'var(--accent-red)' : 'var(--bg-primary)',
                    color: activeCategory === cat ? '#fff' : 'var(--text-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: '0.85rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Layers size={14} /> Templates ({filteredTemplates.length})
            </div>
            <div style={{ display: 'grid', gap: '0.35rem', maxHeight: '350px', overflowY: 'auto' }}>
              {filteredTemplates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTemplateId(t.id)}
                  style={{
                    textAlign: 'left',
                    padding: '0.5rem 0.65rem',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${selectedTemplateId === t.id ? 'var(--accent-blue)' : 'var(--border-color)'}`,
                    background: selectedTemplateId === t.id ? 'rgba(56, 189, 248, 0.12)' : 'var(--bg-primary)',
                    color: selectedTemplateId === t.id ? 'var(--accent-blue)' : 'var(--text-primary)',
                    cursor: 'pointer',
                    fontSize: '0.825rem',
                    fontWeight: selectedTemplateId === t.id ? 700 : 500
                  }}
                >
                  <div>{t.name}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                    {t.category}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Code Viewer & Parameter Builder */}
        <div>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <span style={{ background: 'rgba(234, 179, 8, 0.15)', color: 'var(--accent-yellow)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                  {selectedTemplate.category}
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '0.25rem' }}>{selectedTemplate.name}</h3>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  {selectedTemplate.description}
                </p>
              </div>

              <button className="btn btn-primary" onClick={handleCopy} style={{ fontSize: '0.8rem', gap: '0.35rem' }}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy YAML'}
              </button>
            </div>

            {/* Parameter Customizer Bar */}
            <div style={{ marginTop: '1rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border-color)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '0.65rem' }}>
              <div>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                  App Name
                </label>
                <input
                  type="text"
                  value={customAppName}
                  onChange={(e) => setCustomAppName(e.target.value)}
                  style={{ width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '0.3rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                  Namespace
                </label>
                <input
                  type="text"
                  value={customNamespace}
                  onChange={(e) => setCustomNamespace(e.target.value)}
                  style={{ width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '0.3rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                  Target Port
                </label>
                <input
                  type="number"
                  value={customPort}
                  onChange={(e) => setCustomPort(e.target.value)}
                  style={{ width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '0.3rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                  Replicas
                </label>
                <input
                  type="number"
                  value={customReplicas}
                  onChange={(e) => setCustomReplicas(e.target.value)}
                  style={{ width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '0.3rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}
                />
              </div>
            </div>
          </div>

          {/* Code Container */}
          <div className="code-container">
            <div className="code-header">
              <span>YAML Spec ({selectedTemplate.name})</span>
              <button className="copy-btn" onClick={handleCopy}>
                {copied ? <Check size={12} color="var(--accent-green)" /> : <Copy size={12} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre style={{ margin: 0 }}>
              <code>{finalYaml}</code>
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
}
