import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock, Award, CheckSquare, Square, Eye, EyeOff, CheckCircle2, AlertTriangle } from 'lucide-react';
import { MOCK_EXAM_QUESTIONS, APP_METADATA } from '../data/content';

export default function ExamSimulator({ examCompletedTasks, toggleExamTask }) {
  // Timer State (3 Hours = 10800 Seconds)
  const [secondsLeft, setSecondsLeft] = useState(10800);
  const [timerRunning, setTimerRunning] = useState(false);
  const [visibleSolutions, setVisibleSolutions] = useState({});

  useEffect(() => {
    let interval = null;
    if (timerRunning && secondsLeft > 0) {
      interval = setInterval(() => setSecondsLeft((prev) => prev - 1), 1000);
    } else if (secondsLeft === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, secondsLeft]);

  const formatTime = (secs) => {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleResetTimer = () => {
    setTimerRunning(false);
    setSecondsLeft(10800);
  };

  const toggleSolution = (id) => {
    setVisibleSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Score Calculation
  const totalCompleted = MOCK_EXAM_QUESTIONS.filter((q) => examCompletedTasks[q.id]).length;
  const currentScore = MOCK_EXAM_QUESTIONS.reduce((acc, q) => acc + (examCompletedTasks[q.id] ? q.points : 0), 0);
  const isPassing = currentScore >= APP_METADATA.passingScore;

  return (
    <div>
      {/* Exam Header Dashboard */}
      <div className="card" style={{ background: 'linear-gradient(135deg, var(--bg-secondary) 0%, rgba(238, 0, 0, 0.12) 100%)', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-red)', fontWeight: 700, fontSize: '0.85rem' }}>
              <Award size={18} /> Official EX280 Practice Simulation
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.2rem' }}>15-Scenario Practical Exam</h2>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Passing Threshold: {APP_METADATA.passingScore} / {APP_METADATA.maxScore} points (70%)
            </div>
          </div>

          {/* Timer controls */}
          <div style={{ background: 'var(--bg-primary)', padding: '1rem 1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={14} /> Time Remaining
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 800, color: secondsLeft < 1800 ? 'var(--accent-red)' : 'var(--text-primary)' }}>
              {formatTime(secondsLeft)}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-outline" onClick={() => setTimerRunning(!timerRunning)} style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}>
                {timerRunning ? <Pause size={14} /> : <Play size={14} />} {timerRunning ? 'Pause' : 'Start'}
              </button>
              <button className="btn btn-outline" onClick={handleResetTimer} style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}>
                <RotateCcw size={14} /> Reset
              </button>
            </div>
          </div>

          {/* Score Badge */}
          <div style={{ background: 'var(--bg-primary)', padding: '1rem 1.5rem', borderRadius: 'var(--radius-lg)', border: `1px solid ${isPassing ? 'var(--accent-green)' : 'var(--border-color)'}`, minWidth: '200px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              Your Score
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: isPassing ? 'var(--accent-green)' : 'var(--accent-yellow)' }}>
              {currentScore} / {APP_METADATA.maxScore}
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', fontWeight: 700, color: isPassing ? 'var(--accent-green)' : 'var(--accent-yellow)' }}>
              {isPassing ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
              {isPassing ? 'PASSED (Exam Ready)' : 'Needs Practice (< 210)'}
            </div>
          </div>
        </div>
      </div>

      {/* Task Checklist */}
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '2rem 0 1rem 0' }}>Exam Scenarios & Grading Checklist</h3>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {MOCK_EXAM_QUESTIONS.map((q) => {
          const isDone = !!examCompletedTasks[q.id];
          const showSol = !!visibleSolutions[q.id];

          return (
            <div
              key={q.id}
              className="card"
              style={{
                border: `1px solid ${isDone ? 'rgba(34, 197, 94, 0.4)' : 'var(--border-color)'}`,
                background: isDone ? 'rgba(34, 197, 94, 0.04)' : 'var(--bg-card)',
                marginBottom: 0
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <button
                    onClick={() => toggleExamTask(q.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: isDone ? 'var(--accent-green)' : 'var(--text-muted)', marginTop: '0.2rem' }}
                  >
                    {isDone ? <CheckSquare size={22} /> : <Square size={22} />}
                  </button>

                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {q.title} <span style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', fontWeight: 600 }}>({q.points} pts)</span>
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                      {q.description}
                    </p>
                  </div>
                </div>

                <button
                  className="btn btn-outline"
                  onClick={() => toggleSolution(q.id)}
                  style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem', gap: '0.3rem', whiteSpace: 'nowrap' }}
                >
                  {showSol ? <EyeOff size={14} /> : <Eye size={14} />} {showSol ? 'Hide Solution' : 'View Solution'}
                </button>
              </div>

              {/* Solution expandable code */}
              {showSol && (
                <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-green)', marginBottom: '0.5rem' }}>
                    Solution Commands & Manifests:
                  </div>
                  <pre style={{ margin: 0, fontSize: '0.85rem' }}>
                    <code>{q.solutionCmd}</code>
                  </pre>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
