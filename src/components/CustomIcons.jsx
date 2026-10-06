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

// GitHub-Logo (bis lucide-react 0.344 als „Github“ enthalten; Marken-Icons gibt es ab lucide 1.x nicht mehr).
// Pfade unverändert übernommen (Lucide, ISC-Lizenz) – gleiche Darstellung wie bisher im Impressum.
export const GithubIcon = ({ size = 24, className = "" }) => (
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
    className={`lucide lucide-github ${className}`}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
