import type { ReactNode } from 'react';

/** Line icons drawn on one 24-unit grid with one stroke, so every mark on the page matches. */
const line: Record<string, ReactNode> = {
  arrow: <path d="M7 17 17 7M8.5 7H17v8.5" />,
  up: <path d="M12 19V5M6 11l6-6 6 6" />,
  down: <path d="M12 5v14M6 13l6 6 6-6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M4 8.5h16M4 15.5h16" />,
  pin: <><path d="M12 21s-6.5-5.6-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21Z" /><circle cx="12" cy="10.5" r="2.3" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7.5 8 6 8-6" /></>,
  code: <path d="M8.5 7 3.5 12l5 5M15.5 7l5 5-5 5M13.5 5l-3 14" />,
  layout: <><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M3 9h18M9 9v11" /></>,
  route: <><circle cx="6" cy="18" r="2" /><circle cx="18" cy="5" r="2" /><path d="M8 18h6.5a3.25 3.25 0 0 0 0-6.5h-5a3.25 3.25 0 0 1 0-6.5H16" /></>,
  bridge: <path d="M3 17h18M6 17V7M18 17V7M6 8c2.5 5.5 9.5 5.5 12 0" />,
  braces: <path d="M8 4c-2 0-3 1-3 3v2.500c0 1.400-.8 2.500-2 2.500 1.200 0 2 1.100 2 2.500V17c0 2 1 3 3 3M16 4c2 0 3 1 3 3v2.500c0 1.400.8 2.500 2 2.500-1.200 0-2 1.100-2 2.500V17c0 2-1 3-3 3" />,
  data: <><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v12c0 1.700 3.100 3 7 3s7-1.300 7-3V6M5 12c0 1.700 3.100 3 7 3s7-1.300 7-3" /></>,
  branch: <><circle cx="6" cy="18.500" r="2.300" /><circle cx="18" cy="6.500" r="2.300" /><path d="M6 4v12M18 9a9 9 0 0 1-9 9" /></>,
  loader: <path d="M12 3a9 9 0 1 0 9 9" />,
};

/** Solid marks: the brand logos and the two shapes that read better filled. */
const solid: Record<string, string> = {
  spark: 'M12 2c.6 5.200 4.800 9.400 10 10-5.200.6-9.400 4.800-10 10-.6-5.200-4.800-9.400-10-10 5.200-.6 9.400-4.800 10-10Z',
  play: 'M8 5.500v13l11-6.500Z',
  github: 'M12 .297c-6.630 0-12 5.373-12 12 0 5.303 3.438 9.800 8.205 11.385.6.113.820-.258.820-.577 0-.285-.010-1.040-.015-2.040-3.338.724-4.042-1.610-4.042-1.610C4.422 18.070 3.633 17.700 3.633 17.700c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.070 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.760-1.605-2.665-.300-5.466-1.332-5.466-5.930 0-1.310.465-2.380 1.235-3.220-.135-.303-.540-1.523.105-3.176 0 0 1.005-.322 3.300 1.230.960-.267 1.980-.399 3-.405 1.020.006 2.040.138 3 .405 2.280-1.552 3.285-1.230 3.285-1.230.645 1.653.240 2.873.120 3.176.765.840 1.230 1.910 1.230 3.220 0 4.610-2.805 5.625-5.475 5.920.420.360.810 1.096.810 2.220 0 1.606-.015 2.896-.015 3.286 0 .315.210.690.825.570C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.900 1.637-1.850 3.370-1.850 3.601 0 4.267 2.370 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.920-2.063 2.063-2.063 1.140 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.200 24 24 23.227 24 22.271V1.729C24 .774 23.200 0 22.222 0h.003z',
};

export type IconName = keyof typeof line | keyof typeof solid;

export default function Icon({ name }: { name: string }) {
  return name in solid
    ? <svg className={`icon icon-${name}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={solid[name]} /></svg>
    : <svg className={`icon icon-${name}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{line[name]}</svg>;
}
