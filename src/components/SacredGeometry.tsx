interface PatternProps {
  id: string;
  scale?: number;
  opacity?: number;
  animationDelay?: number;
  rotation?: number;
}

const SeedOfLife = ({ id, scale = 1, opacity = 0.03, animationDelay = 0, rotation = 0 }: PatternProps) => (
  <pattern id={id} x="0" y="0" width={300 * scale} height={300 * scale} patternUnits="userSpaceOnUse">
    <g transform={`rotate(${rotation}, ${150 * scale}, ${150 * scale})`}>
    <circle 
      cx={150 * scale} 
      cy={150 * scale} 
      r={30 * scale} 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={0.5 * scale}
      className="animate-sacred-fade"
      style={{ animationDelay: `${animationDelay}ms` }}
    />
    {[0, 60, 120, 180, 240, 300].map((angle) => (
      <circle
        key={angle}
        cx={150 * scale + 30 * scale * Math.cos((angle * Math.PI) / 180)}
        cy={150 * scale + 30 * scale * Math.sin((angle * Math.PI) / 180)}
        r={30 * scale}
        fill="none"
        stroke="currentColor"
        strokeWidth={0.5 * scale}
        className="animate-sacred-fade"
        style={{ animationDelay: `${angle * 10 + animationDelay}ms` }}
        opacity={opacity}
      />
    ))}
    </g>
  </pattern>
);

const Metatron = ({ id, scale = 1, opacity = 0.03, animationDelay = 0, rotation = 0 }: PatternProps) => (
  <pattern id={id} x="0" y="0" width={400 * scale} height={400 * scale} patternUnits="userSpaceOnUse">
    <g transform={`rotate(${rotation}, ${200 * scale}, ${200 * scale})`}>
    {/* Center hexagon */}
    <path
      d={`M${200 * scale},${150 * scale} 
         L${250 * scale},${175 * scale} 
         L${250 * scale},${225 * scale} 
         L${200 * scale},${250 * scale} 
         L${150 * scale},${225 * scale} 
         L${150 * scale},${175 * scale}Z`}
      fill="none"
      stroke="currentColor"
      strokeWidth={0.5 * scale}
      className="animate-sacred-fade"
      style={{ animationDelay: `${animationDelay}ms` }}
      opacity={opacity}
    />
    {/* Surrounding triangles */}
    {[0, 60, 120, 180, 240, 300].map((angle) => (
      <path
        key={angle}
        d={`M${200 * scale},${150 * scale} 
           L${200 * scale + 50 * scale * Math.cos((angle * Math.PI) / 180)},
            ${150 * scale + 50 * scale * Math.sin((angle * Math.PI) / 180)} 
           L${200 * scale + 50 * scale * Math.cos(((angle + 60) * Math.PI) / 180)},
            ${150 * scale + 50 * scale * Math.sin(((angle + 60) * Math.PI) / 180)}Z`}
        fill="none"
        stroke="currentColor"
        strokeWidth={0.5 * scale}
        className="animate-sacred-fade"
        style={{ animationDelay: `${angle * 10 + animationDelay}ms` }}
        opacity={opacity}
      />
    ))}
    </g>
  </pattern>
);

const FlowerOfLife = ({ id, scale = 1, opacity = 0.03, animationDelay = 0, rotation = 0 }: PatternProps) => (
  <pattern id={id} x="0" y="0" width={200 * scale} height={200 * scale} patternUnits="userSpaceOnUse">
    <g transform={`rotate(${rotation}, ${100 * scale}, ${100 * scale})`}>
    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
      <g key={angle}>
        <circle
          cx={100 * scale + 25 * scale * Math.cos((angle * Math.PI) / 180)}
          cy={100 * scale + 25 * scale * Math.sin((angle * Math.PI) / 180)}
          r={25 * scale}
          fill="none"
          stroke="currentColor"
          strokeWidth={0.5 * scale}
          className="animate-sacred-fade"
          style={{ animationDelay: `${i * 100 + animationDelay}ms` }}
          opacity={opacity}
        />
      </g>
    ))}
    </g>
  </pattern>
);

const Vesica = ({ id, scale = 1, opacity = 0.03, animationDelay = 0, rotation = 0 }: PatternProps) => (
  <pattern id={id} x="0" y="0" width={200 * scale} height={200 * scale} patternUnits="userSpaceOnUse">
    <g transform={`rotate(${rotation}, ${100 * scale}, ${100 * scale})`}>
      <circle
        cx={85 * scale}
        cy={100 * scale}
        r={40 * scale}
        fill="none"
        stroke="currentColor"
        strokeWidth={0.5 * scale}
        className="animate-sacred-fade"
        style={{ animationDelay: `${animationDelay}ms` }}
        opacity={opacity}
      />
      <circle
        cx={115 * scale}
        cy={100 * scale}
        r={40 * scale}
        fill="none"
        stroke="currentColor"
        strokeWidth={0.5 * scale}
        className="animate-sacred-fade"
        style={{ animationDelay: `${animationDelay + 100}ms` }}
        opacity={opacity}
      />
    </g>
  </pattern>
);

export function SacredGeometry() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full animate-space-move" preserveAspectRatio="xMidYMid slice" style={{ perspective: '1000px' }}>
        <defs>
          <SeedOfLife id="seedOfLife1" scale={1.89} opacity={0.008} rotation={0} />
          <Metatron id="metatron1" scale={1.13} opacity={0.006} animationDelay={1000} rotation={30} />
          <FlowerOfLife id="flowerOfLife1" scale={0.55} opacity={0.008} animationDelay={2000} rotation={15} />
          <Vesica id="vesica1" scale={0.89} opacity={0.008} animationDelay={1500} rotation={45} />
        </defs>
        
        {/* Staggered layers with different positions */}
        <rect width="100%" height="100%" fill="url(#seedOfLife1)" className="mix-blend-screen" transform="translate(89, 144) scale(0.95)" />
        
        <rect width="100%" height="100%" fill="url(#metatron1)" className="mix-blend-screen" transform="translate(34, 55) scale(0.9)" />
        
        <rect width="100%" height="100%" fill="url(#flowerOfLife1)" className="mix-blend-screen" transform="translate(-55, -89)" />
        
        <rect width="100%" height="100%" fill="url(#vesica1)" className="mix-blend-screen" transform="translate(144, -34) scale(0.85)" />
      </svg>
    </div>
  );
}