const fs = require('fs');
const catalog = JSON.parse(fs.readFileSync('components.json', 'utf8'));
const existing = new Set(catalog.map(c => c.slug));

const toAdd = [
  {
    slug: 'icon-library',
    title: 'Icon Library',
    description: 'A searchable, filterable reference of all Lucide React icons in the design system. 160+ icons organized into 8 semantic groups: Navigation, Actions, Communication, Data & Files, Media & Layout, Status & Feedback, Shapes & Handles, and People & Org. Search by name, filter by group, change preview size from 12–24px, and click any icon to copy its exact import statement.',
    category: 'Foundations',
    tags: ['icons', 'lucide', 'reference', 'library', 'search', 'grid', 'catalog'],
    style: 'functional',
  },
  {
    slug: 'type-specimen',
    title: 'Type Specimen',
    description: 'Full type specimen for the Inter typeface across all 9 weights (Thin to Black). Four tabs: Weights — pangram at every weight with Tailwind class annotation; Scale — px sizes from 10–48 with semantic labels; Charset — alphabet, digits, punctuation, and special characters at three weights; Paragraph — Display, Heading, Body, and Caption rendering contexts plus a Sans + Mono pairing example. Toggle between Sans, Mono, and Serif faces.',
    category: 'Foundations',
    tags: ['typography', 'font', 'type-specimen', 'weights', 'Inter', 'variable-font', 'scale'],
    style: 'functional',
  },
];

let added = 0;
for (const item of toAdd) {
  if (existing.has(item.slug)) { console.log('skip:', item.slug); continue; }
  const codePath = 'components/' + item.slug + '.tsx';
  let code = '';
  try { code = fs.readFileSync(codePath, 'utf8'); } catch(e) { console.warn('no file for', item.slug); continue; }
  catalog.push({
    ...item,
    sourceUrl: 'https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/' + item.slug + '.tsx',
    code,
  });
  added++;
}

fs.writeFileSync('components.json', JSON.stringify(catalog, null, 2));
console.log('Added', added, 'components. Total:', catalog.length);
