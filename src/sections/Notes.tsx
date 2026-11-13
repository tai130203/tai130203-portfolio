import { notes } from '../content/portfolio';
import Icon from '../components/Icon';

/** A short logbook: one lesson per project, kept in native disclosure elements. */
export default function Notes() {
  return <section className="section notes" id="notes" aria-labelledby="notes-title">
    <div className="section-heading reveal">
      <div><p className="eyebrow">04 / THE LOGBOOK</p><h2 id="notes-title">Notes from <em>the build.</em></h2></div>
      <p>Three projects, three lessons.<br /><span className="muted">Written down so they stick.</span></p>
    </div>
    <div className="log reveal">
      {notes.map((note, i) => <details name="logbook" open={i === 0} key={note.title}>
        <summary>
          <span className="log-id">LOG {String(i + 1).padStart(2, '0')}</span>
          <h3>{note.title}</h3>
          <span className="log-source">{note.source}</span>
          <span className="log-toggle" aria-hidden="true"><Icon name="plus" /></span>
        </summary>
        <div className="log-body">
          <p>{note.body}</p>
          <p className="log-takeaway"><span aria-hidden="true"><Icon name="spark" /></span> {note.takeaway}</p>
          <a className="text-link" href={note.url} target="_blank" rel="noreferrer">{note.link} <span aria-hidden="true"><Icon name="arrow" /></span></a>
        </div>
      </details>)}
    </div>
  </section>;
}
