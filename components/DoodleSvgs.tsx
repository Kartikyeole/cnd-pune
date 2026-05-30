import React from "react";

// Symmetrical, precise tech stroke
const strokeProps = {
  stroke: "currentColor",
  strokeWidth: "1.2",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

// Symmetrical clean tech cloud
export const SketchCloud: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 60" className="sketchy-path" {...props}>
    <path
      d="M 22 45 
         C 12 45, 8 36, 16 26 
         C 14 14, 28 8, 42 15 
         C 52 2, 72 6, 78 18 
         C 90 14, 96 28, 88 38 
         C 96 50, 82 56, 72 52
         C 62 58, 32 58, 22 45 Z"
      {...strokeProps}
    />
  </svg>
);

// Precise wireframe networking globe
export const SketchGlobe: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" className="sketchy-path" {...props}>
    <circle cx="50" cy="50" r="42" {...strokeProps} />
    {/* Latitudes */}
    <path d="M 10 40 Q 50 25 90 40" {...strokeProps} />
    <path d="M 10 60 Q 50 75 90 60" {...strokeProps} />
    <path d="M 8 50 L 92 50" {...strokeProps} />
    {/* Longitudes */}
    <path d="M 50 8 Q 28 50 50 92" {...strokeProps} />
    <path d="M 50 8 Q 72 50 50 92" {...strokeProps} />
    <path d="M 50 8 L 50 92" {...strokeProps} />
  </svg>
);

// High-fidelity Kubernetes Steering Wheel (perfect geometry)
export const SketchKubernetes: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 120 120" className="sketchy-path" {...props}>
    <circle cx="60" cy="60" r="16" {...strokeProps} />
    {/* Outer heptagon wheel */}
    <path
      d="M 60 18 
         L 96 35 
         L 110 74 
         L 88 106 
         L 60 109 
         L 32 106 
         L 10 74 
         L 24 35 Z"
      {...strokeProps}
    />
    {/* Spokes */}
    <line x1="60" y1="44" x2="60" y2="18" {...strokeProps} />
    <line x1="71.5" y1="51" x2="96" y2="35" {...strokeProps} />
    <line x1="76" y1="60" x2="110" y2="74" {...strokeProps} />
    <line x1="69.5" y1="71" x2="88" y2="106" {...strokeProps} />
    <line x1="60" y1="76" x2="60" y2="109" {...strokeProps} />
    <line x1="50.5" y1="71" x2="32" y2="106" {...strokeProps} />
    <line x1="44" y1="60" x2="10" y2="74" {...strokeProps} />
    <line x1="48.5" y1="51" x2="24" y2="35" {...strokeProps} />
  </svg>
);

// Symmetrical math curve loop
export const SketchLoop: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 60 60" className="sketchy-path" {...props}>
    <path
      d="M 12 42 
         C 22 15, 38 15, 45 28 
         C 52 42, 42 55, 32 48 
         C 22 40, 15 20, 48 15"
      {...strokeProps}
    />
  </svg>
);

// Symmetrical clean star (asterisk)
export const SketchStar: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 40 40" className="sketchy-path" {...props}>
    <line x1="20" y1="6" x2="20" y2="34" {...strokeProps} />
    <line x1="6" y1="20" x2="34" y2="20" {...strokeProps} />
    <line x1="10" y1="10" x2="30" y2="30" {...strokeProps} />
    <line x1="30" y1="10" x2="10" y2="30" {...strokeProps} />
  </svg>
);

// Symmetrical clean Cross (X)
export const SketchCross: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 40 40" className="sketchy-path" {...props}>
    <line x1="12" y1="12" x2="28" y2="28" {...strokeProps} />
    <line x1="28" y1="12" x2="12" y2="28" {...strokeProps} />
  </svg>
);

// Symmetrical sharp square brackets
export const SketchBracketLeft: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 20 60" className="sketchy-path" {...props}>
    <path d="M 14 6 L 6 6 L 6 54 L 14 54" {...strokeProps} />
  </svg>
);

