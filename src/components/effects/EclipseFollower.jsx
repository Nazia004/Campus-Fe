import React, { useEffect, useState } from 'react';

export default function EclipseFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Small delay/smoothing can be added here if needed, 
      // but standard state update is usually fine for these backdrop glows.
      setPosition({ x: e.clientX, y: e.clientY });
      if (opacity === 0) setOpacity(0.18); // Moderate opacity
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [opacity]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 5, // Higher than basics but below interactive content
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: `${position.y}px`,
          left: `${position.x}px`,
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(201,162,39,0.3) 0%, rgba(201,162,39,0) 70%)',
          transform: 'translate(-50%, -50%)',
          opacity: opacity,
          transition: 'opacity 1s ease',
          mixBlendMode: 'multiply', // Guarantees visibility on light backgrounds
        }}
      />
    </div>
  );
}
