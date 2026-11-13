import { useEffect, useRef } from 'react';
import type { Project } from '../content/portfolio';
import Icon from './Icon';

export default function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!project || !dialog) return;
    const trigger = document.activeElement as HTMLElement | null;
    dialog.showModal();
    document.body.classList.add('dialog-open');
    return () => {
      dialog.close();
      document.body.classList.remove('dialog-open');
      trigger?.focus({ preventScroll: true });
    };
  }, [project]);

  return (
    <dialog ref={ref} className="project-dialog" aria-labelledby="dialog-title" onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      {project && <div className="dialog-panel">
        <button className="dialog-close" onClick={onClose} aria-label="Close project details" autoFocus><Icon name="close" /></button>
        <p className="eyebrow">{project.number} / {project.kind}</p>
        <h2 id="dialog-title">{project.title}</h2>
        <p className="dialog-intro">{project.description}</p>
        <ul className="chips">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        <div className="case-study">
          <section><h3>The problem</h3><p>{project.problem}</p></section>
          <section><h3>How it fits together</h3><p>{project.structure}</p></section>
          <section><h3>A technical decision</h3><p>{project.decision}</p></section>
          <section><h3>Evidence & scope</h3><p>{project.evidence}</p></section>
        </div>
        <div className="dialog-actions">
          <a className="button primary" href={project.repo} target="_blank" rel="noreferrer">View repository <span aria-hidden="true"><Icon name="arrow" /></span></a>
          <a className="text-link" href={project.source} target="_blank" rel="noreferrer">Read the source <span aria-hidden="true"><Icon name="arrow" /></span></a>
        </div>
      </div>}
    </dialog>
  );
}
