
import React from 'react';

export const CubeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
    {...props}
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <line x1="3.27" y1="6.96" x2="12" y2="12" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
    <line x1="20.73" y1="6.96" x2="12" y2="12" />
    <line x1="17" y1="4.26" x2="7" y2="9.74" />
  </svg>
);
