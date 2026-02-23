#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const v1 = JSON.parse(fs.readFileSync(path.join(__dirname, '../latest/api-reference/openapi.json')));
const v2 = JSON.parse(fs.readFileSync(path.join(__dirname, '../latest/api-reference/openaiv2.json')));

const v1Paths = new Set(Object.keys(v1.paths));
const v2Paths = new Set(Object.keys(v2.paths));

const newPaths = [...v2Paths].filter(p => !v1Paths.has(p));
const removedPaths = [...v1Paths].filter(p => !v1Paths.has(p)); // kept for reference

console.log('NEW in v2 (' + newPaths.length + '):');
newPaths.forEach(p => {
  const methods = Object.keys(v2.paths[p]);
  const tag = v2.paths[p][methods[0]] && v2.paths[p][methods[0]].tags ? v2.paths[p][methods[0]].tags[0] : 'none';
  console.log('  ' + methods.join(',').toUpperCase() + '  ' + p + '  [tag: ' + tag + ']');
});

console.log('\nAll v2 paths with methods and summaries:');
[...v2Paths].forEach(p => {
  const methods = Object.keys(v2.paths[p]);
  methods.forEach(m => {
    const op = v2.paths[p][m];
    const summary = op && op.summary ? op.summary : '(no summary)';
    const tag = op && op.tags ? op.tags[0] : 'no-tag';
    const isNew = !v1Paths.has(p) ? ' [NEW]' : '';
    console.log('  [' + tag + '] ' + m.toUpperCase() + ' ' + p + ' — ' + summary + isNew);
  });
});
