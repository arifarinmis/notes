import { initI18n, t } from './i18n.js';
import {
  MAX_ITEMS_PER_USER,
  THREE_DAYS_MS,
  LIST_THEMES,
  LIST_FONTS,
  loadUserSession,
  saveUserVault,
  getTotalItemCount,
  purgeExpiredCheckedItems,
  getAllAccountsForAdmin,
  updateAccountAdminFields,
  resetUserAccountByAdmin,
  getFullNfcUrl,
  getCloudConfig,
  saveCloudConfig,
  onSyncMessage
} from './storage.js';
import { INITIAL_TOKENS, APP_DOMAIN } from '../data/tokens.js';

const appRoot = document.getElementById('app');

// Application State
let currentMode = 'user'; // 'user' | 'admin'
let currentToken = null;
let sessionStatus = 'active';
let userVault = null;
let selectedItemSection = '';
let openStyleForListId = null; // Tracks which specific list has its inline style panel open
let openExpiryItemId = null; // Tracks which checked item has its hourglass countdown info open
let showNewListModal = false;
let showAddToHomeModal = false;
let deferredInstallPrompt = null;
let newListDraftThemeId = 'paper';
let newListDraftFontId = 'sans';
const SAVED_TOKEN_KEY = 'tyn_last_user_token_v1';

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
});

function isRunningStandalone() {
  return (
    (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
    window.navigator.standalone === true
  );
}

function isIosDevice() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent || '');
}

// Admin State
const ADMIN_AUTH_KEY = 'tyn_admin_authenticated_v1';
const ADMIN_PASS_KEY = 'tyn_admin_password_v1';
let adminAccounts = [];
let adminSearchQuery = '';
let adminFilterStatus = 'all'; // 'all' | 'active' | 'passive' | 'used'
let adminPage = 1;
const ADMIN_PAGE_SIZE = 50;
let showCloudModal = false;

function getAdminPassword() {
  return localStorage.getItem(ADMIN_PASS_KEY) || 'tyn2026';
}

function isAdminLoggedIn() {
  return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
}

// Parse URL to determine if Admin or NFC User Token
function resolveRoute() {
  const params = new URLSearchParams(window.location.search);
  const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
  const hashParams = new URLSearchParams(rawHash.includes('=') ? rawHash : '');
  const pathSeg = window.location.pathname.replace(/^\/+|\/+$/g, '').split('/').pop();

  if (
    params.get('admin') === '1' ||
    hashParams.get('admin') === '1' ||
    rawHash === 'admin' ||
    pathSeg === 'admin'
  ) {
    currentMode = 'admin';
    return;
  }

  currentMode = 'user';
  const queryToken = params.get('u') || params.get('token') || hashParams.get('u');
  if (queryToken) {
    currentToken = queryToken.trim().toLowerCase();
  } else if (rawHash && !rawHash.includes('=') && rawHash.length >= 6 && rawHash !== 'admin') {
    currentToken = rawHash.toLowerCase();
  } else if (pathSeg && pathSeg !== 'index.html' && pathSeg !== '404.html' && pathSeg.length >= 6 && window.location.protocol !== 'file:') {
    currentToken = pathSeg.toLowerCase();
  } else {
    const saved = localStorage.getItem(SAVED_TOKEN_KEY);
    currentToken = saved || INITIAL_TOKENS[0];
  }

  if (currentToken && INITIAL_TOKENS.includes(currentToken)) {
    try {
      localStorage.setItem(SAVED_TOKEN_KEY, currentToken);
    } catch (_) {}
  }
}

// Build scoped inline CSS variables strictly for a single list sheet
function getScopedListStyleVars(list) {
  const theme = LIST_THEMES.find(th => th.id === (list?.themeId || 'paper')) || LIST_THEMES[0];
  const font = LIST_FONTS.find(f => f.id === (list?.fontId || 'sans')) || LIST_FONTS[0];

  return {
    theme,
    font,
    styleAttr: [
      `--list-bg:${theme.bg}`,
      `--list-surface:${theme.card}`,
      `--list-text:${theme.text}`,
      `--list-accent:${theme.accent}`,
      `--list-border:${theme.border}`,
      `--list-font:${font.family}`,
      `--list-font-scale:${font.scale || '1rem'}`
    ].join(';')
  };
}

function getActiveList() {
  if (!userVault || !Array.isArray(userVault.lists) || userVault.lists.length === 0) return null;
  const found = userVault.lists.find(l => l.id === userVault.activeListId);
  return found || userVault.lists[0];
}

function getDefaultListCategories() {
  const base = [
    t('catKitchen'),
    t('catPantry'),
    t('catBathroom'),
    t('catMarket'),
    t('catHome')
  ];
  const custom = Array.isArray(userVault?.customListCategories) ? userVault.customListCategories : [];
  const all = [...new Set([...base, ...custom, ...(userVault?.lists || []).map(l => l.category).filter(Boolean)])];
  return all;
}

function getDefaultItemSections(activeList) {
  const base = [
    t('secGeneral'),
    t('secProduce'),
    t('secDairy'),
    t('secMeat'),
    t('secBakery'),
    t('secPantry'),
    t('secCleaning'),
    t('secPersonal')
  ];
  const inList = (activeList?.items || []).map(i => i.section).filter(Boolean);
  return [...new Set([...base, ...inList])];
}

