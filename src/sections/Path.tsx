import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { projects, stations, type Project } from '../content/portfolio';

const last = stations.length - 1;

/** One request, followed through every layer, with the project that backs each stop. */
export default function Path({ onSelect }: { onSelect: (project: Project) => void }) {
  const [active, setActive] = useState(0);
  const [tracing, setTracing] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const station = stations[active];
  const project = projects.find(item => item.id === station.project);

  useEffect(() => {
    if (!tracing) return;
    const timer = setTimeout(() => {
      if (active === last) setTracing(false);
      else setActive(active + 1);
    }, 1200);
    return () => clearTimeout(timer);
  }, [tracing, active]);

  function choose(index: number) {
    setTracing(false);
    setActive(index);
  }

  function onKeyDown(event: KeyboardEvent) {
    const next = { ArrowRight: Math.min(last, active + 1), ArrowLeft: Math.max(0, active - 1), Home: 0, End: last }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    choose(next);
    tabs.current[next]?.focus();
  }

  return <section className="section path" id="path" aria-labelledby="path-title">
    <div className="section-heading reveal">
      <div><p className="eyebrow">02 / THE PATH OF A REQUEST</p><h2 id="path-title">One click. <em>Five stops.</em></h2></div>
      <p>Follow a request from screen to database.<br /><span className="muted">Each stop shows what I’ve built there so far.</span></p>
    </div>
    <div className="trace reveal" style={{ '--trace': active / last } as CSSProperties}>
      <div className="trace-track" role="tablist" aria-label="Layers of a request" onKeyDown={onKeyDown}>
        <span className="trace-line" aria-hidden="true"><i /></span>
        {stations.map((item, i) => <button
          key={item.id}
          ref={element => { tabs.current[i] = element; }}
          role="tab"
          id={`station-${item.id}`}
          aria-selected={i === active}
          aria-controls="station-panel"
          tabIndex={i === active ? 0 : -1}
          className={`station ${item.status} ${i <= active ? 'reached' : ''}`}
          onClick={() => choose(i)}
        >
          <span className="station-node" aria-hidden="true">{item.symbol}</span>
          <span className="station-label">{item.label}</span>
        </button>)}
      </div>
      <div className="trace-panel" role="tabpanel" id="station-panel" aria-labelledby={`station-${station.id}`} tabIndex={0}>
        <div className="trace-copy" key={station.id}>
          <p className="trace-step">STOP {String(active + 1).padStart(2, '0')} <span>/ {station.status === 'built' ? 'BUILT' : 'NEXT CHAPTER'}</span></p>
          <h3>{station.title}</h3>
          <p>{station.detail}</p>
        </div>
        <div className={`trace-evidence ${station.status}`} key={`${station.id}-evidence`}>
          <span>{project ? `EVIDENCE / ${project.title.toUpperCase()}` : 'AN HONEST GAP'}</span>
          <p>{station.evidence}</p>
          {project && <button className="text-link" onClick={() => onSelect(project)} aria-label={`Open the ${project.title} case study`}>Open the case study <span aria-hidden="true">↗</span></button>}
        </div>
      </div>
      <div className="trace-controls">
        <button className="trace-play" onClick={() => { setActive(0); setTracing(true); }} disabled={tracing}><span aria-hidden="true">{tracing ? '◌' : '▶'}</span> {tracing ? 'Tracing…' : 'Trace a request'}</button>
        <span className="trace-hint" aria-hidden="true">← → TO MOVE BETWEEN STOPS</span>
        <span className="trace-count" aria-hidden="true">{String(active + 1).padStart(2, '0')} / {String(stations.length).padStart(2, '0')}</span>
      </div>
    </div>
  </section>;
}
