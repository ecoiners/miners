import { useEffect, useRef } from 'react';

const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    // Particle types
    type ParticleType = 'coin' | 'bubble';

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      type: ParticleType;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      pulseSpeed: number;
      pulseOffset: number;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 4 + 2;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.type = Math.random() > 0.5 ? 'coin' : 'bubble';
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.opacity = Math.random() * 0.6 + 0.4;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulseOffset = Math.random() * Math.PI * 2;
        
        // Colors based on type
        if (this.type === 'coin') {
          // Solana coin colors (golden/yellow)
          const coinColors = [
            'rgba(255, 215, 0, 0.8)',    // Gold
            'rgba(255, 193, 7, 0.8)',    // Amber
            'rgba(255, 174, 0, 0.8)',    // Orange
            'rgba(255, 202, 40, 0.8)'    // Light gold
          ];
          this.color = coinColors[Math.floor(Math.random() * coinColors.length)];
        } else {
          // Bubble colors (bluish/teal)
          const bubbleColors = [
            'rgba(0, 255, 171, 0.6)',    // Green
            'rgba(0, 212, 255, 0.6)',    // Teal
            'rgba(20, 184, 166, 0.6)',   // Emerald
            'rgba(14, 165, 233, 0.6)',   // Blue
            'rgba(139, 92, 246, 0.6)'    // Purple
          ];
          this.color = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
        }
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        
        // Pulsing effect
        this.opacity = 0.4 + Math.sin(Date.now() * this.pulseSpeed + this.pulseOffset) * 0.3;

        // Boundary check dengan wrapping
        if (this.x > canvasWidth + this.size) this.x = -this.size;
        else if (this.x < -this.size) this.x = canvasWidth + this.size;
        if (this.y > canvasHeight + this.size) this.y = -this.size;
        else if (this.y < -this.size) this.y = canvasHeight + this.size;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        if (this.type === 'coin') {
          this.drawCoin(ctx);
        } else {
          this.drawBubble(ctx);
        }
        
        ctx.restore();
      }

      drawCoin(ctx: CanvasRenderingContext2D) {
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Coin body
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Coin shine
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(-this.size * 0.3, -this.size * 0.3, this.size * 0.4, 0, Math.PI * 2);
        ctx.fill();
        
        // Coin edge
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.stroke();
        
        // Dollar sign untuk beberapa coin
        if (this.size > 3) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.font = `${this.size * 0.8}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('$', 0, 0);
        }
      }

      drawBubble(ctx: CanvasRenderingContext2D) {
        // Bubble body
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Bubble highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(this.x - this.size * 0.3, this.y - this.size * 0.3, this.size * 0.4, 0, Math.PI * 2);
        ctx.fill();
        
        // Bubble outline
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.stroke();
        
        // Sparkle effect untuk beberapa bubble
        if (Math.random() > 0.7) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.beginPath();
          ctx.arc(this.x + this.size * 0.6, this.y - this.size * 0.6, this.size * 0.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Create particles
    const particles: Particle[] = [];
    const particleCount = Math.min(150, Math.floor(window.innerWidth / 8));

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    // Mouse interaction
    const mouse = {
      x: 0,
      y: 0,
      radius: 100
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    // Connect particles with lines
    const connectParticles = () => {
      const maxDistance = 150;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            ctx.strokeStyle = `rgba(100, 200, 255, ${opacity * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
        
        // Mouse interaction
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy);
        
        if (distance < mouse.radius) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / mouse.radius)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    };

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Clear with semi-transparent for trail effect
      ctx.fillStyle = 'rgba(15, 23, 42, 0.05)'; // slate-900
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });
      
      // Connect particles
      connectParticles();

      requestAnimationFrame(animate);
    };

    animate();

    // Event listeners
    window.addEventListener('resize', setCanvasSize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
};

export default Particles;