export const SketchBracketRight: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 20 60" className="sketchy-path" {...props}>
    <path d="M 6 6 L 14 6 L 14 54 L 6 54" {...strokeProps} />
  </svg>
);

// Symmetrical mathematical curly braces
export const SketchBraceLeft: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 25 60" className="sketchy-path" {...props}>
    <path
      d="M 18 6 
         Q 10 6 10 18 
         Q 10 27, 4 30 
         Q 10 33, 10 42 
         Q 10 54 18 54"
      {...strokeProps}
    />
  </svg>
);

export const SketchBraceRight: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 25 60" className="sketchy-path" {...props}>
    <path
      d="M 7 6 
         Q 15 6 17 18 
         Q 17 27, 23 30 
         Q 17 33, 17 42 
         Q 17 54 7 54"
      {...strokeProps}
    />
  </svg>
);

// Precise developer nodes (connected dots representing a team)
export const SketchPeople: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 80 50" className="sketchy-path" {...props}>
    {/* Node connections */}
    <line x1="22" y1="22" x2="40" y2="18" {...strokeProps} />
    <line x1="40" y1="18" x2="58" y2="22" {...strokeProps} />
    <line x1="22" y1="22" x2="58" y2="22" {...strokeProps} />
    
    {/* Center node */}
    <circle cx="40" cy="18" r="6" stroke="currentColor" strokeWidth="1.2" fill="#F8FAFC" />
    {/* Left node */}
    <circle cx="22" cy="22" r="5" stroke="currentColor" strokeWidth="1.2" fill="#F8FAFC" />
    {/* Right node */}
    <circle cx="58" cy="22" r="5" stroke="currentColor" strokeWidth="1.2" fill="#F8FAFC" />

    {/* Symmetrical base lines */}
    <path d="M 28 40 C 28 32, 34 28, 40 28 C 46 28, 52 32, 52 40" {...strokeProps} />
    <path d="M 12 42 C 12 35, 17 32, 22 32 C 27 32, 32 35, 32 42" {...strokeProps} />
    <path d="M 48 42 C 48 35, 53 32, 58 32 C 63 32, 68 35, 68 42" {...strokeProps} />
  </svg>
);

// Clean Flat Sun behind cloud weather icon
export const WeatherIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" {...props}>
    <defs>
      <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD54F" />
        <stop offset="100%" stopColor="#F57C00" />
      </linearGradient>
      <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E0F2F1" />
        <stop offset="50%" stopColor="#B2EBF2" />
        <stop offset="100%" stopColor="#4FC3F7" />
      </linearGradient>
    </defs>
    
    {/* Clean Sun */}
    <g transform="translate(-4, -4)">
      <circle cx="28" cy="28" r="10" fill="url(#sunGrad)" />
      {/* Symmetrical Rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <line
          key={i}
          x1="28"
          y1="12"
          x2="28"
          y2="6"
          stroke="#F57C00"
          strokeWidth="2.5"
          strokeLinecap="round"
          transform={`rotate(${angle} 28 28)`}
        />
      ))}
    </g>

    {/* Overlapping Cloud */}
    <path
      d="M 46 32 
         C 46 25, 39 20, 32 21 
         C 26 21, 21 26, 21 31 
         C 15 31, 11 36, 11 42 
         C 11 49, 17 53, 24 53 
         L 46 53 
         C 52 53, 57 48, 57 42 
         C 57 36, 52 32, 46 32 Z"
      fill="url(#cloudGrad)"
      stroke="#0288D1"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>
);

// Precise Vultr Logo
export const VultrLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" fill="currentColor" {...props}>
    {/* Vultr clean chevron vector geometry */}
    <path d="M 50 16 L 82 45 L 68 84 L 50 55 L 32 84 L 18 45 Z" />
    <path d="M 50 55 L 68 84 L 50 84 Z" opacity="0.12" fill="#000" />
    <path d="M 50 55 L 32 84 L 50 84 Z" opacity="0.25" fill="#000" />
  </svg>
);
