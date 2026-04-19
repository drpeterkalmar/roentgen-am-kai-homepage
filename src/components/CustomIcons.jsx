import React from 'react';

export const ToothIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 11c0-4-2.5-7-5-7-1.5 0-3 1-3 1s-1.5-1-3-1c-2.5 0-5 3-5 7 0 5 2 9 4 9 1 0 2-1 2-2v-2.5a2.5 2.5 0 0 1 5 0V18c0 1 1 2 2 2 2 0 4-4 4-9z" />
  </svg>
);
