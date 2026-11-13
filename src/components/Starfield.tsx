import { useEffect, useRef } from 'react';

const TAU = Math.PI * 2;
const REACH = 170;
const LINK = 140;

interface Star { x: number; y: number; depth: number; radius: number; alpha: number; speed: number; phase: number; warm: boolean }

/** A fixed seed keeps the sky identical between visits and across resizes. */
function createStars(count: number): Star[] {
  let seed = 130203;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  return Array.from({ length: count }, () => ({
    x: random(),
    y: random(),
    depth: .25 + random() * .75,
    radius: .4 + random() * .9,
    alpha: .25 + random() * .5,
    speed: .0006 + random() * .0014,
    phase: random() * TAU,
    warm: random() < .16,
  }));
}

const allStars = createStars(170);

/**
 * The night sky behind the whole page. Stars drift with the scroll position,
 * and the ones near a mouse pointer join into a small constellation.
 * With reduced motion it paints one still frame and stops.
 */
export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const context = canvas.getContext('2d');
    if (!context) return;
    const motion = matchMedia('(prefers-reduced-motion: no-preference)');
    let width = 0;
    let height = 0;
    let count = 0;
    let frame = 0;
    let idle = 0;
    let pointerX = 0;
    let pointerY = 0;
    let power = 0;
    let target = 0;
    let meteor: { x: number; y: number; start: number } | null = null;
    let nextMeteor = performance.now() + 5000;

    function draw(time: number) {
      const animated = motion.matches;
      const offset = animated ? scrollY : 0;
      const near: { x: number; y: number; weight: number }[] = [];
      power += (target - power) * .08;
      context!.clearRect(0, 0, width, height);

      for (let i = 0; i < count; i++) {
        const star = allStars[i];
        const x = star.x * width;
        const y = (((star.y * height - offset * star.depth * .08) % height) + height) % height;
        let weight = 0;
        if (power > .01) {
          const distance = Math.hypot(x - pointerX, y - pointerY);
          if (distance < REACH) { weight = (1 - distance / REACH) * power; near.push({ x, y, weight }); }
        }
        const twinkle = animated ? .7 + .3 * Math.sin(time * star.speed + star.phase) : 1;
        context!.globalAlpha = Math.min(1, star.alpha * twinkle + weight * .6);
        context!.fillStyle = star.warm ? '#f8bb98' : '#b7cbea';
        context!.beginPath();
        context!.arc(x, y, star.radius + weight * .9, 0, TAU);
        context!.fill();
      }

      context!.strokeStyle = '#f8bb98';
      context!.lineWidth = .7;
      for (let a = 0; a < near.length; a++) {
        for (let b = a + 1; b < near.length; b++) {
          const distance = Math.hypot(near[a].x - near[b].x, near[a].y - near[b].y);
          if (distance > LINK) continue;
          context!.globalAlpha = Math.min(.6, near[a].weight * near[b].weight * (1 - distance / LINK) * 3);
          context!.beginPath();
          context!.moveTo(near[a].x, near[a].y);
          context!.lineTo(near[b].x, near[b].y);
          context!.stroke();
        }
      }

      if (animated) {
        if (!meteor && time > nextMeteor) meteor = { x: width * (.3 + Math.random() * .7), y: height * Math.random() * .35, start: time };
        if (meteor) {
          const life = (time - meteor.start) / 900;
          if (life >= 1) { meteor = null; nextMeteor = time + 7000 + Math.random() * 8000; }
          else {
            const headX = meteor.x - life * 330;
            const headY = meteor.y + life * 150;
            const tail = context!.createLinearGradient(headX, headY, headX + 110, headY - 50);
            tail.addColorStop(0, '#ffe1ce');
            tail.addColorStop(1, '#ffe1ce00');
            context!.globalAlpha = Math.sin(life * Math.PI) * .75;
            context!.strokeStyle = tail;
            context!.lineWidth = 1.1;
            context!.beginPath();
            context!.moveTo(headX, headY);
            context!.lineTo(headX + 110, headY - 50);
            context!.stroke();
          }
        }
      }
      context!.globalAlpha = 1;
    }

    function loop(time: number) {
      draw(time);
      frame = motion.matches && !document.hidden ? requestAnimationFrame(loop) : 0;
    }

    function start() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(loop);
    }

    function resize() {
      const ratio = Math.min(devicePixelRatio || 1, 2);
      width = innerWidth;
      height = innerHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context!.setTransform(ratio, 0, 0, ratio, 0, 0);
      count = Math.max(50, Math.min(allStars.length, Math.round(width * height / 9500)));
      start();
    }

    function move(event: PointerEvent) {
      if (event.pointerType !== 'mouse' || !motion.matches) return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      target = 1;
      clearTimeout(idle);
      idle = window.setTimeout(() => { target = 0; }, 1800);
    }

    function leave() { target = 0; }

    resize();
    addEventListener('resize', resize);
    addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    document.addEventListener('visibilitychange', start);
    motion.addEventListener('change', start);
    return () => {
      removeEventListener('resize', resize);
      removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
      document.removeEventListener('visibilitychange', start);
      motion.removeEventListener('change', start);
      cancelAnimationFrame(frame);
      clearTimeout(idle);
    };
  }, []);

  return <canvas ref={ref} className="starfield" aria-hidden="true" />;
}
