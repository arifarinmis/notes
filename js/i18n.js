// Automatic Device Language Detection & Live Translation Engine
// Detects the phone's default language (navigator.language) and translates UI strings automatically.

const BASE_EN = {
  newItemPlaceholder: "Add item...",
  newListTitle: "New list",
  listNamePlaceholder: "List name...",
  itemCategoryPlaceholder: "Section (optional)...",
  allLists: "All",
  uncategorized: "General",
  // Default List Categories (Locations/Types)
  catPantry: "Pantry",
  catKitchen: "Kitchen",
  catBathroom: "Bathroom",
  catMarket: "Market",
  catHome: "Home",
  // Default In-List Sections (Item Groups)
  secGeneral: "General",
  secProduce: "Produce",
  secDairy: "Dairy",
  secMeat: "Meat & Fish",
  secBakery: "Bakery",
  secPantry: "Dry Goods",
  secCleaning: "Cleaning",
  secPersonal: "Personal Care",
  // Customization & Actions
  appearance: "Style",
  colorTheme: "Color",
  fontStyle: "Font",
  listCategory: "Category",
  deleteList: "Delete list",
  clearChecked: "Clear checked",
  createList: "Create",
  save: "Done",
  cancel: "Cancel",
  limitReached: "1,000 item limit reached",
  emptyNoteHint: "Tap above to add your first item",
  autoDeleteInfo: "Crossed-out item is deleted within 3 days.",
  autoDeleteRemaining: "Time remaining: {d} days {h} hours",
  inactiveTagTitle: "This NFC tag is paused",
  inactiveTagDesc: "Please contact the administrator to activate this link.",
  invalidTagTitle: "Invalid NFC link",
  invalidTagDesc: "Please scan a valid ThingsYouNeed NFC tag.",
  customSectionPrompt: "New section name:"
};

