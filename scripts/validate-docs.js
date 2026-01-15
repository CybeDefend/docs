#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const docsPath = path.join(__dirname, '..', 'docs.json');
const docs = JSON.parse(fs.readFileSync(docsPath, 'utf8'));

const version = docs.navigation.versions.find(v => v.version === 'latest');
const apiTab = version.tabs.find(t => t.tab === 'API Reference');

let missing = 0;
let total = 0;

console.log('🔍 Vérification des fichiers référencés dans docs.json...\n');

function checkPage(page) {
    if (typeof page === 'string') {
        total++;
        const pagePath = page.startsWith('/') ? page.slice(1) : page;
        const filePath = path.join(__dirname, '..', pagePath + '.mdx');

        if (!fs.existsSync(filePath)) {
            console.log('❌ Manquant:', pagePath + '.mdx');
            missing++;
        }
    } else if (typeof page === 'object' && page.pages) {
        // C'est un sous-groupe
        for (const subPage of page.pages) {
            checkPage(subPage);
        }
    }
}

for (const group of apiTab.groups) {
    for (const page of group.pages) {
        checkPage(page);
    }
}

console.log('');
console.log('📊 Résultats:');
console.log('   Total pages:', total);
console.log('   Manquantes:', missing);
console.log('');

if (missing === 0) {
    console.log('✅ Tous les fichiers existent!');
} else {
    console.log('⚠️  Certains fichiers manquent');
    process.exit(1);
}