function formatRemainingExpiry(checkedAt) {
  if (!checkedAt) return '';
  const remainingMs = Math.max(0, THREE_DAYS_MS - (Date.now() - checkedAt));
  const totalHours = Math.max(1, Math.ceil(remainingMs / (1000 * 60 * 60)));
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  return t('autoDeleteRemaining', { d: days, h: hours });
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ============================================================================
// RENDER USER MINIMALIST NOTE INTERFACE (Scoped Per-List Appearance)
// ============================================================================
function renderUserApp() {
  if (sessionStatus === 'invalid') {
    appRoot.innerHTML = `
      <div class="status-center">
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <h2 style="font-size:1.15rem;font-weight:600;">${escapeHtml(t('invalidTagTitle'))}</h2>
        <p style="font-size:0.88rem;opacity:0.65;max-width:300px;">${escapeHtml(t('invalidTagDesc'))}</p>
      </div>
      ${renderPreviewDock()}
    `;
    bindPreviewDockEvents();
    return;
  }

  if (sessionStatus === 'passive') {
    appRoot.innerHTML = `
      <div class="status-center">
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <h2 style="font-size:1.15rem;font-weight:600;">${escapeHtml(t('inactiveTagTitle'))}</h2>
        <p style="font-size:0.88rem;opacity:0.65;max-width:300px;">${escapeHtml(t('inactiveTagDesc'))}</p>
      </div>
      ${renderPreviewDock()}
    `;
    bindPreviewDockEvents();
    return;
  }

  const activeList = getActiveList();
  const scoped = getScopedListStyleVars(activeList);

  const totalItems = getTotalItemCount(userVault);
  const catFilter = userVault.activeCategoryFilter || 'ALL';
  const listCategories = getDefaultListCategories();

  const visibleLists = catFilter === 'ALL'
    ? userVault.lists
    : userVault.lists.filter(l => l.category === catFilter);

  const itemSections = getDefaultItemSections(activeList);
  if (!selectedItemSection) {
    selectedItemSection = t('secGeneral');
  }

  // Group items by their section/category inside the active list
  const items = activeList?.items || [];
  const grouped = new Map();
  items.forEach(item => {
    const sec = item.section || t('secGeneral');
    if (!grouped.has(sec)) grouped.set(sec, []);
    grouped.get(sec).push(item);
  });

  // Sort inside each group: unchecked first, checked below
  grouped.forEach((arr) => {
    arr.sort((a, b) => Number(Boolean(a.checked)) - Number(Boolean(b.checked)));
  });

  const showGroupHeaders = grouped.size > 1 || (grouped.size === 1 && !grouped.has(t('secGeneral')));
  const isStylePanelOpenForThisList = Boolean(activeList && openStyleForListId === activeList.id);

  appRoot.innerHTML = `
    <main class="note-shell">
      <!-- Top Minimal Navigation: List Categories & Multiple Lists (Always clean neutral shell) -->
      <header class="top-nav">
        <div class="category-bar">
          <button class="cat-chip ${catFilter === 'ALL' ? 'active' : ''}" data-cat-filter="ALL">
            ${escapeHtml(t('allLists'))}
          </button>
          ${listCategories.map(cat => `
            <button class="cat-chip ${catFilter === cat ? 'active' : ''}" data-cat-filter="${escapeHtml(cat)}">
              ${escapeHtml(cat)}
            </button>
          `).join('')}
        </div>

        <div class="lists-row">
          <div class="list-tabs">
            ${visibleLists.map(list => {
              const listTheme = LIST_THEMES.find(th => th.id === (list.themeId || 'paper')) || LIST_THEMES[0];
              return `
                <button class="list-tab ${list.id === activeList?.id ? 'active' : ''}" data-list-id="${escapeHtml(list.id)}">
                  <span class="tab-theme-dot" style="background:${listTheme.bg};"></span>
                  <span>${escapeHtml(list.name)}</span>
                </button>
              `;
            }).join('')}
            <button class="list-tab-add" id="btnNewList" title="${escapeHtml(t('newListTitle'))}">+</button>
          </div>
        </div>
      </header>

      <!-- Active Note Sheet (Scoped with its OWN color theme & font) -->
      ${activeList ? `
        <section
          class="note-sheet"
          style="${escapeHtml(scoped.styleAttr)}"
          ${scoped.theme.dark ? 'data-list-dark="true"' : ''}
        >
          <div class="note-header">
            <input
              type="text"
              id="listTitleInput"
              class="note-title-input"
              value="${escapeHtml(activeList.name)}"
              placeholder="${escapeHtml(t('listNamePlaceholder'))}"
              maxlength="60"
            />
            <div class="note-header-actions">
              <span class="note-counter">${totalItems}/${MAX_ITEMS_PER_USER}</span>
              <button
                type="button"
                class="list-style-btn ${isStylePanelOpenForThisList ? 'active' : ''}"
                id="btnToggleListStyle"
                title="${escapeHtml(t('appearance'))}"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
                  <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
                  <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
                  <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
                </svg>
                <span>${escapeHtml(t('appearance'))}</span>
              </button>
            </div>
          </div>

          <!-- Per-List Inline Customization Panel (Applies ONLY to this list) -->
          ${isStylePanelOpenForThisList ? renderInlineListStylePanel(activeList, listCategories) : ''}

          <!-- Add Item Form -->
          <form id="addItemForm" class="add-item-bar" autocomplete="off">
            <div class="add-input-wrap">
              <input
                type="text"
                id="newItemInput"
                class="add-item-input"
                placeholder="${totalItems >= MAX_ITEMS_PER_USER ? escapeHtml(t('limitReached')) : escapeHtml(t('newItemPlaceholder'))}"
                ${totalItems >= MAX_ITEMS_PER_USER ? 'disabled' : ''}
                maxlength="120"
              />
              <button type="submit" class="add-submit-btn" ${totalItems >= MAX_ITEMS_PER_USER ? 'disabled' : ''}>+</button>
            </div>

            <!-- In-List Section / Category Pills -->
            <div class="section-pills">
              ${itemSections.map(sec => `
                <button type="button" class="sec-pill ${selectedItemSection === sec ? 'active' : ''}" data-sec="${escapeHtml(sec)}">
                  ${escapeHtml(sec)}
                </button>
              `).join('')}
              <button type="button" class="sec-pill" id="btnAddCustomSection">+</button>
            </div>
          </form>

          <!-- Checklist Items -->
          <div class="items-container">
            ${items.length === 0 ? `
              <div class="empty-note">${escapeHtml(t('emptyNoteHint'))}</div>
            ` : Array.from(grouped.entries()).map(([secName, secItems]) => `
              <div class="item-group">
                ${showGroupHeaders ? `<div class="group-title">${escapeHtml(secName)}</div>` : ''}
                ${secItems.map(item => `
                  <div class="check-row ${item.checked ? 'checked' : ''}" data-item-id="${escapeHtml(item.id)}">
                    <button type="button" class="check-box" data-toggle-id="${escapeHtml(item.id)}">
                      <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </button>
                    <span class="item-label" data-toggle-id="${escapeHtml(item.id)}">${escapeHtml(item.text)}</span>
                    ${item.checked && item.checkedAt ? `
                      <button
                        type="button"
                        class="hourglass-btn ${openExpiryItemId === item.id ? 'active' : ''}"
                        data-hourglass-id="${escapeHtml(item.id)}"
                        title="${escapeHtml(t('autoDeleteInfo'))}"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M5 22h14"></path>
                          <path d="M5 2h14"></path>
                          <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"></path>
                          <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"></path>
                        </svg>
                      </button>
                    ` : ''}
                    <button type="button" class="item-del-btn" data-delete-id="${escapeHtml(item.id)}">&times;</button>
                  </div>
                  ${item.checked && item.checkedAt && openExpiryItemId === item.id ? `
                    <div class="expiry-info-box">
                      <span>${escapeHtml(t('autoDeleteInfo'))}</span>
                      <span class="rem-time">${escapeHtml(formatRemainingExpiry(item.checkedAt))}</span>
                    </div>
                  ` : ''}
                `).join('')}
              </div>
            `).join('')}
          </div>
        </section>
      ` : ''}

      ${!isRunningStandalone() ? `
        <footer class="a2hs-footer">
          <button type="button" class="a2hs-btn" id="btnAddToHomeScreen">
            <span class="a2hs-app-icon">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 11l3 3L22 4"></path>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
            </span>
            <span>${escapeHtml(t('addToHomeScreen'))}</span>
          </button>
        </footer>
      ` : ''}
    </main>

    ${showNewListModal ? renderNewListModal(listCategories) : ''}
    ${showAddToHomeModal ? renderAddToHomeModal() : ''}
    ${renderPreviewDock()}
  `;

  bindUserEvents(activeList);
  bindPreviewDockEvents();
}

function renderAddToHomeModal() {
  const ios = isIosDevice();
  return `
    <div class="modal-backdrop" id="a2hsBackdrop">
      <div class="style-sheet" onclick="event.stopPropagation()">
        <div style="display:flex;align-items:center;gap:12px;">
          <img src="./apple-touch-icon.png" alt="App Icon" style="width:46px;height:46px;border-radius:11px;border:1px solid #E5E7EB;flex-shrink:0;" />
          <div>
            <h3 style="font-size:1rem;font-weight:700;color:#111827;">${escapeHtml(t('addToHomeTitle'))}</h3>
            <p style="font-size:0.78rem;color:#6B7280;margin-top:2px;">Notes — ThingsYouNeed</p>
          </div>
        </div>

        <div class="a2hs-steps">
          <div class="a2hs-step-row">
            <span class="a2hs-step-icon">
              ${ios ? `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                  <polyline points="16 6 12 2 8 6"></polyline>
                  <line x1="12" y1="2" x2="12" y2="15"></line>
                </svg>
              ` : `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <circle cx="12" cy="5" r="1.5" fill="currentColor"></circle>
                  <circle cx="12" cy="12" r="1.5" fill="currentColor"></circle>
                  <circle cx="12" cy="19" r="1.5" fill="currentColor"></circle>
                </svg>
              `}
            </span>
            <span>${escapeHtml(ios ? t('addToHomeIosStep1') : t('addToHomeAndroidStep1'))}</span>
          </div>

          <div class="a2hs-step-row">
            <span class="a2hs-step-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="4" ry="4"></rect>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </span>
            <span>${escapeHtml(ios ? t('addToHomeIosStep2') : t('addToHomeAndroidStep2'))}</span>
          </div>
        </div>

        <div class="sheet-actions" style="border-color:#E5E7EB;justify-content:flex-end;">
          <button type="button" class="btn-primary-pill" id="btnCloseA2hs" style="background:#111827;color:#FFF;">${escapeHtml(t('save'))}</button>
        </div>
      </div>
    </div>
  `;
}

// Inline style customization panel embedded right inside the active list card
function renderInlineListStylePanel(activeList, listCategories) {
  const checkedCount = (activeList.items || []).filter(i => i.checked).length;
  return `
    <div class="list-style-panel">
      <div class="sheet-row">
        <span class="sheet-label">${escapeHtml(activeList.name)} — ${escapeHtml(t('colorTheme'))}</span>
        <div class="color-swatches">
          ${LIST_THEMES.map(th => `
            <button
              type="button"
              class="color-dot ${(activeList.themeId || 'paper') === th.id ? 'active' : ''}"
              style="background:${th.bg};"
              data-theme-id="${th.id}"
              title="${th.name}"
            ></button>
          `).join('')}
        </div>
      </div>

      <div class="sheet-row">
        <span class="sheet-label">${escapeHtml(activeList.name)} — ${escapeHtml(t('fontStyle'))}</span>
        <div class="font-options">
          ${LIST_FONTS.map(f => `
            <button
              type="button"
              class="font-btn ${(activeList.fontId || 'sans') === f.id ? 'active' : ''}"
              style="font-family:${f.family};"
              data-font-id="${f.id}"
            >
              ${escapeHtml(f.name)}
            </button>
          `).join('')}
        </div>
      </div>

      <div class="sheet-row">
        <span class="sheet-label">${escapeHtml(t('listCategory'))}</span>
        <div class="section-pills">
          ${listCategories.map(cat => `
            <button
              type="button"
              class="sec-pill ${activeList.category === cat ? 'active' : ''}"
              data-change-list-cat="${escapeHtml(cat)}"
            >
              ${escapeHtml(cat)}
            </button>
          `).join('')}
        </div>
      </div>

      <div class="sheet-actions">
        <div style="display:flex;gap:8px;">
          ${userVault.lists.length > 1 ? `
            <button type="button" class="btn-danger-text" id="btnDeleteCurrentList">${escapeHtml(t('deleteList'))}</button>
          ` : ''}
          ${checkedCount > 0 ? `
            <button type="button" class="btn-danger-text" id="btnClearChecked">${escapeHtml(t('clearChecked'))}</button>
          ` : ''}
        </div>
        <button type="button" class="btn-primary-pill" id="btnCloseStyle">${escapeHtml(t('save'))}</button>
      </div>
    </div>
  `;
}

function renderNewListModal(listCategories) {
  return `
    <div class="modal-backdrop" id="newListBackdrop">
      <form class="style-sheet" id="createListForm" onclick="event.stopPropagation()">
        <div class="sheet-row">
          <span class="sheet-label" style="color:#6B7280;">${escapeHtml(t('newListTitle'))}</span>
          <div class="add-input-wrap" style="background:#F9FAFB;border-color:#E5E7EB;">
            <input
              type="text"
              id="newListNameInput"
              class="add-item-input"
              style="color:#111827;font-family:'Inter',sans-serif;"
              placeholder="${escapeHtml(t('listNamePlaceholder'))}"
              required
              maxlength="50"
              autofocus
            />
          </div>
        </div>

        <div class="sheet-row">
          <span class="sheet-label" style="color:#6B7280;">${escapeHtml(t('listCategory'))}</span>
          <div class="add-input-wrap" style="background:#F9FAFB;border-color:#E5E7EB;">
            <input
              type="text"
              id="newListCatInput"
              class="add-item-input"
              style="color:#111827;font-family:'Inter',sans-serif;"
              list="existingCatsList"
              placeholder="${escapeHtml(t('catKitchen'))}"
              value="${escapeHtml(listCategories[0] || t('catKitchen'))}"
              maxlength="40"
            />
            <datalist id="existingCatsList">
              ${listCategories.map(c => `<option value="${escapeHtml(c)}"></option>`).join('')}
            </datalist>
          </div>
        </div>

        <div class="sheet-row">
          <span class="sheet-label" style="color:#6B7280;">${escapeHtml(t('colorTheme'))}</span>
          <div class="color-swatches">
            ${LIST_THEMES.map(th => `
              <button
                type="button"
                class="color-dot ${newListDraftThemeId === th.id ? 'active' : ''}"
                style="background:${th.bg};"
                data-draft-theme="${th.id}"
                title="${th.name}"
              ></button>
            `).join('')}
          </div>
        </div>

        <div class="sheet-row">
          <span class="sheet-label" style="color:#6B7280;">${escapeHtml(t('fontStyle'))}</span>
          <div class="font-options">
            ${LIST_FONTS.map(f => `
              <button
                type="button"
                class="font-btn ${newListDraftFontId === f.id ? 'active' : ''}"
                style="font-family:${f.family};background:${newListDraftFontId === f.id ? '#111827' : '#F9FAFB'};color:${newListDraftFontId === f.id ? '#FFF' : '#111827'};border-color:#E5E7EB;"
                data-draft-font="${f.id}"
              >
                ${escapeHtml(f.name)}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="sheet-actions" style="border-color:#E5E7EB;">
          <button type="button" class="btn-danger-text" id="btnCancelNewList" style="color:#6B7280;">${escapeHtml(t('cancel'))}</button>
          <button type="submit" class="btn-primary-pill" style="background:#111827;color:#FFF;">${escapeHtml(t('createList'))}</button>
        </div>
      </form>
    </div>
  `;
}

function bindUserEvents(activeList) {
  // Filter by List Category
  document.querySelectorAll('[data-cat-filter]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const cat = btn.getAttribute('data-cat-filter');
      userVault.activeCategoryFilter = cat;
      if (cat !== 'ALL') {
        const matching = userVault.lists.filter(l => l.category === cat);
        if (matching.length > 0 && !matching.some(l => l.id === userVault.activeListId)) {
          userVault.activeListId = matching[0].id;
        }
      }
      openStyleForListId = null;
      await saveUserVault(currentToken, userVault);
      renderUserApp();
    });
  });

  // Switch active list (Each list renders with its own independent themeId & fontId)
  document.querySelectorAll('[data-list-id]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const targetId = btn.getAttribute('data-list-id');
      userVault.activeListId = targetId;
      openStyleForListId = null;
      await saveUserVault(currentToken, userVault);
      renderUserApp();
    });
  });

  // Open new list modal (Resets draft theme & font to clean independent defaults)
  const btnNewList = document.getElementById('btnNewList');
  if (btnNewList) {
    btnNewList.addEventListener('click', () => {
      newListDraftThemeId = 'paper';
      newListDraftFontId = 'sans';
      showNewListModal = true;
      renderUserApp();
      setTimeout(() => document.getElementById('newListNameInput')?.focus(), 40);
    });
  }

  // Toggle inline per-list style panel inside the active list header
  const btnToggleListStyle = document.getElementById('btnToggleListStyle');
  if (btnToggleListStyle && activeList) {
    btnToggleListStyle.addEventListener('click', () => {
      openStyleForListId = openStyleForListId === activeList.id ? null : activeList.id;
      renderUserApp();
    });
  }

  // Edit active list name
  const listTitleInput = document.getElementById('listTitleInput');
  if (listTitleInput && activeList) {
    listTitleInput.addEventListener('change', async () => {
      const val = listTitleInput.value.trim();
      if (val) {
        activeList.name = val;
        await saveUserVault(currentToken, userVault);
        renderUserApp();
      }
    });
  }

  // Select section pill for new item
  document.querySelectorAll('[data-sec]').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedItemSection = btn.getAttribute('data-sec');
      renderUserApp();
      document.getElementById('newItemInput')?.focus();
    });
  });

  // Custom section button
  const btnAddCustomSection = document.getElementById('btnAddCustomSection');
  if (btnAddCustomSection) {
    btnAddCustomSection.addEventListener('click', () => {
      const custom = window.prompt(t('customSectionPrompt'));
      if (custom && custom.trim()) {
        selectedItemSection = custom.trim();
        renderUserApp();
        document.getElementById('newItemInput')?.focus();
      }
    });
  }

  // Add item form submission
  const addItemForm = document.getElementById('addItemForm');
  if (addItemForm && activeList) {
    addItemForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = document.getElementById('newItemInput');
      const text = (input?.value || '').trim();
      if (!text) return;

      if (getTotalItemCount(userVault) >= MAX_ITEMS_PER_USER) {
        return;
      }

      activeList.items.unshift({
        id: 'item_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
        text,
        section: selectedItemSection || t('secGeneral'),
        checked: false,
        checkedAt: null,
        createdAt: Date.now()
      });

      await saveUserVault(currentToken, userVault);
      renderUserApp();
      document.getElementById('newItemInput')?.focus();
    });
  }

  // Toggle item check/uncheck (starts or clears the 3-day auto-delete timer)
  document.querySelectorAll('[data-toggle-id]').forEach(el => {
    el.addEventListener('click', async () => {
      if (!activeList) return;
      const itemId = el.getAttribute('data-toggle-id');
      const item = activeList.items.find(i => i.id === itemId);
      if (!item) return;

      item.checked = !item.checked;
      item.checkedAt = item.checked ? Date.now() : null;
      if (!item.checked && openExpiryItemId === itemId) {
        openExpiryItemId = null;
      }

      await saveUserVault(currentToken, userVault);
      renderUserApp();
    });
  });

  // Toggle hourglass countdown details
  document.querySelectorAll('[data-hourglass-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const itemId = btn.getAttribute('data-hourglass-id');
      openExpiryItemId = openExpiryItemId === itemId ? null : itemId;
      renderUserApp();
    });
  });

  // Delete item immediately
  document.querySelectorAll('[data-delete-id]').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!activeList) return;
      const itemId = btn.getAttribute('data-delete-id');
      if (openExpiryItemId === itemId) openExpiryItemId = null;
      activeList.items = activeList.items.filter(i => i.id !== itemId);
      await saveUserVault(currentToken, userVault);
      renderUserApp();
    });
  });

  // Per-list inline style panel events (strictly modifies ONLY activeList)
  if (activeList && openStyleForListId === activeList.id) {
    document.getElementById('btnCloseStyle')?.addEventListener('click', () => {
      openStyleForListId = null;
      renderUserApp();
    });

    document.querySelectorAll('[data-theme-id]').forEach(btn => {
      btn.addEventListener('click', async () => {
        activeList.themeId = btn.getAttribute('data-theme-id');
        await saveUserVault(currentToken, userVault);
        renderUserApp();
      });
    });

    document.querySelectorAll('[data-font-id]').forEach(btn => {
      btn.addEventListener('click', async () => {
        activeList.fontId = btn.getAttribute('data-font-id');
        await saveUserVault(currentToken, userVault);
        renderUserApp();
      });
    });

    document.querySelectorAll('[data-change-list-cat]').forEach(btn => {
      btn.addEventListener('click', async () => {
        activeList.category = btn.getAttribute('data-change-list-cat');
        await saveUserVault(currentToken, userVault);
        renderUserApp();
      });
    });

    document.getElementById('btnDeleteCurrentList')?.addEventListener('click', async () => {
      if (userVault.lists.length <= 1) return;
      userVault.lists = userVault.lists.filter(l => l.id !== activeList.id);
      userVault.activeListId = userVault.lists[0].id;
      openStyleForListId = null;
      await saveUserVault(currentToken, userVault);
      renderUserApp();
    });

    document.getElementById('btnClearChecked')?.addEventListener('click', async () => {
      activeList.items = activeList.items.filter(i => !i.checked);
      openStyleForListId = null;
      await saveUserVault(currentToken, userVault);
      renderUserApp();
    });
  }

  // New List Modal events
  const newListBackdrop = document.getElementById('newListBackdrop');
  if (newListBackdrop) {
    newListBackdrop.addEventListener('click', () => {
      showNewListModal = false;
      renderUserApp();
    });
    document.getElementById('btnCancelNewList')?.addEventListener('click', () => {
      showNewListModal = false;
      renderUserApp();
    });

    document.querySelectorAll('[data-draft-theme]').forEach(btn => {
      btn.addEventListener('click', () => {
        const currentName = document.getElementById('newListNameInput')?.value || '';
        const currentCat = document.getElementById('newListCatInput')?.value || '';
        newListDraftThemeId = btn.getAttribute('data-draft-theme');
        renderUserApp();
        const nameEl = document.getElementById('newListNameInput');
        const catEl = document.getElementById('newListCatInput');
        if (nameEl) nameEl.value = currentName;
        if (catEl) catEl.value = currentCat;
      });
    });

    document.querySelectorAll('[data-draft-font]').forEach(btn => {
      btn.addEventListener('click', () => {
        const currentName = document.getElementById('newListNameInput')?.value || '';
        const currentCat = document.getElementById('newListCatInput')?.value || '';
        newListDraftFontId = btn.getAttribute('data-draft-font');
        renderUserApp();
        const nameEl = document.getElementById('newListNameInput');
        const catEl = document.getElementById('newListCatInput');
        if (nameEl) nameEl.value = currentName;
        if (catEl) catEl.value = currentCat;
      });
    });

    document.getElementById('createListForm')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('newListNameInput')?.value.trim();
      const cat = document.getElementById('newListCatInput')?.value.trim() || t('catKitchen');
      if (!name) return;

      const newList = {
        id: 'list_' + Date.now(),
        name,
        category: cat,
        themeId: newListDraftThemeId || 'paper',
        fontId: newListDraftFontId || 'sans',
        createdAt: Date.now(),
        items: []
      };
      userVault.lists.push(newList);
      userVault.activeListId = newList.id;
      openStyleForListId = null;
      if (userVault.activeCategoryFilter !== 'ALL' && userVault.activeCategoryFilter !== cat) {
        userVault.activeCategoryFilter = 'ALL';
      }
      showNewListModal = false;
      await saveUserVault(currentToken, userVault);
      renderUserApp();
    });
  }

  // Add to Home Screen (Ana Ekrana Ekle) button & modal events
  const btnAddToHomeScreen = document.getElementById('btnAddToHomeScreen');
  if (btnAddToHomeScreen) {
    btnAddToHomeScreen.addEventListener('click', async () => {
      if (deferredInstallPrompt) {
        try {
          deferredInstallPrompt.prompt();
          await deferredInstallPrompt.userChoice;
          deferredInstallPrompt = null;
          return;
        } catch (_) {}
      }
      showAddToHomeModal = true;
      renderUserApp();
    });
  }

  document.getElementById('a2hsBackdrop')?.addEventListener('click', () => {
    showAddToHomeModal = false;
    renderUserApp();
  });
  document.getElementById('btnCloseA2hs')?.addEventListener('click', () => {
    showAddToHomeModal = false;
    renderUserApp();
  });
}

// ============================================================================
// RENDER ADMIN PANEL (1,000 User Links Management, Zero Content Access)
// ============================================================================
async function renderAdminApp() {
  if (!isAdminLoggedIn()) {
    appRoot.innerHTML = `
      <div class="admin-wrapper" style="display:flex;align-items:center;justify-content:center;">
        <form id="adminLoginForm" style="background:#fff;border:1px solid #E5E7EB;border-radius:18px;padding:28px;width:100%;max-width:380px;display:flex;flex-direction:column;gap:14px;box-shadow:0 10px 25px rgba(0,0,0,0.04);">
          <div>
            <h2 style="font-size:1.2rem;font-weight:700;color:#111827;">ThingsYouNeed Admin</h2>
            <p style="font-size:0.82rem;color:#6B7280;margin-top:4px;">notes.thingsyourneed.com • 1,000 NFC Kullanıcı Yönetimi</p>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;">
            <label style="font-size:0.78rem;font-weight:600;color:#374151;">Admin Şifresi</label>
            <input type="password" id="adminPassInput" class="admin-search" style="min-width:unset;" placeholder="Şifre (Varsayılan: tyn2026)" required autofocus />
          </div>
          <div id="adminLoginErr" style="color:#DC2626;font-size:0.8rem;display:none;">Hatalı yönetici şifresi.</div>
          <button type="submit" class="admin-btn primary" style="justify-content:center;padding:10px;">Giriş Yap</button>
          <button type="button" id="btnBackToUser" class="admin-btn" style="justify-content:center;">Kullanıcı Arayüzüne Dön</button>
        </form>
      </div>
    `;

    document.getElementById('adminLoginForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = document.getElementById('adminPassInput')?.value || '';
      if (val === getAdminPassword()) {
        sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
        renderAdminApp();
      } else {
        const err = document.getElementById('adminLoginErr');
        if (err) err.style.display = 'block';
      }
    });

    document.getElementById('btnBackToUser')?.addEventListener('click', () => {
      switchToUserToken(INITIAL_TOKENS[0]);
    });
    return;
  }

  adminAccounts = await getAllAccountsForAdmin();

  const activeCount = adminAccounts.filter(a => a.status === 'active').length;
  const passiveCount = adminAccounts.filter(a => a.status === 'passive').length;
  const usedCount = adminAccounts.filter(a => a.lastAccessedAt || a.itemCount > 0).length;
  const totalItemsAll = adminAccounts.reduce((s, a) => s + (a.itemCount || 0), 0);

  const q = adminSearchQuery.trim().toLowerCase();
  const filtered = adminAccounts.filter(acc => {
    if (adminFilterStatus === 'active' && acc.status !== 'active') return false;
    if (adminFilterStatus === 'passive' && acc.status !== 'passive') return false;
    if (adminFilterStatus === 'used' && !acc.lastAccessedAt && !acc.itemCount) return false;
    if (!q) return true;
    const slotStr = `#${String(acc.slot).padStart(4, '0')}`;
    return (
      slotStr.toLowerCase().includes(q) ||
      String(acc.slot).includes(q) ||
      acc.token.toLowerCase().includes(q) ||
      (acc.adminNote || '').toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ADMIN_PAGE_SIZE));
  if (adminPage > totalPages) adminPage = totalPages;
  const startIdx = (adminPage - 1) * ADMIN_PAGE_SIZE;
  const pageItems = filtered.slice(startIdx, startIdx + ADMIN_PAGE_SIZE);
  const cloudCfg = getCloudConfig();

  appRoot.innerHTML = `
    <div class="admin-wrapper">
      <div class="admin-container">
        <!-- Topbar -->
        <header class="admin-topbar">
          <div class="admin-brand">
            <h1>notes.thingsyourneed.com — NFC Admin Paneli</h1>
            <p>1.000 benzersiz şifresiz NFC bağlantısı yönetimi</p>
          </div>
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <span class="privacy-badge" title="Kullanıcı listeleri AES-GCM ile şifrelenir ve bu panelden erişilemez">
              🔒 Gizlilik Korumalı: Liste İçerikleri Gizli
            </span>
            <button type="button" class="admin-btn" id="btnCloudConfig">
              ☁️ ${cloudCfg.enabled ? 'Bulut DB Aktif' : 'Firebase / Bulut DB'}
            </button>
            <button type="button" class="admin-btn primary" id="btnExportCsv">
              ⬇️ 1.000 Linki İndir (CSV / Excel)
            </button>
            <button type="button" class="admin-btn" id="btnChangeAdminPass">🔑 Şifre</button>
            <button type="button" class="admin-btn" id="btnAdminLogout">Çıkış</button>
          </div>
        </header>

        <!-- Stats -->
        <section class="admin-stats-grid">
          <div class="stat-card">
            <div class="label">Toplam NFC Bağlantısı</div>
            <div class="val">1,000</div>
          </div>
          <div class="stat-card">
            <div class="label">Aktif / Pasif</div>
            <div class="val">${activeCount} <span style="font-size:0.95rem;color:#9CA3AF;">/ ${passiveCount}</span></div>
          </div>
          <div class="stat-card">
            <div class="label">Kullanılan Etiket</div>
            <div class="val">${usedCount}</div>
          </div>
          <div class="stat-card">
            <div class="label">Toplam Ürün Sayısı (İçerik Gizli)</div>
            <div class="val">${totalItemsAll}</div>
          </div>
        </section>

        <!-- Search & Filter Toolbar -->
        <section class="admin-toolbar">
          <input
            type="search"
            id="adminSearchInput"
            class="admin-search"
            placeholder="Slot (#0001), Token (e47ps8z5s4) veya Sipariş Notu ara..."
            value="${escapeHtml(adminSearchQuery)}"
          />
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
            <button type="button" class="admin-btn ${adminFilterStatus === 'all' ? 'primary' : ''}" data-filter="all">Tümü (1000)</button>
            <button type="button" class="admin-btn ${adminFilterStatus === 'active' ? 'primary' : ''}" data-filter="active">Aktif (${activeCount})</button>
            <button type="button" class="admin-btn ${adminFilterStatus === 'passive' ? 'primary' : ''}" data-filter="passive">Pasif (${passiveCount})</button>
            <button type="button" class="admin-btn ${adminFilterStatus === 'used' ? 'primary' : ''}" data-filter="used">Kullanılan (${usedCount})</button>
          </div>
        </section>

        <!-- Accounts Table -->
        <section class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Slot</th>
                <th>Özel NFC Linki</th>
                <th>Durum</th>
                <th>Yönetici Notu / Etiket</th>
                <th>Son Erişim</th>
                <th>İstatistik (İçerik Gizli)</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              ${pageItems.map(acc => {
                const fullUrl = getFullNfcUrl(acc.token);
                const lastDate = acc.lastAccessedAt
                  ? new Date(acc.lastAccessedAt).toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' })
                  : 'Henüz okutulmadı';
                return `
                  <tr>
                    <td style="font-weight:700;color:#374151;">#${String(acc.slot).padStart(4, '0')}</td>
                    <td>
                      <div style="display:flex;align-items:center;gap:8px;">
                        <code class="token-code">${escapeHtml(fullUrl)}</code>
                        <button type="button" class="admin-btn" style="padding:4px 8px;font-size:0.74rem;" data-copy-url="${escapeHtml(fullUrl)}">Kopyala</button>
                        <button type="button" class="admin-btn" style="padding:4px 8px;font-size:0.74rem;" data-open-token="${escapeHtml(acc.token)}">Aç</button>
                      </div>
                    </td>
                    <td>
                      <span class="status-pill ${acc.status === 'active' ? 'active' : 'passive'}">
                        ${acc.status === 'active' ? '● Aktif' : '○ Pasif'}
                      </span>
                    </td>
                    <td>
                      <input
                        type="text"
                        class="note-inline-input"
                        placeholder="Örn: Sipariş #104..."
                        value="${escapeHtml(acc.adminNote || '')}"
                        data-note-slot="${acc.slot}"
                      />
                    </td>
                    <td style="color:#6B7280;font-size:0.8rem;">${escapeHtml(lastDate)}</td>
                    <td style="color:#4B5563;font-size:0.8rem;">
                      ${acc.listCount || 0} liste • <strong>${acc.itemCount || 0}</strong>/1000 ürün
                      <span style="color:#9CA3AF;font-size:0.72rem;display:block;">🔒 İçerik şifreli</span>
                    </td>
                    <td>
                      <div style="display:flex;align-items:center;gap:6px;">
                        <button type="button" class="admin-btn" style="padding:5px 9px;font-size:0.76rem;" data-toggle-slot="${acc.slot}">
                          ${acc.status === 'active' ? 'Pasife Al' : 'Aktifleştir'}
                        </button>
                        <button type="button" class="admin-btn danger" style="padding:5px 9px;font-size:0.76rem;" data-reset-slot="${acc.slot}">
                          Sıfırla
                        </button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </section>

        <!-- Pagination -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:4px 6px;">
          <span style="font-size:0.82rem;color:#6B7280;">
            Toplam ${filtered.length} kayıttan ${startIdx + 1}-${Math.min(startIdx + ADMIN_PAGE_SIZE, filtered.length)} arası gösteriliyor
          </span>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="admin-btn" id="btnPrevPage" ${adminPage <= 1 ? 'disabled' : ''}>← Önceki</button>
            <span style="font-size:0.84rem;font-weight:600;">Sayfa ${adminPage} / ${totalPages}</span>
            <button type="button" class="admin-btn" id="btnNextPage" ${adminPage >= totalPages ? 'disabled' : ''}>Sonraki →</button>
          </div>
        </div>
      </div>
    </div>

    ${showCloudModal ? renderCloudConfigModal(cloudCfg) : ''}
    ${renderPreviewDock()}
  `;

  bindAdminEvents();
  bindPreviewDockEvents();
}

function renderCloudConfigModal(cloudCfg) {
  return `
    <div class="modal-backdrop" id="cloudModalBackdrop">
      <form class="style-sheet" id="cloudConfigForm" style="background:#fff;color:#111827;border-color:#E5E7EB;max-width:520px;" onclick="event.stopPropagation()">
        <div>
          <h3 style="font-size:1.05rem;font-weight:700;">Firebase / Bulut Veritabanı Senkronizasyonu</h3>
          <p style="font-size:0.8rem;color:#6B7280;margin-top:4px;">
            <strong>Firebase Realtime Database (En Kolay):</strong> Tablo oluşturmaya gerek yoktur. Firebase konsolunda <em>Realtime Database</em> oluşturup sadece <code>Database URL</code> adresini aşağıya yapıştırmanız yeterlidir.<br/>
            *(Alternatif olarak Supabase URL + Anon Key de girebilirsiniz).*
          </p>
        </div>

        <div class="sheet-row">
          <span class="sheet-label" style="color:#4B5563;">Firebase Realtime Database URL (veya Supabase URL)</span>
          <input type="url" id="supaUrlInput" class="admin-search" placeholder="https://proje-adiniz-default-rtdb.firebaseio.com" value="${escapeHtml(cloudCfg.url)}" />
        </div>

        <div class="sheet-row">
          <span class="sheet-label" style="color:#4B5563;">Secret / Anon Key (Firebase Test Modunda Boş Bırakabilirsiniz)</span>
          <input type="text" id="supaKeyInput" class="admin-search" placeholder="İsteğe bağlı (Sadece Supabase için zorunlu)" value="${escapeHtml(cloudCfg.anonKey)}" />
        </div>

        <div class="sheet-actions" style="border-color:#E5E7EB;">
          <button type="button" class="admin-btn" id="btnCloseCloudModal">Kapat</button>
          <button type="submit" class="admin-btn primary">Kaydet ve Bağlan</button>
        </div>
      </form>
    </div>
  `;
}

function bindAdminEvents() {
  const searchInput = document.getElementById('adminSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      adminSearchQuery = searchInput.value;
      adminPage = 1;
      renderAdminApp();
      const el = document.getElementById('adminSearchInput');
      if (el) {
        el.focus();
        el.setSelectionRange(el.value.length, el.value.length);
      }
    });
  }

  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      adminFilterStatus = btn.getAttribute('data-filter');
      adminPage = 1;
      renderAdminApp();
    });
  });

  document.getElementById('btnPrevPage')?.addEventListener('click', () => {
    if (adminPage > 1) {
      adminPage--;
      renderAdminApp();
    }
  });

  document.getElementById('btnNextPage')?.addEventListener('click', () => {
    adminPage++;
    renderAdminApp();
  });

  // Copy NFC link
  document.querySelectorAll('[data-copy-url]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const url = btn.getAttribute('data-copy-url');
      try {
        await navigator.clipboard.writeText(url);
        const orig = btn.textContent;
        btn.textContent = '✓ Kopyalandı';
        setTimeout(() => { btn.textContent = orig; }, 1200);
      } catch (_) {}
    });
  });

  // Open user link in preview
  document.querySelectorAll('[data-open-token]').forEach(btn => {
    btn.addEventListener('click', () => {
      switchToUserToken(btn.getAttribute('data-open-token'));
    });
  });

  // Save inline admin note
  document.querySelectorAll('[data-note-slot]').forEach(input => {
    input.addEventListener('change', async () => {
      const slot = Number(input.getAttribute('data-note-slot'));
      await updateAccountAdminFields(slot, { adminNote: input.value.trim() });
    });
  });

  // Toggle Active / Passive
  document.querySelectorAll('[data-toggle-slot]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const slot = Number(btn.getAttribute('data-toggle-slot'));
      const acc = adminAccounts.find(a => a.slot === slot);
      if (!acc) return;
      const nextStatus = acc.status === 'active' ? 'passive' : 'active';
      await updateAccountAdminFields(slot, { status: nextStatus });
      renderAdminApp();
    });
  });

  // Reset User Account
  document.querySelectorAll('[data-reset-slot]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const slot = Number(btn.getAttribute('data-reset-slot'));
      const ok = window.confirm(`Slot #${String(slot).padStart(4, '0')} hesabını sıfırlamak istediğinize emin misiniz? Kullanıcının mevcut listeleri silinecek ve etiket yeni kullanıcı için sıfırlanacaktır.`);
      if (!ok) return;
      await resetUserAccountByAdmin(slot);
      renderAdminApp();
    });
  });

  // Export all 1,000 links as CSV (Excel compatible UTF-8 BOM)
  document.getElementById('btnExportCsv')?.addEventListener('click', () => {
    const header = 'Slot,Token,NFC_URL,Query_Fallback_URL,Status,Admin_Note,Last_Access,Item_Count\n';
    const rows = adminAccounts.map(a => {
      const noteClean = String(a.adminNote || '').replace(/"/g, '""');
      return `${a.slot},${a.token},${APP_DOMAIN}/${a.token},${APP_DOMAIN}/?u=${a.token},${a.status},"${noteClean}",${a.lastAccessedAt || ''},${a.itemCount || 0}`;
    }).join('\n');

    const blob = new Blob(['\uFEFF' + header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'thingsyourneed-1000-nfc-links.csv';
    a.click();
    URL.revokeObjectURL(url);
  });

  // Cloud config modal
  document.getElementById('btnCloudConfig')?.addEventListener('click', () => {
    showCloudModal = true;
    renderAdminApp();
  });
  document.getElementById('cloudModalBackdrop')?.addEventListener('click', () => {
    showCloudModal = false;
    renderAdminApp();
  });
  document.getElementById('btnCloseCloudModal')?.addEventListener('click', () => {
    showCloudModal = false;
    renderAdminApp();
  });
  document.getElementById('cloudConfigForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = document.getElementById('supaUrlInput')?.value || '';
    const key = document.getElementById('supaKeyInput')?.value || '';
    saveCloudConfig(url, key, Boolean(url));
    showCloudModal = false;
    renderAdminApp();
  });

  // Change Admin Password
  document.getElementById('btnChangeAdminPass')?.addEventListener('click', () => {
    const next = window.prompt('Yeni Admin Şifresini girin:', getAdminPassword());
    if (next && next.trim()) {
      localStorage.setItem(ADMIN_PASS_KEY, next.trim());
      window.alert('Admin şifresi güncellendi.');
    }
  });

  // Logout
  document.getElementById('btnAdminLogout')?.addEventListener('click', () => {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
    renderAdminApp();
  });
}

// ============================================================================
// PREVIEW / DEMO SWITCHER DOCK (Only shown on localhost or ?demo=1)
// ============================================================================
function safeUpdateUrlQuery(queryStr) {
  try {
    if (window.location.protocol !== 'file:') {
      window.history.pushState({}, '', queryStr);
    } else {
      window.location.hash = queryStr.replace(/^\?/, '');
    }
  } catch (_) {}
}

function isPreviewEnvironment() {
  const host = window.location.hostname;
  const params = new URLSearchParams(window.location.search);
  return (
    window.location.protocol === 'file:' ||
    !host ||
    host === 'localhost' ||
    host === '127.0.0.1' ||
    params.get('demo') === '1'
  );
}

function renderPreviewDock() {
  if (!isPreviewEnvironment()) return '';
  return `
    <div class="preview-dock">
      <span>NFC Test:</span>
      <select id="dockTokenSelect" title="Test farklı NFC etiketleri">
        ${INITIAL_TOKENS.slice(0, 5).map((tok, i) => `
          <option value="${tok}" ${currentMode === 'user' && currentToken === tok ? 'selected' : ''}>
            Etiket #${i + 1} (${tok})
          </option>
        `).join('')}
      </select>
      <button type="button" id="dockSwitchAdmin">
        ${currentMode === 'admin' ? '📱 Kullanıcı Görünümü' : '⚙️ Admin Paneli'}
      </button>
    </div>
  `;
}

function bindPreviewDockEvents() {
  document.getElementById('dockTokenSelect')?.addEventListener('change', (e) => {
    switchToUserToken(e.target.value);
  });
  document.getElementById('dockSwitchAdmin')?.addEventListener('click', () => {
    if (currentMode === 'admin') {
      switchToUserToken(currentToken || INITIAL_TOKENS[0]);
    } else {
      currentMode = 'admin';
      safeUpdateUrlQuery('?admin=1');
      renderAdminApp();
    }
  });
}

async function switchToUserToken(token) {
  currentMode = 'user';
  currentToken = token;
  openStyleForListId = null;
  safeUpdateUrlQuery(`?u=${token}`);
  const session = await loadUserSession(currentToken);
  sessionStatus = session.status;
  userVault = session.vault;
  renderUserApp();
}

// ============================================================================
// INITIALIZE APPLICATION & 3-DAY AUTO-DELETE WATCHER
// ============================================================================
async function boot() {
  await initI18n();
  resolveRoute();

  if (currentMode === 'admin') {
    await renderAdminApp();
  } else {
    const session = await loadUserSession(currentToken);
    sessionStatus = session.status;
    userVault = session.vault;
    renderUserApp();
  }

  // Real-time cross-tab / cloud sync listener
  onSyncMessage(async () => {
    if (currentMode === 'admin') {
      await renderAdminApp();
    } else if (currentMode === 'user' && currentToken) {
      const session = await loadUserSession(currentToken);
      sessionStatus = session.status;
      userVault = session.vault;
      renderUserApp();
    }
  });

  // Background watcher: every 60 seconds, purge any checked item older than 3 days (72h)
  setInterval(async () => {
    if (currentMode === 'user' && userVault && currentToken) {
      const { removedCount } = purgeExpiredCheckedItems(userVault);
      if (removedCount > 0) {
        await saveUserVault(currentToken, userVault);
        renderUserApp();
      }
    }
  }, 60 * 1000);
}

window.addEventListener('popstate', () => {
  boot();
});

boot();
