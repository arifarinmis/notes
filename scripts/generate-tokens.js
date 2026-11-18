const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Unambiguous URL-safe alphabet (no 0/O, 1/l/I)
const ALPHABET = '23456789abcdefghjkmnpqrstuvwxyz';
const TOTAL_USERS = 1000;
const DOMAIN = 'https://note.thingsyourneed.com';

// Deterministic seed + HMAC so the 1000 links are 100% unique, original, and unguessable
const MASTER_SEED = 'thingsyourneed-nfc-subapp-2026-v1-secret-seed';

function generateToken(index) {
  const hmac = crypto.createHmac('sha256', MASTER_SEED)
    .update(`user-slot-${index}`)
    .digest();
  
  // 12-char token grouped as xxxx-xxxx-xxxx or 10-char compact token
  // Let's use a clean 10-character token (e.g. k8m3x9p2q7) for short NFC NDEF payload & clean URLs
  let token = '';
  for (let i = 0; i < 10; i++) {
    const byte = hmac[i];
    token += ALPHABET[byte % ALPHABET.length];
  }
  return token;
}

const usedTokens = new Set();
const tokens = [];

for (let slot = 1; slot <= TOTAL_USERS; slot++) {
  let attempt = 0;
  let token = generateToken(`${slot}-${attempt}`);
  while (usedTokens.has(token)) {
    attempt++;
    token = generateToken(`${slot}-${attempt}`);
  }
  usedTokens.add(token);
  tokens.push({
    slot,
    id: `U${String(slot).padStart(4, '0')}`,
    token,
    url: `${DOMAIN}/${token}`
  });
}

// 1. Write data/tokens.js
const jsContent = `// Pre-generated 1,000 unique NFC user links for ${DOMAIN}
export const APP_DOMAIN = '${DOMAIN}';
export const INITIAL_TOKENS = ${JSON.stringify(tokens.map(t => t.token), null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '..', 'data', 'tokens.js'), jsContent, 'utf8');

// 2. Write nfc-links-1000.csv
const csvHeader = 'Slot,User_ID,Token,NFC_URL,Query_Fallback_URL,Status,Admin_Note\n';
const csvRows = tokens.map(t => 
  `${t.slot},${t.id},${t.token},${t.url},${DOMAIN}/?u=${t.token},active,""`
).join('\n');

fs.writeFileSync(path.join(__dirname, '..', 'nfc-links-1000.csv'), csvHeader + csvRows, 'utf8');

console.log(`Successfully generated ${tokens.length} unique tokens.`);
console.log(`Sample #1: ${tokens[0].url}`);
console.log(`Sample #2: ${tokens[1].url}`);
console.log(`Sample #1000: ${tokens[999].url}`);
