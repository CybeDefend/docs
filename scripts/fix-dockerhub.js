#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const docsPath = path.join(__dirname, '..', 'docs.json');
const d = JSON.parse(fs.readFileSync(docsPath));
const ver = d.navigation.versions.find(v => v.version === 'latest');
const tab = ver.tabs.find(t => t.tab === 'API Reference');
const cr = tab.groups.find(g => g.group === 'Container Registries');
const searchPage = 'latest/api-reference/endpoint/results-&-vulnerabilities/get-dockerhubsearchimages';

// Remove from top-level of Container Registries
cr.pages = cr.pages.filter(p => p !== searchPage);

// Add to Docker Hub subgroup
const dockerHub = cr.pages.find(p => p.group === 'Docker Hub');
if (dockerHub && !dockerHub.pages.includes(searchPage)) {
  dockerHub.pages.push(searchPage);
  console.log('✅ Moved get-dockerhubsearchimages to Docker Hub subgroup');
} else {
  console.log('Already in place or Docker Hub subgroup not found');
}

fs.writeFileSync(docsPath, JSON.stringify(d, null, 2) + '\n');
console.log('✅ docs.json updated');
