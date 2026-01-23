#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const openapiPath = path.join(__dirname, '..', 'v103', 'api-reference', 'openapi.json');

console.log('🔧 Nettoyage du fichier openapi.json...\n');

const content = fs.readFileSync(openapiPath, 'utf8');
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
function fixNestedArrays(obj, depth = 0) {
    if (typeof obj !== 'object' || obj === null || depth > 50) return;

    for (const key in obj) {
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
            fixNestedArrays(obj[key], depth + 1);
        }
    }
}

fixNestedArrays(openapi);

// Sauvegarder le fichier nettoyé
fs.writeFileSync(openapiPath, JSON.stringify(openapi, null, 2));

console.log(`✅ Paramètres dupliqués supprimés: ${duplicatesRemoved}`);
console.log(`✅ Arrays imbriqués corrigés: ${nestedArraysFixed}`);
console.log(`✅ Total endpoints dans openapi: ${Object.keys(openapi.paths).length}`);
console.log('\n✅ Fichier openapi.json nettoyé avec succès!');
