import { parseHTML } from 'linkedom';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const origin = 'https://christinalin.design';
const slugs = ['accessibilityservices', 'cards', 'stitchfit', 'infosecurity', 'lore', 'basementboutiqstudio', 'zodiacanimals', 'architecture'];
const assetCache = new Map();
await mkdir('public/images', { recursive: true });
await mkdir('src/content', { recursive: true });
await mkdir('.migration', { recursive: true });
async function download(url, name) {
  const canonical = new URL(url);
  canonical.search = '';
  if (assetCache.has(canonical.href)) return assetCache.get(canonical.href);
  const extension = path.extname(canonical.pathname) || '.png';
  const destination = `images/${name}${extension}`;
  const response = await fetch(canonical);
  if (!response.ok) throw new Error(`Asset ${response.status}: ${canonical}`);
  await writeFile(`public/${destination}`, Buffer.from(await response.arrayBuffer()));
  assetCache.set(canonical.href, destination);
  return destination;
}
async function readPage(slug) {
  const response = await fetch(`${origin}/${slug}`);
  if (!response.ok) throw new Error(`Page ${slug}: ${response.status}`);
  const html = await response.text();
  await writeFile(`.migration/${slug || 'home'}.html`, html);
  return parseHTML(html).document;
}
const home = await readPage('');
const logo = await download(home.querySelector('a[href="./"] img').src, 'christina-lin-logo');
const projects = [];
for (const slug of slugs) {
  const card = home.querySelector(`a[href="./${slug}"]`);
  const labels = [...card.querySelectorAll('h1,h2,h3,h4,h5,h6,p')].map(node => node.textContent.trim()).filter(Boolean);
  const title = labels[0];
  const cover = await download(card.querySelector('img').src, `${slug}-cover`);
  projects.push({ slug, title, category: projects.length < 4 ? 'ux' : 'other', tags: labels.slice(1), cover });
}
for (const slug of [...slugs, 'about']) {
  const document = await readPage(slug);
  const seen = new Set();
  const blocks = [];
  let imageIndex = 0;
  for (const element of document.querySelectorAll('#main h1, #main h2, #main h3, #main h4, #main h5, #main h6, #main p, #main li, #main img')) {
    if (element.closest('a')?.getAttribute('href')?.startsWith('./')) continue;
    if (element.parentElement?.closest('li')) continue;
    if (element.tagName === 'IMG') {
      if (!element.src.startsWith('https://framerusercontent.com/images/')) continue;
      const key = element.src.split('?')[0];
      if (seen.has(key) || key.includes('Evt60IqBfTVsbNgVrWEWsKO0kLY')) continue;
      seen.add(key);
      blocks.push({ type: 'image', src: await download(element.src, `${slug}-${++imageIndex}`), alt: element.alt || '' });
    } else {
      const text = element.textContent.replace(/\s+/g, ' ').trim();
      if (!text || seen.has(text) || /^(Back to Top|Home|About|©|U X D E S I G N P R O J E C T S|O T H E R P R O J E C T S)/.test(text)) continue;
      seen.add(text);
      const links = [...element.querySelectorAll('a[href]')].map(link => ({ label: link.textContent, href: new URL(link.getAttribute('href'), `${origin}/${slug}`).href }));
      blocks.push({ type: /^H/.test(element.tagName) ? 'heading' : 'paragraph', text, level: Number(element.tagName.slice(1)) || undefined, ...(links.length ? { links } : {}) });
    }
  }
  await writeFile(`src/content/${slug}.json`, JSON.stringify(blocks, null, 2) + '\n');
  console.log(`${slug}: ${blocks.length} blocks, ${imageIndex} images`);
}
await writeFile('src/content/projects.json', JSON.stringify(projects, null, 2) + '\n');
await writeFile('src/content/site.json', JSON.stringify({ name: 'Christina Lin', role: 'UX Designer.', introduction: "Welcome to my website! I'm a UX and Visual Designer with 4 years of experience creating digital products and using design to create better experiences.", logo, linkedin: home.querySelector('a[href*="linkedin.com"]').href, resume: home.querySelector('a[href*="drive.google.com"]').href }, null, 2) + '\n');
await import('./clean-import.mjs');
