import { INITIAL_TOKENS, APP_DOMAIN } from '../data/tokens.js';
import { t } from './i18n.js';

export const MAX_ITEMS_PER_USER = 1000;
export const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000; // 72 hours in ms

const META_STORAGE_KEY = 'tyn_admin_accounts_meta_v1';
const VAULT_PREFIX = 'tyn_encrypted_vault_v1_';
const CLOUD_CONFIG_KEY = 'tyn_supabase_config_v1';

const syncChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('tyn_nfc_sync') : null;

// Curated minimalist color palettes scoped per individual list
export const LIST_THEMES = [
  { id: 'paper', name: 'Warm Paper', bg: '#FFFDF9', card: '#F5F2EB', text: '#1C1B18', accent: '#2E2B25', border: '#E5DFD3' },
  { id: 'sage', name: 'Sage Mist', bg: '#EDF5F0', card: '#E2EFE6', text: '#16261A', accent: '#2A5C3B', border: '#C8DFD0' },
  { id: 'sand', name: 'Soft Sand', bg: '#F8F0E3', card: '#EFE4D2', text: '#2B2116', accent: '#8A5A2B', border: '#DFCGB5' .replace('G', 'C') },
  { id: 'sky', name: 'Ocean Air', bg: '#ECF4FA', card: '#DFECF6', text: '#142230', accent: '#235B8C', border: '#C5D9EC' },
  { id: 'lavender', name: 'Lavender', bg: '#F3EFFA', card: '#E8E0F5', text: '#22192E', accent: '#5D3A8C', border: '#D5C7EB' },
  { id: 'rose', name: 'Blush Clay', bg: '#FAEEEE', card: '#F3E1E1', text: '#2E1818', accent: '#8F3939', border: '#E6CACA' },
  { id: 'lemon', name: 'Soft Citrus', bg: '#FBF8E4', card: '#F3EECC', text: '#282411', accent: '#7D6B14', border: '#E4DCAC' },
  { id: 'slate', name: 'Minimal Dark', bg: '#181A20', card: '#22252D', text: '#F3F4F6', accent: '#E5E7EB', border: '#323642', dark: true }
];

