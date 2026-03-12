import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Heart, Fingerprint, Settings } from 'lucide-react';
import KhatmaTracker from '@/components/KhatmaTracker';
import DuaList from '@/components/DuaList';
import DigitalTasbeeh from '@/components/DigitalTasbeeh';

const tabs = [
  { id: 'khatma', label: 'القرآن', icon: BookOpen },
  { id: 'duas', label: 'الأدعية', icon: Heart },
  { id: 'tasbeeh', label: 'السبحة', icon: Fingerprint },
] as const;

type TabId = typeof tabs[number]['id'];

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>('khatma');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="relative emerald-gradient text-primary-foreground py-8 px-4 geometric-pattern">
        <div className="max-w-4xl mx-auto text-center space-y-2">
          <h1 className="text-4xl font-arabic  leading-relaxed font-bold"> خاتمة ودعاء لروح المرحوم علاء مطرود</h1>

          <button
            onClick={() => navigate('/admin')}
            className="absolute top-4 left-4 p-2 rounded-lg opacity-40 hover:opacity-100 transition-opacity text-primary-foreground"
            title="لوحة التحكم"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Tabs */}
      <nav className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto flex">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all border-b-2
                  ${
                    isActive
                      ? 'border-accent text-accent'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto p-4 md:p-8">
        {activeTab === 'khatma' && <KhatmaTracker />}
        {activeTab === 'duas' && <DuaList />}
        {activeTab === 'tasbeeh' && <DigitalTasbeeh />}
      </main>
    </div>
  );
};

export default Index;