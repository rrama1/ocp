import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DocsViewer from './components/DocsViewer';
import StudyTracker from './components/StudyTracker';
import ExamSimulator from './components/ExamSimulator';
import CliCheatsheet from './components/CliCheatsheet';
import LabWorkbench from './components/LabWorkbench';
import DeployGuide from './components/DeployGuide';
import YamlWorkbench from './components/YamlWorkbench';
import SfgBpmlWorkbench from './components/SfgBpmlWorkbench';
import DashboardOverview from './components/DashboardOverview';
import { STUDY_SCHEDULE_WEEKS, CONCEPT_DOCS } from './data/content';
import { SFG_CONCEPT_DOCS, SFG_LAB_EXERCISES } from './data/sfgContent';

export default function App() {
  const [platformMode, setPlatformMode] = useState(() => localStorage.getItem('ex280_platform_mode') || 'openshift');

  // Navigation state defaults to 'dashboard'
  const [activeTab, setActiveTab] = useState('dashboard');
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
    localStorage.setItem('ex280_platform_mode', platformMode);
  }, [platformMode]);

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

  const isSfg = platformMode === 'sfg';
  const currentDocs = isSfg ? SFG_CONCEPT_DOCS : CONCEPT_DOCS;
  const currentLabs = isSfg ? SFG_LAB_EXERCISES : [];

  const totalItemsCount = isSfg
    ? currentDocs.length + currentLabs.length
    : totalDaysCount;

  const completedItemsCount = isSfg
    ? currentLabs.filter((l) => l.tasks.every((t) => labTaskState[`${l.id}-${t.id}`])).length
    : completedDaysCount;

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
        platformMode={platformMode}
        setPlatformMode={setPlatformMode}
      />

      <div className="main-wrapper">
        <Navbar
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
          theme={theme}
          toggleTheme={toggleTheme}
          completedCount={completedItemsCount}
          totalCount={totalItemsCount}
          onToggleMobileSidebar={() => setMobileOpen(!mobileOpen)}
          platformMode={platformMode}
          setPlatformMode={setPlatformMode}
        />

        <main className="content-body">
          {activeTab === 'dashboard' && (
            <DashboardOverview
              onSelectTab={setActiveTab}
              onSelectPlatform={setPlatformMode}
              completedDaysCount={completedDaysCount}
              totalDaysCount={totalDaysCount}
            />
          )}

          {activeTab === 'schedule' && !isSfg && (
            <StudyTracker
              completedDays={completedDays}
              toggleDayCompleted={toggleDayCompleted}
              onSelectDoc={handleSelectDoc}
              onSelectLab={handleSelectLab}
            />
          )}

          {activeTab === 'yaml' && !isSfg && <YamlWorkbench />}

          {activeTab === 'bpml' && isSfg && <SfgBpmlWorkbench />}

          {activeTab === 'doc' && <DocsViewer docId={activeDocId} />}

          {activeTab === 'lab' && (
            <LabWorkbench
              labId={activeLabId}
              labTaskState={labTaskState}
              toggleLabTask={toggleLabTask}
            />
          )}

          {activeTab === 'exam' && !isSfg && (
            <ExamSimulator
              examCompletedTasks={examCompletedTasks}
              toggleExamTask={toggleExamTask}
            />
          )}

          {activeTab === 'cli' && !isSfg && <CliCheatsheet externalSearch={searchFilter} />}

          {activeTab === 'deploy' && <DeployGuide />}
        </main>
      </div>
    </div>
  );
}
