import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getContent, projects } from '../content';
import { ContentSection } from '../components/ContentSection';
import { NotFoundPage } from './NotFoundPage';

export function ProjectPage() {
  const { slug = '' } = useParams();
  const project = projects.find(project => project.slug === slug);
  useEffect(() => { document.title = `${project?.title || 'Page not found'} | Christina Lin`; }, [project]);
  if (!project) return <NotFoundPage />;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return <article className="page-width project-page"><Link className="back-link" to="/"><ArrowLeft size={17} /> All projects</Link><ContentSection blocks={getContent(slug)} /><nav className="project-navigation" aria-label="Project navigation"><Link to="/">All projects</Link><Link to={`/${next.slug}`}>Next: {next.title}<ArrowRight size={18} /></Link></nav></article>;
}
