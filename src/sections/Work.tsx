import { projects, type Project } from '../content/portfolio';
import { trackPointer } from '../interactions';

export default function Work({ onSelect }: { onSelect: (project: Project) => void }) {
  return <section className="section work" id="work" aria-labelledby="work-title">
    <div className="section-heading reveal">
      <div><p className="eyebrow">01 / SELECTED WORK</p><h2 id="work-title">A few things I’ve <em>built.</em></h2></div>
      <p>Real projects. Open source.<br /><span className="muted">A closer look at the code behind them.</span></p>
    </div>
    <div className="project-grid">
      {projects.map(project => <article className={`project reveal ${project.id}`} key={project.id}>
        <button className="project-visual" onPointerMove={trackPointer} onClick={() => onSelect(project)} aria-label={`Explore ${project.title}`}>
          <span className="visual-heading"><span>{project.id === 'library' ? 'APPLICATION / DATA' : 'INTERFACE / COMPONENTS'}</span><span>{project.number}</span></span>
          <span className="code-window">
            <span className="window-bar"><span className="window-dots" aria-hidden="true"><i /><i /><i /></span><span>{project.filename}</span><span aria-hidden="true">⌘</span></span>
            <span className="source-code" aria-hidden="true">{project.code.map((line, i) => <span className={`code-line ${line.trim().startsWith('@') ? 'annotation' : ''}`} key={i}><span className="line-number">{String(i + 1).padStart(2, '0')}</span><code>{line || ' '}</code></span>)}</span>
          </span>
          <span className="visual-footer"><span>PUBLIC REPOSITORY · SOURCE PREVIEW</span><span className="project-arrow" aria-hidden="true">↗</span></span>
        </button>
        <div className="project-heading"><h3>{project.title}</h3><span>{project.kind}</span></div>
        <p className="project-description">{project.description}</p>
        <ul className="chips">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        <div className="project-actions"><button className="text-link" onClick={() => onSelect(project)}>Explore project <span aria-hidden="true">↗</span></button><a href={project.repo} target="_blank" rel="noreferrer">View code <span aria-hidden="true">↗</span></a></div>
      </article>)}
    </div>
    <a className="all-work text-link reveal" href="https://github.com/tai130203?tab=repositories" target="_blank" rel="noreferrer">There’s more on GitHub <span aria-hidden="true">↗</span></a>
  </section>;
}
