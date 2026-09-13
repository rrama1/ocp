import React, { useState } from 'react';
import { FileCode2, Copy, Check, Info, Layers, Zap } from 'lucide-react';
import { SFG_BPML_TEMPLATES } from '../data/sfgContent';

export default function SfgBpmlWorkbench() {
  const [selectedTemplateId, setSelectedTemplateId] = useState(SFG_BPML_TEMPLATES[0].id);
  const [copied, setCopied] = useState(false);

  // Customizer state
  const [producerName, setProducerName] = useState('AcmePayables');
  const [consumerName, setConsumerName] = useState('GlobalBank');
  const [sftpHost, setSftpHost] = useState('sftp.partnerbank.com');
  const [sftpPort, setSftpPort] = useState(22);

  const selectedTemplate = SFG_BPML_TEMPLATES.find((t) => t.id === selectedTemplateId) || SFG_BPML_TEMPLATES[0];

  const customizeBpml = (rawCode) => {
    return rawCode
      .replace(/AcmePayables/g, producerName)
      .replace(/GlobalBank/g, consumerName)
      .replace(/sftp\.partnerbank\.com/g, sftpHost)
      .replace(/RemotePort">22/g, `RemotePort">${sftpPort}`);
  };

  const finalCode = customizeBpml(selectedTemplate.code);

  const handleCopy = () => {
    navigator.clipboard.writeText(finalCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      {/* Header Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, var(--bg-secondary) 0%, rgba(56, 189, 248, 0.12) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--accent-blue)', fontWeight: 700, fontSize: '0.85rem' }}>
          <FileCode2 size={18} /> IBM Sterling Business Process (BPML) Builder
        </div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '0.2rem' }}>BPML Code & Routing Workbench</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.3rem' }}>
          Understand BPML service operations, customize SFTP client parameters, Mailbox extraction XML, and XSLT payload transformers with 1-click code copying.
        </p>
      </div>

      <div className="yaml-grid-layout" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '1.25rem', marginTop: '1.5rem' }}>
        {/* Left Selector */}
        <div>
          <div className="card" style={{ padding: '0.85rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Layers size={14} /> BPML Snippets ({SFG_BPML_TEMPLATES.length})
            </div>
            <div style={{ display: 'grid', gap: '0.4rem' }}>
              {SFG_BPML_TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTemplateId(t.id)}
                  style={{
                    textAlign: 'left',
                    padding: '0.6rem 0.75rem',
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
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                    {t.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Code Display */}
        <div>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: 'var(--accent-blue)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                  BPML Workflow Script
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '0.25rem' }}>{selectedTemplate.name}</h3>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  {selectedTemplate.description}
                </p>
              </div>

              <button className="btn btn-primary" onClick={handleCopy} style={{ fontSize: '0.8rem', gap: '0.35rem' }}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied XML!' : 'Copy BPML Code'}
              </button>
            </div>

            {/* Customizer */}
            <div style={{ marginTop: '1rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border-color)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.65rem' }}>
              <div>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                  Producer Partner
                </label>
                <input
                  type="text"
                  value={producerName}
                  onChange={(e) => setProducerName(e.target.value)}
                  style={{ width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '0.3rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                  Consumer Partner
                </label>
                <input
                  type="text"
                  value={consumerName}
                  onChange={(e) => setConsumerName(e.target.value)}
                  style={{ width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '0.3rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                  SFTP Host
                </label>
                <input
                  type="text"
                  value={sftpHost}
                  onChange={(e) => setSftpHost(e.target.value)}
                  style={{ width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '0.3rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                  SFTP Port
                </label>
                <input
                  type="number"
                  value={sftpPort}
                  onChange={(e) => setSftpPort(e.target.value)}
                  style={{ width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '0.3rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}
                />
              </div>
            </div>
          </div>

          <div className="code-container">
            <div className="code-header">
              <span>BPML Spec ({selectedTemplate.name})</span>
              <button className="copy-btn" onClick={handleCopy}>
                {copied ? <Check size={12} color="var(--accent-green)" /> : <Copy size={12} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre style={{ margin: 0 }}>
              <code>{finalCode}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
