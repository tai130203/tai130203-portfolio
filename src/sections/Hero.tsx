import { Fragment, useEffect, useRef } from 'react';
import portal from '../assets/portal.webp';
import portalSmall from '../assets/portal-640.webp';
import { profile } from '../content/portfolio';
import { trackPointer } from '../interactions';
import Icon from '../components/Icon';

const statement = 'Curiosity starts it. Careful code brings it to life.';

export default function Hero() {
  const runwayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const runway = runwayRef.current!;
    const hero = runway.querySelector<HTMLElement>('.hero')!;
    const art = runway.querySelector<HTMLElement>('.hero-art')!;
    const copy = runway.querySelector<HTMLElement>('.hero-copy')!;
    const story = runway.querySelector<HTMLElement>('.hero-story')!;
    const hints = runway.querySelectorAll<HTMLElement>('.hero-bottom, .portal-caption');
    const words = [...runway.querySelectorAll<HTMLElement>('.story-word')];
    const media = matchMedia('(min-width: 1000px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)');
    let frame = 0;
    let start = 0;
    let distance = 0;
    const clamp = (value: number) => Math.max(0, Math.min(1, value));

    function update() {
      frame = 0;
      const active = runway.classList.contains('scene-active');
      const progress = active ? clamp((scrollY - start) / distance) : 0;
      const reveal = clamp((progress - .42) / .3);
      art.style.scale = active ? String(1 + progress * 1.7) : '';
      art.style.translate = active ? `${-innerWidth * .28 * progress}px 0` : '';
      art.style.opacity = active ? String(1 - clamp((progress - .3) / .6) * .88) : '';
      copy.style.opacity = active ? String(1 - clamp(progress / .32)) : '';
      copy.style.translate = active ? `0 ${-progress * 100}px` : '';
      copy.style.visibility = active && progress > .32 ? 'hidden' : '';
      copy.inert = active && progress > .32;
      hints.forEach(hint => { hint.style.opacity = active ? String(1 - clamp(progress / .2)) : ''; });
      story.style.opacity = active ? String(reveal) : '';
      story.style.visibility = active ? (reveal === 0 ? 'hidden' : 'visible') : '';
      story.style.translate = active ? `0 ${(1 - reveal) * 32}px` : '';
      story.inert = active && reveal < .5;
      words.forEach((word, i) => {
        word.style.opacity = active ? String(.22 + .78 * clamp((progress - .5 - i * .035) / .12)) : '';
      });
      hero.style.setProperty('--scene-progress', String(progress));
      story.style.setProperty('--scene-progress', String(progress));
    }

    function schedule() {
      if (!frame && !document.hidden) frame = requestAnimationFrame(update);
    }

    function measure() {
      runway.classList.toggle('scene-active', media.matches);
      start = runway.getBoundingClientRect().top + scrollY;
      distance = Math.max(1, runway.offsetHeight - innerHeight);
      schedule();
    }

    measure();
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', measure);
    media.addEventListener('change', measure);
    document.addEventListener('visibilitychange', schedule);
    return () => {
      removeEventListener('scroll', schedule);
      removeEventListener('resize', measure);
      media.removeEventListener('change', measure);
      document.removeEventListener('visibilitychange', schedule);
      cancelAnimationFrame(frame);
      runway.classList.remove('scene-active');
      update();
    };
  }, []);

  return <div className="hero-runway" id="home" ref={runwayRef}>
    <div className="hero-stage">
      <section className="hero" aria-labelledby="hero-title" onPointerMove={trackPointer}>
        <div className="hero-art"><img src={portal} srcSet={`${portalSmall} 640w, ${portal} 1254w`} sizes="(max-width: 600px) 118vw, (max-width: 800px) 83vw, (max-width: 1100px) 82vw, (min-width: 1600px) 960px, 66vw" width="1254" height="1254" fetchPriority="high" alt="A developer on a floating island beneath a glowing sunset portal, surrounded by mountains and clouds." /></div>
        <div className="hero-copy">
          <p className="status"><span className="status-dot" aria-hidden="true" /> A DEVELOPER’S JOURNEY</p>
          <h1 id="hero-title">From curiosity<br />to <em>working code.</em></h1>
          <p className="hero-intro">Hi, I’m <strong>{profile.name}.</strong></p>
          <p className="hero-description">I build Java applications and React interfaces, connect ideas with data, and keep learning along the way. My next chapter: full-stack development.</p>
          <div className="hero-actions"><a className="button primary" href="#work">Explore my work <span aria-hidden="true"><Icon name="arrow" /></span></a><a className="button secondary" href="#contact">Let’s connect <span aria-hidden="true"><Icon name="arrow" /></span></a></div>
          <p className="hero-location"><span aria-hidden="true"><Icon name="pin" /></span> {profile.location}</p>
        </div>
        <a className="portal-caption" href="#work"><span className="tiny-star" aria-hidden="true"><Icon name="spark" /></span> STEP INSIDE <span aria-hidden="true"><Icon name="arrow" /></span></a>
        <div className="hero-bottom"><a href="#work" className="scroll-link"><span className="mouse" aria-hidden="true" /> SCROLL TO EXPLORE</a><span>IMAGINATION MEETS IMPLEMENTATION <span aria-hidden="true"><Icon name="spark" /></span></span></div>
      </section>
      <section className="hero-story" aria-labelledby="story-title">
        <div className="story-orbit" aria-hidden="true"><i /><i /><span><Icon name="spark" /></span></div>
        <div className="story-content">
          <p className="eyebrow">00 / THE IDEA BEHIND THE WORK</p>
          <h2 id="story-title" aria-label={statement}>{statement.split(' ').map((word, i) => <Fragment key={i}>{i === 3 && <br />}<span className={`story-word ${i > 2 ? 'accent' : ''}`} aria-hidden="true">{word}{' '}</span></Fragment>)}</h2>
          <p>A sketch becomes an interface. A component becomes a system.<br />I enjoy connecting the pieces, one thoughtful detail at a time.</p>
          <a href="#work" className="story-next">Meet the work <span aria-hidden="true"><Icon name="down" /></span></a>
        </div>
        <div className="story-chapters" aria-hidden="true"><span>01 / CURIOSITY</span><i /><span>02 / CRAFT</span><i /><span>03 / CODE</span></div>
      </section>
    </div>
  </div>;
}
