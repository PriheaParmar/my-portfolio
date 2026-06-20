import { useEffect, useRef } from 'react';

import '../../styles/ConstellationCursor.css';

const COLORS = {
  cursorGlow: 'rgba(255, 93, 148, 0.045)',
  dot: 'rgba(255, 255, 255, 0.58)',
  dotActive: 'rgba(255, 93, 148, 0.95)',
  dotSoft: 'rgba(190, 135, 255, 0.7)',
  line: 'rgb(255, 120, 170)',
  lineSoft: 'rgb(210, 170, 255)',
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function ConstellationCursor() {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;

    if (!canvas || !wrapper) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchPrimary = window.matchMedia('(pointer: coarse)').matches;

    if (prefersReducedMotion || isTouchPrimary) {
      wrapper.classList.add('constellation-cursor--disabled');
      return undefined;
    }

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return undefined;

    const isLowPowerDevice =
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
      (navigator.deviceMemory && navigator.deviceMemory <= 4);

    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      visible: false,
    };

    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles = [];
    let animationFrame = 0;
    let pointerFrame = 0;
    let resizeFrame = 0;
    let isPaused = document.hidden;
    let lastDrawTime = 0;

    const frameInterval = isLowPowerDevice ? 40 : 33;

    const lineDistance = isLowPowerDevice ? 70 : 76;
    const lineDistanceSquared = lineDistance * lineDistance;

    const activeDistance = isLowPowerDevice ? 120 : 140;
    const activeDistanceSquared = activeDistance * activeDistance;

    const maxLinesPerFrame = isLowPowerDevice ? 110 : 240;
    const maxCursorLines = isLowPowerDevice ? 8 : 14;

    const cellSize = lineDistance;

    const neighborCells = [
      [-1, -1],
      [0, -1],
      [1, -1],
      [-1, 0],
      [0, 0],
      [1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
    ];

    const getCellKey = (x, y) => `${Math.floor(x / cellSize)}:${Math.floor(y / cellSize)}`;

    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, isLowPowerDevice ? 1 : 1.2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const particleCount = isLowPowerDevice
        ? clamp(Math.round((width * height) / 33000), 30, 58)
        : clamp(Math.round((width * height) / 18500), 55, 115);

      particles = Array.from({ length: particleCount }, () => {
        const speed = 0.045 + Math.random() * 0.095;
        const angle = Math.random() * Math.PI * 2;

        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1 + Math.random() * 1.05,
          phase: Math.random() * Math.PI * 2,
        };
      });
    };

    const moveParticle = (particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.phase += 0.005;

      if (particle.x < -20) particle.x = width + 20;
      if (particle.x > width + 20) particle.x = -20;
      if (particle.y < -20) particle.y = height + 20;
      if (particle.y > height + 20) particle.y = -20;
    };

    const drawLine = (fromX, fromY, toX, toY, color, alpha) => {
      context.beginPath();
      context.moveTo(fromX, fromY);
      context.lineTo(toX, toY);
      context.strokeStyle = color;
      context.globalAlpha = alpha;
      context.lineWidth = 1;
      context.stroke();
      context.globalAlpha = 1;
    };

    const drawCursorGlow = () => {
      const glowRadius = isLowPowerDevice ? 115 : 145;

      const cursorGlow = context.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        glowRadius,
      );

      cursorGlow.addColorStop(0, COLORS.cursorGlow);
      cursorGlow.addColorStop(1, 'rgba(255, 93, 148, 0)');

      context.fillStyle = cursorGlow;
      context.fillRect(
        mouse.x - glowRadius,
        mouse.y - glowRadius,
        glowRadius * 2,
        glowRadius * 2,
      );
    };

    const buildParticleGrid = () => {
      const grid = new Map();

      particles.forEach((particle, index) => {
        moveParticle(particle);

        const key = getCellKey(particle.x, particle.y);
        const cellParticles = grid.get(key);

        if (cellParticles) {
          cellParticles.push(index);
        } else {
          grid.set(key, [index]);
        }
      });

      return grid;
    };

    const drawConstellationLines = (grid) => {
      let linesDrawn = 0;

      for (let i = 0; i < particles.length; i += 1) {
        if (linesDrawn >= maxLinesPerFrame) break;

        const first = particles[i];
        const cellX = Math.floor(first.x / cellSize);
        const cellY = Math.floor(first.y / cellSize);

        for (let n = 0; n < neighborCells.length; n += 1) {
          if (linesDrawn >= maxLinesPerFrame) break;

          const [offsetX, offsetY] = neighborCells[n];
          const nearbyParticles = grid.get(`${cellX + offsetX}:${cellY + offsetY}`);

          if (!nearbyParticles) continue;

          for (let p = 0; p < nearbyParticles.length; p += 1) {
            const secondIndex = nearbyParticles[p];

            if (secondIndex <= i) continue;

            const second = particles[secondIndex];
            const dx = first.x - second.x;
            const dy = first.y - second.y;
            const distanceSquared = dx * dx + dy * dy;

            if (distanceSquared < lineDistanceSquared) {
              const alpha = (1 - distanceSquared / lineDistanceSquared) * 0.14;

              drawLine(first.x, first.y, second.x, second.y, COLORS.lineSoft, alpha);
              linesDrawn += 1;

              if (linesDrawn >= maxLinesPerFrame) break;
            }
          }
        }
      }
    };

    const drawParticles = () => {
      let cursorLinesDrawn = 0;

      particles.forEach((particle) => {
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distanceSquared = dx * dx + dy * dy;
        const isActive = mouse.visible && distanceSquared < activeDistanceSquared;
        const twinkle = 0.9 + Math.sin(particle.phase) * 0.08;

        if (isActive && cursorLinesDrawn < maxCursorLines) {
          const alpha = (1 - distanceSquared / activeDistanceSquared) * 0.38;

          drawLine(mouse.x, mouse.y, particle.x, particle.y, COLORS.line, alpha);
          cursorLinesDrawn += 1;
        }

        context.beginPath();
        context.arc(
          particle.x,
          particle.y,
          isActive ? particle.size + 0.45 : particle.size,
          0,
          Math.PI * 2,
        );
        context.fillStyle = isActive ? COLORS.dotActive : COLORS.dot;
        context.globalAlpha = isActive ? 1 : twinkle;
        context.fill();
        context.globalAlpha = 1;

        if (isActive) {
          context.beginPath();
          context.arc(particle.x, particle.y, particle.size + 1.3, 0, Math.PI * 2);
          context.fillStyle = COLORS.dotSoft;
          context.globalAlpha = 0.12;
          context.fill();
          context.globalAlpha = 1;
        }
      });
    };

    const draw = (timestamp = 0) => {
      if (isPaused) return;

      if (timestamp - lastDrawTime < frameInterval) {
        animationFrame = requestAnimationFrame(draw);
        return;
      }

      lastDrawTime = timestamp;

      context.clearRect(0, 0, width, height);

      if (mouse.visible) {
        drawCursorGlow();
      }

      const grid = buildParticleGrid();

      drawConstellationLines(grid);
      drawParticles();

      animationFrame = requestAnimationFrame(draw);
    };

    const handlePointerMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.visible = true;

      if (pointerFrame) return;

      pointerFrame = requestAnimationFrame(() => {
        wrapper.style.setProperty('--constellation-x', `${mouse.x}px`);
        wrapper.style.setProperty('--constellation-y', `${mouse.y}px`);
        pointerFrame = 0;
      });
    };

    const handlePointerLeave = () => {
      mouse.visible = false;
    };

    const handleResize = () => {
      if (resizeFrame) return;

      resizeFrame = requestAnimationFrame(() => {
        setCanvasSize();
        resizeFrame = 0;
      });
    };

    const handleVisibilityChange = () => {
      isPaused = document.hidden;

      if (!isPaused) {
        lastDrawTime = 0;
        animationFrame = requestAnimationFrame(draw);
      }
    };

    setCanvasSize();
    animationFrame = requestAnimationFrame(draw);

    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isPaused = true;
      cancelAnimationFrame(animationFrame);
      cancelAnimationFrame(pointerFrame);
      cancelAnimationFrame(resizeFrame);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="constellation-cursor" ref={wrapperRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}

export default ConstellationCursor;