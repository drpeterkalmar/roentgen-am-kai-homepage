import React, { useEffect, useRef } from 'react';

const createParticle = (canvas, isDark) => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  size: Math.random() * 80 + 40,
  speedX: (Math.random() * 0.4) - 0.2,
  speedY: (Math.random() * 0.4) - 0.2,
  opacity: isDark ? (Math.random() * 0.2 + 0.1) : (Math.random() * 0.4 + 0.3),
  color: isDark ? '255, 255, 255' : '160, 160, 160',
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < -this.size) this.x = canvas.width + this.size;
    if (this.x > canvas.width + this.size) this.x = -this.size;
    if (this.y < -this.size) this.y = canvas.height + this.size;
    if (this.y > canvas.height + this.size) this.y = -this.size;
  },
  draw(ctx) {
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
    gradient.addColorStop(0, `rgba(${this.color}, ${this.opacity})`);
    gradient.addColorStop(1, `rgba(${this.color}, 0)`);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
});

// Dekorativer Hintergrund. Performance-Regeln:
//  * startet erst, wenn der Browser nach dem Laden Leerlauf hat (blockiert nicht den ersten Paint)
//  * pausiert, wenn der Tab nicht sichtbar ist (Akku/CPU)
//  * bei „Bewegung reduzieren“ nur ein statisches Bild, keine Animation
const ParticleBackground = ({ isDark }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrameId = null;
    let particlesArray = [];
    let started = false;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesArray = [];
      const numberOfParticles = window.innerWidth < 768 ? 10 : 25;
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(createParticle(canvas, isDark));
      }
    };

    const drawFrame = (move) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach(p => {
        if (move) p.update();
        p.draw(ctx);
      });
    };

    const animate = () => {
      drawFrame(true);
      animationFrameId = requestAnimationFrame(animate);
    };

    const stop = () => {
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    };

    const run = () => {
      stop();
      if (reduceMotion) {
        drawFrame(false);
      } else if (!document.hidden) {
        animate();
      }
    };

    const onResize = () => { if (started) { init(); run(); } };
    const onVisibility = () => { if (!started) return; document.hidden ? stop() : run(); };

    const start = () => {
      started = true;
      init();
      run();
    };

    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1200));
    const cancelIdle = window.cancelIdleCallback || clearTimeout;
    const idleId = idle(start, { timeout: 2500 });

    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelIdle(idleId);
      stop();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-[10]"
      style={{ opacity: isDark ? 0.4 : 0.8 }}
    />
  );
};

export default ParticleBackground;
