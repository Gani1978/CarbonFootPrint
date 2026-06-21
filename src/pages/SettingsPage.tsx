/**
 * EcoPulse AI — Settings Page
 * User profile management, data export/import, and app preferences.
 */

import { useState } from 'react';
import { User, Download, Trash2, Info, Shield, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { PageContainer } from '../components/layout/PageContainer';
import { useApp } from '../contexts/AppContext';
import { exportData } from '../utils/storage';
import { formatDate } from '../utils/formatters';
import { ROUTES } from '../utils/constants';

export function SettingsPage() {
  const navigate = useNavigate();
  const { state: appState, updateUser, resetApp } = useApp();
  const [showResetModal, setShowResetModal] = useState(false);
  const [name, setName] = useState(appState.user?.name || '');
  const [saved, setSaved] = useState(false);

  const handleSaveName = () => {
    if (appState.user && name.trim()) {
      updateUser({
        ...appState.user,
        name: name.trim(),
        avatarInitial: name.trim().charAt(0).toUpperCase(),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ecopulse-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    resetApp();
    setShowResetModal(false);
    navigate(ROUTES.HOME);
  };

  return (
    <PageContainer title="Settings" subtitle="Manage your profile and app preferences">
      {/* Profile */}
      <Card padding="md" className="mb-6">
        <CardHeader title="Profile" icon={<User size={18} />} />
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-2xl font-bold">
              {appState.user?.avatarInitial || '?'}
            </div>
            <div>
              <p className="text-lg font-semibold text-white">{appState.user?.name || 'Unknown'}</p>
              <p className="text-sm text-slate-400">
                Member since {appState.user?.joinedAt ? formatDate(appState.user.joinedAt, 'long') : 'N/A'}
              </p>
            </div>
          </div>

          <div>
            <label htmlFor="settings-name" className="block text-sm font-medium text-slate-300 mb-1.5">
              Display Name
            </label>
            <div className="flex gap-3">
              <input
                id="settings-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm
                  focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all"
                maxLength={50}
              />
              <Button onClick={handleSaveName} variant={saved ? 'success' : 'primary'} size="md">
                {saved ? 'Saved ✓' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Data Management */}
      <Card padding="md" className="mb-6">
        <CardHeader title="Data Management" icon={<Shield size={18} />} />
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-white/5">
            <div>
              <p className="text-sm font-medium text-white">Export Your Data</p>
              <p className="text-xs text-slate-400">Download all your EcoPulse data as a JSON file.</p>
            </div>
            <Button variant="secondary" size="sm" onClick={handleExport} icon={<Download size={14} />}>
              Export
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-white/5">
            <div>
              <p className="text-sm font-medium text-white">Retake Assessment</p>
              <p className="text-xs text-slate-400">Start a fresh carbon footprint assessment.</p>
            </div>
            <Button variant="secondary" size="sm" onClick={() => navigate(ROUTES.ASSESSMENT)} icon={<RefreshCw size={14} />}>
              Retake
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-rose-500/5 border border-rose-500/10">
            <div>
              <p className="text-sm font-medium text-rose-300">Reset All Data</p>
              <p className="text-xs text-slate-400">Permanently delete all your data and start over.</p>
            </div>
            <Button variant="danger" size="sm" onClick={() => setShowResetModal(true)} icon={<Trash2 size={14} />}>
              Reset
            </Button>
          </div>
        </div>
      </Card>

      {/* About */}
      <Card padding="md">
        <CardHeader title="About" icon={<Info size={18} />} />
        <div className="space-y-3 text-sm text-slate-400">
          <p><strong className="text-white">EcoPulse AI</strong> v1.0.0</p>
          <p>An AI-powered sustainability coach that helps you understand, track, and reduce your carbon footprint through personalized insights and gamification.</p>
          <p>Built with React, TypeScript, Tailwind CSS, and Recharts.</p>
          <p className="text-xs text-slate-500 pt-2 border-t border-white/5">
            Your data is stored locally in your browser. No data is sent to any server.
          </p>
        </div>
      </Card>

      {/* Reset Confirmation Modal */}
      <Modal isOpen={showResetModal} onClose={() => setShowResetModal(false)} title="Reset All Data?">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center mx-auto mb-4">
            <Trash2 size={28} className="text-rose-400" />
          </div>
          <p className="text-white font-medium mb-2">This action cannot be undone</p>
          <p className="text-sm text-slate-400 mb-6">
            All your assessment data, habits, streaks, badges, and eco-points will be permanently deleted.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="ghost" onClick={() => setShowResetModal(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleReset}>Yes, Reset Everything</Button>
          </div>
        </div>
      </Modal>
    </PageContainer>
  );
}
