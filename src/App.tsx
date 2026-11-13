import { useEffect, useRef, useState } from 'react';
import { navigation, profile, projects, skillGroups, waypoints, type Project } from './content/portfolio';
import JourneyRail from './components/JourneyRail';
import LocalTime from './components/LocalTime';
import ProjectDialog from './components/ProjectDialog';
import Starfield from './components/Starfield';
import Hero from './sections/Hero';
import Notes from './sections/Notes';
import Path from './sections/Path';
import Work from './sections/Work';
import { trackPointer } from './interactions';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState('');
  const [sparks, setSparks] = useState(0);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      const distance = document.documentElement.scrollHeight - innerHeight;
      progress.current!.style.transform = `scaleX(${distance > 0 ? Math.max(0, Math.min(1, scrollY / distance)) : 0})`;
      header.current!.classList.toggle('scrolled', scrollY > 70);
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    const resize = new ResizeObserver(schedule);
    resize.observe(document.body);
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    update();
    return () => { removeEventListener('scroll', schedule); removeEventListener('resize', schedule); resize.disconnect(); cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: '-15% 0px -55% 0px' });
    waypoints.forEach(({ id }) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus(); }
    };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [menuOpen]);

  return <>
    <Starfield />
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="reading-progress" aria-hidden="true"><span ref={progress} /></div>
    <header ref={header} className="site-header">
      <a className="brand" href="#home" aria-label="t. TAI130203 / DEVELOPER — Đoàn Công Tài, back to top"><span className="brand-mark" aria-hidden="true">t<span>.</span></span><span>TAI130203<span className="brand-description"> / DEVELOPER</span></span></a>
      <button ref={menuButton} className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}><span aria-hidden="true">{menuOpen ? '×' : '☰'}</span></button>
      <nav id="main-navigation" className={menuOpen ? 'open' : ''} aria-label="Main navigation">
        {navigation.map(item => <a className={item.id === 'contact' ? 'nav-contact' : ''} href={`#${item.id}`} key={item.id} aria-current={activeSection === item.id ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{item.label}{item.id === 'contact' && <span aria-hidden="true">↗</span>}</a>)}
      </nav>
    </header>
    <JourneyRail active={activeSection} />
    <main id="main">
      <Hero />
      <Work onSelect={setSelected} />
      <Path onSelect={setSelected} />
      <section className="section skills" id="skills" aria-labelledby="skills-title">
        <div className="section-heading reveal"><div><p className="eyebrow">03 / THE TOOLBOX</p><h2 id="skills-title">Good ideas. <em>Practical tools.</em></h2></div><p>A growing set of skills.<br /><span className="muted">Best understood through the work.</span></p></div>
        <div className="skills-grid">{skillGroups.map(group => <article className="skill reveal" key={group.title}><div className="skill-top"><span className="skill-icon" aria-hidden="true">{group.symbol}</span><span>{group.number}</span></div><h3>{group.title}</h3><p>{group.description}</p><ul className="chips">{group.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>{group.url ? <a className="skill-evidence" href={group.url} target="_blank" rel="noreferrer">{group.evidence} <span aria-hidden="true">↗</span></a> : <button className="skill-evidence" onClick={() => setSelected(projects.find(project => project.id === group.project)!)}>{group.evidence} <span aria-hidden="true">↗</span></button>}</article>)}</div>
      </section>
      <Notes />
      <section className="section about" id="about" aria-labelledby="about-title">
        <div className="about-art reveal"><p className="eyebrow">05 / BEHIND THE SCREEN</p><button className="orbit" aria-label="Send a little spark" onClick={() => setSparks(count => count + 1)}><span className="orbit-ring ring-one" aria-hidden="true" /><span className="orbit-ring ring-two" aria-hidden="true" /><span className="orbit-ring ring-three" aria-hidden="true" /><span className="orbit-center" aria-hidden="true">t<span>.</span></span><i className="orbit-star" aria-hidden="true">✦</i><span className="orbit-coordinate" aria-hidden="true">10.82° N / 106.63° E</span>{sparks > 0 && <span className="orbit-pulse" key={sparks} aria-hidden="true" />}</button><span className="about-art-caption" role="status">{sparks > 0 ? 'A LITTLE CURIOSITY GOES A LONG WAY. ✦' : 'CLICK THE ORBIT. SEND A LITTLE SPARK. ↗'}</span></div>
        <div className="about-copy reveal"><h2 id="about-title">Curious by nature.<br /><em>Developer by choice.</em></h2><p>I’m Tài, a software developer based in Ho Chi Minh City. My work so far spans Java desktop applications, React interfaces, and the data that ties an application together.</p><p className="muted">I’m pursuing full-stack opportunities where I can bring those pieces closer together, learn from a team, and turn a little more curiosity into useful software.</p><div className="about-details"><div><span>BASED IN</span><p>Ho Chi Minh City, Vietnam <span aria-hidden="true">↗</span></p></div><div><span>LOCAL TIME</span><p><LocalTime /> <span aria-hidden="true">◐</span></p></div><div><span>NEXT CHAPTER</span><p>Full-stack development <span aria-hidden="true">✦</span></p></div></div></div>
      </section>
      <section className="section contact" id="contact" aria-labelledby="contact-title" onPointerMove={trackPointer}>
        <div className="contact-orbit" aria-hidden="true" />
        <div className="reveal"><p className="eyebrow">06 / THE NEXT CHAPTER</p><p className="contact-spark" aria-hidden="true">✦</p><h2 id="contact-title">Good things start<br /><em>with a hello.</em></h2><p>Have a project, an opportunity, or a shared curiosity?<br />Find my work and get in touch on GitHub.</p><a className="button primary" href={profile.github} target="_blank" rel="noreferrer">Let’s connect on GitHub <span aria-hidden="true">↗</span></a><span className="contact-handle">@{profile.handle}</span></div>
      </section>
    </main>
    <footer className="site-footer"><a className="brand" href="#home"><span className="brand-mark">t<span>.</span></span><span>ĐOÀN CÔNG TÀI</span></a><span>A little curiosity goes a long way.</span><a href="#home" className="back-top">Back to the stars <span aria-hidden="true">↑</span></a></footer>
    <ProjectDialog project={selected} onClose={() => setSelected(null)} />
  </>;
}
