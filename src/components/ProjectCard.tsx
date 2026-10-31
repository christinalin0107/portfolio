import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { assetUrl, type Project } from '../content';

export function ProjectCard({ project }: { project: Project }) {
  return <Link className={`project-card project-card--${project.slug}`} to={`/${project.slug}`}>
    <div className="project-cover"><img src={assetUrl(project.cover)} alt={`${project.title} project preview`} loading="lazy" /></div>
    <div className="project-card-heading"><h3>{project.title}</h3><ArrowUpRight size={23} aria-hidden="true" /></div>
    <p className="project-tags">{project.tags.join(' · ')}</p>
  </Link>;
}
