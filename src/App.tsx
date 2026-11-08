import { useEffect, useRef, useState } from 'react';
import portal from './assets/portal.webp';
import portalSmall from './assets/portal-640.webp';
import { navigation, profile, projects, skillGroups, type Project } from './content/portfolio';
import ProjectDialog from './components/ProjectDialog';
import Work from './sections/Work';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState('');
  const menuButton = useRef<HTMLButtonElement>(null);
  const heroArt = useRef<HTMLDivElement>(null);

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
    ['home', ...navigation.map(item => item.id)].forEach(id => { const section = document.getElementById(id); if (section) observer.observe(section); });
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
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <a className="brand" href="#home" aria-label="TAI130203 / DEVELOPER — Đoàn Công Tài, back to top"><span className="brand-mark" aria-hidden="true">t<span>.</span></span><span>TAI130203<span className="brand-description"> / DEVELOPER</span></span></a>
      <button ref={menuButton} className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}><span aria-hidden="true">{menuOpen ? '×' : '☰'}</span></button>
      <nav id="main-navigation" className={menuOpen ? 'open' : ''} aria-label="Main navigation">
        {navigation.map(item => <a className={item.id === 'contact' ? 'nav-contact' : ''} href={`#${item.id}`} key={item.id} aria-current={activeSection === item.id ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{item.label}{item.id === 'contact' && <span aria-hidden="true">↗</span>}</a>)}
      </nav>
    </header>
    <main id="main">
      <section className="hero" id="home" aria-labelledby="hero-title" onPointerMove={event => {
        if (event.pointerType !== 'mouse' || !window.matchMedia('(prefers-reduced-motion: no-preference) and (min-width: 900px)').matches) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        heroArt.current?.style.setProperty('--art-x', `${(event.clientX - bounds.left - bounds.width / 2) / 65}px`);
        heroArt.current?.style.setProperty('--art-y', `${(event.clientY - bounds.top - bounds.height / 2) / 65}px`);
      }} onPointerLeave={() => { heroArt.current?.style.setProperty('--art-x', '0px'); heroArt.current?.style.setProperty('--art-y', '0px'); }}>
        <div className="hero-art" ref={heroArt}><img src={portal} srcSet={`${portalSmall} 640w, ${portal} 1254w`} sizes="(max-width: 600px) 118vw, (max-width: 800px) 83vw, (max-width: 1100px) 82vw, (min-width: 1600px) 960px, 66vw" width="1254" height="1254" fetchPriority="high" alt="A developer on a floating island beneath a glowing sunset portal, surrounded by mountains and clouds." /></div>
        <div className="hero-copy">
          <p className="status"><span className="status-dot" aria-hidden="true" /> A DEVELOPER’S JOURNEY</p>
          <h1 id="hero-title">From curiosity<br />to <em>working code.</em></h1>
          <p className="hero-intro">Hi, I’m <strong>{profile.name}.</strong></p>
          <p className="hero-description">I build Java applications and React interfaces, connect ideas with data, and keep learning along the way. My next chapter: full-stack development.</p>
          <div className="hero-actions"><a className="button primary" href="#work">Explore my work <span aria-hidden="true">↗</span></a><a className="button secondary" href="#contact">Let’s connect <span aria-hidden="true">↗</span></a></div>
          <p className="hero-location"><span aria-hidden="true">⌖</span> {profile.location}</p>
        </div>
        <a className="portal-caption" href="#work"><span className="tiny-star" aria-hidden="true">✦</span> A WINDOW TO WHAT’S NEXT <span aria-hidden="true">↗</span></a>
        <div className="hero-bottom"><a href="#work" className="scroll-link"><span className="mouse" aria-hidden="true" /> SCROLL TO EXPLORE</a><span>IMAGINATION MEETS IMPLEMENTATION <span aria-hidden="true">✦</span></span></div>
      </section>
      <Work onSelect={setSelected} />
      <section className="section skills" id="skills" aria-labelledby="skills-title">
        <div className="section-heading reveal"><div><p className="eyebrow">02 / THE TOOLBOX</p><h2 id="skills-title">Good ideas. <em>Practical tools.</em></h2></div><p>A growing set of skills.<br /><span className="muted">Best understood through the work.</span></p></div>
        <div className="skills-grid">{skillGroups.map(group => <article className="skill reveal" key={group.title}><div className="skill-top"><span className="skill-icon" aria-hidden="true">{group.symbol}</span><span>{group.number}</span></div><h3>{group.title}</h3><p>{group.description}</p><ul className="chips">{group.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>{group.url ? <a className="skill-evidence" href={group.url} target="_blank" rel="noreferrer">{group.evidence} <span aria-hidden="true">↗</span></a> : <button className="skill-evidence" onClick={() => setSelected(projects.find(project => project.id === group.project)!)}>{group.evidence} <span aria-hidden="true">↗</span></button>}</article>)}</div>
      </section>
      <section className="section about" id="about" aria-labelledby="about-title">
        <div className="about-art reveal"><p className="eyebrow">03 / BEHIND THE SCREEN</p><div className="orbit" aria-hidden="true"><span className="orbit-ring ring-one" /><span className="orbit-ring ring-two" /><span className="orbit-ring ring-three" /><span className="orbit-center">t<span>.</span></span><i className="orbit-star">✦</i><span className="orbit-coordinate">10.82° N / 106.63° E</span></div><span className="about-art-caption">ALWAYS A WORK IN PROGRESS.</span></div>
        <div className="about-copy reveal"><h2 id="about-title">Curious by nature.<br /><em>Developer by choice.</em></h2><p>I’m Tài, a software developer based in Ho Chi Minh City. My work so far spans Java desktop applications, React interfaces, and the data that ties an application together.</p><p className="muted">I’m pursuing full-stack opportunities where I can bring those pieces closer together, learn from a team, and turn a little more curiosity into useful software.</p><div className="about-details"><div><span>BASED IN</span><p>Ho Chi Minh City, Vietnam <span aria-hidden="true">↗</span></p></div><div><span>NEXT CHAPTER</span><p>Full-stack development <span aria-hidden="true">✦</span></p></div></div></div>
      </section>
      <section className="section contact" id="contact" aria-labelledby="contact-title">
        <div className="contact-orbit" aria-hidden="true" />
        <div className="reveal"><p className="eyebrow">04 / THE NEXT CHAPTER</p><p className="contact-spark" aria-hidden="true">✦</p><h2 id="contact-title">Good things start<br /><em>with a hello.</em></h2><p>Have a project, an opportunity, or a shared curiosity?<br />Find my work and get in touch on GitHub.</p><a className="button primary" href={profile.github} target="_blank" rel="noreferrer">Let’s connect on GitHub <span aria-hidden="true">↗</span></a><span className="contact-handle">@{profile.handle}</span></div>
      </section>
    </main>
    <footer className="site-footer"><a className="brand" href="#home"><span className="brand-mark">t<span>.</span></span><span>ĐOÀN CÔNG TÀI</span></a><span>A little curiosity goes a long way.</span><a href="#home" className="back-top">Back to the stars <span aria-hidden="true">↑</span></a></footer>
    <ProjectDialog project={selected} onClose={() => setSelected(null)} />
  </>;
}
