import projects from './projects.json';
import site from './site.json';

export interface ContentBlock {
  type: string;
  text?: string;
  src?: string;
  alt?: string;
  level?: number;
  links?: { label: string; href: string }[];
}
export type Project = (typeof projects)[number];
const pages = import.meta.glob<ContentBlock[]>('./*.json', { eager: true, import: 'default' });
export const getContent = (slug: string): ContentBlock[] => pages[`./${slug}.json`] ?? [];
export const assetUrl = (src: string) => `${import.meta.env.BASE_URL}${src}`;
export { projects, site };
