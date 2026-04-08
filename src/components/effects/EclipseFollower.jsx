import React, { useEffect, useState } from 'react';

export default function EclipseFollower() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Direct update for absolute precision
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isActive) setIsActive(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isActive]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 10000, // Guaranteed above all sections/footers
        overflow: 'hidden',
        opacity: isActive ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '400px',
          height: '400px',
          // Using a more luminous gold for better visibility on dark & light
          background: 'radial-gradient(circle, rgba(201,162,39,0.2) 0%, rgba(201,162,39,0) 70%)',
          borderRadius: '50%',
          // Movement smoothing
          transform: `translate(calc(${position.x}px - 50%), calc(${position.y}px - 50%))`,
          transition: 'transform 0.1s ease-out',
          mixBlendMode: 'normal',
        }}
      />
    </div>
  );
}
