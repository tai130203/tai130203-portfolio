import type { PointerEvent } from 'react';

export function trackPointer(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== 'mouse' || !matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return;
  const element = event.currentTarget;
  const bounds = element.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width;
  const y = (event.clientY - bounds.top) / bounds.height;
  element.style.setProperty('--pointer-x', `${x * 100}%`);
  element.style.setProperty('--pointer-y', `${y * 100}%`);
  element.style.setProperty('--pointer-u', String(x - .5));
  element.style.setProperty('--pointer-v', String(y - .5));
}
