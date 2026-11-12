const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function loadMapper(warnings) {
  const source = readFileSync(require.resolve('../lib/types/project/schema.ts'), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  });
  const context = { exports: {}, console: { warn: (...args) => warnings.push(args) } };
  vm.runInNewContext(outputText, context);
  return context.exports.mapProjectToProjectTagsSplit;
}

test('null Supabase fields do not break search or card title rendering; log identifies the record', () => {
  const warnings = [];
  const mapProject = loadMapper(warnings);
  const projects = [
    { id: 42, title: null, organization: null, tags: null, hours: null, model: null },
    { id: 43, title: 'Educación', organization: 'Escuela', tags: ' ITC, LAD ', hours: '120', model: 'Remoto' },
  ].map(mapProject);
  assert.equal(projects[0].title.length, 0);
  assert.equal(projects[0].tags.length, 0);
  assert.equal(projects[0].hours, '');
  assert.equal(projects[0].model, '');
  const results = projects.filter(p => p.title.toLowerCase().includes('escuela') || p.organization.toLowerCase().includes('escuela'));
  assert.equal(results.length, 1);
  assert.equal(results[0].id, 43);
  assert.equal(warnings.length, 1);
  assert.equal(warnings[0][1].projectId, 42);
  assert.deepEqual(Array.from(warnings[0][1].fields), ['title', 'organization', 'hours', 'model', 'tags']);
  assert.equal(projects[1].tags[0].name, 'ITC');
});

test('invalid non-string fields are normalized and empty tags are discarded', () => {
  const warnings = [];
  const mapProject = loadMapper(warnings);
  const project = mapProject({ id: 7, title: 123, organization: {}, tags: 'ITC, ,', hours: '80', model: 'Remoto' });
  assert.equal(project.title, '');
  assert.equal(project.organization, '');
  assert.equal(project.tags.length, 1);
  assert.equal(warnings[0][1].projectId, 7);
});
