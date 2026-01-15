#!/usr/bin/env node

/**
 * Script de régénération des endpoints API pour CybeDefend Documentation
 * 
 * Ce script :
 * 1. Nettoie le fichier openapi.json (supprime les doublons, corrige les structures)
 * 2. Régénère les fichiers MDX des endpoints avec Mintlify
 * 3. Met à jour le docs.json avec les nouveaux chemins
 * 4. Filtre les endpoints sensibles/internes
 * 5. Valide le résultat
 * 
 * Usage: node scripts/regenerate-api-docs.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const CONFIG = {
    openapiPath: path.join(__dirname, '..', 'v103', 'api-reference', 'openapi.json'),
    endpointDir: path.join(__dirname, '..', 'v103', 'api-reference', 'endpoint'),
    docsJsonPath: path.join(__dirname, '..', 'docs.json'),

    // Endpoints à EXCLURE de la documentation publique (patterns)
    excludedEndpoints: [
        // Billing & Subscription (sensible)
        /billing/,
        /entitlements/,
        /subscription/,
        /trial/,
        /portal/,
        /seats/,
        /addon/,

        // Webhooks (internes)
        /webhook/,

        // Callbacks OAuth (internes)
        /callback/,
        /install\/callback/,

        // Endpoints internes des scanners
        /post-project-results/,
        /post-project-sca-results/,
        /post-project-container-results/,
        /sca-results$/,
        /container-results$/,
        /\/results$/,

        // Endpoints de version (expose infos internes)
        /^version\//,
        /get-api-version/,

        // Endpoints batch/internes
        /batch/,
        /store-sbom/,
        /dockerhub\/search/,
        /patch-project-scan/,

        // Endpoints OAuth installation
        /generate-.*-oauth/,
        /oauth-installation/,

        // Vulnerability rules (interne)
        /vulnerabilitiesrules/,
        /vulnerability\/post/,
    ],

    // Tags/groupes à EXCLURE complètement
    excludedTags: [
        'Version',
        'Webhook',
        'Billing',
        'Vulnerability',
    ],

    // Mapping des tags vers des noms de groupes plus lisibles
    tagMapping: {
        'Organization': 'Organization',
        'Project': 'Project',
        'Team': 'Team',
        'Scan': 'Scan',
        'Results & Vulnerabilities': 'Results & Vulnerabilities',
        'AI Agent': 'AI Agent',
        'User': 'User',
        'GitHub Integration': 'GitHub Integration',
        'GitLab Integration': 'GitLab Integration',
        // Container Registry integrations
        'GCR Container Registry': 'Container Registry - Google (GCR)',
        'GitLab Container Registry': 'Container Registry - GitLab',
        'GitHub Container Registry': 'Container Registry - GitHub',
        'DockerHub Container Registry': 'Container Registry - Docker Hub',
        'ECR Container Registry': 'Container Registry - AWS (ECR)',
        'ACR Container Registry': 'Container Registry - Azure (ACR)',
        'Quay Container Registry': 'Container Registry - Quay',
        'Harbor Container Registry': 'Container Registry - Harbor',
        'JFrog Container Registry': 'Container Registry - JFrog',
    },

    // Ordre des groupes dans la navigation
    groupOrder: [
        'Organization',
        'Project',
        'Team',
        'Scan',
        'Results & Vulnerabilities',
        'AI Agent',
        'User',
        'GitHub Integration',
        'GitLab Integration',
        'Container Registry - Google (GCR)',
        'Container Registry - GitLab',
        'Container Registry - GitHub',
        'Container Registry - Docker Hub',
        'Container Registry - AWS (ECR)',
        'Container Registry - Azure (ACR)',
        'Container Registry - Quay',
        'Container Registry - Harbor',
        'Container Registry - JFrog',
    ],
};

// Couleurs pour le terminal
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
    console.log(`\n${colors.cyan}[${step}]${colors.reset} ${message}`);
}

function logSuccess(message) {
    console.log(`  ${colors.green}✓${colors.reset} ${message}`);
}

function logWarning(message) {
    console.log(`  ${colors.yellow}⚠${colors.reset} ${message}`);
}

function logError(message) {
    console.log(`  ${colors.red}✗${colors.reset} ${message}`);
}

// ============================================
// ÉTAPE 1: Nettoyage du fichier OpenAPI
// ============================================

function cleanOpenAPI() {
    logStep('1/5', 'Nettoyage du fichier OpenAPI...');

    const content = fs.readFileSync(CONFIG.openapiPath, 'utf8');
    const openapi = JSON.parse(content);

    let duplicatesRemoved = 0;
    let nestedArraysFixed = 0;

    // 1. Supprimer les paramètres dupliqués dans chaque endpoint
    for (const [pathKey, methods] of Object.entries(openapi.paths)) {
        for (const [method, operation] of Object.entries(methods)) {
            if (operation.parameters && Array.isArray(operation.parameters)) {
                const seen = new Set();
                const originalLength = operation.parameters.length;
                operation.parameters = operation.parameters.filter(param => {
                    if (!param.name || !param.in) return true;
                    const key = `${param.name}-${param.in}`;
                    if (seen.has(key)) {
                        return false;
                    }
                    seen.add(key);
                    return true;
                });
                duplicatesRemoved += originalLength - operation.parameters.length;
            }
        }
    }

    // 2. Corriger les arrays imbriqués dans les schémas
    function fixNestedArrays(obj, path = '') {
        if (typeof obj !== 'object' || obj === null) return;

        for (const key in obj) {
            const currentPath = path ? `${path}.${key}` : key;

            if (obj[key] && typeof obj[key] === 'object') {
                // Si c'est un array avec items qui est aussi un array avec un $ref
                if (obj[key].type === 'array' && obj[key].items) {
                    const items = obj[key].items;
                    if (items.type === 'array' && items.items && items.items.$ref) {
                        const desc = items.description || obj[key].description;
                        obj[key] = {
                            type: 'array',
                            items: items.items
                        };
                        if (desc) obj[key].description = desc;
                        nestedArraysFixed++;
                    }
                }
                fixNestedArrays(obj[key], currentPath);
            }
        }
    }

    fixNestedArrays(openapi);

    // Sauvegarder le fichier nettoyé
    fs.writeFileSync(CONFIG.openapiPath, JSON.stringify(openapi, null, 2));

    logSuccess(`Paramètres dupliqués supprimés: ${duplicatesRemoved}`);
    logSuccess(`Arrays imbriqués corrigés: ${nestedArraysFixed}`);

    return openapi;
}

// ============================================
// ÉTAPE 2: Régénération des endpoints
// ============================================

function regenerateEndpoints() {
    logStep('2/5', 'Régénération des fichiers MDX des endpoints...');

    // Supprimer l'ancien dossier endpoint
    if (fs.existsSync(CONFIG.endpointDir)) {
        fs.rmSync(CONFIG.endpointDir, { recursive: true, force: true });
        logSuccess('Ancien dossier endpoint supprimé');
    }

    // Régénérer avec Mintlify
    try {
        const result = execSync(
            `npx @mintlify/scraping@latest openapi-file ${CONFIG.openapiPath} -o ${CONFIG.endpointDir}`,
            {
                cwd: path.join(__dirname, '..'),
                encoding: 'utf8',
                stdio: ['pipe', 'pipe', 'pipe']
            }
        );
        logSuccess('Endpoints régénérés avec succès');
        return result;
    } catch (error) {
        if (error.stdout) {
            // Mintlify peut retourner un code d'erreur même en cas de succès partiel
            if (error.stdout.includes('navigation object suggestion')) {
                logSuccess('Endpoints régénérés avec succès');
                return error.stdout;
            }
        }
        logError(`Erreur lors de la régénération: ${error.message}`);
        if (error.stderr) {
            logError(error.stderr);
        }
        throw error;
    }
}

// ============================================
// ÉTAPE 3: Scanner les endpoints générés
// ============================================

function scanGeneratedEndpoints() {
    logStep('3/5', 'Scan des endpoints générés...');

    const endpoints = [];

    function scanDir(dir, basePath = '') {
        if (!fs.existsSync(dir)) return;

        const items = fs.readdirSync(dir);

        for (const item of items) {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                scanDir(fullPath, `${basePath}${item}/`);
            } else if (item.endsWith('.mdx')) {
                const relativePath = `${basePath}${item.replace('.mdx', '')}`;
                const group = basePath.replace(/\/$/, '') || 'root';
                endpoints.push({
                    path: `/v103/api-reference/endpoint/${relativePath}`,
                    group: group,
                    filename: item,
                    fullPath: fullPath,
                });
            }
        }
    }

    scanDir(CONFIG.endpointDir);

    logSuccess(`${endpoints.length} endpoints trouvés`);

    // Grouper par catégorie
    const grouped = {};
    for (const ep of endpoints) {
        if (!grouped[ep.group]) {
            grouped[ep.group] = [];
        }
        grouped[ep.group].push(ep);
    }

    for (const [group, eps] of Object.entries(grouped)) {
        log(`    - ${group}: ${eps.length} endpoints`, 'blue');
    }

    return endpoints;
}

// ============================================
// ÉTAPE 4: Filtrer les endpoints sensibles
// ============================================

function filterEndpoints(endpoints) {
    logStep('4/5', 'Filtrage des endpoints sensibles...');

    const filtered = [];
    const excluded = [];

    for (const ep of endpoints) {
        // Vérifier si le groupe est exclu
        const groupName = ep.group.toLowerCase();
        if (CONFIG.excludedTags.some(tag => groupName.includes(tag.toLowerCase()))) {
            excluded.push({ ...ep, reason: `Groupe exclu: ${ep.group}` });
            continue;
        }

        // Vérifier si l'endpoint match un pattern exclu
        const fullPath = ep.path.toLowerCase();
        const filename = ep.filename.toLowerCase();

        let isExcluded = false;
        for (const pattern of CONFIG.excludedEndpoints) {
            if (pattern.test(fullPath) || pattern.test(filename)) {
                excluded.push({ ...ep, reason: `Pattern: ${pattern}` });
                isExcluded = true;
                break;
            }
        }

        if (!isExcluded) {
            filtered.push(ep);
        }
    }

    logSuccess(`Endpoints conservés: ${filtered.length}`);
    logWarning(`Endpoints exclus: ${excluded.length}`);

    if (excluded.length > 0) {
        log('\n    Endpoints exclus:', 'yellow');
        for (const ep of excluded.slice(0, 10)) {
            log(`      - ${ep.filename} (${ep.reason})`, 'yellow');
        }
        if (excluded.length > 10) {
            log(`      ... et ${excluded.length - 10} autres`, 'yellow');
        }
    }

    return { filtered, excluded };
}

// ============================================
// ÉTAPE 5: Mettre à jour docs.json
// ============================================

function updateDocsJson(filteredEndpoints) {
    logStep('5/5', 'Mise à jour du fichier docs.json...');

    // Lire le docs.json actuel
    const docsContent = fs.readFileSync(CONFIG.docsJsonPath, 'utf8');
    const docs = JSON.parse(docsContent);

    // Grouper les endpoints par catégorie
    const groupedEndpoints = {};

    for (const ep of filteredEndpoints) {
        // Convertir le nom du dossier en nom de groupe lisible
        let groupName = ep.group
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        // Appliquer le mapping si disponible
        if (CONFIG.tagMapping[groupName]) {
            groupName = CONFIG.tagMapping[groupName];
        }

        // Cas spéciaux pour les noms avec &
        if (ep.group === 'results-&-vulnerabilities') {
            groupName = 'Results & Vulnerabilities';
        }
        if (ep.group === 'ai-agent') {
            groupName = 'AI Agent';
        }

        if (!groupedEndpoints[groupName]) {
            groupedEndpoints[groupName] = [];
        }
        groupedEndpoints[groupName].push(ep.path);
    }

    // Construire les nouveaux groupes pour l'API Reference
    const newApiGroups = [
        {
            group: 'API Documentation',
            pages: ['/v103/api-reference/introduction']
        }
    ];

    // Trier les groupes selon l'ordre défini
    const sortedGroupNames = Object.keys(groupedEndpoints).sort((a, b) => {
        const indexA = CONFIG.groupOrder.indexOf(a);
        const indexB = CONFIG.groupOrder.indexOf(b);
        if (indexA === -1 && indexB === -1) return a.localeCompare(b);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });

    for (const groupName of sortedGroupNames) {
        const pages = groupedEndpoints[groupName].sort();
        newApiGroups.push({
            group: groupName,
            pages: pages
        });
    }

    // Trouver et mettre à jour l'onglet API Reference
    const version = docs.navigation.versions.find(v => v.version === 'latest');
    if (!version) {
        throw new Error('Version "latest" non trouvée dans docs.json');
    }

    const apiTab = version.tabs.find(t => t.tab === 'API Reference');
    if (!apiTab) {
        throw new Error('Onglet "API Reference" non trouvé dans docs.json');
    }

    // Remplacer les groupes
    apiTab.groups = newApiGroups;

    // Sauvegarder
    fs.writeFileSync(CONFIG.docsJsonPath, JSON.stringify(docs, null, 2));

    logSuccess(`docs.json mis à jour avec ${newApiGroups.length} groupes`);

    // Afficher le résumé
    log('\n    Groupes dans la documentation:', 'green');
    for (const group of newApiGroups) {
        log(`      - ${group.group}: ${group.pages.length} pages`, 'green');
    }

    return docs;
}

// ============================================
// VALIDATION FINALE
// ============================================

function validateResult() {
    log('\n' + '='.repeat(50), 'cyan');
    logStep('VALIDATION', 'Vérification finale...');

    let errors = 0;
    let warnings = 0;

    // 1. Vérifier que docs.json est valide
    try {
        const docs = JSON.parse(fs.readFileSync(CONFIG.docsJsonPath, 'utf8'));
        logSuccess('docs.json est un JSON valide');

        // Vérifier la structure
        if (!docs.navigation?.versions) {
            logError('Structure de navigation manquante');
            errors++;
        }
    } catch (e) {
        logError(`docs.json invalide: ${e.message}`);
        errors++;
    }

    // 2. Vérifier que tous les fichiers référencés existent
    const docs = JSON.parse(fs.readFileSync(CONFIG.docsJsonPath, 'utf8'));
    const version = docs.navigation.versions.find(v => v.version === 'latest');
    const apiTab = version?.tabs.find(t => t.tab === 'API Reference');

    if (apiTab) {
        for (const group of apiTab.groups) {
            for (const page of group.pages) {
                const filePath = path.join(__dirname, '..', page + '.mdx');
                if (!fs.existsSync(filePath)) {
                    logWarning(`Fichier manquant: ${page}`);
                    warnings++;
                }
            }
        }

        if (warnings === 0) {
            logSuccess('Tous les fichiers référencés existent');
        }
    }

    // 3. Vérifier que openapi.json est valide
    try {
        const openapi = JSON.parse(fs.readFileSync(CONFIG.openapiPath, 'utf8'));
        logSuccess('openapi.json est un JSON valide');
        logSuccess(`${Object.keys(openapi.paths).length} endpoints dans openapi.json`);
    } catch (e) {
        logError(`openapi.json invalide: ${e.message}`);
        errors++;
    }

    // Résumé
    log('\n' + '='.repeat(50), 'cyan');
    if (errors === 0 && warnings === 0) {
        log('✅ SUCCÈS: Tout est prêt!', 'green');
        log('\nVous pouvez maintenant lancer: mintlify dev', 'green');
    } else if (errors === 0) {
        log(`⚠️  TERMINÉ avec ${warnings} avertissement(s)`, 'yellow');
        log('\nVérifiez les avertissements ci-dessus', 'yellow');
    } else {
        log(`❌ ÉCHEC: ${errors} erreur(s), ${warnings} avertissement(s)`, 'red');
        process.exit(1);
    }
}

// ============================================
// MAIN
// ============================================

async function main() {
    console.log('\n' + '='.repeat(50));
    log('🚀 CybeDefend API Documentation Generator', 'cyan');
    console.log('='.repeat(50));

    try {
        // Étape 1: Nettoyer OpenAPI
        cleanOpenAPI();

        // Étape 2: Régénérer les endpoints
        regenerateEndpoints();

        // Étape 3: Scanner les endpoints générés
        const endpoints = scanGeneratedEndpoints();

        // Étape 4: Filtrer les endpoints sensibles
        const { filtered } = filterEndpoints(endpoints);

        // Étape 5: Mettre à jour docs.json
        updateDocsJson(filtered);

        // Validation finale
        validateResult();

    } catch (error) {
        logError(`Erreur fatale: ${error.message}`);
        console.error(error);
        process.exit(1);
    }
}

main();
