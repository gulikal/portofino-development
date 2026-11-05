# Portofino Development — korporativ one-page sayt

Statik sayt (HTML, CSS, JavaScript). Verilənlər bazası və ya server proqramı tələb etmir, istənilən veb-serverdə (Nginx, Apache, IIS) işləyir.

## Fayl strukturu

```
index.html            Səhifənin strukturu
assets/styles.css     Dizayn (brendbuk rəngləri)
assets/data.js        BÜTÜN MƏZMUN: mətnlər (AZ/RU/EN), şirkətlər, əlaqə
assets/main.js        Dil dəyişimi və kartların göstərilməsi
assets/logos/         Şirkət loqoları (SVG və ya PNG)
assets/favicon.svg    Brauzer ikonu
robots.txt, sitemap.xml
```

## Məzmunu yeniləmək

Bütün dəyişikliklər `assets/data.js` faylında edilir.

**Mətnlər:** `i18n` bölməsində hər dil üçün eyni açarlar var (`hero.title`, `about.p1` və s.).

**Yeni şirkət əlavə etmək:** `companies` siyahısına yeni blok əlavə edin:

```js
{
  id: "yeni-sirket",
  status: "active",            // active | soon | hidden
  url: "https://sirket.az",
  logo: "assets/logos/yeni-sirket.svg",
  logoText: ["ŞİRKƏT", "ADI"],
  tag:  { az: "...", ru: "...", en: "..." },
  name: { az: "...", ru: "...", en: "..." },
  text: { az: "...", ru: "...", en: "..." }
}
```

Kartlar avtomatik düzülür, `index.html` və dizayna toxunmaq lazım deyil.

## Yayıma çıxarmazdan əvvəl

1. `index.html`, `robots.txt`, `sitemap.xml` fayllarında `DOMEN.az` sözünü real domenlə əvəz edin.
2. Rəsmi loqoları `assets/logos/` qovluğuna yükləyin və `data.js`-də `logo` sahəsinə yazın. Portofino Development loqosu `index.html`-də header şərhində göstərilən yerə əlavə edilir.
3. Şirkət keçidlərini (`url`) və əlaqə məlumatlarını real dəyərlərlə əvəz edin.
4. Analitika kodunu `index.html`-də `ANALİTİKA` şərhinin yerinə əlavə edin.
5. Sosial paylaşım şəkli: `assets/og-image.jpg` (1200×630).

## Serverə yerləşdirmə

Bütün qovluq məzmununu serverin veb kök qovluğuna (məsələn, `/var/www/portofino`) köçürün. HTTPS üçün SSL sertifikatı serverdə qoşulmalıdır (məsələn, Let's Encrypt).

Nginx nümunəsi:

```nginx
server {
  listen 443 ssl;
  server_name DOMEN.az www.DOMEN.az;
  root /var/www/portofino;
  index index.html;
  location /assets/ { expires 30d; add_header Cache-Control "public"; }
}
```
