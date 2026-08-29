import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);

async function read(relativePath) {
  return readFile(new URL(relativePath, root), 'utf8');
}

function block(source, start, end) {
  return source.slice(source.indexOf(start), source.indexOf(end));
}

test('brand palette and functional tokens are centralized', async () => {
  const css = await read('app/globals.css');
  for (const color of ['#18202a', '#f7f8fa', '#142b4a', '#237a6b', '#c89b4a']) {
    assert.match(css, new RegExp(color));
  }
  for (const token of [
    '--color-surface',
    '--color-surface-elevated',
    '--color-border-strong',
    '--color-muted-text',
    '--color-success',
    '--color-warning',
    '--color-error',
  ]) {
    assert.ok(css.includes(token), `missing token ${token}`);
  }
});

test('home data contains the requested service and process counts', async () => {
  const source = await read('lib/home-data.ts');
  const helps = block(source, 'export const helpOptions', 'export const legalServices');
  const legal = block(source, 'export const legalServices', 'export const expertServices');
  const expert = block(source, 'export const expertServices', 'export const processSteps');
  const process = block(source, 'export const processSteps', 'export const benefits');
  const benefits = block(source, 'export const benefits', 'export const securityFeatures');
  const security = block(source, 'export const securityFeatures', 'export const quickFormCopy');

  assert.equal((helps.match(/\bid:\s*'/g) ?? []).length, 8);
  assert.equal((legal.match(/\bid:\s*'/g) ?? []).length, 8);
  assert.equal((expert.match(/\bnumber:\s*'/g) ?? []).length, 8);
  assert.equal((process.match(/\bnumber:\s*'/g) ?? []).length, 8);
  assert.equal((benefits.match(/\btitle:\s*'/g) ?? []).length, 6);
  assert.equal((security.match(/\btitle:\s*'/g) ?? []).length, 6);
});

test('document language, direction, and reduced motion are present', async () => {
  const [layout, globalCss] = await Promise.all([
    read('app/layout.tsx'),
    read('app/globals.css'),
  ]);
  assert.match(layout, /lang="fa-IR"/);
  assert.match(layout, /dir="rtl"/);
  assert.match(globalCss, /prefers-reduced-motion:\s*reduce/);
});

test('all in-page header targets exist in the rendered home source', async () => {
  const sources = await Promise.all([
    read('app/page.tsx'),
    read('components/site-header.tsx'),
    read('components/home/hero.tsx'),
    read('components/home/need-and-inquiry.tsx'),
    read('components/home/process-section.tsx'),
    read('components/home/static-sections.tsx'),
  ]);
  const combined = sources.join('\n');
  const header = sources[1];
  const targets = [...header.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
  for (const target of new Set(targets)) {
    assert.ok(
      combined.includes(`id="${target}"`),
      `header target #${target} has no matching section id`,
    );
  }
});

test('quick inquiry fails transparently when no API base URL is configured', async () => {
  const source = await read('lib/api-client.ts');
  assert.match(source, /if \(!apiBaseUrl\)/);
  assert.match(source, /ApiUnavailableError/);
  assert.doesNotMatch(source, /localhost|mock|fake/i);
});
