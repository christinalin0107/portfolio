import { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { assetUrl, site } from '../content';
import about from '../content/about.json';

export function AboutPage() {
  useEffect(() => { document.title = 'About | Christina Lin'; }, []);
  return <article className="page-width about-page">
    <section className="about-introduction">
      <img src={assetUrl(about.portrait)} alt="Christina Lin with illustrated notes about her creative interests" width={2424} height={2489} />
      <div><h1>{about.title}</h1><p className="about-bio">{about.bio}</p><h2>Beyond the screen</h2><p>{about.interests}</p><div className="social-links"><a href={`mailto:${site.email}`}>Email me <ArrowUpRight size={17} /></a><a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={17} /></a></div></div>
    </section>
    <section className="about-experience" aria-labelledby="experience-heading"><div className="experience-heading"><h2 id="experience-heading">Work experience</h2><a href={site.resume} target="_blank" rel="noreferrer">View resume <ArrowUpRight size={17} /></a></div><dl>{about.experience.map(job => <div className="experience-row" key={`${job.organization}-${job.dates}`}><dt>{job.dates}</dt><dd><h3>{job.role}</h3><p>{job.organization}</p></dd></div>)}</dl></section>
  </article>;
}
