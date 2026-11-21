# YUNUS SEYİT — Kişisel Yazılım Portföyü

**Hayal et. Tasarla. İnşa et.**

Siyah & altın temalı, çift dilli (TR/EN), derleme gerektirmeyen statik portföy sitesi.
Saf HTML + CSS + JavaScript — `index.html` dosyasını çift tıklayarak bile açabilirsin.

## Yapı

```
index.html          Sayfa iskeleti (bölümler)
css/style.css       Tüm stiller (renkler en üstteki :root değişkenlerinde)
js/config.js        ✏️ KİŞİSEL AYARLAR: e-posta, GitHub, LinkedIn, form servisi, fotoğraf
js/data.js          ✏️ Projeler ve yetenek seviyeleri
js/i18n.js          ✏️ Tüm Türkçe / İngilizce metinler
js/main.js          Davranışlar (dil, menü, animasyonlar, form, proje penceresi)
assets/             Logo, favicon, hero ve proje görselleri (SVG)
```

## Önce bunları doldur (hiçbiri uydurma değildir; boşsa site dürüstçe "henüz eklenmedi" der)

1. **`js/config.js`** → `email`, `github`, `linkedin`, `siteUrl`, `profilePhoto`
2. **İletişim formu** → [Formspree](https://formspree.io)'da ücretsiz form oluştur, verilen adresi `formEndpoint` alanına yapıştır.
   Boşsa form *gönderilmez* ve ziyaretçiye bunun yapılandırılmadığı söylenir (e-posta tanımlıysa mailto bağlantısı sunulur).
3. **`js/data.js`** → Her projeye `github` ve `demo` adreslerini ekle. Boş olanlar "yakında" olarak pasif görünür.
4. **Yetenek seviyeleri** → `SKILLS.items` içindeki `level` alanı: `active` (aktif), `learning` (öğreniyorum), `goal` (hedefim). Kendi durumuna göre düzenle.

## Yeni proje eklemek

1. `assets/projects/` içine görsel koy.
2. `js/data.js` → `PROJECTS` dizisine `{ id, image, tech, github, demo }` ekle.
3. `js/i18n.js` → TR ve EN için `project.<id>.tagline` ve `project.<id>.desc` ekle.
4. (İsteğe bağlı) Proje adı id'den farklıysa nesneye `name: "Adı"` ekle.

## Yayınlama (GitHub Pages)

1. Klasörü GitHub'a yükle.
2. Repo → Settings → Pages → Branch: `main` / root.
3. Canlı adresi `siteUrl` alanına yaz.

## Erişilebilirlik & performans

Klavye ile gezinme, odak halkaları, "içeriğe geç" bağlantısı, ARIA etiketleri, `prefers-reduced-motion` desteği,
tembel yüklenen görseller, harici kütüphane yok.