// Curated font styles for lists
export const LIST_FONTS = [
  { id: 'sans', name: 'Clean Sans', family: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" },
  { id: 'serif', name: 'Editorial', family: "'Newsreader', 'Georgia', serif" },
  { id: 'hand', name: 'Handwritten', family: "'Caveat', cursive", scale: '1.18rem' },
  { id: 'mono', name: 'Mono Note', family: "'JetBrains Mono', monospace", scale: '0.94rem' },
  { id: 'rounded', name: 'Soft Round', family: "'Plus Jakarta Sans', sans-serif" }
];

// Web Crypto helper: SHA-256 hash of token so vault storage key doesn't even expose raw token
async function sha256Hex(text) {
  const data = new TextEncoder().encode(text + '_tyn_vault_salt_2026');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Web Crypto helper: Derive AES-GCM key from the user's NFC token
async function deriveVaultKey(token) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(token.padEnd(32, '#')),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: enc.encode('thingsyourneed-zero-knowledge-salt'),
      iterations: 1000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

async function encryptPayload(token, obj) {
  try {
    const key = await deriveVaultKey(token);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(JSON.stringify(obj));
    const cipherBuf = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);
    const combined = new Uint8Array(iv.length + cipherBuf.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(cipherBuf), iv.length);
    let binary = '';
    combined.forEach(b => { binary += String.fromCharCode(b); });
    return btoa(binary);
  } catch (_) {
    return btoa(unescape(encodeURIComponent(JSON.stringify(obj))));
  }
}

async function decryptPayload(token, cipherBase64) {
  try {
    const binary = atob(cipherBase64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const iv = bytes.slice(0, 12);
    const data = bytes.slice(12);
    const key = await deriveVaultKey(token);
    const plainBuf = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data);
    return JSON.parse(new TextDecoder().decode(plainBuf));
  } catch (_) {
    try {
      return JSON.parse(decodeURIComponent(escape(atob(cipherBase64))));
    } catch (e) {
      return null;
    }
  }
}

// Cloud Config (Supabase REST API integration)
export function getCloudConfig() {
  try {
    const raw = localStorage.getItem(CLOUD_CONFIG_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return { url: '', anonKey: '', enabled: false };
}

export function saveCloudConfig(url, anonKey, enabled = true) {
  const cleanUrl = (url || '').trim().replace(/\/+$/, '');
  const cleanKey = (anonKey || '').trim();
  const cfg = { url: cleanUrl, anonKey: cleanKey, enabled: Boolean(cleanUrl && cleanKey && enabled) };
  localStorage.setItem(CLOUD_CONFIG_KEY, JSON.stringify(cfg));
  return cfg;
}

async function supabaseFetch(path, options = {}) {
  const cfg = getCloudConfig();
  if (!cfg.enabled || !cfg.url || !cfg.anonKey) return null;
  try {
    const res = await fetch(`${cfg.url}/rest/v1/${path}`, {
      ...options,
      headers: {
        'apikey': cfg.anonKey,
        'Authorization': `Bearer ${cfg.anonKey}`,
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });
    if (!res.ok) return null;
    const text = await res.text();
    return text ? JSON.parse(text) : [];
  } catch (_) {
    return null;
  }
}

// Load or initialize the 1,000 account metadata slots (Contains ZERO user list content)
export function getAllAccountsMetadataLocal() {
  try {
    const raw = localStorage.getItem(META_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length === 1000) {
        return parsed;
      }
    }
  } catch (_) {}

  const initial = INITIAL_TOKENS.map((token, idx) => ({
    slot: idx + 1,
    token,
    status: 'active', // 'active' | 'passive'
    adminNote: '',
    lastAccessedAt: null,
    itemCount: 0,
    listCount: 0,
    resetVersion: 1
  }));
  localStorage.setItem(META_STORAGE_KEY, JSON.stringify(initial));
  return initial;
}

function saveAccountsMetadataLocal(accounts) {
  localStorage.setItem(META_STORAGE_KEY, JSON.stringify(accounts));
  if (syncChannel) syncChannel.postMessage({ type: 'meta_updated' });
}

export async function getAllAccountsForAdmin() {
  const local = getAllAccountsMetadataLocal();
  const cfg = getCloudConfig();
  if (cfg.enabled) {
    const remote = await supabaseFetch('nfc_accounts?select=*&order=slot.asc');
    if (Array.isArray(remote) && remote.length > 0) {
      const remoteMap = new Map(remote.map(r => [r.slot, r]));
      const merged = local.map(item => {
        const r = remoteMap.get(item.slot);
        if (!r) return item;
        return {
          slot: item.slot,
          token: item.token,
          status: r.status || item.status,
          adminNote: r.admin_note ?? item.adminNote,
          lastAccessedAt: r.last_accessed_at || item.lastAccessedAt,
          itemCount: r.item_count ?? item.itemCount,
          listCount: r.list_count ?? item.listCount,
          resetVersion: r.reset_version ?? item.resetVersion
        };
      });
      saveAccountsMetadataLocal(merged);
      return merged;
    }
  }
  return local;
}

export function findAccountByToken(token) {
  if (!token) return null;
  const clean = token.trim().toLowerCase();
  const accounts = getAllAccountsMetadataLocal();
  return accounts.find(a => a.token === clean) || null;
}

// Admin Actions (Never touches or reads user list contents!)
export async function updateAccountAdminFields(slot, updates) {
  const accounts = getAllAccountsMetadataLocal();
  const idx = accounts.findIndex(a => a.slot === Number(slot));
  if (idx === -1) return null;

  accounts[idx] = { ...accounts[idx], ...updates };
  saveAccountsMetadataLocal(accounts);

  const acc = accounts[idx];
  await supabaseFetch('nfc_accounts', {
    method: 'POST',
    headers: { 'Prefer': 'resolution=merge-duplicates' },
    body: JSON.stringify({
      slot: acc.slot,
      token: acc.token,
      status: acc.status,
      admin_note: acc.adminNote,
      last_accessed_at: acc.lastAccessedAt,
      item_count: acc.itemCount,
      list_count: acc.listCount,
      reset_version: acc.resetVersion,
      updated_at: new Date().toISOString()
    })
  });

  return acc;
}

export async function resetUserAccountByAdmin(slot) {
  const accounts = getAllAccountsMetadataLocal();
  const idx = accounts.findIndex(a => a.slot === Number(slot));
  if (idx === -1) return null;

  const token = accounts[idx].token;
  const nextResetVersion = (accounts[idx].resetVersion || 1) + 1;

  // Delete encrypted vault locally
  const hash = await sha256Hex(token);
  localStorage.removeItem(VAULT_PREFIX + hash);

  // Reset metadata counters
  accounts[idx] = {
    ...accounts[idx],
    lastAccessedAt: null,
    itemCount: 0,
    listCount: 0,
    resetVersion: nextResetVersion
  };
  saveAccountsMetadataLocal(accounts);

  // Sync reset to Cloud if enabled
  const acc = accounts[idx];
  await supabaseFetch(`nfc_vaults?token_hash=eq.${hash}`, { method: 'DELETE' });
  await supabaseFetch('nfc_accounts', {
    method: 'POST',
    headers: { 'Prefer': 'resolution=merge-duplicates' },
    body: JSON.stringify({
      slot: acc.slot,
      token: acc.token,
      status: acc.status,
      admin_note: acc.adminNote,
      last_accessed_at: null,
      item_count: 0,
      list_count: 0,
      reset_version: nextResetVersion,
      updated_at: new Date().toISOString()
    })
  });

  if (syncChannel) syncChannel.postMessage({ type: 'vault_reset', token });
  return acc;
}

// Create initial default workspace when a user scans their NFC tag for the first time
function createDefaultUserVault() {
  const defaultListId = 'list_' + Date.now();
  return {
    activeListId: defaultListId,
    activeCategoryFilter: 'ALL',
    customListCategories: [],
    lists: [
      {
        id: defaultListId,
        name: t('catKitchen'),
        category: t('catKitchen'),
        themeId: 'paper',
        fontId: 'sans',
        createdAt: Date.now(),
        items: []
      }
    ]
  };
}

// 3-Day (72-hour) Auto-Delete Engine for checked items
export function purgeExpiredCheckedItems(vault) {
  if (!vault || !Array.isArray(vault.lists)) return { vault, removedCount: 0 };
  const now = Date.now();
  let removedCount = 0;

  vault.lists.forEach(list => {
    if (!Array.isArray(list.items)) list.items = [];
    const before = list.items.length;
    list.items = list.items.filter(item => {
      if (item.checked && item.checkedAt) {
        const elapsed = now - item.checkedAt;
        if (elapsed >= THREE_DAYS_MS) {
          return false; // Auto-delete after 3 days!
        }
      }
      return true;
    });
    removedCount += (before - list.items.length);
  });

  return { vault, removedCount };
}

export function getTotalItemCount(vault) {
  if (!vault || !Array.isArray(vault.lists)) return 0;
  return vault.lists.reduce((sum, list) => sum + (Array.isArray(list.items) ? list.items.length : 0), 0);
}

// Load User's Encrypted Vault by NFC Token
export async function loadUserSession(token) {
  const account = findAccountByToken(token);
  if (!account) {
    return { status: 'invalid', account: null, vault: null };
  }

  // Check cloud status if enabled
  const cfg = getCloudConfig();
  if (cfg.enabled) {
    const remoteAcc = await supabaseFetch(`nfc_accounts?slot=eq.${account.slot}&select=*`);
    if (Array.isArray(remoteAcc) && remoteAcc[0]) {
      account.status = remoteAcc[0].status;
      account.resetVersion = remoteAcc[0].reset_version || account.resetVersion;
    }
  }

  if (account.status === 'passive') {
    return { status: 'passive', account, vault: null };
  }

  const hash = await sha256Hex(account.token);
  let vault = null;

  // Try Cloud Vault first if configured
  if (cfg.enabled) {
    const remoteVault = await supabaseFetch(`nfc_vaults?token_hash=eq.${hash}&select=*`);
    if (Array.isArray(remoteVault) && remoteVault[0] && remoteVault[0].encrypted_payload) {
      vault = await decryptPayload(account.token, remoteVault[0].encrypted_payload);
    }
  }

  // Fallback to Local Encrypted Vault
  if (!vault) {
    const localCipher = localStorage.getItem(VAULT_PREFIX + hash);
    if (localCipher) {
      vault = await decryptPayload(account.token, localCipher);
    }
  }

  if (!vault || !Array.isArray(vault.lists) || vault.lists.length === 0) {
    vault = createDefaultUserVault();
  }

  // Run 3-day auto-delete cleanup on load
  const { vault: cleanedVault } = purgeExpiredCheckedItems(vault);

  // Save & update metadata stats (lastAccessedAt, itemCount, listCount) without exposing content
  await saveUserVault(account.token, cleanedVault);

  return { status: 'active', account: findAccountByToken(account.token), vault: cleanedVault };
}

export async function saveUserVault(token, vault) {
  const account = findAccountByToken(token);
  if (!account) return;

  purgeExpiredCheckedItems(vault);

  const hash = await sha256Hex(account.token);
  const cipher = await encryptPayload(account.token, vault);
  localStorage.setItem(VAULT_PREFIX + hash, cipher);

  const totalItems = getTotalItemCount(vault);
  const totalLists = Array.isArray(vault.lists) ? vault.lists.length : 0;
  const nowIso = new Date().toISOString();

  // Update only anonymous aggregate counts + timestamp in admin metadata
  await updateAccountAdminFields(account.slot, {
    lastAccessedAt: nowIso,
    itemCount: totalItems,
    listCount: totalLists
  });

  // Push encrypted vault to Cloud if enabled
  await supabaseFetch('nfc_vaults', {
    method: 'POST',
    headers: { 'Prefer': 'resolution=merge-duplicates' },
    body: JSON.stringify({
      token_hash: hash,
      encrypted_payload: cipher,
      reset_version: account.resetVersion || 1,
      updated_at: nowIso
    })
  });

  if (syncChannel) {
    syncChannel.postMessage({ type: 'vault_updated', token: account.token });
  }
}

export function onSyncMessage(callback) {
  if (syncChannel) {
    syncChannel.onmessage = (ev) => callback(ev.data);
  }
  window.addEventListener('storage', () => {
    callback({ type: 'storage_event' });
  });
}

export function getFullNfcUrl(token) {
  return `${APP_DOMAIN}/${token}`;
}
