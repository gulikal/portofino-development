/* Portofino Development — interaktiv effektlər
   Hamısı "hərəkəti azalt" (prefers-reduced-motion) parametrinə hörmət edir. */
(function () {
  "use strict";
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var lang = root.lang || "az";
  function t(key) {
    var d = window.SITE && window.SITE.i18n[lang];
    return (d && d[key]) || key;
  }
  document.addEventListener("pd:lang", function (e) { lang = e.detail; setupCards(); });

  /* 1. Giriş animasiyası və hero */
  if (!reduce) root.classList.add("js-anim");
  var intro = document.getElementById("intro");
  var seen = false;
  try { seen = sessionStorage.getItem("pd-intro") === "1"; } catch (e) { /* ignore */ }
  function start() {
    if (intro) intro.classList.add("is-done");
    requestAnimationFrame(function () { root.classList.add("is-loaded"); });
    try { sessionStorage.setItem("pd-intro", "1"); } catch (e) { /* ignore */ }
  }
  if (reduce || seen) {
    if (intro) intro.remove();
    start();
  } else {
    setTimeout(start, 1500);
  }

  /* 2. Bölmələrin yumşaq açılması (yalnız ilk ekrandan aşağıdakılar) */
  var revealSel = [
    ".about .eyebrow", ".about h2", ".about-text", ".stats", ".quote-card",
    ".companies .eyebrow", ".companies h2", ".companies .lead",
    ".values .eyebrow", ".values h2", ".vitem",
    ".philosophy .eyebrow", ".philosophy h2", ".philosophy blockquote", ".keywords",
    ".contact .eyebrow", ".contact h2", ".contact-text", ".contact-panel",
    ".fgrid > div"
  ];
  function observeReveal(nodes) {
    if (reduce || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          var inner = en.target.querySelector(":scope > .curtain");
          if (inner) inner.classList.add("is-in");
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    nodes.forEach(function (n, i) {
      var r = n.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9) return; // ilk ekrandakılar dərhal görünür
      if (n.classList.contains("about-media")) {
        // pərdə effekti daxili şəklə tətbiq olunur, müşahidə isə kəsilməyən çərçivədədir
        var m = n.querySelector(".media");
        m.classList.add("curtain", "reveal");
      } else {
        n.classList.add("reveal");
      }
      io.observe(n);
    });
  }
  var list = [];
  revealSel.forEach(function (s) {
    document.querySelectorAll(s).forEach(function (n, i) {
      if (n.matches(".vitem, .fgrid > div")) n.style.setProperty("--d", (i * 0.1) + "s");
      list.push(n);
    });
  });
  var aboutMedia = document.querySelector(".about-media .media");
  if (aboutMedia) list.push(aboutMedia.parentNode);
  observeReveal(list);

  /* 3. Rəqəmlər sayılır */
  function countUp(b) {
    var target = parseFloat(b.getAttribute("data-v"));
    var dec = (b.getAttribute("data-v").split(".")[1] || "").length;
    var t0 = null, dur = 1600;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      var e = 1 - Math.pow(1 - p, 3);
      b.textContent = (target * e).toFixed(dec);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function setupStats() {
    var bs = document.querySelectorAll(".stat b");
    if (reduce || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { countUp(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    bs.forEach(function (b) {
      b.setAttribute("data-v", b.textContent.trim());
      io.observe(b);
    });
  }
  setupStats();

  /* 4. Kartlar: 3D əyilmə və işıq */
  function setupCards() {
    document.querySelectorAll(".card").forEach(function (card) {
      var media = card.querySelector(".card-media");
      if (!media || media.querySelector(".shine")) return;
      var shine = document.createElement("span");
      shine.className = "shine";
      media.appendChild(shine);
      if (!finePointer || reduce) return;
      card.addEventListener("pointermove", function (e) {
        var r = media.getBoundingClientRect();
        media.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100).toFixed(1) + "%");
        media.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100).toFixed(1) + "%");
      });
    });
  }
  setupCards();

  /* 5. Scroll: irəliləyiş xətti, aktiv menyu, paralaks, yuxarı düyməsi */
  var progress = document.getElementById("progress");
  var toTop = document.getElementById("toTop");
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav-links a"));
  var band = document.querySelector(".band");
  var heroMedia = document.querySelector(".hero .media");
  var ticking = false;
  function onScroll() {
    var y = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = "scaleX(" + (h > 0 ? y / h : 0).toFixed(4) + ")";
    if (toTop) toTop.classList.toggle("is-on", y > window.innerHeight * 0.9);
    var current = null;
    links.forEach(function (a) {
      var s = document.querySelector(a.getAttribute("href"));
      if (s && s.getBoundingClientRect().top < window.innerHeight * 0.4) current = a;
    });
    links.forEach(function (a) { a.classList.toggle("is-active", a === current); });
    if (!reduce) {
      if (heroMedia && y < window.innerHeight) heroMedia.style.translate = "0 " + (y * 0.25).toFixed(1) + "px";
    }
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
  if (toTop) toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); });

  /* 6. Mobil menyu */
  var burger = document.getElementById("burger");
  var mmenu = document.getElementById("mmenu");
  function setMenu(open) {
    burger.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
    if (open) {
      mmenu.hidden = false;
      requestAnimationFrame(function () { mmenu.classList.add("is-open"); });
    } else {
      mmenu.classList.remove("is-open");
      setTimeout(function () { if (!mmenu.classList.contains("is-open")) mmenu.hidden = true; }, 400);
    }
  }
  if (burger && mmenu) {
    burger.addEventListener("click", function () { setMenu(burger.getAttribute("aria-expanded") !== "true"); });
    mmenu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") setMenu(false); });
  }

  /* 7. Kopyala düymələri */
  var toast = document.getElementById("toast"), toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("is-on"); }, 2200);
  }
  document.querySelectorAll(".copy").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var c = window.SITE.contact;
      var text = btn.getAttribute("data-copy") === "phone" ? c.phone : c.email;
      var target = btn.parentNode.querySelector(".v");
      function fallback() {
        try {
          var range = document.createRange();
          range.selectNodeContents(target);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        } catch (err) { /* ignore */ }
        showToast(t("ui.copyfail"));
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { showToast(t("ui.copied")); }, fallback);
      } else {
        fallback();
      }
    });
  });

  /* 8. Şirkət saytına keçid: sakit pərdə */
  var leave = document.createElement("div");
  leave.className = "leave";
  leave.setAttribute("aria-hidden", "true");
  leave.innerHTML = "<small></small><b></b><span class=\"bar\"></span>";
  document.body.appendChild(leave);
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a.card");
    if (!a || reduce || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#") return;
    e.preventDefault();
    leave.querySelector("small").textContent = t("ui.leaving");
    leave.querySelector("b").textContent = a.querySelector("h3").textContent;
    leave.classList.add("is-on");
    setTimeout(function () { window.location.href = href; }, 750);
  });
  // geri düyməsi ilə qayıdanda pərdə açıq qalmasın
  window.addEventListener("pageshow", function () { leave.classList.remove("is-on"); });

  /* 9. Scroll ilə yüksələn bina — yalnız transform/opacity, kadr başına bir hesablama */
  var rise = document.getElementById("rise");
  var bld = document.getElementById("riseBuilding");
  var mask = document.getElementById("riseMask");
  var unmask = document.getElementById("riseUnmask");
  var riseBar = document.getElementById("riseBar");
  var steps = rise ? rise.querySelectorAll(".rise-steps li") : [];
  var riseTick = false, lastIdx = -2, lastBuilding = null;
  function ease(x) { return x <= 0 ? 0 : x >= 1 ? 1 : 1 - Math.pow(1 - x, 3); }
  function onRise() {
    riseTick = false;
    var r = rise.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) return; // ekranda deyilsə, heç nə etmirik
    var total = r.height - window.innerHeight;
    var p = Math.min(1, Math.max(0, -r.top / total));
    var g = ease(p / 0.62);                                  // 0–62%: bina mərtəbə-mərtəbə yüksəlir
    var out = Math.min(1, Math.max(0, (p - 0.8) / 0.2));    // 80–100%: bina yox olur
    var hid = (1 - g) * 100;
    mask.style.transform = "translate3d(0," + hid.toFixed(2) + "%,0)";
    unmask.style.transform = "translate3d(0," + (-hid).toFixed(2) + "%,0)";
    bld.style.transform = "translate3d(0," + ((1 - g) * 14 - out * 6).toFixed(2) + "%,0) scale(" + (1 - out * 0.06).toFixed(3) + ")";
    bld.style.opacity = (1 - out).toFixed(3);
    if (riseBar) riseBar.style.transform = "scaleX(" + Math.min(1, p / 0.8).toFixed(3) + ")";
    var building = g > 0.01 && g < 0.99;
    if (building !== lastBuilding) { lastBuilding = building; rise.classList.toggle("is-building", building); }
    var idx = p < 0.08 ? -1 : p < 0.3 ? 0 : p < 0.62 ? 1 : 2;
    if (idx !== lastIdx) {
      lastIdx = idx;
      steps.forEach(function (s, i) { s.classList.toggle("is-on", i <= idx); });
    }
  }
  if (rise && reduce) {
    steps.forEach(function (s) { s.classList.add("is-on"); });
  } else if (rise && bld) {
    window.addEventListener("scroll", function () {
      if (!riseTick) { riseTick = true; requestAnimationFrame(onRise); }
    }, { passive: true });
    window.addEventListener("resize", onRise);
    onRise();
  }

  /* 10. Dil dəyişəndə yumşaq keçid */
  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () {
      if (reduce) return;
      document.body.animate([{ opacity: 0.55 }, { opacity: 1 }], { duration: 450, easing: "ease-out" });
    });
  });
})();
