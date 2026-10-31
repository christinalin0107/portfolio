import { useEffect } from 'react';
import { ContentSection } from '../components/ContentSection';
import { getContent } from '../content';

export function AboutPage() {
  useEffect(() => { document.title = 'About | Christina Lin'; }, []);
  return <article className="page-width about-page"><ContentSection blocks={getContent('about')} /></article>;
}
