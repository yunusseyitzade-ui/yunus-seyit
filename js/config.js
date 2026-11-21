/**
 * YUNUS SEYİT — Kişisel ayarlar
 * -----------------------------------------------------------------
 * Boş bıraktığın alanlar sitede "henüz eklenmedi" olarak görünür;
 * sahte bağlantı ya da çalışıyormuş gibi görünen form gösterilmez.
 */
window.YS_CONFIG = {
  // Kendi adresini yaz: "ornek@mail.com"
  email: "",

  // Tam adresleri yaz: "https://github.com/kullaniciadi"
  github: "",
  linkedin: "",

  /**
   * İletişim formu servisi (ücretsiz seçenek: https://formspree.io).
   * 1) Formspree'de hesap aç, yeni form oluştur.
   * 2) Sana verilen adresi buraya yapıştır:
   *    "https://formspree.io/f/xxxxxxxx"
   * Boş bırakılırsa form gönderilmez; ziyaretçiye dürüstçe bilgi verilir.
   */
  formEndpoint: "",

  // Canlı site adresin (SEO / paylaşım kartları için). Örn: "https://yunusseyit.dev"
  siteUrl: "",

  // Kişisel fotoğraf: assets/profile.jpg dosyasını ekleyip yolunu yaz. Boşsa şık bir yer tutucu görünür.
  profilePhoto: ""
};
