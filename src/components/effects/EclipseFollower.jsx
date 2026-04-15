import React, { useEffect, useRef, useState } from 'react';

export default function EclipseFollower() {
  const followerRef = useRef(null);
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
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
      }
      if (!isActive) setIsActive(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, [isActive]);

  const glowColor = isLightMode 
    ? 'rgba(166, 124, 0, 0.45)'
    : 'rgba(201, 162, 39, 0.25)';

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
        ref={followerRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '150px',
          height: '150px',
          background: `radial-gradient(circle, ${glowColor} 0%, rgba(201,162,39,0) 70%)`,
          borderRadius: '50%',
          transform: 'translate(-1000px, -1000px)',
          transition: 'transform 0.15s ease-out',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
