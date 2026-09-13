import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DocsViewer from './components/DocsViewer';
import StudyTracker from './components/StudyTracker';
import ExamSimulator from './components/ExamSimulator';
import CliCheatsheet from './components/CliCheatsheet';
import LabWorkbench from './components/LabWorkbench';
import DeployGuide from './components/DeployGuide';
import { STUDY_SCHEDULE_WEEKS, CONCEPT_DOCS, MOCK_EXAM_QUESTIONS } from './data/content';

export default function App() {
  // Navigation state
  const [activeTab, setActiveTab] = useState('schedule'); // schedule | doc | lab | exam | cli | deploy
  const [activeDocId, setActiveDocId] = useState('doc-01');
  const [activeLabId, setActiveLabId] = useState('lab-01');
  const [searchFilter, setSearchFilter] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Theme state
  const [theme, setTheme] = useState(() => localStorage.getItem('ex280_theme') || 'dark');

  // Progress LocalStorage State
  const [completedDays, setCompletedDays] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ex280_completed_days')) || {};
    } catch {
      return {};
    }
  });

  const [examCompletedTasks, setExamCompletedTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ex280_exam_tasks')) || {};
    } catch {
      return {};
    }
  });

  const [labTaskState, setLabTaskState] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ex280_lab_tasks')) || {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ex280_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('ex280_completed_days', JSON.stringify(completedDays));
  }, [completedDays]);

  useEffect(() => {
    localStorage.setItem('ex280_exam_tasks', JSON.stringify(examCompletedTasks));
  }, [examCompletedTasks]);

  useEffect(() => {
    localStorage.setItem('ex280_lab_tasks', JSON.stringify(labTaskState));
  }, [labTaskState]);

  // Handlers
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const toggleDayCompleted = (dayId) => {
    setCompletedDays((prev) => ({ ...prev, [dayId]: !prev[dayId] }));
  };

  const toggleExamTask = (taskId) => {
    setExamCompletedTasks((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const toggleLabTask = (taskKey) => {
    setLabTaskState((prev) => ({ ...prev, [taskKey]: !prev[taskKey] }));
  };

  const handleSelectDoc = (docId) => {
    setActiveDocId(docId);
    setActiveTab('doc');
  };

  const handleSelectLab = (labId) => {
    setActiveLabId(labId);
    setActiveTab('lab');
  };

  // Calculate totals
  const allDays = STUDY_SCHEDULE_WEEKS.flatMap((w) => w.days);
  const totalDaysCount = allDays.length;
  const completedDaysCount = allDays.filter((d) => completedDays[d.id]).length;

  return (
    <div className="app-container">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeDocId={activeDocId}
        setActiveDocId={setActiveDocId}
        activeLabId={activeLabId}
        setActiveLabId={setActiveLabId}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="main-wrapper">
        <Navbar
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
          theme={theme}
          toggleTheme={toggleTheme}
          completedCount={completedDaysCount}
          totalCount={totalDaysCount}
          onToggleMobileSidebar={() => setMobileOpen(!mobileOpen)}
        />

        <main className="content-body">
          {activeTab === 'schedule' && (
            <StudyTracker
              completedDays={completedDays}
              toggleDayCompleted={toggleDayCompleted}
              onSelectDoc={handleSelectDoc}
              onSelectLab={handleSelectLab}
            />
          )}

          {activeTab === 'doc' && <DocsViewer docId={activeDocId} />}

          {activeTab === 'lab' && (
            <LabWorkbench
              labId={activeLabId}
              labTaskState={labTaskState}
              toggleLabTask={toggleLabTask}
            />
          )}

          {activeTab === 'exam' && (
            <ExamSimulator
              examCompletedTasks={examCompletedTasks}
              toggleExamTask={toggleExamTask}
            />
          )}

          {activeTab === 'cli' && <CliCheatsheet externalSearch={searchFilter} />}

          {activeTab === 'deploy' && <DeployGuide />}
        </main>
      </div>
    </div>
  );
}
