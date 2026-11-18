# note.thingsyourneed.com — NFC Shopping & Note Sub-App

Minimalist, passwordless NFC-powered shopping list and note application built for `https://note.thingsyourneed.com` (hosted on GitHub Pages with Supabase Cloud real-time sync).

## Özellikler (Features)
- **1.000 Benzersiz Şifresiz NFC Bağlantısı**: `data/tokens.js` ve `nfc-links-1000.csv` içerisinde önceden üretilmiş, tahmin edilemez 1.000 adet özel kullanıcı bağlantısı (`https://note.thingsyourneed.com/<token>`).
- **Sade Not Uygulaması Arayüzü**: Gereksiz metinlerden arındırılmış, mobil öncelikli arayüz.
- **1.000 Ürün Kapasitesi**: Kullanıcı başına toplam 1.000 adet madde ekleme sınırı.
- **Çift Katmanlı Kategorizasyon**:
  1. **Liste Kategorileri**: Mutfak, Kiler, Banyo, Market, Ev (veya özel kategori).
  2. **Liste İçi Ürün Bölümleri**: Meyve & Sebze, Süt Ürünleri, Temizlik, Kişisel Bakım vb. alt gruplar.
- **Kişiselleştirilebilir Görünüm**: Her liste için 8 farklı renk teması ve 5 farklı yazı tipi (Font).
- **Checkbox & 3 Gün Sonra Otomatik Silme**: İşaretlenen maddelerin üzeri çizilir (`line-through`) ve silinmediği takdirde **72 saat (3 gün)** sonunda otomatik olarak listeden kaldırılır.
- **Otomatik Cihaz Dili & Canlı Çeviri**: Cep telefonunun varsayılan dilini (`navigator.language`) otomatik algılar; yerleşik sözlükte olmayan bir dilse çeviri servisinden otomatik çekip önbelleğe alır.
- **Gizlilik Korumalı Admin Paneli (`?admin=1` veya `/admin`)**:
  - Kullanıcıların liste içerikleri tarayıcıda **AES-GCM** ile şifrelenir; Admin paneli içerikleri **kesinlikle göremez**.
  - Linkleri Aktif/Pasif yapma, Sıfırlama (Reset), Sipariş/Yönetici Notu ekleme, Son Erişim Tarihi & Ürün Sayısı istatistiği ve 1.000 linki tek tıkla CSV/Excel olarak dışa aktarma.

## GitHub Pages & Alt Domain Kurulumu (`note.thingsyourneed.com`)
1. GitHub'da yeni bir repository oluşturun (Örn: `nfc-note-app`) ve bu klasördeki dosyaları yükleyin.
2. Repository **Settings → Pages** bölümünden **Branch: `main` / `/ (root)`** seçip kaydedin. (`CNAME` dosyası otomatik olarak `note.thingsyourneed.com` adresini tanımlayacaktır).
3. Domain DNS yönetim panelinizden (`thingsyourneed.com`) yeni bir `CNAME` kaydı ekleyin:
   - **Name / Host**: `note`
   - **Target / Value**: `<github-kullanici-adiniz>.github.io`
4. Supabase eşitlemesi için `supabase-schema.sql` dosyasını Supabase SQL Editor'de çalıştırın ve Admin panelindeki **Bulut DB Ayarı** butonundan Supabase URL ve Anon Key bilgilerinizi girin.
