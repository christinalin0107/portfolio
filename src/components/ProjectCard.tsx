import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { assetUrl, getContent, type ContentBlock, type Project } from '../content';

function summary(blocks: ContentBlock[]): string {
  for (const block of blocks) {
    if (block.type === 'richText' && block.role === 'body') return (block.content || []).map(function read(node): string { return node.text || (node.children || []).map(read).join(''); }).join('');
    const text = block.children && summary(block.children);
    if (text) return text;
  }
  return '';
}

export function ProjectCard({ project }: { project: Project }) {
  return <Link className={`project-card project-card--${project.slug}`} to={`/${project.slug}`}>
    <div className="project-cover"><img src={assetUrl(project.cover)} alt={`${project.title} project preview`} loading="lazy" /></div>
    <div className="project-card-body"><p className="project-category">{project.category === 'ux' ? 'UX Design' : 'Visual & Creative'}</p><h4>{project.title}</h4><p className="project-summary">{summary(getContent(project.slug))}</p><p className="project-tags">{project.tags.join(' · ')}</p><span className="project-card-link">View project <ArrowUpRight size={15} aria-hidden="true" /></span></div>
  </Link>;
}
