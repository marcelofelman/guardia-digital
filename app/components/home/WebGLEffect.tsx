"use client";

import React, { useRef, useEffect, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

const WebGLEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isClient] = useState(true);

  useEffect(() => {
    if (!isClient || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Partículas de humo
    const particles: Particle[] = [];
    const particleCount = 180;

    // Inicializar partículas distribuidas por todo el canvas
    const initParticles = () => {
      particles.length = 10;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 20.5,
          vy: Math.random() * 0.3 - 0.1,
          life: Math.random(),
          maxLife: 2,
          size: Math.random() * 80 + 40,
        });
      }
    };

    // Ajustar tamaño del canvas al contenedor
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      // Reinicializar partículas cuando cambie el tamaño
      initParticles();
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // También ajustar cuando cambie el tamaño del contenedor
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(canvas);

    // Mouse tracking relativo al canvas
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Función de animación
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Influencia del mouse
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - distance / 200) * 0.3;

        particle.vx += (dx * influence - particle.vx) * 0.05;
        particle.vy += (dy * influence - particle.vy) * 0.05;

        // Actualizar posición
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Turbulencia suave
        particle.vx += (Math.random() - 0.5) * 0.1;
        particle.vy += (Math.random() - 0.5) * 0.1;

        // Limitar velocidad
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Actualizar vida
        particle.life -= 0.005;

        // Renacer partícula si está muerta
        if (particle.life <= 0) {
          particle.life = particle.maxLife;
          particle.x = Math.random() * canvas.width;
          particle.y = canvas.height + Math.random() * 100;
          particle.vx = (Math.random() - 0.5) * 0.5;
          particle.vy = -Math.random() * 0.3 - 0.1;
          particle.size = Math.random() * 60 + 40;
        }

        // Dibujar partícula de humo con gradiente radial
        const alpha = (particle.life / particle.maxLife) * 0.15;
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(200, 200, 255, ${alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(150, 150, 200, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isClient]);

  if (!isClient) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
      style={{ mixBlendMode: "screen", width: "100%", height: "100%" }}
    />
  );
};

export default WebGLEffect;
