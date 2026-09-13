import React from 'react';
import { LayoutDashboard, Award, BookOpen, FileCode, FileCode2, FlaskConical, Terminal, ArrowRight, ShieldCheck, Cpu, Network, Layers, Server, Zap } from 'lucide-react';
import { CONCEPT_DOCS, LAB_EXERCISES, YAML_TEMPLATES_CATALOG, MOCK_EXAM_QUESTIONS } from '../data/content';
import { SFG_CONCEPT_DOCS, SFG_LAB_EXERCISES, SFG_BPML_TEMPLATES } from '../data/sfgContent';

export default function DashboardOverview({
  onSelectTab,
  onSelectPlatform,
  completedDaysCount,
  totalDaysCount
}) {
  const openShiftPercent = Math.round((completedDaysCount / totalDaysCount) * 100);

  return (
    <div>
      {/* Hero Welcome Banner */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, var(--bg-secondary) 0%, rgba(238, 0, 0, 0.15) 50%, rgba(56, 189, 248, 0.12) 100%)',
          border: '1px solid var(--glass-border)',
          padding: '2rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ maxWidth: '650px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(238, 0, 0, 0.15)', color: 'var(--accent-red)', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.75rem' }}>
              <Zap size={14} /> Dual Enterprise Learning Hub
            </div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>
              OpenShift EX280 & IBM Sterling SFG Mastery
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.6rem' }}>
              Interactive hands-on platform covering Red Hat OpenShift Administration (EX280 Exam Ready) and IBM Sterling File Gateway (MFT, B2Bi Engine, SEAS, SSP & DMZ Architecture).
            </p>

            <div style={{ display: 'flex', gap: '0.85rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <button
                className="btn btn-primary"
                onClick={() => {
                  onSelectPlatform('openshift');
                  onSelectTab('schedule');
                }}
                style={{ gap: '0.5rem', padding: '0.65rem 1.25rem' }}
              >
                Launch OpenShift Module <ArrowRight size={16} />
              </button>
              <button
                className="btn btn-outline"
                onClick={() => {
                  onSelectPlatform('sfg');
                  onSelectTab('doc');
                }}
                style={{ gap: '0.5rem', padding: '0.65rem 1.25rem', borderColor: 'var(--accent-blue)', color: 'var(--accent-blue)' }}
              >
                Launch Sterling SFG Module <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Quick Metrics Card */}
          <div style={{ background: 'var(--bg-primary)', padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', minWidth: '240px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px' }}>
              Overall OpenShift Readiness
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--accent-red)', margin: '0.2rem 0' }}>
              {openShiftPercent}%
            </div>
            <div className="progress-bar-bg" style={{ marginBottom: '0.5rem' }}>
              <div className="progress-bar-fill" style={{ width: `${openShiftPercent}%` }}></div>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {completedDaysCount} of {totalDaysCount} roadmap days completed
            </div>
          </div>
        </div>
      </div>

      {/* Module Overview Grid */}
      <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '2rem 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <LayoutDashboard size={20} color="var(--accent-blue)" /> Learning Platform Modules
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        
        {/* Card 1: Red Hat OpenShift EX280 */}
        <div className="card" style={{ borderTop: '4px solid var(--accent-red)', marginBottom: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ background: 'rgba(238, 0, 0, 0.15)', color: 'var(--accent-red)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
              Red Hat Certification
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>10 Concept Modules</span>
          </div>

          <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            OpenShift EX280 Administration
          </h4>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.35rem', marginBottom: '1.25rem' }}>
            Core architecture, `oc` CLI speed drills, RBAC policies, SCCs, PVC storage, Edge/Passthrough Routes, S2I builds, ResourceQuotas, HPA, and 3-hour exam simulator.
          </p>

          <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <ShieldCheck size={16} color="var(--accent-green)" /> 10 Detailed Concept Guides
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <FileCode size={16} color="var(--accent-yellow)" /> 12+ Interactive K8s/OpenShift YAML Templates
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <Award size={16} color="var(--accent-red)" /> 15-Task Practical Exam Simulator with Timer
            </div>
          </div>

          <button
            className="btn btn-outline"
            onClick={() => {
              onSelectPlatform('openshift');
              onSelectTab('schedule');
            }}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Explore OpenShift Module
          </button>
        </div>

        {/* Card 2: IBM Sterling File Gateway (SFG) */}
        <div className="card" style={{ borderTop: '4px solid var(--accent-blue)', marginBottom: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: 'var(--accent-blue)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
              IBM Enterprise MFT
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>14 Concept Modules</span>
          </div>

          <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            IBM Sterling File Gateway (SFG)
          </h4>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.35rem', marginBottom: '1.25rem' }}>
            Enterprise Managed File Transfer, B2Bi engine, Routing Channel Templates (RCT), BPML workflow customization, SEAS auth, SSPS/SSP DMZ boundary, Control Center (SCC).
          </p>

          <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <Server size={16} color="var(--accent-blue)" /> 14 In-Depth Guides (SEAS, SSP, DMZ, SCC)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <FileCode2 size={16} color="var(--accent-yellow)" /> Interactive BPML Code Workbench & Customizer
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <FlaskConical size={16} color="var(--accent-green)" /> 4 Step-by-Step Hands-On MFT Labs
            </div>
          </div>

          <button
            className="btn btn-outline"
            onClick={() => {
              onSelectPlatform('sfg');
              onSelectTab('doc');
            }}
            style={{ width: '100%', justifyContent: 'center', borderColor: 'var(--accent-blue)', color: 'var(--accent-blue)' }}
          >
            Explore Sterling SFG Module
          </button>
        </div>

      </div>

      {/* Quick Tool Launchers Grid */}
      <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '2.5rem 0 1rem 0' }}>
        Interactive Workbenches & Tools
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        <div
          className="card"
          onClick={() => {
            onSelectPlatform('openshift');
            onSelectTab('yaml');
          }}
          style={{ cursor: 'pointer', transition: 'all 0.2s ease', marginBottom: 0 }}
        >
          <FileCode size={24} color="var(--accent-yellow)" style={{ marginBottom: '0.5rem' }} />
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>YAML Manifest Builder</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            12+ K8s/OpenShift templates with live parameter customizer.
          </p>
        </div>

        <div
          className="card"
          onClick={() => {
            onSelectPlatform('sfg');
            onSelectTab('bpml');
          }}
          style={{ cursor: 'pointer', transition: 'all 0.2s ease', marginBottom: 0 }}
        >
          <FileCode2 size={24} color="var(--accent-blue)" style={{ marginBottom: '0.5rem' }} />
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>BPML Code Workbench</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Interactive XML BPML workflow builder for Sterling B2Bi.
          </p>
        </div>

        <div
          className="card"
          onClick={() => {
            onSelectPlatform('openshift');
            onSelectTab('exam');
          }}
          style={{ cursor: 'pointer', transition: 'all 0.2s ease', marginBottom: 0 }}
        >
          <Award size={24} color="var(--accent-red)" style={{ marginBottom: '0.5rem' }} />
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>EX280 Exam Simulator</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            3-hour timer, 15 scenarios, score grader, solution walkthroughs.
          </p>
        </div>

        <div
          className="card"
          onClick={() => {
            onSelectPlatform('openshift');
            onSelectTab('cli');
          }}
          style={{ cursor: 'pointer', transition: 'all 0.2s ease', marginBottom: 0 }}
        >
          <Terminal size={24} color="var(--accent-green)" style={{ marginBottom: '0.5rem' }} />
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>oc CLI Cheatsheet</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Searchable imperative command library with 1-click copy.
          </p>
        </div>
      </div>
    </div>
  );
}
