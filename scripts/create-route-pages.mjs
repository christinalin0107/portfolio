import { readFile, mkdir, writeFile } from 'node:fs/promises';
const projects = JSON.parse(await readFile('src/content/projects.json', 'utf8'));
const html = await readFile('dist/index.html', 'utf8');
for (const route of [...projects.map(project => project.slug), 'about']) {
  await mkdir(`dist/${route}`, { recursive: true });
  await writeFile(`dist/${route}/index.html`, html);
}
await writeFile('dist/404.html', html);
await writeFile('dist/.nojekyll', '');
