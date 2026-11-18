const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const csvLines = fs.readFileSync(path.join(root, 'nfc-links-1000.csv'), 'utf8').trim().split('\n');
const first25 = csvLines.slice(1, 26).map(line => {
  const parts = line.split(',');
  return { slot: parts[0], id: parts[1], token: parts[2], url: parts[3], fallback: parts[4] };
});

const html = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <title>ThingsYouNeed Notes — Sistem, Şifre ve Admin Yönetim Belgesi</title>
  <style>
    @page {
      size: A4;
      margin: 18mm 16mm;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #111827;
      line-height: 1.5;
      font-size: 11pt;
      margin: 0;
      padding: 0;
    }
    .header {
      border-bottom: 2px solid #111827;
      padding-bottom: 12px;
      margin-bottom: 20px;
    }
    .header h1 {
      font-size: 18pt;
      margin: 0 0 4px 0;
      color: #111827;
    }
    .header p {
      margin: 0;
      color: #4B5563;
      font-size: 10pt;
    }
    h2 {
      font-size: 13pt;
      color: #111827;
      border-left: 4px solid #111827;
      padding-left: 10px;
      margin: 22px 0 10px 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 16px;
      font-size: 10pt;
    }
    th, td {
      border: 1px solid #D1D5DB;
      padding: 8px 10px;
      text-align: left;
      vertical-align: top;
    }
    th {
      background-color: #F3F4F6;
      font-weight: 600;
      width: 32%;
    }
    code, .mono {
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
      background: #F3F4F6;
      padding: 2px 5px;
      border-radius: 4px;
      font-size: 9.5pt;
    }
    pre {
      font-family: "SFMono-Regular", Consolas, Menlo, monospace;
      background: #F9FAFB;
      border: 1px solid #E5E7EB;
      padding: 10px;
      border-radius: 6px;
      font-size: 9pt;
      overflow-x: auto;
    }
    .box {
      background: #F9FAFB;
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      padding: 12px 14px;
      margin-bottom: 14px;
      font-size: 10pt;
    }
    ul {
      margin: 6px 0 14px 20px;
      padding: 0;
    }
    li {
      margin-bottom: 5px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>ThingsYouNeed — NFC Not &amp; Alışveriş Listesi Web App</h1>
    <p>Sistem, Admin Paneli, Veritabanı ve 1.000 Kullanıcı Bağlantı Dokümantasyonu • Tarih: 18.11.2026</p>
  </div>

  <h2>1. Site ve Uygulama Adresleri</h2>
  <table>
    <tr>
      <th>Ana Domain</th>
      <td><span class="mono">https://thingsyourneed.com</span></td>
    </tr>
    <tr>
      <th>Web App Alt Domaini (Sub-App)</th>
      <td><span class="mono">https://notes.thingsyourneed.com</span></td>
    </tr>
    <tr>
      <th>Yerel Proje Klasörü (Mac)</th>
      <td><span class="mono">/Users/amete/.gemini/antigravity/scratch/nfc-note-subapp</span></td>
    </tr>
    <tr>
      <th>1.000 Adet NFC Link Dosyası (CSV)</th>
      <td><span class="mono">/Users/amete/.gemini/antigravity/scratch/nfc-note-subapp/nfc-links-1000.csv</span></td>
    </tr>
  </table>

  <h2>2. Admin Paneli Giriş ve Yönetim Bilgileri</h2>
  <table>
    <tr>
      <th>Admin Paneli Giriş URL (1)</th>
      <td><span class="mono">https://notes.thingsyourneed.com/?admin=1</span></td>
    </tr>
    <tr>
      <th>Admin Paneli Giriş URL (2)</th>
      <td><span class="mono">https://notes.thingsyourneed.com/admin</span></td>
    </tr>
    <tr>
      <th>Kullanıcı Adı</th>
      <td><strong>Yok</strong> (Tek şifre ile doğrudan giriş yapılır)</td>
    </tr>
    <tr>
      <th>Varsayılan Admin Şifresi</th>
      <td><span class="mono"><strong>tyn2026</strong></span></td>
    </tr>
    <tr>
      <th>Şifre Değiştirme</th>
      <td>Admin paneline giriş yaptıktan sonra sağ üstteki <strong>"🔑 Şifre"</strong> butonuna tıklayarak değiştirilebilir.</td>
    </tr>
    <tr>
      <th>Gizlilik &amp; Şifreleme Mimarisi</th>
      <td>Kullanıcıların liste içerikleri tarayıcıda <strong>AES-GCM (256-bit)</strong> ile şifrelenir. Admin paneli kullanıcıların liste içeriklerini ve ürün isimlerini <strong>kesinlikle göremez</strong>; yalnızca etiket aktif/pasif durumunu, sipariş notunu, son erişim tarihini ve toplam liste/ürün adedini görüntüler.</td>
    </tr>
  </table>

  <div class="box">
    <strong>Admin Paneli Yetkileri:</strong>
    <ul>
      <li><strong>1.000 Linki İndir (CSV / Excel):</strong> Sağ üstteki buton ile tüm NFC bağlantılarını tek tıkla Excel uyumlu CSV olarak indirme.</li>
      <li><strong>Pasife Al / Aktifleştir:</strong> İlgili NFC etiketini geçici olarak kullanıma kapatma veya açma.</li>
      <li><strong>Sıfırla (Reset):</strong> Etiketin içindeki tüm şifreli verileri silip yeni bir müşteriye/kullanıcıya hazır hale getirme.</li>
      <li><strong>Yönetici Notu / Etiket:</strong> Her bağlantının yanına (Örn: <em>Sipariş #104, Test Etiketi</em>) özel takip notu ekleme.</li>
    </ul>
  </div>

  <h2>3. Altyapı, GitHub, DNS ve Firebase Veritabanı Bilgileri</h2>
  <table>
    <tr>
      <th>GitHub Hesabı &amp; Repository</th>
      <td>
        Hesap: <span class="mono">arifarinmis</span> (<span class="mono">arifarinmis@gmail.com</span>)<br/>
        Repo URL: <span class="mono">https://github.com/arifarinmis/notes.git</span><br/>
        Branch: <span class="mono">main</span> / Root: <span class="mono">/ (root)</span>
      </td>
    </tr>
    <tr>
      <th>Cloudflare DNS Kaydı</th>
      <td>
        Tür (Type): <span class="mono">CNAME</span><br/>
        Ad (Name): <span class="mono">notes</span><br/>
        Hedef (Target): <span class="mono">arifarinmis.github.io</span><br/>
        Proxy Status: <span class="mono">DNS only (Gri Bulut)</span>
      </td>
    </tr>
    <tr>
      <th>Firebase Realtime Database URL</th>
      <td><span class="mono">https://thingsyourneed-notes-default-rtdb.firebaseio.com/</span></td>
    </tr>
    <tr>
      <th>Firebase Planı</th>
      <td><strong>Spark Plan (Ücretsiz / $0)</strong> — Uygulama koduna (<span class="mono">js/storage.js</span>) gömülüdür, tüm cihazlarda otomatik senkronize çalışır.</td>
    </tr>
  </table>

  <p><strong>Firebase Realtime Database Kalıcı Güvenlik Kuralları (Rules Sekmesi):</strong></p>
  <pre>{
  "rules": {
    "nfc_accounts": {
      ".read": true,
      ".write": true
    },
    "nfc_vaults": {
      ".read": true,
      ".write": true
    }
  }
}</pre>

  <h2>4. Kullanıcı NFC Bağlantıları (Şifresiz Erişim)</h2>
  <p>
    Kullanıcılar herhangi bir kullanıcı adı veya şifre girmez. Fiziksel ürün üzerindeki NFC etiketi okutulduğunda kişiye özel benzersiz bağlantı açılır.
    Aşağıda ilk 25 kullanıcının bağlantısı yer almaktadır (1'den 1000'e kadar tam liste <span class="mono">nfc-links-1000.csv</span> dosyasındadır):
  </p>
  <table>
    <thead>
      <tr>
        <th style="width:12%;">Slot</th>
        <th style="width:18%;">Kullanıcı Kodu</th>
        <th style="width:35%;">NFC Etiket Linki (Temiz URL)</th>
        <th style="width:35%;">Alternatif Parametreli Link</th>
      </tr>
    </thead>
    <tbody>
      ${first25.map(r => `
        <tr>
          <td><strong>#${String(r.slot).padStart(4, '0')}</strong></td>
          <td><span class="mono">${r.token}</span></td>
          <td><span class="mono">${r.url}</span></td>
          <td><span class="mono">${r.fallback}</span></td>
        </tr>
      `).join('')}
    </tbody>
  </table>
</body>
</html>`;

const htmlPath = path.join(root, 'ThingsYouNeed-Notes-Yonetim-Bilgileri.html');
fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Generated HTML:', htmlPath);
