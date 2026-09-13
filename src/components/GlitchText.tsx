interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className = '' }: GlitchTextProps) {
  return (
    <div className={`relative inline-block group ${className}`}>
      <span className="relative inline-block text-[#00FFB2]">
        {/* Original text */}
        <span className="relative z-10 mix-blend-screen">{text}</span>
        
        {/* Glitch layers */}
        <span 
          className="absolute inset-0 block text-[#FF00FF] animate-glitch1 z-0 opacity-70 group-hover:opacity-90"
          style={{ 
            clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
            textShadow: '2px 0 #FF00FF, -2px 0 #00FFFF',
          }}
          aria-hidden="true"
        >
          {text}
        </span>
        <span 
          className="absolute inset-0 block text-[#00FFFF] animate-glitch2 z-0 opacity-70 group-hover:opacity-90"
          style={{ 
            clipPath: 'polygon(0 80%, 100% 20%, 100% 100%, 0 100%)',
            textShadow: '-2px 0 #FF00FF, 2px 0 #00FFFF',
          }}
          aria-hidden="true"
        >
          {text}
        </span>
        <span 
          className="absolute inset-0 block text-[#00FFB2] animate-glitch3 z-0 opacity-0 group-hover:opacity-50"
          style={{ 
            clipPath: 'polygon(0 40%, 100% 40%, 100% 75%, 0 75%)',
            textShadow: '1px 1px #FF00FF, -1px -1px #00FFFF',
          }}
          aria-hidden="true"
        >
          {text}
        </span>
      </span>
    </div>
  );
}