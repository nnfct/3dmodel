
import React, { useState, useCallback } from 'react';
import { generateAFrameCode } from './services/geminiService';
import { PromptInput } from './components/PromptInput';
import { ModelViewer } from './components/ModelViewer';
import { CodeDisplay } from './components/CodeDisplay';
import { CubeIcon } from './components/icons/CubeIcon';
import { CodeIcon } from './components/icons/CodeIcon';

type ActiveTab = 'model' | 'code';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('A robot waving its hand, standing on a grassy field under a blue sky.');
  const [aFrameCode, setAFrameCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('model');

  const handleGenerate = useCallback(async () => {
    if (!prompt || isLoading) return;

    setIsLoading(true);
    setError(null);
    setAFrameCode('');

    try {
      const code = await generateAFrameCode(prompt);
      setAFrameCode(code);
      setActiveTab('model');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-1/3 max-w-md bg-gray-800 p-6 flex flex-col shadow-2xl z-10">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-indigo-400">Text-to-3D Generator</h1>
          <p className="text-gray-400 mt-1">Describe a scene and watch it come to life in 3D.</p>
        </header>
        <div className="flex-grow">
          <PromptInput
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={handleGenerate}
            isLoading={isLoading}
          />
        </div>
        {error && <div className="mt-4 text-red-400 bg-red-900/50 p-3 rounded-md">{error}</div>}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-gray-900">
        <div className="border-b border-gray-700">
          <nav className="flex space-x-1" aria-label="Tabs">
            <TabButton
              label="3D Model"
              icon={<CubeIcon />}
              isActive={activeTab === 'model'}
              onClick={() => setActiveTab('model')}
            />
            <TabButton
              label="Generated Code"
              icon={<CodeIcon />}
              isActive={activeTab === 'code'}
              onClick={() => setActiveTab('code')}
            />
          </nav>
        </div>

        <div className="flex-1 p-4 bg-black/20 overflow-hidden">
          {activeTab === 'model' && <ModelViewer code={aFrameCode} isLoading={isLoading} />}
          {activeTab === 'code' && <CodeDisplay code={aFrameCode} />}
        </div>
      </main>
    </div>
  );
};

interface TabButtonProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, icon, isActive, onClick }) => {
  const baseClasses = "flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-t-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800";
  const activeClasses = "bg-gray-800 text-indigo-400";
  const inactiveClasses = "text-gray-400 hover:bg-gray-700/50 hover:text-white";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {icon}
      {label}
    </button>
  );
};

export default App;
