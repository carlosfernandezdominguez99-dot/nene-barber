/* =========================================================
   NENE BARBER — interacciones
   Vanilla JS. Sin dependencias de build. Respeta prefers-reduced-motion.
   ========================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var root = document.documentElement;

  /* ---------- Year ---------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Smooth scroll (Lenis, con fallback nativo) ---------- */
  var lenis = null;
  if (!reduceMotion && window.Lenis) {
    try {
      lenis = new window.Lenis({
        duration: 1.05,
        easing: function (t) { return 1 - Math.pow(1 - t, 3); },
        smoothWheel: true,
        wheelMultiplier: 1,
      });
      root.classList.add("has-lenis");
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    } catch (e) { lenis = null; }
  }

  function scrollToTarget(id) {
    var target = document.querySelector(id);
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, { offset: -70, duration: 1.1 });
    } else {
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    var href = a.getAttribute("href");
    if (!href || href === "#") return;
    a.addEventListener("click", function (e) {
      if (document.querySelector(href)) {
        e.preventDefault();
        closeMobileMenu();
        scrollToTarget(href);
      }
    });
  });

  /* ---------- Nav: shrink + hide on scroll down ---------- */
  var nav = document.querySelector("[data-nav]");
  var lastY = window.scrollY;
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;
    if (nav) {
      nav.classList.toggle("is-scrolled", y > 40);
      if (y > lastY && y > 240) {
        nav.classList.add("is-hidden");
      } else {
        nav.classList.remove("is-hidden");
      }
    }
    lastY = y;
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  /* ---------- Mobile menu ---------- */
  var burger = document.querySelector("[data-menu-toggle]");
  var mobileMenu = document.querySelector("[data-mobile-menu]");

  function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add("is-open");
    burger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  if (burger) {
    burger.addEventListener("click", function () {
      var isOpen = mobileMenu.classList.contains("is-open");
      isOpen ? closeMobileMenu() : openMobileMenu();
    });
  }
  document.querySelectorAll("[data-menu-link]").forEach(function (l) {
    l.addEventListener("click", closeMobileMenu);
  });

  /* ---------- Scroll reveals ---------- */
  var revealEls = document.querySelectorAll("[data-reveal], [data-reveal-img]");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -6% 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Hero entrance (title reveal on load) ---------- */
  window.addEventListener("load", function () {
    document.querySelectorAll(".hero-title .line").forEach(function (line, i) {
      setTimeout(function () {
        line.classList.add("is-in");
      }, 120 + i * 130);
    });
  });

  /* ---------- Subtle hero parallax ---------- */
  var parallaxEl = document.querySelector("[data-parallax]");
  if (parallaxEl && !reduceMotion) {
    var heroSection = document.querySelector(".hero");
    window.addEventListener("scroll", function () {
      if (!heroSection) return;
      var rect = heroSection.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      var progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
      parallaxEl.style.transform = "translateY(" + (progress * 70) + "px) scale(1.08)";
    }, { passive: true });
  }

  /* ---------- Custom cursor (fine pointer devices) ---------- */
  var isFinePointer = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
  if (isFinePointer && !reduceMotion) {
    var dot = document.querySelector(".cursor-dot");
    var ring = document.querySelector(".cursor-ring");
    var mx = 0, my = 0, rx = 0, ry = 0;
    var active = false;

    window.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      if (!active) {
        active = true;
        dot.classList.add("is-active");
        ring.classList.add("is-active");
      }
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
    });

    function tick() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      requestAnimationFrame(tick);
    }
    tick();

    var hoverTargets = document.querySelectorAll("a, button, .cort, .equipo-photo, .studio-fig");
    hoverTargets.forEach(function (el) {
      el.addEventListener("mouseenter", function () {
        ring.classList.add("is-hover");
        dot.classList.add("is-hover");
      });
      el.addEventListener("mouseleave", function () {
        ring.classList.remove("is-hover");
        dot.classList.remove("is-hover");
      });
    });

    document.addEventListener("mouseleave", function () {
      dot.classList.remove("is-active");
      ring.classList.remove("is-active");
    });
    document.addEventListener("mouseenter", function () {
      dot.classList.add("is-active");
      ring.classList.add("is-active");
    });
  }
})();
