import { waypoints } from '../content/portfolio';

const STEP = 40;
const points = waypoints.map((_, i) => ({ x: i % 2 ? 24 : 10, y: 10 + i * STEP }));
const height = points[points.length - 1].y + 10;
const line = points.map(point => `${point.x},${point.y}`).join(' ');

/** The page drawn as a constellation: one star per section, joined as the visitor travels down. */
export default function JourneyRail({ active }: { active: string }) {
  const index = Math.max(0, waypoints.findIndex(waypoint => waypoint.id === active));
  return <nav className="journey" aria-label="Section map" style={{ height }}>
    <svg viewBox={`0 0 34 ${height}`} aria-hidden="true">
      <polyline points={line} />
      <polyline className="journey-lit" points={line} pathLength={1} style={{ strokeDashoffset: 1 - index / (waypoints.length - 1) }} />
    </svg>
    <ol>
      {waypoints.map((waypoint, i) => <li key={waypoint.id} style={{ left: points[i].x, top: points[i].y }}>
        <a href={`#${waypoint.id}`} className={i <= index ? 'passed' : ''} aria-current={i === index ? 'location' : undefined}>
          <span className="journey-star" aria-hidden="true" />
          <span className="journey-label">{waypoint.label}</span>
        </a>
      </li>)}
    </ol>
  </nav>;
}
