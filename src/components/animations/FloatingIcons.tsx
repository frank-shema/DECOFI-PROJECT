
import { useEffect, useState } from 'react';

interface FloatingIcon {
  id: number;
  icon: string;
  size: number;
  x: number;
  y: number;
  speed: number;
  delay: number;
}

const icons = [
  '💰', '🏦', '📊', '🔄', '🌱', '🔐', '🤝', '📱', '💳', '📝', '🏆', '⚖️', '🔍'
];

const FloatingIcons = () => {
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([]);

  useEffect(() => {
    // Create random floating icons
    const newIcons: FloatingIcon[] = [];
    
    for (let i = 0; i < 13; i++) {
      newIcons.push({
        id: i,
        icon: icons[i],
        size: Math.random() * 20 + 16, // 16-36px
        x: Math.random() * 100,
        y: Math.random() * 100,
        speed: Math.random() * 8 + 12, // 12-20s
        delay: Math.random() * 5 // 0-5s delay
      });
    }
    
    setFloatingIcons(newIcons);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-30">
      {floatingIcons.map(icon => (
        <div
          key={icon.id}
          className="absolute animate-float"
          style={{
            fontSize: `${icon.size}px`,
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            animationDuration: `${icon.speed}s`,
            animationDelay: `${icon.delay}s`,
          }}
        >
          {icon.icon}
        </div>
      ))}
    </div>
  );
};

export default FloatingIcons;
