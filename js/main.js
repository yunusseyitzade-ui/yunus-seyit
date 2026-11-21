/* YUNUS SEYİT — Portfolio
 * Bölümler: i18n · ikonlar · sosyal/iletişim · yetenekler · projeler · navigasyon · efektler · form
 * Sıradan <script> olarak çalışır; dosyayı çift tıklayıp açsan bile çalışır (modül/sunucu gerekmez).
 */
(function () {
  "use strict";

  var CFG = window.YS_CONFIG || {};
  var DATA = window.YS_DATA || { PROJECTS: [], SKILLS: { groups: [], items: [] } };
  var DICT = window.YS_I18N;
  var DEFAULT_LANG = "tr";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var lang = DEFAULT_LANG;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function t(key) {
    return (DICT[lang] && DICT[lang][key]) || (DICT[DEFAULT_LANG] && DICT[DEFAULT_LANG][key]) || key;
  }

  /* ---------- İkonlar ---------- */
  var ICONS = {
    mail: "M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1.6 2 7.4 5.6L19.4 7H4.6ZM20 8.9l-8 6-8-6V17h16V8.9Z",
    github: "M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z",
    linkedin: "M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"
  };
  function icon(name) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="' + ICONS[name] + '"/></svg>';
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- Kanallar (e-posta, GitHub, LinkedIn) ---------- */
  function safeUrl(u) { return /^https?:\/\//i.test(u || "") ? u : ""; }
  function channels() {
    var mail = (CFG.email || "").trim();
    return [
      { id: "email", label: "E-posta / Email", value: mail, href: mail ? "mailto:" + mail : "" },
      { id: "github", label: "GitHub", value: safeUrl(CFG.github).replace(/^https?:\/\//i, ""), href: safeUrl(CFG.github) },
      { id: "linkedin", label: "LinkedIn", value: safeUrl(CFG.linkedin).replace(/^https?:\/\//i, ""), href: safeUrl(CFG.linkedin) }
    ];
  }
  var CH_ICON = { email: "mail", github: "github", linkedin: "linkedin" };

  function renderSocial() {
    $$("[data-social]").forEach(function (ul) {
      ul.innerHTML = channels().map(function (c) {
        if (c.href) {
          var ext = c.id === "email" ? "" : ' target="_blank" rel="noopener noreferrer"';
          return '<li><a href="' + esc(c.href) + '"' + ext + ' aria-label="' + esc(c.label) + '">' + icon(CH_ICON[c.id]) + "</a></li>";
        }
        return '<li><span role="img" aria-label="' + esc(c.label + " — " + t("contact.notSet")) + '" title="' +
          esc(c.label + " — " + t("contact.notSet")) + '">' + icon(CH_ICON[c.id]) + "</span></li>";
      }).join("");
    });
  }

  function renderChannels() {
    $("#channelsList").innerHTML = channels().map(function (c) {
      var inner = '<span class="channel__icon">' + icon(CH_ICON[c.id]) + "</span>" +
        '<span><span class="channel__label">' + esc(c.label) + '</span><br><span class="channel__value">' +
        esc(c.value || t("contact.notSet")) + "</span></span>";
      if (c.href) {
        var ext = c.id === "email" ? "" : ' target="_blank" rel="noopener noreferrer"';
        return '<li><a class="channel" href="' + esc(c.href) + '"' + ext + ">" + inner + "</a></li>";
      }
      return '<li><div class="channel channel--off">' + inner + "</div></li>";
    }).join("");
  }

  /* ---------- Yetenekler ---------- */
  var BADGES = { HTML5: "H5", CSS3: "C3", "Node.js": "Nd", JavaScript: "JS", TypeScript: "TS", PostgreSQL: "Pg",
    SQLite: "SQ", GitHub: "GH", Python: "Py", Django: "Dj", Flask: "Fl", React: "Re", Flutter: "Fu", Java: "Jv", Git: "Gt", SQL: "SQL", "C#": "C#" };
  var LEVELS = ["active", "learning", "goal"];
  var skillFilter = "all";

  function renderSkills() {
    var filters = $("#skillFilters");
    var all = '<button type="button" class="chip-btn" data-filter="all" aria-pressed="' + (skillFilter === "all") + '">' + t("skills.filter.all") + "</button>";
    filters.innerHTML = all + LEVELS.map(function (l) {
      return '<button type="button" class="chip-btn" data-filter="' + l + '" aria-pressed="' + (skillFilter === l) + '"><span class="dot dot--' + l + '"></span>' + t("skills.level." + l) + "</button>";
    }).join("");

    var html = DATA.SKILLS.groups.map(function (g) {
      var items = DATA.SKILLS.items.filter(function (s) { return s.group === g; });
      if (skillFilter !== "all") items = items.filter(function (s) { return s.level === skillFilter; });
      if (!items.length) return "";
      return '<div class="skill-group"><h3>' + esc(t("skills.group." + g)) + '</h3><ul class="skill-grid">' +
        items.map(function (s, i) {
          return '<li class="skill skill--' + s.level + ' reveal" style="--d:' + (i * 60) + 'ms">' +
            '<span class="skill__badge" aria-hidden="true">' + esc(BADGES[s.name] || s.name.slice(0, 2)) + "</span>" +
            '<span class="skill__name">' + esc(s.name) + "</span>" +
            '<span class="skill__level"><span class="dot dot--' + s.level + '"></span>' + esc(t("skills.level." + s.level)) + "</span></li>";
        }).join("") + "</ul></div>";
    }).join("");
    $("#skillsRoot").innerHTML = html;
    observeReveals($("#skillsRoot"), true);
  }

  $("#skillFilters").addEventListener("click", function (e) {
    var b = e.target.closest("[data-filter]");
    if (!b) return;
    skillFilter = b.getAttribute("data-filter");
    renderSkills();
    var again = $('#skillFilters [data-filter="' + skillFilter + '"]');
    if (again) again.focus();
  });

  /* ---------- Projeler ---------- */
  function linkBtn(url, label, cls) {
    if (url) return '<a class="btn btn--sm ' + cls + '" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + esc(label) + "</a>";
    return '<span class="btn btn--sm btn--ghost is-disabled" aria-disabled="true" title="' + esc(t("projects.soon")) + '">' + esc(label) + "</span>";
  }
  function chipList(arr) { return arr.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join(""); }

  function renderProjects() {
    $("#projectsGrid").innerHTML = DATA.PROJECTS.map(function (p, i) {
      var name = p.name || nameFromId(p.id);
      return '<article class="card reveal" style="--d:' + (i % 2) * 120 + 'ms">' +
        '<div class="card__media"><img src="' + esc(p.image) + '" alt="' + esc(name + " — " + t("projects.imgAlt")) + '" width="800" height="500" loading="lazy"></div>' +
        '<div class="card__body"><h3 class="card__title">' + esc(name) + "</h3>" +
        '<p class="card__tagline">' + esc(t("project." + p.id + ".tagline")) + "</p>" +
        '<p class="card__desc">' + esc(t("project." + p.id + ".desc")) + "</p>" +
        '<ul class="chips">' + chipList(p.tech) + "</ul>" +
        '<div class="card__actions">' +
        '<button type="button" class="btn btn--sm btn--primary" data-project="' + esc(p.id) + '">' + esc(t("projects.details")) + "</button>" +
        linkBtn(p.github, t("projects.github"), "btn--ghost") + linkBtn(p.demo, t("projects.demo"), "btn--ghost") +
        "</div></div></article>";
    }).join("");
    observeReveals($("#projectsGrid"), true);
  }

  var NAMES = { "koyu-kahve": "Koyu Kahve", jarvis: "JARVIS", vibematch: "VibeMatch", "user-manager": "User Manager" };
  function nameFromId(id) { return NAMES[id] || id; }

  var modal = $("#projectModal");
  var openProjectId = null;

  function fillModal(id) {
    var p = DATA.PROJECTS.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    var name = p.name || nameFromId(p.id);
    $("#modalImg").src = p.image;
    $("#modalImg").alt = name + " — " + t("projects.imgAlt");
    $("#modalTitle").textContent = name;
    $("#modalTagline").textContent = t("project." + id + ".tagline");
    $("#modalDesc").textContent = t("project." + id + ".desc");
    $("#modalTech").innerHTML = chipList(p.tech);
    $("#modalActions").innerHTML = linkBtn(p.github, t("projects.github"), "btn--primary") + linkBtn(p.demo, t("projects.demo"), "btn--ghost");
  }
  function openModal(id) {
    openProjectId = id;
    fillModal(id);
    if (typeof modal.showModal === "function") modal.showModal(); else modal.setAttribute("open", "");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    if (modal.open) modal.close();
  }
  modal.addEventListener("close", function () { openProjectId = null; document.body.style.overflow = ""; });
  modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
  $("#modalClose").addEventListener("click", closeModal);
  $("#projectsGrid").addEventListener("click", function (e) {
    var b = e.target.closest("[data-project]");
    if (b) openModal(b.getAttribute("data-project"));
  });

  /* ---------- Fotoğraf ---------- */
  function setupPhoto() {
    var src = (CFG.profilePhoto || "").trim();
    if (!src) return;
    var img = new Image();
    img.className = "photo";
    img.alt = t("about.photoAlt");
    img.onload = function () {
      var old = $("#photoFrame img.photo"); if (old) old.remove();
      $("#photoFrame").insertBefore(img, $("#photoPlaceholder"));
      $("#photoPlaceholder").hidden = true;
    };
    img.src = src; // yüklenemezse yer tutucu kalır
  }

  /* ---------- i18n ---------- */
  function applyI18n() {
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
    $$("[data-i18n-aria]").forEach(function (el) { el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"))); });
    document.title = t("meta.title");
    $("#metaDesc").setAttribute("content", t("meta.description"));
    $("#ogTitle").setAttribute("content", t("meta.title"));
    $("#ogDesc").setAttribute("content", t("meta.description"));
    $$(".lang__btn").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang)); });
    var photo = $("#photoFrame img.photo"); if (photo) photo.alt = t("about.photoAlt");
    renderSocial(); renderChannels(); renderSkills(); renderProjects();
    if (openProjectId) fillModal(openProjectId);
    revalidateErrors(); renderStatus();
  }
  function setLang(l) {
    if (!DICT[l]) return;
    lang = l;
    try { localStorage.setItem("ys-lang", l); } catch (e) { /* özel mod */ }
    applyI18n();
  }
  $$(".lang__btn").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
  });

  /* ---------- SEO: canonical + JSON-LD ---------- */
  function setupSeo() {
    var site = safeUrl(CFG.siteUrl);
    if (site) {
      $("#canonical").setAttribute("href", site);
      var og = document.createElement("meta"); og.setAttribute("property", "og:url"); og.setAttribute("content", site); document.head.appendChild(og);
      $('meta[property="og:image"]').setAttribute("content", site.replace(/\/$/, "") + "/assets/hero.svg");
    } else {
      var c = $("#canonical"); c.parentNode.removeChild(c);
    }
    var ld = $('script[type="application/ld+json"]');
    try {
      var j = JSON.parse(ld.textContent);
      if (site) j.url = site;
      var same = [CFG.github, CFG.linkedin].map(safeUrl).filter(Boolean);
      if (same.length) j.sameAs = same;
      ld.textContent = JSON.stringify(j);
    } catch (e) { /* yoksay */ }
  }

  /* ---------- Navigasyon ---------- */
  var sidebar = $("#sidebar"), burger = $("#burger"), backdrop = $("#backdrop");
  function setMenu(open) {
    sidebar.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    backdrop.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
  }
  burger.addEventListener("click", function () { setMenu(!sidebar.classList.contains("is-open")); });
  backdrop.addEventListener("click", function () { setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  window.addEventListener("resize", function () { if (window.innerWidth > 960) setMenu(false); });

  // Tüm iç bağlantılar için akıcı geçiş + menüyü kapat
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute("href").slice(1);
    var target = id && document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    setMenu(false);
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    if (history.replaceState) history.replaceState(null, "", "#" + id);
    if (a.hasAttribute("data-focus-form")) {
      setTimeout(function () { var n = $("#f-name"); if (n) n.focus({ preventScroll: true }); }, reduceMotion ? 0 : 700);
    } else {
      target.setAttribute("tabindex", "-1");
      setTimeout(function () { target.focus({ preventScroll: true }); }, reduceMotion ? 0 : 600);
    }
  });

  function setupScrollSpy() {
    var links = $$("#nav a");
    var sections = links.map(function (a) { return document.getElementById(a.getAttribute("data-section")); });
    if (!("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          var on = a.getAttribute("data-section") === en.target.id;
          a.classList.toggle("is-active", on);
          if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { if (s) io.observe(s); });
  }

  /* ---------- Scroll animasyonları ---------- */
  var revealIO = null;
  function observeReveals(root, immediateStagger) {
    var els = $$(".reveal:not(.is-in)", root || document);
    if (!("IntersectionObserver" in window) || reduceMotion) { els.forEach(function (e) { e.classList.add("is-in"); }); return; }
    if (!revealIO) {
      revealIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("is-in"); revealIO.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    }
    els.forEach(function (e) { revealIO.observe(e); });
  }

  /* ---------- Mouse ışığı ---------- */
  function setupGlow() {
    var glow = $("#cursorGlow");
    if (reduceMotion || !window.matchMedia("(hover: hover)").matches) return;
    var x = 0, y = 0, ticking = false;
    window.addEventListener("pointermove", function (e) {
      x = e.clientX; y = e.clientY;
      glow.classList.add("is-on");
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(function () { glow.style.transform = "translate3d(" + x + "px," + y + "px,0)"; ticking = false; });
      }
    }, { passive: true });
    document.addEventListener("pointerleave", function () { glow.classList.remove("is-on"); });
  }

  /* ---------- İletişim formu ---------- */
  var form = $("#contactForm");
  var FIELDS = ["name", "email", "subject", "message"];
  var errorKeys = {};          // alan -> çeviri anahtarı
  var statusState = null;      // { key, cls, mailto }
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function showFieldError(f, key) {
    errorKeys[f] = key || null;
    var wrap = $("#f-" + f).closest(".field");
    wrap.classList.toggle("has-error", !!key);
    $("#e-" + f).textContent = key ? t(key) : "";
    if (key) $("#f-" + f).setAttribute("aria-invalid", "true"); else $("#f-" + f).removeAttribute("aria-invalid");
  }
  function check(f) {
    var v = $("#f-" + f).value.trim();
    if (!v) return "contact.required";
    if (f === "email" && !EMAIL_RE.test(v)) return "contact.invalidEmail";
    return null;
  }
  function revalidateErrors() {
    FIELDS.forEach(function (f) { if (errorKeys[f]) showFieldError(f, errorKeys[f]); });
  }
  FIELDS.forEach(function (f) {
    var el = $("#f-" + f);
    el.addEventListener("blur", function () { if (el.value || errorKeys[f]) showFieldError(f, check(f)); });
    el.addEventListener("input", function () { if (errorKeys[f]) showFieldError(f, check(f)); });
  });

  function setStatus(key, cls, mailto) { statusState = key ? { key: key, cls: cls, mailto: mailto || "" } : null; renderStatus(); }
  function renderStatus() {
    var el = $("#formStatus");
    el.className = "form__status" + (statusState ? " " + statusState.cls : "");
    if (!statusState) { el.textContent = ""; return; }
    el.textContent = t(statusState.key);
    if (statusState.mailto) {
      el.appendChild(document.createTextNode(" "));
      var a = document.createElement("a");
      a.href = statusState.mailto;
      a.textContent = t("contact.useMailto");
      el.appendChild(a);
    }
  }
  function mailtoFor(d) {
    var mail = (CFG.email || "").trim();
    if (!mail) return "";
    return "mailto:" + mail + "?subject=" + encodeURIComponent(d.subject) +
      "&body=" + encodeURIComponent(d.message + "\n\n— " + d.name + " (" + d.email + ")");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var firstBad = null;
    FIELDS.forEach(function (f) { var k = check(f); showFieldError(f, k); if (k && !firstBad) firstBad = f; });
    if (firstBad) { $("#f-" + firstBad).focus(); setStatus(null); return; }

    var data = {};
    FIELDS.forEach(function (f) { data[f] = $("#f-" + f).value.trim(); });

    // Bot tuzağı doluysa sessizce başarılı gibi davran (bota bilgi verme)
    if (form.elements._gotcha && form.elements._gotcha.value) { form.reset(); setStatus("contact.ok", "is-ok"); return; }

    var endpoint = safeUrl(CFG.formEndpoint);
    if (!endpoint) { setStatus("contact.notConfigured", "is-error", mailtoFor(data)); return; }

    var btn = $("#submitBtn");
    btn.disabled = true;
    var label = btn.textContent;
    btn.textContent = t("contact.sending");
    setStatus(null);

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(data)
    }).then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      form.reset();
      FIELDS.forEach(function (f) { showFieldError(f, null); });
      setStatus("contact.ok", "is-ok");
    }).catch(function () {
      setStatus("contact.err", "is-error", mailtoFor(data));
    }).then(function () {
      btn.disabled = false;
      btn.textContent = t("contact.send");
      void label;
    });
  });

  /* ---------- Açılış ---------- */
  function hideLoader() {
    var l = $("#loader");
    if (!l || l.classList.contains("is-done")) return;
    l.classList.add("is-done");
    document.body.classList.remove("is-loading");
    setTimeout(function () { l.parentNode && l.parentNode.removeChild(l); }, 900);
  }

  function init() {
    document.body.classList.add("is-loading");
    var saved = null;
    try { saved = localStorage.getItem("ys-lang"); } catch (e) { /* yoksay */ }
    if (saved && DICT[saved]) lang = saved;
    else if ((navigator.language || "tr").toLowerCase().indexOf("tr") !== 0) lang = "en";

    $("#year").textContent = new Date().getFullYear();
    setupSeo();
    setupPhoto();
    applyI18n();
    observeReveals(document);
    setupScrollSpy();
    setupGlow();

    var minWait = reduceMotion ? 0 : 900, start = Date.now();
    function done() { setTimeout(hideLoader, Math.max(0, minWait - (Date.now() - start))); }
    if (document.readyState === "complete") done(); else window.addEventListener("load", done);
    setTimeout(hideLoader, 4000); // güvenlik
  }

  init();
})();
