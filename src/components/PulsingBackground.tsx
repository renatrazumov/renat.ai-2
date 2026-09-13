
import type { ReactNode } from 'react';

interface PulsingBackgroundProps {
  children: ReactNode;
  color?: string;
}

export function PulsingBackground({ children, color = '#00FFB2' }: PulsingBackgroundProps) {
  return (
    <div className="relative">
      <div className="relative">
        <div
          className="absolute -inset-3 rounded-full animate-pulse"
          style={{
            background: `radial-gradient(circle, ${color}33 0%, ${color}00 70%)`,
          }}
        />
        {children}
      </div>
    </div>
  );
}