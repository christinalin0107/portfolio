import projects from './projects.json';
import site from './site.json';

export interface ContentBlock {
  type: string;
  text?: string;
  src?: string;
  alt?: string;
  level?: number;
  links?: { label: string; href: string }[];
  role?: 'title' | 'section' | 'subsection' | 'lead' | 'label' | 'body' | 'caption';
  content?: InlineContent[];
  children?: ContentBlock[];
  spacing?: 'compact' | 'small' | 'normal' | 'large' | 'section';
  ratios?: number[];
  ordered?: boolean;
  aspectRatio?: number;
  poster?: string;
  radius?: number;
  zoom?: number;
  step?: number;
  title?: string;
  variant?: 'research' | 'quote' | 'annotation';
  icon?: string;
}
export interface InlineContent {
  type: 'text' | 'break' | 'span' | 'strong' | 'emphasis' | 'underline' | 'link' | 'highlight';
  text?: string;
  href?: string;
  children?: InlineContent[];
}
export type Project = (typeof projects)[number];
const pages = import.meta.glob<ContentBlock[]>('./*.json', { eager: true, import: 'default' });
export const getContent = (slug: string): ContentBlock[] => pages[`./${slug}.json`] ?? [];
export const assetUrl = (src: string) => `${import.meta.env.BASE_URL}${src}`;
export { projects, site };
