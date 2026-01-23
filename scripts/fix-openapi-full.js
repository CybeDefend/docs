const fs = require('fs');
const path = require('path');

const openapiPath = path.join(__dirname, '..', 'v103', 'api-reference', 'openapi.json');
let openapi = JSON.parse(fs.readFileSync(openapiPath, 'utf8'));

let fixedDuplicates = 0;
let fixedArrays = 0;

function removeDuplicateParameters(params) {
  if (!Array.isArray(params)) return params;
  const seen = new Map();
  const unique = [];
  for (const param of params) {
    const key = param.name + '-' + param.in;
    if (!seen.has(key)) {
      seen.set(key, true);
      unique.push(param);
    } else {
      fixedDuplicates++;
    }
  }
  return unique;
}

function fixSchema(schema, schemaPath) {
  schemaPath = schemaPath || '';
  if (!schema || typeof schema !== 'object') return schema;
  
  if (Array.isArray(schema)) {
    return schema.map((item, i) => fixSchema(item, schemaPath + '[' + i + ']'));
  }
  
  if (schema.type === 'array' && schema.items) {
    if (Array.isArray(schema.items)) {
      console.log('  Fixing nested array at: ' + schemaPath);
      const refItem = schema.items.find(i => i && i.$ref);
      schema.items = refItem || schema.items[0] || { type: 'object' };
      fixedArrays++;
    } else if (schema.items.type === 'array' && schema.items.items) {
      console.log('  Fixing double nested array at: ' + schemaPath);
      schema.items = schema.items.items;
      fixedArrays++;
    }
  }
  
  if (schema.required === false) {
    delete schema.required;
  }
  
  for (const key of Object.keys(schema)) {
    if (key === '$ref') continue;
    schema[key] = fixSchema(schema[key], schemaPath + '.' + key);
  }
  
  return schema;
}

for (const [pathKey, pathValue] of Object.entries(openapi.paths || {})) {
  for (const [method, operation] of Object.entries(pathValue)) {
    if (operation && operation.parameters) {
      operation.parameters = removeDuplicateParameters(operation.parameters);
    }
  }
}

if (openapi.components && openapi.components.schemas) {
  for (const [schemaName, schema] of Object.entries(openapi.components.schemas)) {
    openapi.components.schemas[schemaName] = fixSchema(schema, 'schemas.' + schemaName);
  }
}

openapi.paths = fixSchema(openapi.paths, 'paths');

fs.writeFileSync(openapiPath, JSON.stringify(openapi, null, 2));

console.log('');
console.log('OpenAPI fixed:');
console.log('  - ' + fixedDuplicates + ' duplicate parameters removed');
console.log('  - ' + fixedArrays + ' nested arrays fixed');
console.log('  - Total endpoints: ' + Object.keys(openapi.paths).length);
