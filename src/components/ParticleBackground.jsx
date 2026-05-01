import React, { useEffect, useRef } from 'react';

const createParticle = (canvas, isDark) => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  size: Math.random() * 80 + 40,
  speedX: (Math.random() * 0.4) - 0.2,
  speedY: (Math.random() * 0.4) - 0.2,
  opacity: Math.random() * 0.2 + 0.1,
  color: isDark ? '255, 255, 255' : '139, 35, 35',
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

const ParticleBackground = ({ isDark }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particlesArray = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesArray = [];
      const numberOfParticles = window.innerWidth < 768 ? 12 : 25;
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(createParticle(canvas, isDark));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach(p => {
        p.update();
        p.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', init);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
      style={{ opacity: isDark ? 0.4 : 0.6 }}
    />
  );
};

export default ParticleBackground;
