/* ============================================================
   MAIN — nav island, smooth scroll, reveal, tabs, hero canvas
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var header = document.getElementById("siteHeader");
  var headerH = function () { return header ? header.offsetHeight + 16 : 88; };

  var y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  /* ---------- header state + scroll progress ---------- */
  var bar = document.getElementById("scrollBar");
  function onScroll() {
    var sy = window.scrollY || document.documentElement.scrollTop;
    if (header) header.classList.toggle("is-stuck", sy > 20);
    if (bar) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? (sy / max) * 100 : 0) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- smooth scroll ---------- */
  function scrollToTarget(hash) {
    var el = document.querySelector(hash);
    if (!el) return;
    var top = el.getBoundingClientRect().top + window.pageYOffset - headerH();
    window.scrollTo({ top: Math.max(top, 0), behavior: reduceMotion ? "auto" : "smooth" });
    el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var hash = a.getAttribute("href");
    if (!hash || hash.length < 2 || !document.querySelector(hash)) return;
    e.preventDefault();
    closeMobileNav();
    scrollToTarget(hash);
    if (history.replaceState) history.replaceState(null, "", hash);
  });

  /* ---------- mobile nav ---------- */
  var toggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");
  function openMobileNav() {
    if (!mobileNav || !toggle) return;
    mobileNav.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    document.body.classList.add("nav-open");
  }
  function closeMobileNav() {
    if (!mobileNav || !toggle || mobileNav.hidden) return;
    mobileNav.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("nav-open");
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      if (mobileNav.hidden) openMobileNav(); else closeMobileNav();
    });
  }
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMobileNav(); });
  window.addEventListener("resize", function () { if (window.innerWidth > 1180) closeMobileNav(); });

  /* ---------- reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 5, 4) * 60 + "ms";
      io.observe(el);
    });
  }

  /* ---------- active nav + sliding pill ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  var pill = document.getElementById("navPill");

  function movePill(link) {
    if (!pill || !link) return;
    var li = link.parentElement;
    pill.style.width = li.offsetWidth + "px";
    pill.style.transform = "translateX(" + li.offsetLeft + "px)";
    pill.classList.add("is-on");
  }

  function setActive() {
    var probe = window.scrollY + headerH() + Math.min(window.innerHeight * 0.26, 200);
    var current = sections.length ? sections[0].id : "home";
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop <= probe) current = sections[i].id;
    }
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4 && sections.length) {
      current = sections[sections.length - 1].id;
    }
    var active = null;
    navLinks.forEach(function (l) {
      var on = l.getAttribute("href") === "#" + current;
      l.classList.toggle("is-active", on);
      if (on) active = l;
    });
    movePill(active);
  }
  window.addEventListener("scroll", setActive, { passive: true });
  window.addEventListener("resize", setActive);
  window.addEventListener("load", setActive);
  setActive();

  /* ---------- generic tab helper ---------- */
  function wireTabs(tabSelector, panelEl, render, defaultKey) {
    var tabs = Array.prototype.slice.call(document.querySelectorAll(tabSelector));
    if (!tabs.length || !panelEl) return;

    function select(key, focus) {
      tabs.forEach(function (t) { t.setAttribute("aria-selected", String(t.dataset.key === key)); });
      panelEl.innerHTML = render(key);
      if (focus) {
        var t = tabs.filter(function (x) { return x.dataset.key === key; })[0];
        if (t) t.focus();
      }
    }

    tabs.forEach(function (tab, i) {
      tab.setAttribute("type", "button");
      tab.addEventListener("click", function () { select(tab.dataset.key); });
      tab.addEventListener("keydown", function (e) {
        var next = null;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") next = tabs[(i + 1) % tabs.length];
        else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === "Home") next = tabs[0];
        else if (e.key === "End") next = tabs[tabs.length - 1];
        if (next) { e.preventDefault(); select(next.dataset.key, true); }
      });
    });

    select(defaultKey);
  }

  /* ---------- domain tabs ---------- */
  var domPanel = document.getElementById("dompanel");
  wireTabs(".dom-tab", domPanel, function (key) {
    var d = (window.DOMAIN_DATA || {})[key];
    if (!d) return "";
    return '<div class="dp-in">' +
      '<div><h3 class="dp-title">' + d.title + '</h3>' +
      '<p class="dp-body">' + d.body + '</p>' +
      '<div class="dp-chips">' + d.chips.map(function (c) { return "<span>" + c + "</span>"; }).join("") + "</div></div>" +
      '<ul class="dp-list">' + d.points.map(function (p) { return "<li>" + p + "</li>"; }).join("") + "</ul>" +
      "</div>";
  }, "aiml");

  /* ---------- skill tabs ---------- */
  var skillPanel = document.getElementById("skillPanel");
  wireTabs(".sn-btn", skillPanel, function (key) {
    var s = (window.SKILL_DATA || {})[key];
    if (!s) return "";
    return '<div class="sp-in">' +
      '<h3 class="sp-title">' + s.title + "</h3>" +
      '<p class="sp-note">' + s.note + "</p>" +
      '<div class="sp-grid">' +
      s.items.map(function (it) {
        return '<div class="sp-item"><b>' + it[0] + "</b><div class=\"sp-tags\">" +
          it[1].map(function (t) { return "<span>" + t + "</span>"; }).join("") + "</div></div>";
      }).join("") +
      "</div></div>";
  }, "languages");

  /* ---------- hero ambient node network ---------- */
  var canvas = document.getElementById("heroCanvas");
  if (canvas && !reduceMotion) {
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var nodes = [], w = 0, h = 0, raf = null, running = true;

    function sizeCanvas() {
      var rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      if (!w || !h) return;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNodes();
    }
    function buildNodes() {
      var count = Math.max(22, Math.min(Math.round((w * h) / 25000), 68));
      nodes = [];
      for (var i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - .5) * .18, vy: (Math.random() - .5) * .18,
          r: Math.random() * 1.5 + .7
        });
      }
    }
    var LINK = 135;
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if (n.x < -20) n.x = w + 20; else if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20; else if (n.y > h + 20) n.y = -20;
      }
      for (var a = 0; a < nodes.length; a++) {
        for (var b = a + 1; b < nodes.length; b++) {
          var dx = nodes[a].x - nodes[b].x, dy = nodes[a].y - nodes[b].y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            var t = 1 - d / LINK;
            ctx.strokeStyle = "rgba(" + Math.round(80 + t * 60) + ", " + Math.round(130 - t * 30) + ", 255, " + (t * .24).toFixed(3) + ")";
            ctx.lineWidth = .7;
            ctx.beginPath();
            ctx.moveTo(nodes[a].x, nodes[a].y);
            ctx.lineTo(nodes[b].x, nodes[b].y);
            ctx.stroke();
          }
        }
      }
      ctx.fillStyle = "rgba(150, 185, 255, .55)";
      for (var k = 0; k < nodes.length; k++) {
        ctx.beginPath();
        ctx.arc(nodes[k].x, nodes[k].y, nodes[k].r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }

    sizeCanvas();
    draw();

    var rt;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(sizeCanvas, 180); });

    function setRunning(on) {
      if (on && !running) { running = true; raf = requestAnimationFrame(draw); }
      else if (!on && running) { running = false; cancelAnimationFrame(raf); }
    }
    document.addEventListener("visibilitychange", function () { setRunning(!document.hidden); });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) { setRunning(es[0].isIntersecting); }, { threshold: 0 }).observe(canvas);
    }
  }

  /* ---------- copy email button ---------- */
  var copyBtn = document.getElementById("copyEmailBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var email = copyBtn.getAttribute("data-email") || "rishrag18@gmail.com";
      function showCopied() {
        copyBtn.classList.add("is-copied");
        setTimeout(function () { copyBtn.classList.remove("is-copied"); }, 2200);
      }
      function fallbackCopy() {
        var ta = document.createElement("textarea");
        ta.value = email;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); showCopied(); } catch (err) {}
        document.body.removeChild(ta);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(showCopied, fallbackCopy);
      } else {
        fallbackCopy();
      }
    });
  }
})();

