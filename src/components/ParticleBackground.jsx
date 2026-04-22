import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: null, y: null, radius: 180 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const handleMouseMove = (event) => {
      mouse.current.x = event.x;
      mouse.current.y = event.y;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Particle Class
    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.02 + Math.random() * 0.03;
      }

      draw() {
        // Pulse opacity
        const opacity = 0.1 + Math.abs(Math.sin(this.pulse)) * 0.15;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        
        // Outlined circles (Kreise statt Punkte)
        ctx.strokeStyle = `rgba(139, 35, 35, ${opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        // Very subtle core
        ctx.fillStyle = `rgba(139, 35, 35, ${opacity * 0.3})`;
        ctx.fill();
      }

      update() {
        this.pulse += this.pulseSpeed;

        // Move particle
        this.x += this.directionX;
        this.y += this.directionY;

        // Bounce off edges with margin
        const margin = 50;
        if (this.x > canvas.width + margin) this.x = -margin;
        if (this.x < -margin) this.x = canvas.width + margin;
        if (this.y > canvas.height + margin) this.y = -margin;
        if (this.y < -margin) this.y = canvas.height + margin;

        // Smooth Mouse interaction (Swinging effect)
        let dx = mouse.current.x - this.x;
        let dy = mouse.current.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.current.radius) {
          const force = (mouse.current.radius - distance) / mouse.current.radius;
          const angle = Math.atan2(dy, dx);
          const pushX = Math.cos(angle) * force * 1.5;
          const pushY = Math.sin(angle) * force * 1.5;
          
          this.x -= pushX;
          this.y -= pushY;
        }

        this.draw();
      }
    }

    let particlesArray = [];
    const init = () => {
      particlesArray = [];
      let densityDivider = window.innerWidth < 768 ? 30000 : 20000;
      let numberOfParticles = (canvas.height * canvas.width) / densityDivider;
      if (numberOfParticles > 120) numberOfParticles = 120; 

      for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 3 + 2.5;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let directionX = (Math.random() * 0.3) - 0.15;
        let directionY = (Math.random() * 0.3) - 0.15;
        let color = 'rgba(139, 35, 35, 0.12)';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
      }
    };

    const connect = () => {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let dx = particlesArray[a].x - particlesArray[b].x;
          let dy = particlesArray[a].y - particlesArray[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 180) {
            let opacity = 1 - (distance / 180);
            ctx.strokeStyle = `rgba(139, 35, 35, ${opacity * 0.12})`;
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            
            // Draw Quadratic Curves instead of straight lines
            const midX = (particlesArray[a].x + particlesArray[b].x) / 2;
            const midY = (particlesArray[a].y + particlesArray[b].y) / 2;
            
            // Control point based on a subtle offset to create the curve
            const ctrlX = midX + (Math.cos(particlesArray[a].pulse) * 15);
            const ctrlY = midY + (Math.sin(particlesArray[b].pulse) * 15);
            
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.quadraticCurveTo(ctrlX, ctrlY, particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
      style={{ background: 'transparent', opacity: 0.8 }}
    />
  );
};
export default ParticleBackground;
