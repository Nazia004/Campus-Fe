import React, { useEffect, useState } from 'react';

export default function EclipseFollower() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
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
        zIndex: 10000,
        overflow: 'hidden',
        opacity: isActive ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '600px', // Wider glow
          height: '600px',
          background: 'radial-gradient(circle, rgba(201,162,39,0.18) 0%, rgba(201,162,39,0) 70%)',
          borderRadius: '50%',
          transform: `translate(calc(${position.x}px - 50%), calc(${position.y}px - 50%))`,
          transition: 'transform 0.12s ease-out',
          mixBlendMode: 'normal',
        }}
      />
    </div>
  );
}
