import React, { useState } from 'react';
import FlutedGlassCanvas from './FlutedGlassCanvas';

interface FlutedGlassCardProps {
  children: React.ReactNode;
  className?: string;
  fluteDensity?: number;
  refractionStrength?: number;
  enableShader?: boolean;
}

export default function FlutedGlassCard({
  children,
  className = '',
  fluteDensity = 32.0,
  refractionStrength = 0.045,
  enableShader = true,
}: FlutedGlassCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-3xl p-[1px] overflow-hidden transition-all duration-300 ${
        isHovered
          ? 'shadow-[0_0_35px_rgba(34,211,238,0.25)] scale-[1.01]'
          : 'shadow-xl'
      } ${className}`}
    >
      {/* Dynamic Gradient Border Frame */}
      <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/60 via-cyan-400/40 to-lime-400/30 rounded-[inherit] pointer-events-none" />

      {/* Real-time WebGL Fluted Glass Shader Background Layer */}
      {enableShader && (
        <FlutedGlassCanvas
          fluteDensity={fluteDensity}
          refractionStrength={refractionStrength}
          className="opacity-45"
        />
      )}

      {/* Internal Content Container */}
      <div className="relative w-full h-full bg-[#0d0e14]/85 backdrop-blur-xl rounded-[calc(1.5rem-1px)] p-6 sm:p-8 z-10">
        {children}
      </div>
    </div>
  );
}
