import React, { useState } from 'react';
import { CheckCircle2, Circle, Calendar, Trophy, ArrowRight, ExternalLink } from 'lucide-react';
import { STUDY_SCHEDULE_WEEKS } from '../data/content';

export default function StudyTracker({ completedDays, toggleDayCompleted, onSelectDoc, onSelectLab }) {
  const [selectedWeek, setSelectedWeek] = useState('all');

  const allDays = STUDY_SCHEDULE_WEEKS.flatMap((w) => w.days);
  const totalDays = allDays.length;
  const completedCount = allDays.filter((d) => completedDays[d.id]).length;
  const progressPercent = Math.round((completedCount / totalDays) * 100);

  const filteredWeeks = selectedWeek === 'all'
    ? STUDY_SCHEDULE_WEEKS
    : STUDY_SCHEDULE_WEEKS.filter((w) => w.id === selectedWeek);

  return (
    <div>
      {/* Header Progress Dashboard */}
      <div className="card" style={{ background: 'linear-gradient(135deg, var(--bg-secondary) 0%, rgba(238, 0, 0, 0.08) 100%)', border: '1px solid var(--glass-border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-red)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              <Trophy size={16} /> 30-Day Certification Roadmap
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.3rem' }}>EX280 Exam Mastery Tracker</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
              Complete 1 daily task to achieve 100% EX280 readiness in 4 weeks.
            </p>
          </div>

          <div style={{ background: 'var(--bg-primary)', padding: '1rem 1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', minWidth: '220px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              <span>Overall Progress</span>
              <span style={{ color: 'var(--accent-red)' }}>{progressPercent}%</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem', textAlign: 'right' }}>
              {completedCount} of {totalDays} days completed
            </div>
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <button
            className={`btn ${selectedWeek === 'all' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setSelectedWeek('all')}
            style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
          >
            All Weeks
          </button>
          {STUDY_SCHEDULE_WEEKS.map((w) => (
            <button
              key={w.id}
              className={`btn ${selectedWeek === w.id ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setSelectedWeek(w.id)}
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
            >
              {w.title.split(':')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Week Sections */}
      {filteredWeeks.map((week) => (
        <div key={week.id} className="card" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: week.color }}></div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{week.title}</h3>
          </div>

          <div style={{ display: 'grid', gap: '0.85rem' }}>
            {week.days.map((day) => {
              const isDone = !!completedDays[day.id];
              return (
                <div
                  key={day.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    padding: '1rem',
                    background: isDone ? 'rgba(34, 197, 94, 0.05)' : 'var(--bg-primary)',
                    border: `1px solid ${isDone ? 'rgba(34, 197, 94, 0.3)' : 'var(--border-color)'}`,
                    borderRadius: 'var(--radius-md)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <button
                    onClick={() => toggleDayCompleted(day.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: isDone ? 'var(--accent-green)' : 'var(--text-muted)', marginTop: '0.15rem' }}
                  >
                    {isDone ? <CheckCircle2 size={22} /> : <Circle size={22} />}
                  </button>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: isDone ? 'var(--text-primary)' : 'var(--text-primary)' }}>
                        Day {day.dayNum}: {day.title}
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {day.docRef && (
                          <button
                            className="btn btn-outline"
                            onClick={() => onSelectDoc(day.docRef)}
                            style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', gap: '0.25rem' }}
                          >
                            <ExternalLink size={12} /> Guide
                          </button>
                        )}
                        {day.labRef && (
                          <button
                            className="btn btn-outline"
                            onClick={() => onSelectLab(day.labRef)}
                            style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', gap: '0.25rem', borderColor: 'var(--accent-blue)', color: 'var(--accent-blue)' }}
                          >
                            <ExternalLink size={12} /> Lab Exercise
                          </button>
                        )}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                      {day.task}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
