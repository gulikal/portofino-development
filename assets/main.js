(function () {
  "use strict";
  var SITE = window.SITE;
  var LANGS = ["az", "ru", "en"];
  var PIN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/></svg>';
  var ICONS = {
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4ZM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4ZM12 2c-2.7 0-3.1 0-4.1.1C4.4 2.2 2.2 4.4 2.1 7.9 2 8.9 2 9.3 2 12s0 3.1.1 4.1c.1 3.5 2.3 5.7 5.8 5.8 1 .1 1.4.1 4.1.1s3.1 0 4.1-.1c3.5-.1 5.7-2.3 5.8-5.8.1-1 .1-1.4.1-4.1s0-3.1-.1-4.1c-.1-3.5-2.3-5.7-5.8-5.8C15.1 2 14.7 2 12 2Zm0 1.8c2.7 0 3 0 4 .1 2.5.1 3.9 1.5 4 4 .1 1 .1 1.3.1 4s0 3-.1 4c-.1 2.5-1.5 3.9-4 4-1 .1-1.3.1-4 .1s-3 0-4-.1c-2.5-.1-3.9-1.5-4-4-.1-1-.1-1.3-.1-4s0-3 .1-4c.1-2.5 1.5-3.9 4-4 1-.1 1.3-.1 4-.1Z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3Z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.9 8.8H3.6V20h3.3V8.8ZM5.2 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM20.4 13.6c0-3-1.6-4.9-4.2-4.9-1.5 0-2.5.8-2.9 1.6V8.8H10V20h3.3v-5.9c0-1.6.6-2.6 2-2.6 1.3 0 1.8.9 1.8 2.6V20h3.3v-6.4Z"/></svg>'
  };

  function storedLang() {
    try {
      var q = new URLSearchParams(window.location.search).get("lang");
      if (q && LANGS.indexOf(q) > -1) return q;
      var s = window.localStorage.getItem("pd-lang");
      if (s && LANGS.indexOf(s) > -1) return s;
    } catch (e) { /* storage unavailable */ }
    return SITE.defaultLang;
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function renderStats(lang) {
    var box = document.getElementById("stats");
    box.textContent = "";
    SITE.stats.forEach(function (s) {
      var d = el("div", "stat");
      d.appendChild(el("b", null, s.value));
      d.appendChild(el("small", null, s.label[lang]));
      box.appendChild(d);
    });
  }

  function renderCompanies(lang, t) {
    var wrap = document.getElementById("cards");
    var foot = document.getElementById("footer-companies");
    wrap.textContent = "";
    foot.textContent = "";

    SITE.companies.forEach(function (c) {
      if (c.status === "hidden") return;
      var active = c.status === "active";
      var card = el(active ? "a" : "div", "card" + (active ? "" : " is-soon"));
      if (active) {
        card.href = c.url || "#";
        card.target = "_self"; // TZ: keçidlər eyni pəncərədə açılır
      } else {
        card.setAttribute("aria-disabled", "true");
      }

      var cm = el("div", "card-media");
      var media = el("div", "media");
      if (c.image) { media.setAttribute("data-img", c.image); cm.classList.add("has-img"); }
      cm.appendChild(media);
      cm.appendChild(el("span", "gold-badge card-tag", c.tag[lang]));

      var logo = el("div", "card-logo");
      if (c.logo) {
        var img = el("img");
        img.src = c.logo;
        img.alt = c.name[lang];
        logo.appendChild(img);
      } else if (c.logoText && c.logoText.length) {
        var lt = el("div", "logo-text");
        lt.appendChild(document.createTextNode(c.logoText[0]));
        if (c.logoText[1]) lt.appendChild(el("small", null, c.logoText[1]));
        logo.appendChild(lt);
      } else {
        logo.appendChild(el("div", "logo-text", "· · ·"));
      }
      cm.appendChild(logo);

      if (!active) {
        // "Tezliklə" kartı: bulanıq ön baxış, qızılı işıq, böyük kursiv başlıq
        cm.classList.add("soon-media");
        var glow = el("div", "soon-glow");
        cm.appendChild(glow);
        var soon = el("div", "soon-center");
        soon.innerHTML = '<svg class="soon-hex" viewBox="0 0 100 100" aria-hidden="true"><path d="M27 6h46l23 44-23 44H27L4 50 27 6Z"/></svg>';
        soon.appendChild(el("span", "soon-kicker", t["soon.kicker"]));
        soon.appendChild(el("strong", "soon-title", t["card.soon"]));
        soon.appendChild(el("span", "soon-line", t["soon.line"]));
        cm.appendChild(soon);
      }

      var cap = el("div", "card-cap");
      if (c.logo && c.image) {
        var capLogo = el("img", "cap-logo");
        capLogo.src = c.logo;
        capLogo.alt = c.name[lang];
        cap.appendChild(capLogo);
      }
      if (c.place && c.place[lang]) {
        var pl = el("span", "place");
        pl.innerHTML = PIN;
        pl.appendChild(document.createTextNode(c.place[lang]));
        cap.appendChild(pl);
      }
      cap.appendChild(el("h3", null, c.name[lang]));
      cm.appendChild(cap);
      card.appendChild(cm);

      var info = el("div", "card-info");
      info.appendChild(el("p", null, c.text[lang]));
      info.appendChild(el("span", "btn btn-line", active ? t["card.visit"] : t["card.soon"]));
      card.appendChild(info);
      wrap.appendChild(card);

      if (active) {
        var li = el("li");
        var a = el("a", null, c.name[lang]);
        a.href = c.url || "#";
        li.appendChild(a);
        foot.appendChild(li);
      }
    });
  }

  function renderContact(lang) {
    var c = SITE.contact;
    var tel = "tel:" + c.phone.replace(/[^\d+]/g, "");
    ["c-phone", "m-phone"].forEach(function (id) {
      var p = document.getElementById(id);
      if (p) { p.href = tel; p.textContent = c.phone; }
    });
    ["c-email", "m-email"].forEach(function (id) {
      var e = document.getElementById(id);
      if (e) { e.href = "mailto:" + c.email; e.textContent = c.email; }
    });
    document.getElementById("c-address").querySelector(".v").textContent = c.address[lang];

    var fc = document.getElementById("footer-contact");
    fc.textContent = "";
    [[c.address[lang], null], [c.phone, tel], [c.email, "mailto:" + c.email]].forEach(function (row) {
      var li = el("li");
      if (row[1]) {
        var a = el("a", null, row[0]);
        a.href = row[1];
        li.appendChild(a);
      } else {
        li.textContent = row[0];
      }
      fc.appendChild(li);
    });

    var social = document.getElementById("c-social");
    social.textContent = "";
    c.social.forEach(function (s) {
      if (!s.url) return; // boş keçid göstərilmir
      var li = el("li");
      var a = el("a");
      a.href = s.url;
      a.rel = "noopener";
      a.setAttribute("aria-label", s.name);
      if (ICONS[s.icon]) a.innerHTML = ICONS[s.icon]; else a.textContent = s.name;
      li.appendChild(a);
      social.appendChild(li);
    });
  }

  // Şəkillər: data-img atributundan fon şəkli kimi yüklənir (fayl yoxdursa, brend fonu qalır)
  function applyImages() {
    var imgs = SITE.images || {};
    document.querySelectorAll("[data-img]").forEach(function (n) {
      var key = n.getAttribute("data-imgkey");
      if (key && imgs[key]) n.setAttribute("data-img", imgs[key]);
      var src = new URL(n.getAttribute("data-img"), document.baseURI).href;
      n.style.backgroundImage = "url('" + src + "'), linear-gradient(160deg, #2E6E65 0%, #0F4F47 45%, #08372F 100%)";
    });
  }

  function setLang(lang) {
    var t = SITE.i18n[lang];
    document.documentElement.lang = lang;
    document.title = t["meta.title"];
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", t["meta.description"]);

    document.querySelectorAll("[data-i18n]").forEach(function (n) {
      var key = n.getAttribute("data-i18n");
      if (t[key] != null) n.textContent = t[key];
    });
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
    });

    renderStats(lang);
    renderCompanies(lang, t);
    renderContact(lang);
    applyImages();
    document.dispatchEvent(new CustomEvent("pd:lang", { detail: lang }));
    try { window.localStorage.setItem("pd-lang", lang); } catch (e) { /* ignore */ }
  }

  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
  });

  // Hero-dan sonra menyu ağ fona keçir
  var header = document.getElementById("header");
  function onScroll() { header.classList.toggle("is-solid", window.scrollY > 60); }
  window.addEventListener("scroll", onScroll, { passive: true });

  document.getElementById("year").textContent = String(new Date().getFullYear());
  setLang(storedLang());
  onScroll();

  /* İdarəetmə paneli: məzmun Firebase-dədirsə, oradan yüklənir.
     assets/firebase-config.js doldurulmayıbsa, data.js-dəki məzmun istifadə olunur. */
  var cfg = window.PD_FIREBASE;
  // Paneldən yüklənmiş şəkillər Firestore-da "fsimg:ID" kimi saxlanılır
  function fsImages(remote) {
    var ids = [];
    function scan(v) { if (typeof v === "string" && v.indexOf("fsimg:") === 0) ids.push(v.slice(6)); }
    Object.keys(remote.images || {}).forEach(function (k) { scan(remote.images[k]); });
    (remote.companies || []).forEach(function (c) { scan(c.image); scan(c.logo); });
    if (!ids.length) return Promise.resolve(remote);
    var map = {};
    return Promise.all(ids.map(function (id) {
      return fetch(base + "/images/" + encodeURIComponent(id) + keyQ).then(function (r) { return r.ok ? r.json() : null; })
        .then(function (d) { map[id] = d && d.fields && d.fields.data ? d.fields.data.stringValue : ""; })
        .catch(function () { map[id] = ""; });
    })).then(function () {
      function rep(v) { return typeof v === "string" && v.indexOf("fsimg:") === 0 ? map[v.slice(6)] || "" : v; }
      Object.keys(remote.images || {}).forEach(function (k) { remote.images[k] = rep(remote.images[k]); });
      (remote.companies || []).forEach(function (c) { c.image = rep(c.image); c.logo = rep(c.logo); });
      return remote;
    });
  }
  var base = cfg && cfg.projectId ? "https://firestore.googleapis.com/v1/projects/" + encodeURIComponent(cfg.projectId) + "/databases/(default)/documents" : "";
  var keyQ = cfg && cfg.apiKey ? "?key=" + encodeURIComponent(cfg.apiKey) : "";

  function applyRemote(remote) {
    // panelə sonradan əlavə olunan açarlar itməsin deyə data.js ilə birləşdiririk
    ["az", "ru", "en"].forEach(function (l) {
      remote.i18n = remote.i18n || {};
      remote.i18n[l] = Object.assign({}, SITE.i18n[l], remote.i18n[l] || {});
    });
    SITE = window.SITE = Object.assign({}, SITE, remote);
    setLang(document.documentElement.lang || storedLang());
    document.dispatchEvent(new CustomEvent("pd:render"));
  }
  if (!(cfg && cfg.projectId)) {
    // Demo rejimi: paneldə bu brauzerdə saxlanılan dəyişikliklər
    try {
      var demoRaw = window.localStorage.getItem("pd-demo-content");
      if (demoRaw) applyRemote(JSON.parse(demoRaw));
    } catch (e) { /* ignore */ }
  } else {
    fetch(base + "/site/content" + keyQ, { cache: "no-store" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (doc) {
        var raw = doc && doc.fields && doc.fields.json && doc.fields.json.stringValue;
        if (!raw) return;
        return fsImages(JSON.parse(raw)).then(applyRemote);
      })
      .catch(function () { /* şəbəkə xətası: data.js məzmunu qalır */ });
  }
})();
