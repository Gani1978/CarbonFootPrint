/**
 * EcoPulse AI — Root Application Component
 * Sets up routing, context providers, and the app layout shell.
 */


import { Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { AssessmentProvider } from './contexts/AssessmentContext';
import { HabitProvider } from './contexts/HabitContext';
import { GamificationProvider } from './contexts/GamificationContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { LandingPage } from './pages/LandingPage';
import { AssessmentPage } from './pages/AssessmentPage';
import { DashboardPage } from './pages/DashboardPage';
import { ChatbotPage } from './pages/ChatbotPage';
import { HabitsPage } from './pages/HabitsPage';
import { ActionPlanPage } from './pages/ActionPlanPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { SettingsPage } from './pages/SettingsPage';
import { ROUTES } from './utils/constants';

function AppLayout() {
  const location = useLocation();
  const isLandingPage = location.pathname === ROUTES.HOME;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {!isLandingPage && <Navbar />}
      <div className={`flex ${isLandingPage ? '' : 'min-h-[calc(100vh-4rem)]'}`}>
        {!isLandingPage && <Sidebar />}
        <Routes>
          <Route path={ROUTES.HOME} element={<LandingPage />} />
          <Route path={ROUTES.ASSESSMENT} element={<AssessmentPage />} />
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.CHATBOT} element={<ChatbotPage />} />
          <Route path={ROUTES.HABITS} element={<HabitsPage />} />
          <Route path={ROUTES.ACTION_PLAN} element={<ActionPlanPage />} />
          <Route path={ROUTES.ACHIEVEMENTS} element={<AchievementsPage />} />
          <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <GamificationProvider>
        <AssessmentProvider>
          <HabitProvider>
            <AppLayout />
          </HabitProvider>
        </AssessmentProvider>
      </GamificationProvider>
    </AppProvider>
  );
}
