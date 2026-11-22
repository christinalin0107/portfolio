import { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects, site } from '../content';
import { ProjectCard } from '../components/ProjectCard';

export function HomePage() {
  useEffect(() => { document.title = 'Christina Lin | UX Designer'; }, []);
  return <div className="page-width">
    <section className="introduction"><h1>{site.name}<br /><span>{site.role}</span></h1><div className="introduction-copy"><p>{site.introduction}</p><div className="social-links"><a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={17} /></a><a href={site.resume} target="_blank" rel="noreferrer">Resume <ArrowUpRight size={17} /></a></div></div></section>
    {(['ux', 'other'] as const).map(category => <section className={`projects-section projects-section--${category}`} key={category} aria-labelledby={`${category}-heading`}><h2 className="section-label" id={`${category}-heading`}>{category === 'ux' ? 'UX Design Projects' : 'Other Projects'}</h2><div className="project-grid">{projects.filter(project => project.category === category).map(project => <ProjectCard project={project} key={project.slug} />)}</div></section>)}
  </div>;
}