const BUILTIN_DICTIONARIES = {
  en: BASE_EN,
  tr: {
    newItemPlaceholder: "Ürün ekle...",
    newListTitle: "Yeni liste",
    listNamePlaceholder: "Liste adı...",
    itemCategoryPlaceholder: "Bölüm (isteğe bağlı)...",
    allLists: "Tümü",
    uncategorized: "Genel",
    catPantry: "Kiler",
    catKitchen: "Mutfak",
    catBathroom: "Banyo",
    catMarket: "Market",
    catHome: "Ev",
    secGeneral: "Genel",
    secProduce: "Meyve & Sebze",
    secDairy: "Süt Ürünleri",
    secMeat: "Et & Şarküteri",
    secBakery: "Fırın",
    secPantry: "Bakliyat",
    secCleaning: "Temizlik",
    secPersonal: "Kişisel Bakım",
    appearance: "Görünüm",
    colorTheme: "Renk",
    fontStyle: "Yazı Tipi",
    listCategory: "Kategori",
    deleteList: "Listeyi sil",
    clearChecked: "Çizilenleri temizle",
    createList: "Oluştur",
    save: "Tamam",
    cancel: "İptal",
    limitReached: "1.000 ürün sınırına ulaşıldı",
    emptyNoteHint: "İlk ürünü eklemek için yukarıya dokunun",
    autoDeleteInfo: "Üzeri çizilen madde 3 gün içinde silinir.",
    autoDeleteRemaining: "Silinmesine kalan süre: {d} gün {h} saat",
    inactiveTagTitle: "Bu NFC etiketi pasif durumda",
    inactiveTagDesc: "Etiketi aktifleştirmek için yönetici ile iletişime geçin.",
    invalidTagTitle: "Geçersiz NFC bağlantısı",
    invalidTagDesc: "Lütfen geçerli bir NFC etiketi okutun.",
    customSectionPrompt: "Yeni bölüm adı:"
  },
  de: {
    newItemPlaceholder: "Artikel hinzufügen...",
    newListTitle: "Neue Liste",
    listNamePlaceholder: "Listenname...",
    itemCategoryPlaceholder: "Bereich (optional)...",
    allLists: "Alle",
    uncategorized: "Allgemein",
    catPantry: "Vorratskammer",
    catKitchen: "Küche",
    catBathroom: "Badezimmer",
    catMarket: "Supermarkt",
    catHome: "Zuhause",
    secGeneral: "Allgemein",
    secProduce: "Obst & Gemüse",
    secDairy: "Milchprodukte",
    secMeat: "Fleisch & Fisch",
    secBakery: "Bäckerei",
    secPantry: "Vorräte",
    secCleaning: "Reinigung",
    secPersonal: "Körperpflege",
    appearance: "Stil",
    colorTheme: "Farbe",
    fontStyle: "Schriftart",
    listCategory: "Kategorie",
    deleteList: "Liste löschen",
    clearChecked: "Erledigte löschen",
    createList: "Erstellen",
    save: "Fertig",
    cancel: "Abbrechen",
    limitReached: "Limit von 1.000 Artikeln erreicht",
    emptyNoteHint: "Oben tippen, um den ersten Artikel hinzuzufügen",
    autoDeleteInfo: "Durchgestrichene Artikel werden in 3 Tagen gelöscht.",
    autoDeleteRemaining: "Verbleibende Zeit: {d} Tage {h} Std.",
    inactiveTagTitle: "Dieser NFC-Tag ist pausiert",
    inactiveTagDesc: "Bitte wenden Sie sich an den Administrator.",
    invalidTagTitle: "Ungültiger NFC-Link",
    invalidTagDesc: "Bitte scannen Sie einen gültigen NFC-Tag.",
    customSectionPrompt: "Neuer Bereichsname:"
  },
  fr: {
    newItemPlaceholder: "Ajouter un article...",
    newListTitle: "Nouvelle liste",
    listNamePlaceholder: "Nom de la liste...",
    itemCategoryPlaceholder: "Rayon (optionnel)...",
    allLists: "Tout",
    uncategorized: "Général",
    catPantry: "Garde-manger",
    catKitchen: "Cuisine",
    catBathroom: "Salle de bain",
    catMarket: "Courses",
    catHome: "Maison",
    secGeneral: "Général",
    secProduce: "Fruits & Légumes",
    secDairy: "Produits laitiers",
    secMeat: "Viande & Poisson",
    secBakery: "Boulangerie",
    secPantry: "Épicerie",
    secCleaning: "Entretien",
    secPersonal: "Hygiène",
    appearance: "Style",
    colorTheme: "Couleur",
    fontStyle: "Police",
    listCategory: "Catégorie",
    deleteList: "Supprimer la liste",
    clearChecked: "Effacer cochés",
    createList: "Créer",
    save: "OK",
    cancel: "Annuler",
    limitReached: "Limite de 1 000 articles atteinte",
    emptyNoteHint: "Appuyez ci-dessus pour ajouter un article",
    autoDeleteInfo: "L'article barré sera supprimé sous 3 jours.",
    autoDeleteRemaining: "Temps restant : {d} j {h} h",
    inactiveTagTitle: "Ce tag NFC est désactivé",
    inactiveTagDesc: "Veuillez contacter l'administrateur.",
    invalidTagTitle: "Lien NFC invalide",
    invalidTagDesc: "Veuillez scanner un tag NFC valide.",
    customSectionPrompt: "Nom du nouveau rayon :"
  },
  es: {
    newItemPlaceholder: "Añadir artículo...",
    newListTitle: "Nueva lista",
    listNamePlaceholder: "Nombre de la lista...",
    itemCategoryPlaceholder: "Sección (opcional)...",
    allLists: "Todo",
    uncategorized: "General",
    catPantry: "Despensa",
    catKitchen: "Cocina",
    catBathroom: "Baño",
    catMarket: "Mercado",
    catHome: "Hogar",
    secGeneral: "General",
    secProduce: "Frutas y Verduras",
    secDairy: "Lácteos",
    secMeat: "Carne y Pescado",
    secBakery: "Panadería",
    secPantry: "Despensa",
    secCleaning: "Limpieza",
    secPersonal: "Cuidado personal",
    appearance: "Estilo",
    colorTheme: "Color",
    fontStyle: "Fuente",
    listCategory: "Categoría",
    deleteList: "Eliminar lista",
    clearChecked: "Borrar marcados",
    createList: "Crear",
    save: "Listo",
    cancel: "Cancelar",
    limitReached: "Límite de 1.000 artículos alcanzado",
    emptyNoteHint: "Toca arriba para añadir tu primer artículo",
    autoDeleteInfo: "El artículo tachado se eliminará en 3 días.",
    autoDeleteRemaining: "Tiempo restante: {d} días {h} horas",
    inactiveTagTitle: "Esta etiqueta NFC está pausada",
    inactiveTagDesc: "Contacta con el administrador para activarla.",
    invalidTagTitle: "Enlace NFC no válido",
    invalidTagDesc: "Escanea una etiqueta NFC válida.",
    customSectionPrompt: "Nombre de la sección:"
  },
  ar: {
    newItemPlaceholder: "إضافة عنصر...",
    newListTitle: "قائمة جديدة",
    listNamePlaceholder: "اسم القائمة...",
    itemCategoryPlaceholder: "القسم (اختياري)...",
    allLists: "الكل",
    uncategorized: "عام",
    catPantry: "المؤن",
    catKitchen: "المطبخ",
    catBathroom: "الحمام",
    catMarket: "السوق",
    catHome: "المنزل",
    secGeneral: "عام",
    secProduce: "خضروات وفواكه",
    secDairy: "ألبان",
    secMeat: "لحوم",
    secBakery: "مخبوزات",
    secPantry: "بقوليات",
    secCleaning: "تنظيف",
    secPersonal: "عناية شخصية",
    appearance: "المظهر",
    colorTheme: "اللون",
    fontStyle: "الخط",
    listCategory: "الفئة",
    deleteList: "حذف القائمة",
    clearChecked: "مسح المحدد",
    createList: "إنشاء",
    save: "تم",
    cancel: "إلغاء",
    limitReached: "تم الوصول للحد الأقصى (1000)",
    emptyNoteHint: "اضغط بالأعلى لإضافة أول عنصر",
    autoDeleteInfo: "يتم حذف العنصر المشطوب خلال 3 أيام.",
    autoDeleteRemaining: "الوقت المتبقي: {d} يوم و {h} ساعة",
    inactiveTagTitle: "ملصق NFC غير نشط",
    inactiveTagDesc: "يرجى التواصل مع المسؤول لتفعيله.",
    invalidTagTitle: "رابط غير صالح",
    invalidTagDesc: "يرجى مسح ملصق NFC صالح.",
    customSectionPrompt: "اسم القسم الجديد:"
  }
};

