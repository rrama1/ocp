import React, { useState } from 'react';
import { FlaskConical, Clock, Copy, Check, CheckSquare, Square, Terminal, Shield } from 'lucide-react';
import { LAB_EXERCISES } from '../data/content';

export default function LabWorkbench({ labId, labTaskState, toggleLabTask }) {
  const lab = LAB_EXERCISES.find((l) => l.id === labId) || LAB_EXERCISES[0];
  const [copiedTaskIdx, setCopiedTaskIdx] = useState(null);

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedTaskIdx(idx);
    setTimeout(() => setCopiedTaskIdx(null), 2000);
  };

  return (
    <div>
      {/* Lab Banner Header */}
      <div className="card" style={{ background: 'linear-gradient(135deg, var(--bg-secondary) 0%, rgba(34, 197, 94, 0.1) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: 'var(--accent-green)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            <FlaskConical size={12} /> {lab.category}
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            <Clock size={12} /> Est. Time: {lab.estimatedTime}
          </span>
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{lab.title}</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.3rem' }}>
          Follow the step-by-step task instructions below. Execute the commands in your local CRC, Developer Sandbox, or minikube cluster.
        </p>
      </div>

      {/* Lab Tasks List */}
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '2rem 0 1rem 0' }}>Hands-on Step-by-Step Tasks</h3>

      <div style={{ display: 'grid', gap: '1.25rem' }}>
        {lab.tasks.map((task, idx) => {
          const taskKey = `${lab.id}-${task.id}`;
          const isDone = !!labTaskState[taskKey];
          const isCopied = copiedTaskIdx === idx;

          return (
            <div
              key={task.id}
              className="card"
              style={{
                border: `1px solid ${isDone ? 'rgba(34, 197, 94, 0.4)' : 'var(--border-color)'}`,
                background: isDone ? 'rgba(34, 197, 94, 0.04)' : 'var(--bg-card)',
                marginBottom: 0
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <button
                    onClick={() => toggleLabTask(taskKey)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: isDone ? 'var(--accent-green)' : 'var(--text-muted)' }}
                  >
                    {isDone ? <CheckSquare size={20} /> : <Square size={20} />}
                  </button>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Step {idx + 1}: {task.title}
                  </h4>
                </div>

                <button
                  className="btn btn-outline"
                  onClick={() => handleCopy(task.command, idx)}
                  style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', gap: '0.3rem' }}
                >
                  {isCopied ? <Check size={14} color="var(--accent-green)" /> : <Copy size={14} />}
                  {isCopied ? 'Copied' : 'Copy Code'}
                </button>
              </div>

              <pre style={{ margin: 0, fontSize: '0.85rem' }}>
                <code>{task.command}</code>
              </pre>
            </div>
          );
        })}
      </div>

      {/* Verification Commands Card */}
      <div className="card" style={{ marginTop: '2rem', borderLeft: '4px solid var(--accent-green)' }}>
        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Terminal size={18} color="var(--accent-green)" /> Solution Verification Commands
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
          Run these commands in your cluster terminal to verify your resources are correctly configured:
        </p>
        <pre style={{ margin: 0, fontSize: '0.85rem' }}>
          <code>{lab.verification}</code>
        </pre>
      </div>
    </div>
  );
}
