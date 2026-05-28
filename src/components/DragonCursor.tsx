import { useEffect, useRef } from "react";

class Particle {
  x: number; y: number; size: number; color: string;
  angle: number; speed: number; life: number;
  constructor(x: number, y: number, size: number, color: string) {
    this.x = x; this.y = y; this.size = size; this.color = color;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 2 + 1;
    this.life = 100;
  }
  update() {
    this.angle += 0.08;
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.life--;
    this.size *= 0.97;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(this.size * 4, this.size * 2, this.size * 8, 0);
    ctx.quadraticCurveTo(this.size * 4, -this.size * 2, 0, 0);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 20;
    ctx.fill();
    ctx.restore();
  }
}

const DragonCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const particles: Particle[] = [];
    let rafId = 0;

    const emitTrail = (x: number, y: number) => {
      for (let i = 0; i < 4; i++) {
        particles.push(new Particle(x, y, Math.random() * 4 + 2, "rgba(255,255,255,0.8)"));
      }
    };
    const emitBurst = (x: number, y: number) => {
      for (let i = 0; i < 30; i++) {
        particles.push(new Particle(x, y, Math.random() * 8 + 3, "rgba(255,255,255,1)"));
      }
    };

    const onMove = (e: MouseEvent) => emitTrail(e.clientX, e.clientY);
    const onClick = (e: MouseEvent) => emitBurst(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) emitTrail(t.clientX, t.clientY);
    };
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) emitBurst(t.clientX, t.clientY);
    };

    const animate = () => {
      ctx.fillStyle = "rgba(11,11,11,0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
        if (particles[i].life <= 0 || particles[i].size <= 0.2) {
          particles.splice(i, 1);
          i--;
        }
      }
      rafId = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[100] h-full w-full"
      aria-hidden="true"
    />
  );
};

export default DragonCursor;
