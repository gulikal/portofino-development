(function () {
  "use strict";
  var SITE = window.SITE;
  var LANGS = ["az", "ru", "en"];

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

      var logo = el("div", "card-logo");
      if (c.logo) {
        var img = el("img");
        img.src = c.logo;
        img.alt = c.name[lang];
        img.loading = "lazy";
        logo.appendChild(img);
      } else {
        var lt = el("div", "logo-text");
        if (c.logoText && c.logoText.length) {
          lt.appendChild(document.createTextNode(c.logoText[0]));
          if (c.logoText[1]) lt.appendChild(el("small", null, c.logoText[1]));
        } else {
          lt.textContent = t["card.soon"];
        }
        logo.appendChild(lt);
      }
      card.appendChild(logo);

      var body = el("div", "card-body");
      body.appendChild(el("span", "card-tag", c.tag[lang]));
      body.appendChild(el("h3", null, c.name[lang]));
      body.appendChild(el("p", null, c.text[lang]));
      var link = el("span", "card-link");
      link.appendChild(el("span", null, active ? t["card.visit"] : t["card.soon"]));
      if (active) link.appendChild(el("span", null, "→"));
      body.appendChild(link);
      card.appendChild(body);
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
    document.getElementById("c-address").textContent = c.address[lang];
    var phone = document.getElementById("c-phone");
    phone.textContent = c.phone;
    phone.href = "tel:" + c.phone.replace(/[^\d+]/g, "");
    var email = document.getElementById("c-email");
    email.textContent = c.email;
    email.href = "mailto:" + c.email;
    var social = document.getElementById("c-social");
    social.textContent = "";
    c.social.forEach(function (s) {
      var li = el("li");
      var a = el("a", null, s.name);
      a.href = s.url;
      a.rel = "noopener";
      li.appendChild(a);
      social.appendChild(li);
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

    renderCompanies(lang, t);
    renderContact(lang);
    try { window.localStorage.setItem("pd-lang", lang); } catch (e) { /* ignore */ }
  }

  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
  });

  document.getElementById("year").textContent = String(new Date().getFullYear());
  setLang(storedLang());
})();
