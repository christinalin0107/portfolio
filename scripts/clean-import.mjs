import { parseHTML } from 'linkedom';
import { readFile, writeFile } from 'node:fs/promises';
const projects = JSON.parse(await readFile('src/content/projects.json', 'utf8'));
for (const slug of [...projects.map(project => project.slug), 'about']) {
  const { document } = parseHTML(await readFile(`.migration/${slug}.html`, 'utf8'));
  const previous = JSON.parse(await readFile(`src/content/${slug}.json`, 'utf8'));
  const oldImages = previous.filter(block => block.type === 'image');
  const imageMap = new Map();
  let imageIndex = 0;
  for (const element of document.querySelectorAll('#main img')) {
    if (element.closest('a')?.getAttribute('href')?.startsWith('./')) continue;
    const key = element.src.split('?')[0];
    if (!key.startsWith('https://framerusercontent.com/images/') || imageMap.has(key) || key.includes('Evt60IqBfTVsbNgVrWEWsKO0kLY')) continue;
    imageMap.set(key, oldImages[imageIndex++]);
  }
  const root = document.querySelector('[data-framer-root]');
  const breakpoint = root.className.split(' ').at(-1).replace('framer-', '');
  const seen = new Set();
  const blocks = [];
  for (const element of root.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,img')) {
    let parent = element;
    let hidden = false;
    while (parent && parent !== root) {
      if (parent.classList.contains(`hidden-${breakpoint}`)) hidden = true;
      parent = parent.parentElement;
    }
    if (hidden || element.closest('a')?.getAttribute('href')?.startsWith('./') || element.parentElement?.closest('li')) continue;
    if (element.tagName === 'IMG') {
      const key = element.src.split('?')[0];
      if (seen.has(key) || !imageMap.get(key)) continue;
      seen.add(key);
      blocks.push(imageMap.get(key));
    } else {
      const text = element.textContent.replace(/\s+/g, ' ').trim();
      if (!text || seen.has(text) || /^(Back to Top|Home|About|©)/.test(text)) continue;
      seen.add(text);
      const anchors = [...element.querySelectorAll('a[href]')];
      const enclosingLink = element.closest('a[href]');
      if (enclosingLink) anchors.push(enclosingLink);
      const links = anchors.map(link => ({ label: link.textContent.trim(), href: new URL(link.getAttribute('href'), `https://christinalin.design/${slug}`).href }));
      const isHeading = /^H/.test(element.tagName) && text.length < 150;
      blocks.push({ type: isHeading ? 'heading' : 'paragraph', text, ...(isHeading ? { level: Number(element.tagName.slice(1)) } : {}), ...(links.length ? { links } : {}) });
    }
  }
  await writeFile(`src/content/${slug}.json`, JSON.stringify(blocks, null, 2) + '\n');
  console.log(`${slug}: ${blocks.length} visible blocks`);
}
