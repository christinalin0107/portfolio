import type { ContentBlock, InlineContent } from './index';

const plainText = (nodes: InlineContent[]): string => nodes.map(node => node.text ?? plainText(node.children ?? [])).join('');

export function prepareCaseStudy(blocks: ContentBlock[]) {
  const sections: { id: string; title: string }[] = [];
  const usedIds = new Map<string, number>();
  function prepare(block: ContentBlock, nested = false): ContentBlock {
    const result = { ...block };
    if (block.type === 'richText' && block.level && block.level > 1) {
      const title = plainText(block.content ?? []).trim();
      const base = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section';
      const count = (usedIds.get(base) ?? 0) + 1;
      usedIds.set(base, count);
      result.id = `study-${base}${count > 1 ? `-${count}` : ''}`;
      if (!nested && block.level === 2 && !/^\d+$/.test(title)) sections.push({ id: result.id, title });
    }
    result.children = block.children?.map(child => prepare(child, nested || ['list', 'card', 'videoDemo'].includes(block.type)));
    return result;
  }
  const prepared = blocks.map(block => prepare(block));
  const root = prepared[0];
  // Migrated studies share a title/metadata group followed by the original body.
  const hasIntro = prepared.length === 1 && root.type === 'stack' && root.children?.[0]?.type === 'columns';
  return {
    intro: hasIntro ? [root.children![0]] : [],
    body: hasIntro ? [{ ...root, children: root.children!.slice(1) }] : prepared,
    sections,
  };
}
