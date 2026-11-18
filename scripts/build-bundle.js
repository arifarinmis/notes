const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

function stripImportsExports(code) {
  return code
    .replace(/^\s*import\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '')
    .replace(/^\s*export\s+default\s+/gm, '')
    .replace(/^\s*export\s+(const|let|var|function|async\s+function)\s+/gm, '$1 ');
}

const tokensCode = stripImportsExports(fs.readFileSync(path.join(root, 'data/tokens.js'), 'utf8'));
const i18nCode = stripImportsExports(fs.readFileSync(path.join(root, 'js/i18n.js'), 'utf8'));
const storageCode = stripImportsExports(fs.readFileSync(path.join(root, 'js/storage.js'), 'utf8'));
const appCode = stripImportsExports(fs.readFileSync(path.join(root, 'js/app.js'), 'utf8'));

const bundle = `(function() {\n'use strict';\n\n${tokensCode}\n\n${i18nCode}\n\n${storageCode}\n\n${appCode}\n\n})();\n`;

fs.writeFileSync(path.join(root, 'js/bundle.js'), bundle, 'utf8');
console.log('Successfully built js/bundle.js');
