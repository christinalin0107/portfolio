import { Fragment, type CSSProperties } from 'react';
import { assetUrl, type ContentBlock, type InlineContent } from '../content';
import { StudyVideo } from './StudyVideo';

function RichText({ content }: { content: InlineContent[] }) {
  return <>{content.map((node, index) => {
    const children = node.children ? <RichText content={node.children} /> : node.text;
    switch (node.type) {
      case 'break': return <br key={index} />;
      case 'strong': return <strong key={index}>{children}</strong>;
      case 'emphasis': return <em key={index}>{children}</em>;
      case 'underline': return <u key={index}>{children}</u>;
      case 'highlight': return <span className="study-highlight" key={index}>{children}</span>;
      case 'link': return node.href ? <a key={index} href={node.href} target="_blank" rel="noreferrer">{children}</a> : <Fragment key={index}>{children}</Fragment>;
      default: return <Fragment key={index}>{children}</Fragment>;
    }
  })}</>;
}

function ContentGroup({ block }: { block: ContentBlock }) {
  const children = block.children?.map((child, index) => <ContentGroup block={child} key={index} />);
  if (block.type === 'card') {
    const Card = block.variant === 'quote' ? 'blockquote' : 'div';
    return <Card className={`study-card study-card--${block.variant || 'research'}`}>{block.icon && <img className="study-card-icon" src={assetUrl(block.icon)} alt="" aria-hidden="true" width={56} height={56} />}{children}</Card>;
  }
  if (block.type === 'image') return <figure className="study-image"><img src={assetUrl(block.src!)} alt={block.alt || ''} loading="lazy" /></figure>;
  if (block.type === 'video') return <StudyVideo block={block} />;
  if (block.type === 'videoGallery') return <div className="demo-gallery">{children}</div>;
  if (block.type === 'videoDemo') {
    const video = block.children?.find(child => child.type === 'video');
    return <section className="demo-card" aria-label={block.title}>
      <div className="demo-copy"><span className="demo-step" aria-label={`Step ${block.step}`}>{block.step}</span><div className="demo-caption"><h3>{block.title}</h3>{block.children?.filter(child => child.type !== 'video').map((child, index) => <ContentGroup block={child} key={index} />)}</div></div>
      {video && <div className="demo-phone"><StudyVideo block={video} phone /></div>}
    </section>;
  }
  if (block.type === 'richText') {
    const Heading = block.level === 1 ? 'h1' : block.level === 2 ? 'h2' : block.level === 3 ? 'h3' : 'p';
    return <Heading className={`study-text study-text--${block.role}`}><RichText content={block.content || []} /></Heading>;
  }
  if (block.type === 'list') return block.ordered ? <ol className="study-list">{children}</ol> : <ul className="study-list">{children}</ul>;
  if (block.type === 'listItem') return <li>{children}</li>;
  if (block.type === 'metadataRow') return <dl className="study-detail"><dt><RichText content={block.children?.[0].content || []} /></dt><dd><RichText content={block.children?.[1].content || []} /></dd></dl>;
  const style = block.type === 'columns' ? { '--study-columns': block.ratios?.map(ratio => `minmax(0, ${ratio}fr)`).join(' ') } as CSSProperties : undefined;
  return <div className={`study-${block.type} study-spacing--${block.spacing || 'normal'}`} style={style}>{children}</div>;
}

export function CaseStudyContent({ blocks }: { blocks: ContentBlock[] }) {
  return <div className="case-study-layout">{blocks.map((block, index) => <ContentGroup block={block} key={index} />)}</div>;
}
