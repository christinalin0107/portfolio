import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { projects, site } from '../content';
import { ProjectCard } from '../components/ProjectCard';
import { DesignArtwork } from '../components/DesignArtwork';
import { useDayNightScroll } from '../hooks/useDayNightScroll';

export function HomePage() {
  const home = useRef<HTMLDivElement>(null);
  useDayNightScroll(home);
  useEffect(() => { document.title = 'Christina Lin | UX Designer'; }, []);
  return <div className="home-page" ref={home}>
    <div className="home-atmosphere" aria-hidden="true"><div className="hero-sky"><DesignArtwork name="cloud-large" className="cloud-large" /><DesignArtwork name="cloud-small" className="cloud-small" /><DesignArtwork name="sun" className="day-sun" /></div><DesignArtwork name="sunset-hills" className="sunset-hills" /><DesignArtwork name="night-sky" className="night-sky" /></div>
    <section className="home-hero" aria-labelledby="intro-heading">
      <div className="page-width hero-content"><p className="eyebrow hero-eyebrow">Hello, world <span aria-hidden="true">✦</span></p>
        <div className="hero-title"><h1 id="intro-heading">Hi, I’m Christina.</h1><DesignArtwork name="portrait" className="hero-portrait" alt="Pixel portrait of Christina" /></div>
        <p className="hero-subtitle">Designer by day. Creative explorer always.</p>
        <p className="hero-description">{site.introduction}</p>
        <a className="pixel-button" href="#work">Explore my work <ArrowUpRight size={18} aria-hidden="true" /></a>
      </div>
      <div className="day-hills" aria-hidden="true"><DesignArtwork name="day-hills-back" className="hills-back" /><DesignArtwork name="day-hills-front" className="hills-front" /></div>
      <a className="scroll-cue page-width" href="#work"><ArrowDown size={14} aria-hidden="true" /> Scroll to explore</a>
    </section>
    <section className="home-work" id="work" aria-labelledby="work-heading"><div className="page-width">
      <h2 id="work-heading">My work</h2><p className="section-intro">A mix of UX, visual design, and creative experiments.</p>
      {(['ux', 'other'] as const).map(category => <section className="projects-section" key={category} aria-labelledby={`${category}-heading`}><h3 className="section-label" id={`${category}-heading`}>{category === 'ux' ? 'UX Design Projects' : 'Other Projects'}</h3><div className="project-grid">{projects.filter(project => project.category === category).map(project => <ProjectCard project={project} key={project.slug} />)}</div></section>)}
    </div></section>
    <section className="home-contact" id="contact" aria-labelledby="contact-heading"><div className="page-width contact-content">
      <p className="eyebrow">02 / After hours</p><h2 id="contact-heading">Let’s make something together.</h2><p className="contact-intro">Have an idea, a question, or just want to say hello?</p>
      <div className="contact-card"><div><p className="eyebrow">Say hello <span aria-hidden="true">✦</span></p><h3>Curious about collaborating?</h3></div><a className="pixel-button" href={`mailto:${site.email}`}>Get in touch <ArrowUpRight size={18} aria-hidden="true" /></a></div>
    </div></section>
  </div>;
}
