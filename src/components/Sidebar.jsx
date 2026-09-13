import React from 'react';
import { LayoutDashboard, Calendar, BookOpen, Terminal, Award, FlaskConical, CloudUpload, FileCode, FileCode2, X } from 'lucide-react';
import { CONCEPT_DOCS, LAB_EXERCISES } from '../data/content';
import { SFG_CONCEPT_DOCS, SFG_LAB_EXERCISES } from '../data/sfgContent';

export default function Sidebar({
  activeTab,
  setActiveTab,
  activeDocId,
  setActiveDocId,
  activeLabId,
  setActiveLabId,
  mobileOpen,
  setMobileOpen,
  platformMode,
  setPlatformMode
}) {
  const handleNavClick = (tab, docId = null, labId = null) => {
    setActiveTab(tab);
    if (docId) setActiveDocId(docId);
    if (labId) setActiveLabId(labId);
    setMobileOpen(false);
  };

  const isSfg = platformMode === 'sfg';
  const docsList = isSfg ? SFG_CONCEPT_DOCS : CONCEPT_DOCS;
  const labsList = isSfg ? SFG_LAB_EXERCISES : LAB_EXERCISES;

  return (
    <>
      <div
        className={`sidebar-overlay ${mobileOpen ? 'mobile-open' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="redhat-badge" style={{ background: isSfg ? 'var(--accent-blue)' : 'var(--accent-red)' }}>
              {isSfg ? 'SFG' : 'EX280'}
            </span>
            <div>
              <h1 className="sidebar-title">{isSfg ? 'Sterling File Gateway' : 'OpenShift Mastery'}</h1>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {isSfg ? 'IBM MFT & B2Bi Engine' : 'Red Hat Cert Ready'}
              </div>
            </div>
          </div>
          <button className="btn-icon mobile-menu-btn" onClick={() => setMobileOpen(false)} style={{ width: '32px', height: '32px' }}>
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-title">Module Selection</div>
          <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '1rem' }}>
            <button
              onClick={() => setPlatformMode('openshift')}
              className={`nav-item ${!isSfg ? 'active' : ''}`}
              style={{ fontSize: '0.75rem', padding: '0.4rem 0.6rem', justifyContent: 'center' }}
            >
              OpenShift EX280
            </button>
            <button
              onClick={() => setPlatformMode('sfg')}
              className={`nav-item ${isSfg ? 'active' : ''}`}
              style={{ fontSize: '0.75rem', padding: '0.4rem 0.6rem', justifyContent: 'center' }}
            >
              Sterling SFG
            </button>
          </div>

          <div className="nav-section-title">Core Navigation</div>

          <button
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleNavClick('dashboard')}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard Overview</span>
          </button>

          {!isSfg ? (
            <>
              <button
                className={`nav-item ${activeTab === 'schedule' ? 'active' : ''}`}
                onClick={() => handleNavClick('schedule')}
              >
                <Calendar size={18} />
                <span>30-Day Study Tracker</span>
              </button>

              <button
                className={`nav-item ${activeTab === 'yaml' ? 'active' : ''}`}
                onClick={() => handleNavClick('yaml')}
              >
                <FileCode size={18} />
                <span>YAML Templates & Builder</span>
              </button>

              <button
                className={`nav-item ${activeTab === 'exam' ? 'active' : ''}`}
                onClick={() => handleNavClick('exam')}
              >
                <Award size={18} />
                <span>EX280 Mock Exam</span>
              </button>

              <button
                className={`nav-item ${activeTab === 'cli' ? 'active' : ''}`}
                onClick={() => handleNavClick('cli')}
              >
                <Terminal size={18} />
                <span>oc CLI Cheatsheet</span>
              </button>
            </>
          ) : (
            <>
              <button
                className={`nav-item ${activeTab === 'bpml' ? 'active' : ''}`}
                onClick={() => handleNavClick('bpml')}
              >
                <FileCode2 size={18} />
                <span>BPML Code Workbench</span>
              </button>
            </>
          )}

          <button
            className={`nav-item ${activeTab === 'deploy' ? 'active' : ''}`}
            onClick={() => handleNavClick('deploy')}
          >
            <CloudUpload size={18} />
            <span>Deploy to Render / Cloud</span>
          </button>

          <div className="nav-section-title">{isSfg ? 'SFG Concept Guides' : 'OpenShift Concept Guides'}</div>
          {docsList.map((doc) => (
            <button
              key={doc.id}
              className={`nav-item ${activeTab === 'doc' && activeDocId === doc.id ? 'active' : ''}`}
              onClick={() => handleNavClick('doc', doc.id)}
            >
              <BookOpen size={16} />
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {doc.title}
              </span>
            </button>
          ))}

          <div className="nav-section-title">{isSfg ? 'SFG Hands-on Labs' : 'OpenShift Hands-on Labs'}</div>
          {labsList.map((lab) => (
            <button
              key={lab.id}
              className={`nav-item ${activeTab === 'lab' && activeLabId === lab.id ? 'active' : ''}`}
              onClick={() => handleNavClick('lab', null, lab.id)}
            >
              <FlaskConical size={16} />
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {lab.title}
              </span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
