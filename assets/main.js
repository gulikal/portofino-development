/* Portofino Development — landing: dil, şirkət kartları, əlaqə, müraciət forması, mobil menyu.
   Məzmun data.js-dən, Firebase qoşulubsa idarəetmə panelindən yüklənir.
   Müraciətlər Firestore-un "requests" kolleksiyasına yazılır və paneldə görünür. */
(function () {
  "use strict";
  if (!window.SITE) { setTimeout(function () { location.reload(); }, 1500); return; } // data.js yüklənməyib
  var SITE = window.SITE;
  var DEFAULTS = JSON.parse(JSON.stringify(window.SITE));
  var LANGS = ["az", "ru", "en"];
  var cfg = window.PD_FIREBASE;
  var base = cfg && cfg.projectId ? "https://firestore.googleapis.com/v1/projects/" + encodeURIComponent(cfg.projectId) + "/databases/(default)/documents" : "";
  var keyQ = cfg && cfg.apiKey ? "?key=" + encodeURIComponent(cfg.apiKey) : "";
  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var HEX = '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M27 6h46l23 44-23 44H27L4 50 27 6Z"/></svg>';
  var ICONS = {
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4ZM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4ZM12 2c-2.7 0-3.1 0-4.1.1C4.4 2.2 2.2 4.4 2.1 7.9 2 8.9 2 9.3 2 12s0 3.1.1 4.1c.1 3.5 2.3 5.7 5.8 5.8 1 .1 1.4.1 4.1.1s3.1 0 4.1-.1c3.5-.1 5.7-2.3 5.8-5.8.1-1 .1-1.4.1-4.1s0-3.1-.1-4.1c-.1-3.5-2.3-5.7-5.8-5.8C15.1 2 14.7 2 12 2Zm0 1.8c2.7 0 3 0 4 .1 2.5.1 3.9 1.5 4 4 .1 1 .1 1.3.1 4s0 3-.1 4c-.1 2.5-1.5 3.9-4 4-1 .1-1.3.1-4 .1s-3 0-4-.1c-2.5-.1-3.9-1.5-4-4-.1-1-.1-1.3-.1-4s0-3 .1-4c.1-2.5 1.5-3.9 4-4 1-.1 1.3-.1 4-.1Z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3Z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.9 8.8H3.6V20h3.3V8.8ZM5.2 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM20.4 13.6c0-3-1.6-4.9-4.2-4.9-1.5 0-2.5.8-2.9 1.6V8.8H10V20h3.3v-5.9c0-1.6.6-2.6 2-2.6 1.3 0 1.8.9 1.8 2.6V20h3.3v-6.4Z"/></svg>'
  };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function t(key) { var d = SITE.i18n[document.documentElement.lang] || SITE.i18n.az; return d[key] || ""; }
  function storedLang() {
    try {
      var q = new URLSearchParams(location.search).get("lang");
      if (q && LANGS.indexOf(q) > -1) return q;
      var s = localStorage.getItem("pd-lang");
      if (s && LANGS.indexOf(s) > -1) return s;
    } catch (e) { /* ignore */ }
    return SITE.defaultLang || "az";
  }
  function bg(node, src) { if (src) node.style.backgroundImage = "url('" + new URL(src, document.baseURI).href + "')"; }

  /* Şirkət kartları */
  function renderCompanies(lang, tr) {
    var wrap = document.getElementById("cards");
    wrap.textContent = "";
    SITE.companies.forEach(function (c) {
      if (c.status === "hidden") return;
      var active = c.status === "active";
      var card = el(active ? "a" : "div", "card" + (active ? "" : " is-soon"));
      if (active) card.href = c.url || "#"; // TZ: eyni pəncərədə açılır
      var img = el("div", "card-img");
      if (active) {
        var z = el("div", "zoom"); bg(z, c.image); img.appendChild(z);
        if (c.logo) { var lg = el("img", "card-logo"); lg.src = c.logo; lg.alt = ""; img.appendChild(lg); }
        var cap = el("div", "card-cap");
        cap.appendChild(el("span", "card-tag", c.tag[lang]));
        cap.appendChild(el("h3", null, c.name[lang]));
        img.appendChild(cap);
        var go = el("span", "card-go"); go.innerHTML = ARROW; img.appendChild(go);
      } else {
        img.appendChild(el("div", "soon-bg"));
        img.appendChild(el("div", "soon-glow"));
        var s = el("div", "soon-mark"); s.innerHTML = HEX;
        s.appendChild(el("b", null, tr["card.soon"]));
        s.appendChild(el("small", null, c.tag[lang]));
        img.appendChild(s);
      }
      card.appendChild(img);
      var body = el("div", "card-body");
      body.appendChild(el("p", null, c.text[lang]));
      var link = el("span", "card-link", active ? tr["card.visit"] : tr["card.soon"]);
      if (active) link.insertAdjacentHTML("beforeend", ARROW);
      body.appendChild(link);
      card.appendChild(body);
      wrap.appendChild(card);
    });
  }

  /* Klik effekti: kartın şəklində qızılı halqa yayılır, sonra keçid edilir */
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a.card");
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#") return;
    e.preventDefault();
    var img = a.querySelector(".card-img"), r = img.getBoundingClientRect();
    var ring = el("span", "ring");
    var x = (e.clientX || r.left + r.width / 2) - r.left, y = (e.clientY || r.top + r.height / 2) - r.top;
    ring.style.left = Math.max(0, Math.min(r.width, x)) + "px"; ring.style.top = Math.max(0, Math.min(r.height, y)) + "px";
    img.appendChild(ring);
    setTimeout(function () { location.href = href; }, 380);
  });

  function renderStats(lang) {
    var box = document.getElementById("stats");
    if (!box) return;
    box.textContent = "";
    (SITE.stats || []).forEach(function (s) {
      var d = el("div", "stat");
      d.appendChild(el("b", null, s.value));
      d.appendChild(el("small", null, s.label[lang]));
      box.appendChild(d);
    });
  }

  function renderContact(lang) {
    var c = SITE.contact;
    var p = document.getElementById("c-phone");
    p.textContent = c.phone; p.href = "tel:" + c.phone.replace(/[^\d+]/g, "");
    var e = document.getElementById("c-email");
    e.textContent = c.email; e.href = "mailto:" + c.email;
    document.getElementById("c-address").textContent = c.address[lang];
    var s = document.getElementById("c-social");
    s.textContent = "";
    c.social.forEach(function (x) {
      if (!x.url) return;
      var li = el("li"), a = el("a");
      a.href = x.url; a.rel = "noopener"; a.setAttribute("aria-label", x.name);
      if (ICONS[x.icon]) a.innerHTML = ICONS[x.icon]; else a.textContent = x.name.charAt(0);
      li.appendChild(a); s.appendChild(li);
    });
  }

  function setLang(lang) {
    var tr = SITE.i18n[lang];
    document.documentElement.lang = lang;
    document.title = tr["meta.title"];
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", tr["meta.description"]);
    document.querySelectorAll("[data-i18n]").forEach(function (n) {
      var v = tr[n.getAttribute("data-i18n")];
      if (v != null) n.textContent = v;
    });
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
    });
    var imgs = SITE.images || {};
    document.querySelectorAll("[data-img]").forEach(function (n) {
      var k = n.getAttribute("data-imgkey");
      bg(n, (k && imgs[k]) || n.getAttribute("data-img"));
    });
    renderStats(lang);
    renderCompanies(lang, tr);
    renderContact(lang);
    reveal();
    try { localStorage.setItem("pd-lang", lang); } catch (e) { /* ignore */ }
  }

  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
  });

  /* Header: hero-dan sonra ağ fona keçir */
  var header = document.getElementById("header");
  function onScroll() { header.classList.toggle("is-solid", scrollY > 40); }
  addEventListener("scroll", onScroll, { passive: true });

  /* Mobil menyu */
  var burger = document.getElementById("burger"), nav = document.getElementById("nav");
  function setMenu(open) {
    burger.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    header.classList.toggle("menu-open", open);
  }
  burger.addEventListener("click", function () { setMenu(burger.getAttribute("aria-expanded") !== "true"); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });

  /* Scroll-da yumşaq görünmə: ilk ekrandakılar dərhal görünür */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 }) : null;
  function reveal() {
    if (!io) return;
    document.documentElement.classList.add("js-reveal");
    document.querySelectorAll(".about-text, .about-media, .sec-head, .card, .contact-info, .lead-form").forEach(function (n) {
      if (n.classList.contains("rv") || n.getBoundingClientRect().top < innerHeight * 0.92) return;
      n.classList.add("rv");
      if (n.classList.contains("card")) n.style.setProperty("--d", (Array.prototype.indexOf.call(n.parentNode.children, n) * 0.1) + "s");
      if (n.classList.contains("lead-form") || n.classList.contains("about-media")) n.style.setProperty("--d", "0.12s");
      io.observe(n);
    });
  }

  /* Müraciət forması → Firestore "requests" */
  var form = document.getElementById("leadForm"), msg = document.getElementById("f-msg"), btn = document.getElementById("f-submit");
  var SENT_KEY = "pd-last-request";
  function val(id) { return document.getElementById(id).value.trim(); }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    msg.className = "f-msg"; msg.textContent = "";
    if (val("f-company")) return; // bot
    var data = { name: val("f-name"), surname: val("f-surname"), phone: val("f-phone"), email: val("f-email") };
    var bad = [];
    if (data.name.length < 2) bad.push("f-name");
    if (data.surname.length < 2) bad.push("f-surname");
    if (data.phone.replace(/\D/g, "").length < 7) bad.push("f-phone");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) bad.push("f-email");
    ["f-name", "f-surname", "f-phone", "f-email"].forEach(function (id) { document.getElementById(id).classList.toggle("bad", bad.indexOf(id) > -1); });
    if (bad.length) { msg.className = "f-msg err"; msg.textContent = t("form.invalid"); document.getElementById(bad[0]).focus(); return; }
    try { // eyni brauzerdən 30 saniyədə bir dəfədən çox göndərilməsin
      var last = +localStorage.getItem(SENT_KEY) || 0;
      if (Date.now() - last < 30000) { msg.className = "f-msg ok"; msg.textContent = t("form.ok"); return; }
    } catch (x) { /* ignore */ }
    btn.disabled = true; btn.querySelector("span").textContent = t("form.sending");
    var doc = { fields: {
      name: { stringValue: data.name }, surname: { stringValue: data.surname },
      phone: { stringValue: data.phone }, email: { stringValue: data.email },
      lang: { stringValue: document.documentElement.lang }, status: { stringValue: "new" },
      createdAt: { timestampValue: new Date().toISOString() }
    } };
    var send = base
      ? fetch(base + "/requests" + keyQ, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(doc) })
          .then(function (r) { if (!r.ok) throw new Error(r.status); })
      : new Promise(function (res) { // demo: Firebase yoxdursa brauzerdə saxlanılır
          try { var arr = JSON.parse(localStorage.getItem("pd-demo-requests") || "[]"); arr.unshift(Object.assign({ createdAt: new Date().toISOString(), status: "new" }, data)); localStorage.setItem("pd-demo-requests", JSON.stringify(arr)); } catch (x) { /* ignore */ }
          res();
        });
    send.then(function () {
      form.reset();
      msg.className = "f-msg ok"; msg.textContent = t("form.ok");
      try { localStorage.setItem(SENT_KEY, String(Date.now())); } catch (x) { /* ignore */ }
    }).catch(function () {
      msg.className = "f-msg err"; msg.textContent = t("form.err");
    }).then(function () {
      btn.disabled = false; btn.querySelector("span").textContent = t("form.submit");
    });
  });

  document.getElementById("year").textContent = String(new Date().getFullYear());
  setLang(storedLang());
  onScroll();

  /* İdarəetmə paneli (Firebase) və ya demo rejimi */
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

  function applyRemote(remote) {
    LANGS.forEach(function (l) {
      remote.i18n = remote.i18n || {};
      remote.i18n[l] = Object.assign({}, DEFAULTS.i18n[l], remote.i18n[l] || {});
    });
    // paneldə boş qalan loqo və şəkillər üçün saytın öz fayllarından istifadə et
    (remote.companies || []).forEach(function (c) {
      var d = DEFAULTS.companies.filter(function (x) { return x.id === c.id; })[0];
      if (!d) return;
      if (!c.logo) c.logo = d.logo;
      if (!c.image) c.image = d.image;
    });
    SITE = window.SITE = Object.assign({}, SITE, remote);
    setLang(document.documentElement.lang || storedLang());
  }
  if (!base) {
    try {
      var demoRaw = localStorage.getItem("pd-demo-content");
      if (demoRaw) applyRemote(JSON.parse(demoRaw));
    } catch (e) { /* ignore */ }
  } else {
    fetch(base + "/site/content" + keyQ, { cache: "no-store" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (doc) {
        var raw = doc && doc.fields && doc.fields.json && doc.fields.json.stringValue;
        if (raw) return fsImages(JSON.parse(raw)).then(applyRemote);
      })
      .catch(function () { /* şəbəkə xətası: data.js qalır */ });
  }
})();
