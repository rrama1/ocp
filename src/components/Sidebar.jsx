import React from 'react';
import { Calendar, BookOpen, Terminal, Award, FlaskConical, CloudUpload, FileCode, X } from 'lucide-react';
import { CONCEPT_DOCS, LAB_EXERCISES } from '../data/content';

export default function Sidebar({ activeTab, setActiveTab, activeDocId, setActiveDocId, activeLabId, setActiveLabId, mobileOpen, setMobileOpen }) {
  const handleNavClick = (tab, docId = null, labId = null) => {
    setActiveTab(tab);
    if (docId) setActiveDocId(docId);
    if (labId) setActiveLabId(labId);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Dark Backdrop Overlay */}
      <div
        className={`sidebar-overlay ${mobileOpen ? 'mobile-open' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="redhat-badge">EX280</span>
            <div>
              <h1 className="sidebar-title">OpenShift Mastery</h1>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Red Hat Cert Ready</div>
            </div>
          </div>
          <button className="btn-icon mobile-menu-btn" onClick={() => setMobileOpen(false)} style={{ width: '32px', height: '32px' }}>
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-title">Core Navigation</div>

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

          <button
            className={`nav-item ${activeTab === 'deploy' ? 'active' : ''}`}
            onClick={() => handleNavClick('deploy')}
          >
            <CloudUpload size={18} />
            <span>Deploy to Render / Cloud</span>
          </button>

          <div className="nav-section-title">Concept Guides</div>
          {CONCEPT_DOCS.map((doc) => (
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

          <div className="nav-section-title">Hands-on Labs</div>
          {LAB_EXERCISES.map((lab) => (
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
