
import { useEffect, useRef } from 'react';

interface GradientBlobProps {
  className?: string;
}

const GradientBlob = ({ className = '' }: GradientBlobProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Blob parameters
    const blobs = [
      { x: 0.3, y: 0.5, radius: 0.3, speed: 0.001, color: '#3B82F6' }, // Blue
      { x: 0.7, y: 0.6, radius: 0.25, speed: 0.0015, color: '#8B5CF6' }, // Purple
      { x: 0.5, y: 0.4, radius: 0.2, speed: 0.002, color: '#10B981' } // Green
    ];
    
    let time = 0;
    
    // Animation loop
    const animate = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      
      // Draw each blob
      blobs.forEach(blob => {
        const x = width * (blob.x + Math.sin(time * blob.speed * 10) * 0.05);
        const y = height * (blob.y + Math.cos(time * blob.speed * 10) * 0.05);
        const radius = Math.min(width, height) * (blob.radius + Math.sin(time * blob.speed) * 0.02);
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `${blob.color}80`); // Semi-transparent
        gradient.addColorStop(1, `${blob.color}00`); // Transparent
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      time += 1;
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full -z-10 ${className}`}
    />
  );
};

export default GradientBlob;
