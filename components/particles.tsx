"use client";

import { useEffect, useRef, useState } from 'react';

export default function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

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

    // Particle class dengan efek koin/token
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      originalSize: number;
      pulseSpeed: number;
      pulseOffset: number;
      rotation: number;
      rotationSpeed: number;
      canvasWidth: number;
      canvasHeight: number;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.originalSize = Math.random() * 4 + 2;
        this.size = this.originalSize;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * 1.5 - 0.75;
        this.pulseSpeed = Math.random() * 0.05 + 0.02;
        this.pulseOffset = Math.random() * Math.PI * 2;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = Math.random() * 0.03 - 0.015;
        
        // Solana colors dengan variasi
        const colors = [
          'rgba(0, 255, 163, 0.8)',  // Bright Green
          'rgba(0, 229, 255, 0.8)',  // Cyan
          'rgba(20, 184, 166, 0.8)', // Emerald
          'rgba(14, 165, 233, 0.8)', // Sky Blue
          'rgba(139, 92, 246, 0.8)', // Purple
          'rgba(236, 72, 153, 0.8)'  // Pink
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Pulsating effect
        this.size = this.originalSize + Math.sin(Date.now() * this.pulseSpeed + this.pulseOffset) * 1;
        
        // Rotation
        this.rotation += this.rotationSpeed;

        // Boundary check dengan wrap-around
        if (this.x > this.canvasWidth + 50) this.x = -50;
        else if (this.x < -50) this.x = this.canvasWidth + 50;
        if (this.y > this.canvasHeight + 50) this.y = -50;
        else if (this.y < -50) this.y = this.canvasHeight + 50;
      }

      draw() {
        if (!ctx) return;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // Outer glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;

        // Draw coin/token shape (hexagon atau circle dengan detail)
        if (Math.random() > 0.3) {
          // Coin style (circle dengan inner circle)
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fill();

          // Inner circle untuk efek koin
          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Token style (hexagon)
          ctx.fillStyle = this.color;
          ctx.beginPath();
          const sides = 6;
          for (let i = 0; i < sides; i++) {
            const angle = (i * 2 * Math.PI) / sides;
            const x = Math.cos(angle) * this.size;
            const y = Math.sin(angle) * this.size;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();

          // Inner hexagon
          ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (i * 2 * Math.PI) / 6;
            const x = Math.cos(angle) * (this.size * 0.6);
            const y = Math.sin(angle) * (this.size * 0.6);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      }
    }

    // Connection lines class
    class Connection {
      particle1: Particle;
      particle2: Particle;
      length: number;
      opacity: number;

      constructor(p1: Particle, p2: Particle) {
        this.particle1 = p1;
        this.particle2 = p2;
        this.length = Math.sqrt(
          Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
        );
        this.opacity = 0;
      }

      update() {
        const currentLength = Math.sqrt(
          Math.pow(this.particle2.x - this.particle1.x, 2) + 
          Math.pow(this.particle2.y - this.particle1.y, 2)
        );
        
        // Update opacity based on distance
        if (currentLength < 150) {
          this.opacity = 1 - (currentLength / 150);
        } else {
          this.opacity = 0;
        }
      }

      draw() {
        if (!ctx || this.opacity === 0) return;

        const gradient = ctx.createLinearGradient(
          this.particle1.x, this.particle1.y,
          this.particle2.x, this.particle2.y
        );
        
        gradient.addColorStop(0, `${this.particle1.color.replace('0.8', this.opacity.toString())}`);
        gradient.addColorStop(1, `${this.particle2.color.replace('0.8', this.opacity.toString())}`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.particle1.x, this.particle1.y);
        ctx.lineTo(this.particle2.x, this.particle2.y);
        ctx.stroke();
      }
    }

    // Create particles
    let particles: Particle[] = [];
    let connections: Connection[] = [];

    const initParticles = () => {
      particles = [];
      connections = [];
      
      const particleCount = Math.min(80, Math.floor(canvas.width / 15));

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }

      // Create connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const distance = Math.sqrt(
            Math.pow(particles[j].x - particles[i].x, 2) + 
            Math.pow(particles[j].y - particles[i].y, 2)
          );
          if (distance < 150) {
            connections.push(new Connection(particles[i], particles[j]));
          }
        }
      }
    };

    initParticles();

    // Animation loop
    let animationFrameId: number;

    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Clear with semi-transparent for trail effect
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Reset shadow
      ctx.shadowBlur = 0;

      // Update and draw connections first
      connections.forEach(connection => {
        connection.update();
        connection.draw();
      });

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!canvas) return;
      setCanvasSize();
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isClient]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}
