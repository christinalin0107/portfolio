import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getContent, projects } from '../content';
import { CaseStudyContent } from '../components/CaseStudyContent';
import { NotFoundPage } from './NotFoundPage';
import { prepareCaseStudy } from '../content/prepareCaseStudy';

export function ProjectPage() {
  const { slug = '' } = useParams();
  const project = projects.find(project => project.slug === slug);
  useEffect(() => { document.title = `${project?.title || 'Page not found'} | Christina Lin`; }, [project]);
  if (!project) return <NotFoundPage />;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const { intro, body, sections } = prepareCaseStudy(getContent(slug));
  return <article className="page-width project-page">
    <Link className="back-link" to="/"><ArrowLeft size={17} /> All projects</Link>
    <CaseStudyContent blocks={intro} intro />
    <section className="project-summary" aria-labelledby="summary-heading">
      <div className="summary-heading"><h2 id="summary-heading">At a glance</h2><p>{project.context}</p></div>
      <dl>{[['The challenge', project.description], ['My contribution', project.contribution], ['Evidence & outcome', project.evidence]].map(([label, text]) => <div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}</dl>
    </section>
    {sections.length > 1 && <nav className="study-navigation" aria-label="Case study sections">{sections.map(section => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}</nav>}
    <CaseStudyContent blocks={body} />
    <nav className="project-navigation" aria-label="Project navigation"><Link to="/">All projects</Link><Link to={`/${next.slug}`}>Next: {next.title}<ArrowRight size={18} /></Link></nav>
  </article>;
}
