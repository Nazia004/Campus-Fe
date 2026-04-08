import React, { useEffect, useState } from 'react';

export default function EclipseFollower() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [isActive, setIsActive] = useState(false);

  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    // Check initial theme
    setIsLightMode(document.body.classList.contains('light'));

    // Observe theme changes
    const observer = new MutationObserver(() => {
      setIsLightMode(document.body.classList.contains('light'));
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isActive) setIsActive(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, [isActive]);

  // Use a more vivid/darker gold for light mode to ensure contrast
  const glowColor = isLightMode 
    ? 'rgba(166, 124, 0, 0.65)'  // Vivid Deep Gold for light theme
    : 'rgba(201, 162, 39, 0.4)'; // Luminous Gold for dark theme

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
          width: '150px',
          height: '150px',
          background: `radial-gradient(circle, ${glowColor} 0%, rgba(201,162,39,0) 70%)`,
          borderRadius: '50%',
          transform: `translate(calc(${position.x}px - 50%), calc(${position.y}px - 50%))`,
          transition: 'transform 0.1s ease-out',
          mixBlendMode: 'normal',
        }}
      />
    </div>
  );
}