let activeDict = { ...BASE_EN };
let detectedLangCode = 'en';

export function getDeviceLanguageCode() {
  const raw = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
  return raw.split('-')[0].toLowerCase();
}

export async function initI18n(overrideLang = null) {
  detectedLangCode = overrideLang || getDeviceLanguageCode();

  // Set RTL direction for Arabic/Hebrew/Persian/Urdu
  if (['ar', 'he', 'fa', 'ur'].includes(detectedLangCode)) {
    document.documentElement.dir = 'rtl';
  } else {
    document.documentElement.dir = 'ltr';
  }
  document.documentElement.lang = detectedLangCode;

  // 1. Check built-in dictionary first
  if (BUILTIN_DICTIONARIES[detectedLangCode]) {
    activeDict = { ...BASE_EN, ...BUILTIN_DICTIONARIES[detectedLangCode] };
    return activeDict;
  }

  // 2. Check cached live translation in localStorage
  const cacheKey = `tyn_i18n_cache_${detectedLangCode}`;
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      activeDict = { ...BASE_EN, ...JSON.parse(cached) };
      return activeDict;
    }
  } catch (_) {}

  // 3. Fetch live translation from Google Translate / MyMemory API for any other phone language
  try {
    const keys = Object.keys(BASE_EN);
    const values = keys.map(k => BASE_EN[k]);
    const joined = values.join(' ||| ');
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(detectedLangCode)}&dt=t&q=${encodeURIComponent(joined)}`;

    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && Array.isArray(data[0])) {
        const translatedFull = data[0].map(part => part[0]).join('');
        const splitValues = translatedFull.split(/\s*\|\|\|\s*/);
        const translatedObj = {};
        keys.forEach((k, idx) => {
          translatedObj[k] = splitValues[idx] || BASE_EN[k];
        });
        activeDict = { ...BASE_EN, ...translatedObj };
        localStorage.setItem(cacheKey, JSON.stringify(translatedObj));
      }
    }
  } catch (err) {
    // Fallback to English if offline or blocked
    activeDict = { ...BASE_EN };
  }

  return activeDict;
}

export function t(key, params = {}) {
  let str = activeDict[key] || BASE_EN[key] || key;
  Object.keys(params).forEach(k => {
    str = str.replace(`{${k}}`, params[k]);
  });
  return str;
}

export function getActiveLang() {
  return detectedLangCode;
}
