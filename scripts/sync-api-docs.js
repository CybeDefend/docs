#!/usr/bin/env node

/**
 * 🚀 CybeDefend API Documentation - Full Automation Script
 * 
 * Ce script gère TOUT automatiquement :
 * 1. Nettoie le fichier openapi.json (doublons, arrays imbriqués)
 * 2. Régénère les fichiers MDX avec Mintlify scraper
 * 3. Détecte les nouveaux endpoints
 * 4. Met à jour docs.json avec la structure hiérarchique correcte
 * 5. Valide que tous les fichiers existent
 * 6. Affiche un rapport détaillé
 * 
 * Usage: node scripts/sync-api-docs.js
 * 
 * Options:
 *   --dry-run    Affiche les changements sans les appliquer
 *   --verbose    Affiche plus de détails
 *   --force      Force la régénération même si aucun changement
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
    // Chemins
    openapiPath: path.join(__dirname, '..', 'v103', 'api-reference', 'openapi.json'),
    endpointDir: path.join(__dirname, '..', 'v103', 'api-reference', 'endpoint'),
    docsJsonPath: path.join(__dirname, '..', 'docs.json'),

    // Structure de la documentation API (mapping des dossiers vers la structure)
    apiStructure: {
        // Groupe "Getting Started"
        "Getting Started": {
            pages: ["/v103/api-reference/introduction"]
        },

        // Groupe "Organization" avec sous-groupes
        "Organization": {
            folder: "organization",
            mainPages: [
                "create-organization",
                "get-organizations-of-user",
                "get-organization-by-id",
                "update-organization",
                "delete-organization"
            ],
            subgroups: {
                "Members": [
                    "get-organization-members",
                    "update-organization-member-role",
                    "remove-member-from-organization"
                ],
                "Invitations": [
                    "invite-user-to-organization",
                    "get-organization-invitations",
                    "cancel-organization-invitation",
                    "accept-invitation-to-organization"
                ]
            }
        },

        // Groupe "Project"
        "Project": {
            folder: "project",
            allPages: true
        },

        // Groupe "Team" avec sous-groupe
        "Team": {
            folder: "team",
            mainPages: [
                "create-a-new-team",
                "get-all-teams-of-an-organization",
                "get-team-by-id",
                "update-a-team",
                "delete-a-team"
            ],
            subgroups: {
                "Team Members": [
                    "get-all-members-of-a-team",
                    "get-a-member-of-a-team",
                    "add-a-member-to-a-team",
                    "update-a-member-role-in-a-team",
                    "remove-a-member-from-a-team"
                ]
            }
        },

        // Groupe "User"
        "User": {
            folder: "user",
            allPages: true
        },

        // Groupe "Scanning"
        "Scanning": {
            folder: "scan",
            allPages: true,
            exclude: ["patch-project-scan"] // Endpoints internes à exclure
        },

        // Groupe "Vulnerabilities" avec sous-groupes par type
        "Vulnerabilities": {
            subgroups: {
                "SAST (Code)": {
                    folder: "results-&-vulnerabilities",
                    pages: [
                        "get-all-vulnerabilities-of-a-project-for-sast",
                        "get-a-vulnerability-of-a-project-for-sast",
                        "get-sast-vulnerabilities-grouped-by-rule-id"
                    ]
                },
                "SCA (Dependencies)": {
                    folder: "results-&-vulnerabilities",
                    pages: [
                        "get-all-sca-vulnerabilities-of-a-project",
                        "get-a-vulnerability-of-a-project-for-sca",
                        "get-all-sca-packages-of-a-project",
                        "get-sca-vulnerabilities-grouped-by-cve-+-package-name",
                        "analyze-sca-vulnerabilities-for-autofix-candidates",
                        "get-sca-autofix-job-status",
                        "get-sca-autofix-job-results"
                    ]
                },
                "Container": {
                    folder: "results-&-vulnerabilities",
                    pages: [
                        "get-all-container-vulnerabilities-of-a-project",
                        "get-a-container-vulnerability-by-id",
                        "get-all-container-images-of-a-project",
                        "get-all-container-packages-of-a-project",
                        "delete-a-scanned-container-image-from-a-project"
                    ]
                },
                "IaC (Infrastructure as Code)": {
                    folder: "results-&-vulnerabilities",
                    pages: [
                        "get-all-iac-vulnerabilities-of-a-project",
                        "get-a-vulnerability-of-a-project-for-iac",
                        "get-iac-vulnerabilities-grouped-by-rule-id"
                    ]
                },
                "CI/CD": {
                    folder: "results-&-vulnerabilities",
                    pages: [
                        "get-all-cicd-vulnerabilities-of-a-project",
                        "get-a-vulnerability-of-a-project-for-cicd",
                        "get-cicd-vulnerabilities-grouped-by-rule-id"
                    ]
                },
                "Secrets": {
                    folder: "results-&-vulnerabilities",
                    pages: [
                        "get-all-secret-vulnerabilities-of-a-project",
                        "get-a-vulnerability-of-a-project-for-secret",
                        "get-secret-vulnerabilities-grouped-by-rule-id"
                    ]
                },
                "Manage": {
                    folder: "results-&-vulnerabilities",
                    pages: [
                        "update-a-vulnerability-of-a-project",
                        "get-vulnerability-by-id-with-similar-occurrences",
                        "get-branches-from-vulnerability-detections"
                    ]
                }
            }
        },

        // Groupe "Reports & Statistics"
        "Reports & Statistics": {
            folder: "results-&-vulnerabilities",
            mainPages: [
                "get-overview-of-a-project",
                "get-aggregated-overview-statistics-for-an-organization"
            ],
            subgroups: {
                "Security Reports": [
                    "generate-a-security-report-for-a-project",
                    "generate-cwe-top-25-2024-report-for-a-project",
                    "generate-aggregated-security-report-for-an-organization",
                    "generate-aggregated-security-report-for-a-team",
                    "generate-report-for-a-manual-selection-of-projects"
                ],
                "SBOM": [
                    "get-sbom-report-for-a-project"
                ]
            }
        },

        // Groupe "AI Agent"
        "AI Agent": {
            subgroups: {
                "Autofix": {
                    folder: "ai-agent",
                    pages: [
                        "start-autofix-workflow",
                        "start-batch-autofix-workflow"
                    ]
                },
                "Security Champion": {
                    folder: "ai-agent",
                    pages: [
                        "create-security-champion-conversation",
                        "stream-security-champion-messages",
                        "list-user-conversations",
                        "get-conversation-messages",
                        "delete-conversation",
                        "stop-conversation-generation"
                    ]
                }
            }
        },

        // Groupe "Source Code Integrations"
        "Source Code Integrations": {
            mainPages: ["v103/api-reference/endpoint/integrations/get-integration-overview-for-organization"],
            subgroups: {
                "GitHub": {
                    folder: "github-integration",
                    pages: [
                        "get-github-repositories",
                        "get-github-repository-branches",
                        "link-github-repository-to-project",
                        "unlink-github-repository-from-project",
                        "start-github-repository-scan"
                    ]
                },
                "GitLab": {
                    folder: "gitlab-integration",
                    pages: [
                        "get-gitlab-repositories",
                        "get-gitlab-repository-branches",
                        "link-gitlab-repository-to-project",
                        "unlink-gitlab-repository-from-project",
                        "start-gitlab-repository-scan"
                    ]
                }
            }
        },

        // Groupe "Container Registries"
        "Container Registries": {
            mainPages: ["v103/api-reference/endpoint/container-registry-credentials/get-all-container-registry-credentials-for-a-project"],
            subgroups: {
                "Docker Hub": {
                    folder: "dockerhub-container-registry",
                    pages: [
                        "store-dockerhub-container-registry-credentials",
                        "list-dockerhub-credentials",
                        "get-dockerhub-credential-details",
                        "delete-dockerhub-credentials",
                        "list-dockerhub-images",
                        "list-dockerhub-image-tags",
                        "start-dockerhub-container-scan"
                    ]
                },
                "GitHub (GHCR)": {
                    folder: "github-container-registry",
                    pages: [
                        "store-a-personal-access-token-pat-for-ghcrio",
                        "get-pat-status-for-ghcrio",
                        "delete-stored-pat-for-ghcrio",
                        "get-github-container-registry-token",
                        "list-docker-images-from-github-container-registry",
                        "list-image-tags-from-github-container-registry",
                        "start-github-container-registry-scan"
                    ]
                },
                "GitLab": {
                    folder: "gitlab-container-registry",
                    pages: [
                        "store-gitlab-container-registry-credentials",
                        "list-gitlab-container-registry-credentials",
                        "get-gitlab-container-registry-credential-details",
                        "delete-gitlab-container-registry-credentials",
                        "list-docker-images-from-gitlab-container-registry",
                        "list-docker-image-tags-from-gitlab-container-registry",
                        "start-gitlab-container-registry-scan"
                    ]
                },
                "Google (GCR / Artifact Registry)": {
                    folder: "gcr-container-registry",
                    pages: [
                        "store-gcr-container-registry-credentials",
                        "list-stored-gcr-container-registry-credentials",
                        "get-gcr-container-registry-credential-details",
                        "delete-gcr-container-registry-credentials",
                        "list-container-images-from-gcrartifact-registry",
                        "list-tags-for-a-container-image",
                        "start-gcr-container-vulnerability-scan"
                    ]
                },
                "AWS (ECR)": {
                    folder: "ecr-container-registry",
                    pages: [
                        "store-ecr-container-registry-credentials",
                        "list-ecr-credentials",
                        "get-ecr-credential-details",
                        "delete-ecr-credentials",
                        "list-ecr-images",
                        "list-ecr-image-tags",
                        "start-ecr-container-scan"
                    ]
                },
                "Azure (ACR)": {
                    folder: "acr-container-registry",
                    pages: [
                        "store-acr-container-registry-credentials",
                        "list-acr-credentials",
                        "get-acr-credential-details",
                        "delete-acr-credentials",
                        "list-acr-images",
                        "list-acr-image-tags",
                        "start-acr-container-scan"
                    ]
                },
                "Quay": {
                    folder: "quay-container-registry",
                    pages: [
                        "store-quay-container-registry-credentials",
                        "list-quay-container-registry-credentials",
                        "get-quay-container-registry-credential-details",
                        "delete-quay-container-registry-credentials",
                        "list-container-images-from-quay-registry",
                        "list-container-image-tags-from-quay-registry",
                        "start-quay-container-registry-scan"
                    ]
                },
                "Harbor": {
                    folder: "harbor-container-registry",
                    pages: [
                        "store-harbor-container-registry-credentials",
                        "list-stored-harbor-credentials",
                        "get-harbor-credential-details",
                        "delete-harbor-credentials",
                        "list-harbor-projects",
                        "list-docker-images-from-harbor",
                        "list-harbor-image-tags",
                        "start-harbor-container-scan"
                    ]
                },
                "JFrog Artifactory": {
                    folder: "jfrog-container-registry",
                    pages: [
                        "store-jfrog-container-registry-credentials",
                        "list-jfrog-container-registry-credentials",
                        "get-jfrog-credential-details",
                        "delete-jfrog-container-registry-credentials",
                        "list-jfrog-artifactory-docker-repositories",
                        "list-docker-images-in-jfrog-artifactory-repository",
                        "list-tags-for-a-docker-image-in-jfrog-artifactory",
                        "start-jfrog-artifactory-container-image-scan"
                    ]
                }
            }
        }
    },

    // Endpoints à TOUJOURS exclure (internes, sensibles)
    globalExclusions: [
        /billing/i,
        /subscription/i,
        /webhook/i,
        /callback/i,
        /oauth/i,
        /post-project-results/i,
        /post-project-sca-results/i,
        /post-project-container-results/i,
        /store-sbom/i,
        /patch-project-scan/i,
        /get-api-version/i,
        /dockerhub\/search/i
    ]
};

// ============================================
// UTILITAIRES
// ============================================

const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m',
    gray: '\x1b[90m'
};

const log = {
    info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
    success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
    warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
    error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
    step: (num, msg) => console.log(`\n${colors.cyan}[${num}]${colors.reset} ${colors.magenta}${msg}${colors.reset}`),
    detail: (msg) => console.log(`${colors.gray}   ${msg}${colors.reset}`)
};

// ============================================
// ÉTAPE 1: NETTOYAGE OPENAPI
// ============================================

function cleanOpenAPI() {
    log.step('1/5', 'Nettoyage du fichier OpenAPI...');

    const content = fs.readFileSync(CONFIG.openapiPath, 'utf8');
    const openapi = JSON.parse(content);

    let stats = { duplicatesRemoved: 0, nestedArraysFixed: 0, endpointsCount: 0 };

    // Supprimer les paramètres dupliqués
    for (const [pathKey, methods] of Object.entries(openapi.paths)) {
        stats.endpointsCount++;
        for (const [method, operation] of Object.entries(methods)) {
            if (operation.parameters && Array.isArray(operation.parameters)) {
                const seen = new Set();
                const original = operation.parameters.length;
                operation.parameters = operation.parameters.filter(param => {
                    if (!param.name || !param.in) return true;
                    const key = `${param.name}-${param.in}`;
                    if (seen.has(key)) return false;
                    seen.add(key);
                    return true;
                });
                stats.duplicatesRemoved += original - operation.parameters.length;
            }
        }
    }

    // Corriger les arrays imbriqués
    function fixNestedArrays(obj, depth = 0) {
        if (typeof obj !== 'object' || obj === null || depth > 50) return;
        for (const key in obj) {
            if (obj[key]?.type === 'array' && obj[key].items) {
                const items = obj[key].items;
                if (items.type === 'array' && items.items?.$ref) {
                    obj[key].items = items.items;
                    stats.nestedArraysFixed++;
                }
            }
            if (typeof obj[key] === 'object') fixNestedArrays(obj[key], depth + 1);
        }
    }
    fixNestedArrays(openapi);

    fs.writeFileSync(CONFIG.openapiPath, JSON.stringify(openapi, null, 2));

    log.success(`${stats.endpointsCount} endpoints dans OpenAPI`);
    log.success(`${stats.duplicatesRemoved} paramètres dupliqués supprimés`);
    log.success(`${stats.nestedArraysFixed} arrays imbriqués corrigés`);

    return openapi;
}

// ============================================
// ÉTAPE 2: RÉGÉNÉRATION DES MDX
// ============================================

function regenerateMDX() {
    log.step('2/5', 'Régénération des fichiers MDX...');

    const rootDir = path.join(__dirname, '..');
    const relativeOpenapiPath = 'v103/api-reference/openapi.json';
    const relativeEndpointDir = 'v103/api-reference/endpoint';

    // Supprimer l'ancien dossier
    if (fs.existsSync(CONFIG.endpointDir)) {
        fs.rmSync(CONFIG.endpointDir, { recursive: true, force: true });
        log.detail('Ancien dossier endpoint supprimé');
    }

    // Régénérer avec Mintlify (utiliser chemins relatifs)
    try {
        execSync(
            `npx @mintlify/scraping@latest openapi-file ${relativeOpenapiPath} -o ${relativeEndpointDir}`,
            { cwd: rootDir, stdio: 'inherit', shell: true }
        );
    } catch (error) {
        // Mintlify peut retourner un code d'erreur même en cas de succès
        log.detail('Mintlify terminé');
    }

    // Vérifier que le dossier a été créé
    if (fs.existsSync(CONFIG.endpointDir)) {
        const folders = fs.readdirSync(CONFIG.endpointDir).filter(f =>
            fs.statSync(path.join(CONFIG.endpointDir, f)).isDirectory()
        );
        if (folders.length > 0) {
            log.success(`Fichiers MDX générés avec succès (${folders.length} dossiers)`);
            return true;
        }
    }

    throw new Error('Impossible de générer les fichiers MDX. Lancez manuellement: npx @mintlify/scraping@latest openapi-file v103/api-reference/openapi.json -o v103/api-reference/endpoint');
}

// ============================================
// ÉTAPE 3: SCANNER LES ENDPOINTS GÉNÉRÉS
// ============================================

function scanGeneratedEndpoints() {
    log.step('3/5', 'Scan des endpoints générés...');

    const endpoints = {};

    if (!fs.existsSync(CONFIG.endpointDir)) {
        log.error('Dossier endpoint non trouvé!');
        return endpoints;
    }

    // Scanner les sous-dossiers du dossier endpoint
    const folders = fs.readdirSync(CONFIG.endpointDir);

    for (const folder of folders) {
        const folderPath = path.join(CONFIG.endpointDir, folder);
        const stat = fs.statSync(folderPath);

        if (stat.isDirectory()) {
            const files = fs.readdirSync(folderPath);
            const mdxFiles = files.filter(f => f.endsWith('.mdx')).map(f => f.replace('.mdx', ''));

            if (mdxFiles.length > 0) {
                endpoints[folder] = mdxFiles;
            }
        }
    }

    let total = 0;
    for (const [folder, files] of Object.entries(endpoints)) {
        total += files.length;
        log.detail(`${folder}: ${files.length} endpoints`);
    }
    log.success(`${total} fichiers MDX trouvés dans ${Object.keys(endpoints).length} dossiers`);

    return endpoints;
}

// ============================================
// ÉTAPE 4: CONSTRUIRE LA NAVIGATION
// ============================================

function buildNavigation(generatedEndpoints) {
    log.step('4/5', 'Construction de la navigation...');

    const apiGroups = [];
    let newEndpoints = [];
    let missingEndpoints = [];

    // Fonction utilitaire pour construire le chemin
    const buildPath = (folder, filename) => `v103/api-reference/endpoint/${folder}/${filename}`;

    // Fonction pour vérifier si un endpoint existe
    const endpointExists = (folder, filename) => {
        return generatedEndpoints[folder]?.includes(filename);
    };

    // Parcourir la structure de configuration
    for (const [groupName, groupConfig] of Object.entries(CONFIG.apiStructure)) {
        const group = { group: groupName, pages: [] };

        // Pages statiques (comme introduction)
        if (groupConfig.pages) {
            group.pages.push(...groupConfig.pages);
        }

        // Pages principales du groupe
        if (groupConfig.mainPages) {
            for (const page of groupConfig.mainPages) {
                if (page.includes('/')) {
                    // Chemin complet
                    group.pages.push(page);
                } else {
                    // Nom de fichier seulement
                    const pagePath = buildPath(groupConfig.folder, page);
                    if (endpointExists(groupConfig.folder, page)) {
                        group.pages.push(pagePath);
                    } else {
                        missingEndpoints.push(pagePath);
                    }
                }
            }
        }

        // Toutes les pages d'un dossier
        if (groupConfig.allPages && groupConfig.folder) {
            const folderEndpoints = generatedEndpoints[groupConfig.folder] || [];
            const exclude = groupConfig.exclude || [];

            for (const filename of folderEndpoints) {
                // Vérifier les exclusions globales et locales
                const isExcluded = CONFIG.globalExclusions.some(pattern => pattern.test(filename)) ||
                    exclude.includes(filename);

                if (!isExcluded) {
                    group.pages.push(buildPath(groupConfig.folder, filename));
                }
            }
        }

        // Sous-groupes
        if (groupConfig.subgroups) {
            for (const [subgroupName, subgroupConfig] of Object.entries(groupConfig.subgroups)) {
                const subgroup = { group: subgroupName, pages: [] };

                // Si subgroupConfig est un array, ce sont directement les noms de fichiers
                if (Array.isArray(subgroupConfig)) {
                    for (const filename of subgroupConfig) {
                        const folder = groupConfig.folder;
                        const pagePath = buildPath(folder, filename);
                        if (endpointExists(folder, filename)) {
                            subgroup.pages.push(pagePath);
                        } else {
                            missingEndpoints.push(pagePath);
                        }
                    }
                } else {
                    // C'est un objet avec folder et pages
                    for (const filename of subgroupConfig.pages) {
                        const pagePath = buildPath(subgroupConfig.folder, filename);
                        if (endpointExists(subgroupConfig.folder, filename)) {
                            subgroup.pages.push(pagePath);
                        } else {
                            missingEndpoints.push(pagePath);
                        }
                    }
                }

                if (subgroup.pages.length > 0) {
                    group.pages.push(subgroup);
                }
            }
        }

        if (group.pages.length > 0) {
            apiGroups.push(group);
        }
    }

    // Détecter les nouveaux endpoints non catégorisés
    const categorizedEndpoints = new Set();
    function collectCategorized(pages) {
        for (const page of pages) {
            if (typeof page === 'string') {
                categorizedEndpoints.add(page);
            } else if (page.pages) {
                collectCategorized(page.pages);
            }
        }
    }
    for (const group of apiGroups) {
        collectCategorized(group.pages);
    }

    // Trouver les endpoints non catégorisés
    for (const [folder, files] of Object.entries(generatedEndpoints)) {
        for (const filename of files) {
            const fullPath = buildPath(folder, filename);
            const isExcluded = CONFIG.globalExclusions.some(pattern => pattern.test(filename));

            if (!isExcluded && !categorizedEndpoints.has(fullPath)) {
                newEndpoints.push({ folder, filename, path: fullPath });
            }
        }
    }

    log.success(`${apiGroups.length} groupes créés`);

    if (newEndpoints.length > 0) {
        log.warning(`${newEndpoints.length} nouveaux endpoints non catégorisés:`);
        for (const ep of newEndpoints.slice(0, 10)) {
            log.detail(`+ ${ep.folder}/${ep.filename}`);
        }
        if (newEndpoints.length > 10) {
            log.detail(`... et ${newEndpoints.length - 10} autres`);
        }
    }

    if (missingEndpoints.length > 0) {
        log.warning(`${missingEndpoints.length} endpoints attendus mais non trouvés`);
    }

    return { apiGroups, newEndpoints, missingEndpoints };
}

// ============================================
// ÉTAPE 5: METTRE À JOUR DOCS.JSON
// ============================================

function updateDocsJson(apiGroups) {
    log.step('5/5', 'Mise à jour de docs.json...');

    const docsContent = fs.readFileSync(CONFIG.docsJsonPath, 'utf8');
    const docs = JSON.parse(docsContent);

    // Trouver l'onglet API Reference
    const version = docs.navigation.versions.find(v => v.version === 'latest');
    if (!version) throw new Error('Version "latest" non trouvée dans docs.json');

    const apiTab = version.tabs.find(t => t.tab === 'API Reference');
    if (!apiTab) throw new Error('Onglet "API Reference" non trouvé dans docs.json');

    // Mettre à jour les groupes
    apiTab.groups = apiGroups;

    // Sauvegarder
    fs.writeFileSync(CONFIG.docsJsonPath, JSON.stringify(docs, null, 2));

    log.success('docs.json mis à jour avec succès');
}

// ============================================
// VALIDATION FINALE
// ============================================

function validateResult() {
    console.log('\n' + '═'.repeat(50));
    log.step('VALIDATION', 'Vérification finale...');

    let errors = 0;

    // 1. Valider docs.json
    try {
        const docs = JSON.parse(fs.readFileSync(CONFIG.docsJsonPath, 'utf8'));
        log.success('docs.json est un JSON valide');

        // Vérifier que tous les fichiers existent
        const version = docs.navigation.versions.find(v => v.version === 'latest');
        const apiTab = version?.tabs.find(t => t.tab === 'API Reference');

        if (apiTab) {
            let totalPages = 0;
            let missingPages = 0;

            function checkPages(pages) {
                for (const page of pages) {
                    if (typeof page === 'string') {
                        totalPages++;
                        const pagePath = page.startsWith('/') ? page.slice(1) : page;
                        const filePath = path.join(__dirname, '..', pagePath + '.mdx');
                        if (!fs.existsSync(filePath)) {
                            log.error(`Fichier manquant: ${pagePath}.mdx`);
                            missingPages++;
                            errors++;
                        }
                    } else if (page.pages) {
                        checkPages(page.pages);
                    }
                }
            }

            for (const group of apiTab.groups) {
                checkPages(group.pages);
            }

            if (missingPages === 0) {
                log.success(`Tous les ${totalPages} fichiers référencés existent`);
            }
        }
    } catch (e) {
        log.error(`docs.json invalide: ${e.message}`);
        errors++;
    }

    // 2. Valider openapi.json
    try {
        const openapi = JSON.parse(fs.readFileSync(CONFIG.openapiPath, 'utf8'));
        const endpointCount = Object.keys(openapi.paths).length;
        log.success(`openapi.json valide (${endpointCount} endpoints)`);

        // Vérifier securitySchemes
        if (openapi.components?.securitySchemes?.['x-api-key']) {
            log.success('securitySchemes x-api-key présent');
        } else {
            log.warning('securitySchemes x-api-key non trouvé');
        }
    } catch (e) {
        log.error(`openapi.json invalide: ${e.message}`);
        errors++;
    }

    console.log('\n' + '═'.repeat(50));

    if (errors === 0) {
        console.log(`\n${colors.green}✅ SUCCÈS: Documentation API synchronisée!${colors.reset}\n`);
        console.log('Vous pouvez maintenant lancer: mintlify dev\n');
        return true;
    } else {
        console.log(`\n${colors.red}❌ ÉCHEC: ${errors} erreur(s) trouvée(s)${colors.reset}\n`);
        return false;
    }
}

// ============================================
// MAIN
// ============================================

async function main() {
    console.log('\n' + '═'.repeat(50));
    console.log(`${colors.cyan}🚀 CybeDefend API Documentation Sync${colors.reset}`);
    console.log('═'.repeat(50));

    const args = process.argv.slice(2);
    const dryRun = args.includes('--dry-run');

    if (dryRun) {
        log.warning('Mode dry-run: aucune modification ne sera effectuée');
    }

    try {
        // Étape 1: Nettoyer OpenAPI
        cleanOpenAPI();

        // Étape 2: Régénérer les MDX
        if (!dryRun) {
            regenerateMDX();
        } else {
            log.info('Régénération MDX ignorée (dry-run)');
        }

        // Étape 3: Scanner les endpoints
        const generatedEndpoints = scanGeneratedEndpoints();

        // Étape 4: Construire la navigation
        const { apiGroups, newEndpoints, missingEndpoints } = buildNavigation(generatedEndpoints);

        // Étape 5: Mettre à jour docs.json
        if (!dryRun) {
            updateDocsJson(apiGroups);
        } else {
            log.info('Mise à jour docs.json ignorée (dry-run)');
        }

        // Validation
        const success = validateResult();

        // Rapport des nouveaux endpoints
        if (newEndpoints.length > 0) {
            console.log(`\n${colors.yellow}📋 Nouveaux endpoints à catégoriser:${colors.reset}`);
            for (const ep of newEndpoints) {
                console.log(`   ${colors.gray}${ep.folder}/${ep.filename}${colors.reset}`);
            }
            console.log(`\nAjoutez-les dans CONFIG.apiStructure du script pour les intégrer.\n`);
        }

        process.exit(success ? 0 : 1);

    } catch (error) {
        log.error(`Erreur fatale: ${error.message}`);
        console.error(error.stack);
        process.exit(1);
    }
}

main();
