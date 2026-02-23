#!/usr/bin/env node
/**
 * Final cleanup: categorize uncategorized endpoints and reorganize groups 
 * after mintlify sync rewrote navigation.
 */
const fs = require('fs');
const path = require('path');

const docsPath = path.join(__dirname, '..', 'docs.json');
const docs = JSON.parse(fs.readFileSync(docsPath, 'utf8'));

const version = docs.navigation.versions.find(v => v.version === 'latest');
const apiTab = version.tabs.find(t => t.tab === 'API Reference');
const groups = apiTab.groups;

// Helper: get group by name
const group = (name) => groups.find(g => g.group === name);

// ─── 1. Vulnerabilities > Manage — add batch update ───────────────────────────
const manageGroup = group('Vulnerabilities').pages.find(p => p.group === 'Manage');
const batchPage = 'latest/api-reference/endpoint/results-&-vulnerabilities/batch-update-multiple-vulnerabilities';
if (!manageGroup.pages.includes(batchPage)) {
  manageGroup.pages.push(batchPage);
  console.log('✅ Added batch-update-multiple-vulnerabilities to Vulnerabilities > Manage');
}

// ─── 2. Vulnerabilities > Container — add grouped images ──────────────────────
const containerVulnGroup = group('Vulnerabilities').pages.find(p => p.group === 'Container');
const containerGroupedPage = 'latest/api-reference/endpoint/results-&-vulnerabilities/get-container-images-grouped-by-repository';
if (!containerVulnGroup.pages.includes(containerGroupedPage)) {
  containerVulnGroup.pages.push(containerGroupedPage);
  console.log('✅ Added get-container-images-grouped-by-repository to Vulnerabilities > Container');
}

// ─── 3. DockerHub Container Registry — add search images ──────────────────────
const dockerhubGroup = group('DockerHub Container Registry') || groups.find(g => g.group.toLowerCase().includes('dockerhub'));
if (dockerhubGroup) {
  const searchPage = 'latest/api-reference/endpoint/results-&-vulnerabilities/get-dockerhubsearchimages';
  if (!dockerhubGroup.pages.includes(searchPage)) {
    dockerhubGroup.pages.push(searchPage);
    console.log('✅ Added get-dockerhubsearchimages to DockerHub Container Registry group');
  }
} else {
  console.log('⚠  DockerHub group not found, placing in Container Registries bucket');
  // fallback: look for Container Registries group
  const crGroup = groups.find(g => g.group === 'Container Registries');
  if (crGroup) {
    crGroup.pages.push('latest/api-reference/endpoint/results-&-vulnerabilities/get-dockerhubsearchimages');
  }
}

// ─── 4. User group — reorganize with Personal Access Tokens subgroup ──────────
const userGroupIdx = groups.findIndex(g => g.group === 'User');
const userGroup = groups[userGroupIdx];
const profilePages = [
  'latest/api-reference/endpoint/user/get-user-profile',
  'latest/api-reference/endpoint/user/update-user-profile',
];
const patPages = [
  'latest/api-reference/endpoint/user/list-personal-access-tokens',
  'latest/api-reference/endpoint/user/create-a-personal-access-token',
  'latest/api-reference/endpoint/user/delete-a-personal-access-token',
  'latest/api-reference/endpoint/user/rename-a-personal-access-token',
  'latest/api-reference/endpoint/version/get-logto-app-ids-for-native-clients',
];

// Rebuild User group cleanly
groups[userGroupIdx] = {
  group: 'User',
  pages: [
    ...profilePages,
    {
      group: 'Personal Access Tokens',
      pages: patPages
    }
  ]
};
console.log('✅ Reorganized User group with Personal Access Tokens subgroup');

// ─── 5. Add SSO group at the end ──────────────────────────────────────────────
if (!groups.find(g => g.group === 'SSO')) {
  groups.push({
    group: 'SSO',
    pages: [
      'latest/api-reference/endpoint/sso/resolve-enterprise-sso-connectors-by-email-domain'
    ]
  });
  console.log('✅ Added SSO group');
} else {
  // Ensure correct file reference
  const ssoGroup = groups.find(g => g.group === 'SSO');
  const correct = 'latest/api-reference/endpoint/sso/resolve-enterprise-sso-connectors-by-email-domain';
  if (!ssoGroup.pages.includes(correct)) {
    ssoGroup.pages = ssoGroup.pages.filter(p => !p.includes('sso-connectors'));
    ssoGroup.pages.push(correct);
    console.log('✅ Fixed SSO group file reference');
  }
}

// ─── Write back ───────────────────────────────────────────────────────────────
fs.writeFileSync(docsPath, JSON.stringify(docs, null, 2) + '\n');
console.log('\n✅ docs.json finalized');
