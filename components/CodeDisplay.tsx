
import React from 'react';

interface CodeDisplayProps {
  code: string;
}

export const CodeDisplay: React.FC<CodeDisplayProps> = ({ code }) => {
  if (!code) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-lg border-2 border-dashed border-gray-600">
        <p className="text-gray-400">No code generated yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gray-900/50 rounded-lg overflow-hidden">
        <pre className="h-full w-full p-4 overflow-auto">
            <code className="text-sm text-yellow-200 language-html whitespace-pre-wrap font-mono">
                {code}
            </code>
        </pre>
    </div>
  );
};
