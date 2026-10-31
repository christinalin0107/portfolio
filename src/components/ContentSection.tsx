import { Fragment } from 'react';
import { assetUrl, type ContentBlock } from '../content';

function LinkedText({ block }: { block: ContentBlock }) {
  let remaining = block.text || '';
  const parts = [];
  for (const [index, link] of (block.links || []).entries()) {
    const position = remaining.indexOf(link.label);
    if (position < 0 || !link.label) continue;
    parts.push(<Fragment key={index}>{remaining.slice(0, position)}<a href={link.href} target="_blank" rel="noreferrer">{link.label}</a></Fragment>);
    remaining = remaining.slice(position + link.label.length);
  }
  return <>{parts}{remaining}</>;
}
export function ContentSection({ blocks }: { blocks: ContentBlock[] }) {
  return <div className="case-study-content">{blocks.map((block, index) => {
    if (block.type === 'image') return <figure key={index}><img src={assetUrl(block.src!)} alt={block.alt || ''} loading="lazy" /></figure>;
    if (block.type === 'heading' && block.level === 1) return <h1 key={index}>{block.text}</h1>;
    if (block.type === 'heading') return block.level === 2
      ? <h2 key={index}>{block.text}</h2> : <h3 key={index}>{block.text}</h3>;
    return <p key={index}><LinkedText block={block} /></p>;
  })}</div>;
}
