#!/usr/bin/env node
/**
 * Update docs.json to add new API endpoints from openaiv2.json
 */
const fs = require('fs');
const path = require('path');

const docsPath = path.join(__dirname, '..', 'docs.json');
const docs = JSON.parse(fs.readFileSync(docsPath, 'utf8'));

const version = docs.navigation.versions.find(v => v.version === 'latest');
const apiTab = version.tabs.find(t => t.tab === 'API Reference');
const groups = apiTab.groups;

// ─── 1. User: add "Personal Access Tokens" subgroup ───────────────────────────
const userGroup = groups.find(g => g.group === 'User');
if (!userGroup.pages.find(p => p.group === 'Personal Access Tokens')) {
  userGroup.pages.push({
    group: 'Personal Access Tokens',
    pages: [
      'latest/api-reference/endpoint/user/list-personal-access-tokens',
      'latest/api-reference/endpoint/user/create-a-personal-access-token',
      'latest/api-reference/endpoint/user/delete-a-personal-access-token',
      'latest/api-reference/endpoint/user/rename-a-personal-access-token',
      'latest/api-reference/endpoint/version/get-client-app-ids-for-native-clients',
    ]
  });
  console.log('✅ Added Personal Access Tokens subgroup under User');
} else {
  console.log('⏭  Personal Access Tokens subgroup already exists');
}

// ─── 2. Scanning: add container scan start ────────────────────────────────────
const scanGroup = groups.find(g => g.group === 'Scanning');
const containerScanPage = 'latest/api-reference/endpoint/scan/start-a-public-container-scan';
if (!scanGroup.pages.includes(containerScanPage)) {
  scanGroup.pages.push(containerScanPage);
  console.log('✅ Added start-a-public-container-scan to Scanning group');
} else {
  console.log('⏭  start-a-public-container-scan already in Scanning group');
}

// ─── 3. Vulnerabilities > Manage: add batch update ────────────────────────────
const vulnGroup = groups.find(g => g.group === 'Vulnerabilities');
const manageGroup = vulnGroup.pages.find(p => p.group === 'Manage');
const batchUpdatePage = 'latest/api-reference/endpoint/results-&-vulnerabilities/batch-update-multiple-vulnerabilities';
if (manageGroup && !manageGroup.pages.includes(batchUpdatePage)) {
  manageGroup.pages.push(batchUpdatePage);
  console.log('✅ Added batch-update-multiple-vulnerabilities to Vulnerabilities > Manage');
} else {
  console.log('⏭  batch-update already in Manage or Manage group not found');
}

// ─── 4. Add SSO group at the end ──────────────────────────────────────────────
if (!groups.find(g => g.group === 'SSO')) {
  groups.push({
    group: 'SSO',
    pages: [
      'latest/api-reference/endpoint/sso/list-sso-connectors'
    ]
  });
  console.log('✅ Added SSO group');
} else {
  console.log('⏭  SSO group already exists');
}

// ─── Write back ───────────────────────────────────────────────────────────────
fs.writeFileSync(docsPath, JSON.stringify(docs, null, 2) + '\n');
console.log('\n✅ docs.json updated successfully');
