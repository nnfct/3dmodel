
import React from 'react';
import { CubeIcon } from './icons/CubeIcon';

interface ModelViewerProps {
  code: string;
  isLoading: boolean;
}

export const ModelViewer: React.FC<ModelViewerProps> = ({ code, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 rounded-lg">
        <svg className="animate-spin h-12 w-12 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-lg text-gray-300">Generating your 3D world...</p>
        <p className="text-sm text-gray-500">This may take a moment.</p>
      </div>
    );
  }

  if (!code) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 rounded-lg border-2 border-dashed border-gray-600">
        <CubeIcon className="h-16 w-16 text-gray-500" />
        <h3 className="mt-4 text-xl font-medium text-gray-300">Your 3D model will appear here</h3>
        <p className="mt-1 text-sm text-gray-500">Enter a description and click "Generate Model".</p>
      </div>
    );
  }

  return (
    <iframe
      title="A-Frame 3D Model"
      srcDoc={code}
      className="w-full h-full border-0 rounded-lg bg-white"
      sandbox="allow-scripts"
    />
  );
};
