/* ============================================================
   Jarvis — cartoon edition
   One IIFE, independent self-guarded modules. A module that
   doesn't find its markup simply no-ops, so this single file
   runs unchanged on every page.
   ============================================================ */
(function () {
  "use strict";

  var root = document.documentElement;
  var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  /* ---------- Shared artwork ------------------------------- */

  var ART = {
    car: '<svg class="car-svg" viewBox="0 0 120 60" aria-hidden="true">' +
      '<g class="car-body">' +
      '<path d="M8 42 L14 26 Q16 20 24 20 L54 20 Q62 20 68 26 L82 40 L104 42 Q112 43 112 50 L112 44" fill="none"/>' +
      '<path d="M10 44 L16 26 Q18 19 26 19 L58 19 Q66 19 71 25 L84 40 L104 41 Q112 42 112 48 L112 50 Q112 52 108 52 L14 52 Q10 52 10 48 Z" fill="#ff6b6b" stroke="#2b2140" stroke-width="4" stroke-linejoin="round"/>' +
      '<path d="M28 25 L52 25 L52 38 L23 38 Z" fill="#d8f3ff" stroke="#2b2140" stroke-width="3.5" stroke-linejoin="round"/>' +
      '<path d="M58 25 L64 25 L76 38 L58 38 Z" fill="#d8f3ff" stroke="#2b2140" stroke-width="3.5" stroke-linejoin="round"/>' +
      '</g>' +
      '<g class="wheel"><circle cx="34" cy="52" r="9" fill="#2b2140"/><circle cx="34" cy="52" r="3.5" fill="#fffdf7"/></g>' +
      '<g class="wheel"><circle cx="92" cy="52" r="9" fill="#2b2140"/><circle cx="92" cy="52" r="3.5" fill="#fffdf7"/></g>' +
      '</svg>',

    /* Jarvi — house-headed robot. cls lets a caller add state classes. */
    jarvi: function (cls) {
      return '<svg class="jarvi ' + (cls || "") + '" viewBox="0 0 160 205" aria-hidden="true">' +
        '<g class="body-g">' +
        // antenna
        '<line x1="80" y1="30" x2="80" y2="14" stroke="#2b2140" stroke-width="5" stroke-linecap="round"/>' +
        '<circle class="antenna-ball" cx="80" cy="10" r="8" fill="#ff6b6b" stroke="#2b2140" stroke-width="4"/>' +
        // arms
        '<rect class="arm-l" x="24" y="134" width="34" height="13" rx="6.5" fill="#4ecdc4" stroke="#2b2140" stroke-width="4"/>' +
        '<rect class="arm-r" x="102" y="134" width="34" height="13" rx="6.5" fill="#4ecdc4" stroke="#2b2140" stroke-width="4"/>' +
        // head: house shape
        '<path d="M24 64 L80 22 L136 64" fill="#ffc93c" stroke="#2b2140" stroke-width="5" stroke-linejoin="round"/>' +
        '<rect x="34" y="60" width="92" height="64" rx="16" fill="#4ecdc4" stroke="#2b2140" stroke-width="5"/>' +
        // face screen
        '<rect x="44" y="70" width="72" height="44" rx="13" fill="#1d1836" stroke="#2b2140" stroke-width="4"/>' +
        // eyes
        '<g class="eye"><circle cx="64" cy="90" r="9.5" fill="#fffdf7"/><circle class="pupil" cx="64" cy="90" r="4.6" fill="#2b2140"/></g>' +
        '<g class="eye"><circle cx="96" cy="90" r="9.5" fill="#fffdf7"/><circle class="pupil" cx="96" cy="90" r="4.6" fill="#2b2140"/></g>' +
        '<rect class="lid" x="53" y="79" width="22" height="22" fill="#1d1836"/>' +
        '<rect class="lid" x="85" y="79" width="22" height="22" fill="#1d1836"/>' +
        // mouth
        '<path class="mouth" d="M70 103 q10 9 20 0" fill="none" stroke="#fffdf7" stroke-width="4" stroke-linecap="round"/>' +
        // torso
        '<rect x="46" y="124" width="68" height="54" rx="18" fill="#ff6b6b" stroke="#2b2140" stroke-width="5"/>' +
        '<circle cx="80" cy="150" r="13" fill="#fffdf7" stroke="#2b2140" stroke-width="4"/>' +
        '<path d="M73 151 L80 144 L87 151 L87 157 L73 157 Z" fill="#ffc93c" stroke="#2b2140" stroke-width="2.5" stroke-linejoin="round"/>' +
        // feet
        '<ellipse cx="60" cy="184" rx="16" ry="10" fill="#2b2140"/>' +
        '<ellipse cx="100" cy="184" rx="16" ry="10" fill="#2b2140"/>' +
        '</g></svg>';
    },

    /* Project artwork, drawn from a data-house variant name */
    house: function (variant) {
      var open = '<svg class="house" viewBox="0 0 200 165" aria-hidden="true">';
      var tree = '<rect x="20" y="120" width="10" height="42" fill="#8a5a3b"/>' +
        '<circle class="tree" cx="25" cy="112" r="24" stroke="#2b2140" stroke-width="4"/>';
      var door = '<rect class="door-glow" x="86" y="110" width="32" height="52" rx="3"/>' +
        '<rect class="door-panel" x="86" y="110" width="32" height="52" rx="3" stroke="#2b2140" stroke-width="4"/>' +
        '<circle cx="112" cy="137" r="3" fill="#ffc93c"/>';

      if (variant === "tower") {
        return open + tree +
          '<rect class="wall" x="52" y="24" width="96" height="138" rx="8" stroke="#2b2140" stroke-width="5"/>' +
          '<rect class="roof" x="44" y="14" width="112" height="16" rx="6"/>' +
          '<rect class="pane" x="64" y="40" width="26" height="22" rx="3" stroke="#2b2140" stroke-width="3"/>' +
          '<rect class="pane" x="110" y="40" width="26" height="22" rx="3" stroke="#2b2140" stroke-width="3"/>' +
          '<rect class="pane" x="64" y="74" width="26" height="22" rx="3" stroke="#2b2140" stroke-width="3"/>' +
          '<rect class="pane" x="110" y="74" width="26" height="22" rx="3" stroke="#2b2140" stroke-width="3"/>' +
          door + '</svg>';
      }
      if (variant === "villa") {
        return open + tree +
          '<rect class="wall" x="34" y="82" width="132" height="80" rx="8" stroke="#2b2140" stroke-width="5"/>' +
          '<path class="roof" d="M22 88 L100 34 L178 88 Z" stroke="#2b2140" stroke-width="5" stroke-linejoin="round"/>' +
          '<rect class="pane" x="50" y="100" width="28" height="26" rx="3" stroke="#2b2140" stroke-width="3"/>' +
          '<rect class="pane" x="130" y="100" width="28" height="26" rx="3" stroke="#2b2140" stroke-width="3"/>' +
          '<rect class="pane" x="88" y="52" width="24" height="20" rx="3" stroke="#2b2140" stroke-width="3"/>' +
          door + '</svg>';
      }
      if (variant === "shop") {
        return open +
          '<rect class="wall" x="34" y="70" width="132" height="92" rx="8" stroke="#2b2140" stroke-width="5"/>' +
          '<rect class="roof" x="26" y="58" width="148" height="18" rx="7"/>' +
          '<path d="M34 76 h132 v16 h-132 z" fill="#ff6b6b" stroke="#2b2140" stroke-width="4"/>' +
          '<rect class="pane" x="46" y="102" width="36" height="30" rx="3" stroke="#2b2140" stroke-width="3"/>' +
          '<rect class="pane" x="132" y="102" width="26" height="30" rx="3" stroke="#2b2140" stroke-width="3"/>' +
          door + '</svg>';
      }
      // default cottage
      return open + tree +
        '<rect class="wall" x="44" y="76" width="112" height="86" rx="8" stroke="#2b2140" stroke-width="5"/>' +
        '<path class="roof" d="M30 82 L100 30 L170 82 Z" stroke="#2b2140" stroke-width="5" stroke-linejoin="round"/>' +
        '<rect class="pane" x="58" y="94" width="30" height="28" rx="3" stroke="#2b2140" stroke-width="3"/>' +
        '<path d="M73 94 v28 M58 108 h30" stroke="#2b2140" stroke-width="3"/>' +
        '<rect x="128" y="40" width="16" height="30" rx="4" fill="#2b2140"/>' +
        door + '</svg>';
    }
  };

  /* ============================================================
     1. THE SKY — built once, then driven by scroll
     ============================================================ */

  (function buildSky() {
    if (document.querySelector(".sky")) return;

    var stars = "";
    for (var i = 0; i < 46; i++) {
      var x = Math.random() * 100;
      var y = Math.random() * 62;
      var d = (Math.random() * 3).toFixed(2);
      var s = (0.5 + Math.random()).toFixed(2);
      stars += '<span class="star" style="left:' + x.toFixed(1) + '%;top:' + y.toFixed(1) +
        '%;animation-delay:' + d + 's;transform:scale(' + s + ')"></span>';
    }

    var sky = document.createElement("div");
    sky.className = "sky";
    sky.setAttribute("aria-hidden", "true");
    sky.innerHTML =
      '<div class="sky-layer sky-dawn"></div>' +
      '<div class="sky-layer sky-day"></div>' +
      '<div class="sky-layer sky-dusk"></div>' +
      '<div class="sky-layer sky-night"></div>' +
      '<div class="stars">' + stars + '</div>' +
      '<div class="orb orb-sun"></div>' +
      '<div class="orb orb-moon"></div>' +
      '<div class="cloud cloud-1"><i></i></div>' +
      '<div class="cloud cloud-2"><i></i></div>' +
      '<div class="cloud cloud-3"><i></i></div>' +
      '<div class="hills">' +
      '<svg viewBox="0 0 1440 300" preserveAspectRatio="none">' +
      '<path class="hill-far" d="M0 300 V170 Q160 92 330 158 T680 140 Q880 78 1080 148 T1440 132 V300 Z"/>' +
      '<path class="hill-near" d="M0 300 V226 Q200 158 420 220 T820 206 Q1060 152 1250 216 T1440 210 V300 Z"/>' +
      '</svg></div>';
    document.body.insertBefore(sky, document.body.firstChild);
  })();

  /* Day-to-night scroll journey: dawn -> day -> dusk -> night */
  (function skyJourney() {
    var stops = { dawn: 0, day: 0.34, dusk: 0.68, night: 1 };
    var span = 0.36;
    var ticking = false;

    function paint() {
      ticking = false;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 40 ? clamp(window.scrollY / max, 0, 1) : 0;

      root.style.setProperty("--p", p.toFixed(3));
      for (var key in stops) {
        var w = clamp(1 - Math.abs(p - stops[key]) / span, 0, 1);
        root.style.setProperty("--l-" + key, w.toFixed(3));
      }
      root.style.setProperty("--night", clamp((p - 0.62) / 0.38, 0, 1).toFixed(3));

      // the sun arcs over and sets; the moon rises behind it and stays up
      root.style.setProperty("--sun-x", (10 + p * 80).toFixed(1) + "%");
      root.style.setProperty("--sun-y", (64 - Math.sin(p * Math.PI) * 44).toFixed(1) + "%");

      var mp = clamp((p - 0.55) / 0.45, 0, 1);
      root.style.setProperty("--moon-x", (16 + mp * 68).toFixed(1) + "%");
      root.style.setProperty("--moon-y", (78 - Math.sin(mp * Math.PI / 2) * 58).toFixed(1) + "%");
    }

    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(paint); }
    }, { passive: true });
    window.addEventListener("resize", paint);
    paint();
  })();

  /* Cursor parallax — clouds and Jarvi lean with the mouse */
  if (!calm) {
    window.addEventListener("mousemove", function (e) {
      root.style.setProperty("--mx", ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3));
      root.style.setProperty("--my", ((e.clientY / window.innerHeight) * 2 - 1).toFixed(3));
    }, { passive: true });
  }

  /* ============================================================
     2. Page furniture
     ============================================================ */

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Headline letters drop in one by one
  document.querySelectorAll(".pop-in").forEach(function (el) {
    var text = el.textContent;
    el.setAttribute("aria-label", text);
    el.innerHTML = "";
    text.split("").forEach(function (ch, i) {
      var s = document.createElement("span");
      s.textContent = ch === " " ? " " : ch;
      s.setAttribute("aria-hidden", "true");
      s.style.animationDelay = (0.25 + i * 0.035).toFixed(2) + "s";
      el.appendChild(s);
    });
  });

  // Drop the car into any lane on the page
  document.querySelectorAll(".car-lane").forEach(function (lane) {
    var car = document.createElement("div");
    car.className = "car";
    car.innerHTML = ART.car;
    lane.appendChild(car);
  });

  // Project artwork
  document.querySelectorAll("[data-house]").forEach(function (el) {
    el.insertAdjacentHTML("afterbegin", ART.house(el.getAttribute("data-house")));
  });

  // Reveal on scroll
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        ro.unobserve(en.target);
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 0.09 + "s";
      ro.observe(el);
    });
  }

  /* ============================================================
     3. Stat counters — overshoot, then settle
     ============================================================ */

  var counters = document.querySelectorAll(".num[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        animateCount(en.target);
        io.unobserve(en.target);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { io.observe(c); });
  }

  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    if (calm) { el.textContent = target.toLocaleString("en-IN") + suffix; return; }

    var duration = 1400, startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var p = Math.min((ts - startTime) / duration, 1);
      // ease-out-back: sails past the number, then springs back
      var c1 = 1.7, c3 = c1 + 1;
      var eased = 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2);
      el.textContent = Math.max(0, Math.round(eased * target)).toLocaleString("en-IN") + suffix;
      if (p < 1) requestAnimationFrame(step);
      else {
        el.textContent = target.toLocaleString("en-IN") + suffix;
        el.classList.add("pop");
      }
    }
    requestAnimationFrame(step);
  }

  /* ============================================================
     4. Project filter — cards spin out instead of blinking off
     ============================================================ */

  var chips = document.querySelectorAll(".chip[data-filter]");
  var cards = document.querySelectorAll(".card[data-type]");
  if (chips.length && cards.length) {
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.classList.remove("active"); });
        chip.classList.add("active");
        var f = chip.getAttribute("data-filter");

        cards.forEach(function (card) {
          var show = f === "all" || card.getAttribute("data-type") === f;
          var visible = card.style.display !== "none";
          card.classList.remove("hiding", "showing");

          if (show && !visible) {
            card.style.display = "";
            void card.offsetWidth;
            card.classList.add("showing");
          } else if (!show && visible) {
            card.classList.add("hiding");
            setTimeout(function () {
              if (card.classList.contains("hiding")) card.style.display = "none";
            }, 340);
          }
        });
      });
    });
  }

  /* ============================================================
     5. JARVI — hero mascot, eye tracking, peek, easter egg
     ============================================================ */

  var heroSlot = document.querySelector(".hero-jarvi");
  // appended, so the speech bubble in the markup sits above Jarvi's head
  if (heroSlot) heroSlot.insertAdjacentHTML("beforeend", ART.jarvi());

  // Eyes follow the cursor
  if (!calm) {
    window.addEventListener("mousemove", function (e) {
      document.querySelectorAll(".jarvi").forEach(function (svg) {
        var box = svg.getBoundingClientRect();
        if (!box.width) return;
        var cx = box.left + box.width / 2;
        var cy = box.top + box.height * 0.42;
        var dx = clamp((e.clientX - cx) / 260, -1, 1) * 3.4;
        var dy = clamp((e.clientY - cy) / 260, -1, 1) * 2.6;
        svg.querySelectorAll(".pupil").forEach(function (p) {
          p.setAttribute("transform", "translate(" + dx.toFixed(2) + "," + dy.toFixed(2) + ")");
        });
      });
    }, { passive: true });
  }

  // Click Jarvi five times and it dances
  var taps = 0, tapTimer = null;
  document.addEventListener("click", function (e) {
    var svg = e.target.closest && e.target.closest(".jarvi");
    if (!svg) return;
    taps++;
    clearTimeout(tapTimer);
    tapTimer = setTimeout(function () { taps = 0; }, 1200);
    if (taps >= 5) {
      taps = 0;
      svg.classList.add("dancing");
      setTimeout(function () { svg.classList.remove("dancing"); }, 3000);
    } else {
      svg.classList.add("waving");
      setTimeout(function () { svg.classList.remove("waving"); }, 2400);
    }
  });

  // Jarvi peeks up after a quiet spell and offers to help
  (function peek() {
    if (document.querySelector(".jarvi-peek") || document.body.hasAttribute("data-no-peek")) return;
    var el = document.createElement("div");
    el.className = "jarvi-peek";
    el.innerHTML =
      '<div class="bubble">Want to see it in person? I can set up a visit 👋</div>' +
      ART.jarvi() +
      '<button class="peek-close" aria-label="Dismiss">×</button>';
    document.body.appendChild(el);

    var shown = false;
    var timer = setTimeout(function () {
      if (document.querySelector(".book-overlay.open")) return;
      el.classList.add("up");
      shown = true;
    }, 22000);

    el.addEventListener("click", function (e) {
      if (e.target.classList.contains("peek-close")) {
        el.classList.remove("up");
        clearTimeout(timer);
        return;
      }
      if (shown) { el.classList.remove("up"); openBooking("Jarvi nudge"); }
    });
  })();

  /* ============================================================
     6. Floating actions + sticky mobile bar
     ============================================================ */

  (function floaters() {
    if (document.querySelector(".floaters") || document.body.hasAttribute("data-no-floaters")) return;
    var phone = document.body.getAttribute("data-phone") || "+910000000000";
    var wa = phone.replace(/[^0-9]/g, "");

    var f = document.createElement("div");
    f.className = "floaters";
    f.innerHTML =
      '<a class="floater" style="--h:#6bcf7f" href="https://wa.me/' + wa +
      '?text=Hi%20Jarvis%2C%20I%27d%20like%20to%20book%20a%20site%20visit" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">💬</a>' +
      '<a class="floater" style="--h:#ffc93c" href="tel:' + phone + '" aria-label="Call us">📞</a>';
    document.body.appendChild(f);

    var bar = document.createElement("div");
    bar.className = "mobile-bar";
    bar.innerHTML =
      '<a href="tel:' + phone + '">📞 Call</a>' +
      '<a href="https://wa.me/' + wa + '" target="_blank" rel="noopener">💬 WhatsApp</a>' +
      '<button type="button" data-book data-source="mobile bar">📅 Book Visit</button>';
    document.body.appendChild(bar);
  })();

  /* Gentle brochure nudge, once, after real scroll depth */
  (function nudge() {
    if (document.body.hasAttribute("data-no-peek")) return;
    var fired = false;
    window.addEventListener("scroll", function () {
      if (fired) return;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (max < 200 || window.scrollY / max < 0.55) return;
      fired = true;

      var n = document.createElement("div");
      n.className = "nudge";
      n.innerHTML =
        '<button class="peek-close" aria-label="Dismiss">×</button>' +
        '<strong>Still deciding?</strong>' +
        '<p class="muted" style="margin:.3rem 0 .8rem;font-size:.95rem">Grab the brochure and price list — we’ll send it over.</p>' +
        '<button class="btn btn-mint" type="button" data-book data-source="brochure nudge">📄 Send me the brochure</button>';
      document.body.appendChild(n);
      setTimeout(function () { n.classList.add("up"); }, 400);
      n.addEventListener("click", function (e) {
        if (e.target.classList.contains("peek-close")) n.classList.remove("up");
        if (e.target.hasAttribute("data-book")) n.classList.remove("up");
      });
    }, { passive: true });
  })();

  /* ============================================================
     7. BOOKING WIZARD — 4 steps, a road, and a Formspree post
     ============================================================ */

  var ENDPOINT = "https://formspree.io/f/xlgqwdeg";

  var TYPES = [
    { key: "Apartment", emoji: "🏢" },
    { key: "Villa", emoji: "🏡" },
    { key: "Shop", emoji: "🏪" },
    { key: "Office", emoji: "💼" }
  ];

  var BUDGETS = [
    { label: "Under ₹50 Lakh", stage: 1 },
    { label: "₹50 Lakh – ₹1 Cr", stage: 2 },
    { label: "₹1 Cr – ₹2.5 Cr", stage: 3 },
    { label: "₹2.5 Cr and above", stage: 4 }
  ];

  /* The house that grows as the budget slider moves */
  var GROW = '<svg class="grow-house" viewBox="0 0 220 200" preserveAspectRatio="xMidYMax meet" aria-hidden="true">' +
    // 1 — hut
    '<g data-stage="1"><rect x="86" y="132" width="48" height="46" fill="#ffa45c" stroke="#2b2140" stroke-width="5"/>' +
    '<path d="M76 136 L110 106 L144 136 Z" fill="#ff6b6b" stroke="#2b2140" stroke-width="5" stroke-linejoin="round"/>' +
    '<rect x="102" y="152" width="16" height="26" fill="#7a5c3e" stroke="#2b2140" stroke-width="4"/></g>' +
    // 2 — house
    '<g data-stage="2"><rect x="72" y="110" width="76" height="68" fill="#7ec8f5" stroke="#2b2140" stroke-width="5"/>' +
    '<path d="M60 116 L110 74 L160 116 Z" fill="#ff6b6b" stroke="#2b2140" stroke-width="5" stroke-linejoin="round"/>' +
    '<rect x="82" y="124" width="22" height="20" fill="#ffeaa7" stroke="#2b2140" stroke-width="4"/>' +
    '<rect x="118" y="124" width="22" height="20" fill="#ffeaa7" stroke="#2b2140" stroke-width="4"/>' +
    '<rect x="100" y="150" width="20" height="28" fill="#7a5c3e" stroke="#2b2140" stroke-width="4"/></g>' +
    // 3 — villa
    '<g data-stage="3"><rect x="44" y="96" width="132" height="82" fill="#4ecdc4" stroke="#2b2140" stroke-width="5"/>' +
    '<path d="M32 102 L110 52 L188 102 Z" fill="#ff6b6b" stroke="#2b2140" stroke-width="5" stroke-linejoin="round"/>' +
    '<rect x="56" y="112" width="24" height="22" fill="#ffeaa7" stroke="#2b2140" stroke-width="4"/>' +
    '<rect x="140" y="112" width="24" height="22" fill="#ffeaa7" stroke="#2b2140" stroke-width="4"/>' +
    '<rect x="98" y="70" width="24" height="20" fill="#ffeaa7" stroke="#2b2140" stroke-width="4"/>' +
    '<rect x="96" y="142" width="28" height="36" fill="#7a5c3e" stroke="#2b2140" stroke-width="4"/>' +
    '<circle cx="24" cy="150" r="18" fill="#6bcf7f" stroke="#2b2140" stroke-width="4"/></g>' +
    // 4 — mansion with a pool
    '<g data-stage="4"><rect x="26" y="84" width="168" height="94" fill="#8d6cf0" stroke="#2b2140" stroke-width="5"/>' +
    '<path d="M14 90 L110 34 L206 90 Z" fill="#ff6b6b" stroke="#2b2140" stroke-width="5" stroke-linejoin="round"/>' +
    '<rect x="36" y="46" width="26" height="42" fill="#8d6cf0" stroke="#2b2140" stroke-width="5"/>' +
    '<rect x="158" y="46" width="26" height="42" fill="#8d6cf0" stroke="#2b2140" stroke-width="5"/>' +
    '<rect x="44" y="102" width="26" height="24" fill="#ffeaa7" stroke="#2b2140" stroke-width="4"/>' +
    '<rect x="86" y="102" width="26" height="24" fill="#ffeaa7" stroke="#2b2140" stroke-width="4"/>' +
    '<rect x="150" y="102" width="26" height="24" fill="#ffeaa7" stroke="#2b2140" stroke-width="4"/>' +
    '<rect x="96" y="138" width="32" height="40" fill="#ffc93c" stroke="#2b2140" stroke-width="4"/>' +
    '<ellipse cx="188" cy="170" rx="28" ry="13" fill="#7ec8f5" stroke="#2b2140" stroke-width="4"/>' +
    '<circle cx="26" cy="142" r="19" fill="#6bcf7f" stroke="#2b2140" stroke-width="4"/>' +
    '<text x="110" y="30" font-size="20" text-anchor="middle">✨</text></g>' +
    '</svg>';

  function nextDays(n) {
    var out = [];
    var wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var mo = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for (var i = 1; i <= n; i++) {
      var d = new Date();
      d.setDate(d.getDate() + i);
      out.push({
        label: wd[d.getDay()],
        sub: d.getDate() + " " + mo[d.getMonth()],
        value: d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0")
      });
    }
    return out;
  }

  function wizardMarkup() {
    var tiles = TYPES.map(function (t) {
      return '<button type="button" class="tile" data-type="' + t.key + '">' +
        '<span class="emoji">' + t.emoji + '</span>' + t.key + '</button>';
    }).join("");

    var days = nextDays(6).map(function (d) {
      return '<button type="button" class="day" data-date="' + d.value + '" data-pretty="' + d.label + " " + d.sub +
        '">' + d.label + '<small>' + d.sub + '</small></button>';
    }).join("");

    return '<div class="book-card" role="dialog" aria-modal="true" aria-label="Book a visit">' +
      '<div class="book-head"><div>' +
      '<h3>Book a site visit 🚗</h3>' +
      '<p class="muted" style="margin:0">Four quick taps. No forms to wrestle with.</p>' +
      '</div><button type="button" class="book-close" aria-label="Close">✕</button></div>' +

      '<div class="road"><div class="road-car">' + ART.car + '</div></div>' +
      '<div class="road-stops"><span data-stop="1">Type</span><span data-stop="2">Budget</span><span data-stop="3">When</span><span data-stop="4">You</span></div>' +

      '<form class="book-form" novalidate>' +

      '<section class="step" data-step="1"><h4>What are you looking for?</h4>' +
      '<div class="tiles">' + tiles + '</div></section>' +

      '<section class="step" data-step="2"><h4>What’s your budget?</h4>' +
      '<div class="budget-stage">' + GROW + '</div>' +
      '<p class="budget-label" data-budget-label>' + BUDGETS[1].label + '</p>' +
      '<input type="range" min="0" max="3" step="1" value="1" data-budget aria-label="Budget range" />' +
      '</section>' +

      '<section class="step" data-step="3"><h4>When should we meet?</h4>' +
      '<div class="date-grid">' + days + '</div>' +
      '<div class="when-toggle">' +
      '<button type="button" class="when when-morning picked" data-when="Morning (10am–1pm)"><span class="sky-chip">☀️</span>Morning<br><small>10am – 1pm</small></button>' +
      '<button type="button" class="when when-evening" data-when="Evening (4pm–7pm)"><span class="sky-chip">🌙</span>Evening<br><small>4pm – 7pm</small></button>' +
      '</div></section>' +

      '<section class="step" data-step="4"><h4>Where do we reach you?</h4>' +
      '<div data-summary style="margin-bottom:1rem"></div>' +
      '<div class="details-row"><div class="fields">' +
      '<div class="field"><label for="bkName">Your name</label><input id="bkName" name="name" type="text" autocomplete="name" required /></div>' +
      '<div class="field"><label for="bkPhone">Phone</label><input id="bkPhone" name="phone" type="tel" inputmode="tel" autocomplete="tel" required /></div>' +
      '<div class="field"><label for="bkEmail">Email <span class="muted">(optional)</span></label><input id="bkEmail" name="_replyto" type="email" autocomplete="email" /></div>' +
      '<div class="field"><label for="bkMsg">Anything else? <span class="muted">(optional)</span></label><textarea id="bkMsg" name="message" rows="2"></textarea></div>' +
      '</div>' + ART.jarvi() + '</div>' +
      '<p class="form-note" data-note role="status"></p>' +
      '</section>' +

      // hidden context — makes every lead far more useful in the inbox
      '<input type="hidden" name="_subject" value="New site-visit booking from the Jarvis website" />' +
      '<input type="hidden" name="looking_for" data-h="type" />' +
      '<input type="hidden" name="budget" data-h="budget" />' +
      '<input type="hidden" name="visit_date" data-h="date" />' +
      '<input type="hidden" name="visit_time" data-h="when" />' +
      '<input type="hidden" name="project" data-h="project" />' +
      '<input type="hidden" name="came_from" data-h="source" />' +
      '<input type="hidden" name="page" data-h="page" />' +

      '<div class="step-nav">' +
      '<button type="button" class="btn" data-back>← Back</button>' +
      '<button type="button" class="btn btn-primary" data-next>Next →</button>' +
      '<button type="submit" class="btn btn-coral" data-submit style="display:none">Book my visit 🎉</button>' +
      '</div>' +
      '</form>' +

      '<div class="book-done">' + ART.jarvi("waving") +
      '<div class="keys">🔑</div>' +
      '<h3 data-done-title>You’re booked!</h3>' +
      '<p data-done-text class="muted"></p>' +
      '<p class="muted" style="font-size:.95rem">Sales office · Sector 79, Gurugram · Mon–Sat 10:00–19:00</p>' +
      '</div></div>';
  }

  function confetti() {
    if (calm) return;
    var colors = ["#ffc93c", "#ff6b6b", "#4ecdc4", "#8d6cf0", "#6bcf7f", "#ffa45c"];
    for (var i = 0; i < 70; i++) {
      var p = document.createElement("div");
      p.className = "confetti-piece";
      p.style.left = Math.random() * 100 + "vw";
      p.style.background = colors[i % colors.length];
      p.style.animationDuration = (1.8 + Math.random() * 1.6).toFixed(2) + "s";
      p.style.animationDelay = (Math.random() * 0.4).toFixed(2) + "s";
      p.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
      document.body.appendChild(p);
      setTimeout(function (node) { return function () { node.remove(); }; }(p), 4200);
    }
  }

  /* Wires up one wizard instance (modal or inline) */
  function initWizard(host) {
    host.innerHTML = wizardMarkup();

    var form = host.querySelector(".book-form");
    var done = host.querySelector(".book-done");
    var car = host.querySelector(".road-car");
    var stops = host.querySelectorAll(".road-stops span");
    var steps = host.querySelectorAll(".step");
    var backBtn = host.querySelector("[data-back]");
    var nextBtn = host.querySelector("[data-next]");
    var sendBtn = host.querySelector("[data-submit]");
    var note = host.querySelector("[data-note]");
    var jarviInForm = host.querySelector(".details-row .jarvi");

    var state = { step: 1, type: "", budget: BUDGETS[1].label, date: "", pretty: "", when: "Morning (10am–1pm)", project: "", source: "" };

    function hidden(key, val) {
      var f = host.querySelector('[data-h="' + key + '"]');
      if (f) f.value = val;
    }

    function show(n) {
      state.step = n;
      steps.forEach(function (s) { s.classList.toggle("active", s.getAttribute("data-step") === String(n)); });
      stops.forEach(function (s) { s.classList.toggle("on", Number(s.getAttribute("data-stop")) <= n); });
      car.style.setProperty("--step", (8 + (n - 1) * 28) + "%");

      backBtn.style.visibility = n === 1 ? "hidden" : "visible";
      nextBtn.style.display = n === 4 ? "none" : "";
      sendBtn.style.display = n === 4 ? "" : "none";

      if (n === 4) {
        var sum = host.querySelector("[data-summary]");
        sum.innerHTML =
          (state.project ? '<span class="summary-chip">📍 ' + state.project + "</span>" : "") +
          '<span class="summary-chip">🏠 ' + (state.type || "Any type") + "</span>" +
          '<span class="summary-chip">💰 ' + state.budget + "</span>" +
          (state.pretty ? '<span class="summary-chip">📅 ' + state.pretty + "</span>" : "") +
          '<span class="summary-chip">⏰ ' + state.when + "</span>";
      }
    }

    // Step 1 — type tiles
    host.querySelectorAll(".tile").forEach(function (t) {
      t.addEventListener("click", function () {
        host.querySelectorAll(".tile").forEach(function (x) { x.classList.remove("picked"); });
        t.classList.add("picked");
        state.type = t.getAttribute("data-type");
        hidden("type", state.type);
        setTimeout(function () { show(2); }, 320);
      });
    });

    // Step 2 — the growing house
    var range = host.querySelector("[data-budget]");
    var label = host.querySelector("[data-budget-label]");
    function paintBudget() {
      var b = BUDGETS[Number(range.value)];
      state.budget = b.label;
      label.textContent = b.label;
      hidden("budget", b.label);
      host.querySelectorAll(".grow-house > g").forEach(function (g) {
        g.classList.toggle("on", g.getAttribute("data-stage") === String(b.stage));
      });
    }
    range.addEventListener("input", paintBudget);
    paintBudget();

    // Step 3 — day + time of day
    host.querySelectorAll(".day").forEach(function (d) {
      d.addEventListener("click", function () {
        host.querySelectorAll(".day").forEach(function (x) { x.classList.remove("picked"); });
        d.classList.add("picked");
        state.date = d.getAttribute("data-date");
        state.pretty = d.getAttribute("data-pretty");
        hidden("date", state.pretty + " (" + state.date + ")");
      });
    });
    host.querySelectorAll(".when").forEach(function (w) {
      w.addEventListener("click", function () {
        host.querySelectorAll(".when").forEach(function (x) { x.classList.remove("picked"); });
        w.classList.add("picked");
        state.when = w.getAttribute("data-when");
        hidden("when", state.when);
      });
    });
    hidden("when", state.when);

    // Step 4 — friendly validation, Jarvi reacts
    var nameF = host.querySelector("#bkName");
    var phoneF = host.querySelector("#bkPhone");
    var emailF = host.querySelector("#bkEmail");

    function bad(input, msg) {
      var field = input.closest(".field");
      field.classList.add("bad");
      var hint = field.querySelector(".hint");
      if (!hint) {
        hint = document.createElement("span");
        hint.className = "hint";
        field.appendChild(hint);
      }
      hint.textContent = msg;
      if (jarviInForm) {
        jarviInForm.classList.add("shy");
        setTimeout(function () { jarviInForm.classList.remove("shy"); }, 1400);
      }
      input.focus();
    }
    function clearBad(input) {
      var field = input.closest(".field");
      field.classList.remove("bad");
      var hint = field.querySelector(".hint");
      if (hint) hint.remove();
    }
    [nameF, phoneF, emailF].forEach(function (i) {
      i.addEventListener("input", function () { clearBad(i); });
    });
    phoneF.addEventListener("blur", function () {
      var digits = phoneF.value.replace(/\D/g, "");
      if (digits.length >= 10 && jarviInForm) {
        jarviInForm.classList.add("waving");
        setTimeout(function () { jarviInForm.classList.remove("waving"); }, 2400);
      }
    });

    nextBtn.addEventListener("click", function () {
      if (state.step === 1 && !state.type) { state.type = "Any"; hidden("type", "Any"); }
      show(Math.min(4, state.step + 1));
    });
    backBtn.addEventListener("click", function () { show(Math.max(1, state.step - 1)); });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!nameF.value.trim()) return bad(nameF, "We need a name to greet you with 🙂");
      var digits = phoneF.value.replace(/\D/g, "");
      if (digits.length < 10) return bad(phoneF, "That phone looks a bit short 🤔");
      if (emailF.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailF.value.trim())) {
        return bad(emailF, "Check the email address?");
      }

      hidden("page", document.title);
      hidden("project", state.project);
      hidden("source", state.source);

      sendBtn.disabled = true;
      sendBtn.textContent = "Sending…";
      note.textContent = "";
      note.className = "form-note";

      fetch(ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      }).then(function (res) {
        if (!res.ok) {
          return res.json().then(function (d) {
            throw new Error(d && d.errors ? d.errors.map(function (x) { return x.message; }).join(", ")
              : "Something went wrong.");
          });
        }
        form.style.display = "none";
        host.querySelector(".road").style.display = "none";
        host.querySelector(".road-stops").style.display = "none";
        done.querySelector("[data-done-title]").textContent = "You’re booked, " + nameF.value.trim().split(" ")[0] + "! 🎉";
        done.querySelector("[data-done-text]").textContent =
          "We’ll call you on " + phoneF.value.trim() + " to confirm your visit" +
          (state.pretty ? " on " + state.pretty : "") + ", " + state.when.toLowerCase() + ".";
        done.classList.add("show");
        confetti();
      }).catch(function (err) {
        note.textContent = err.message + " Please call us on +91 00000 00000 instead.";
        note.className = "form-note err";
      }).then(function () {
        sendBtn.disabled = false;
        sendBtn.textContent = "Book my visit 🎉";
      });
    });

    show(1);

    return {
      open: function (source, project) {
        state.source = source || "";
        state.project = project || "";
        hidden("source", state.source);
        hidden("project", state.project);
        if (state.project) {
          host.querySelector(".book-head h3").textContent = "Visit " + state.project + " 🚗";
        }
        show(1);
      }
    };
  }

  /* --- Modal instance, opened by anything with [data-book] --- */
  var modal = null;
  function openBooking(source, project) {
    if (!modal) {
      var overlay = document.createElement("div");
      overlay.className = "book-overlay";
      document.body.appendChild(overlay);
      modal = { el: overlay, api: initWizard(overlay) };

      overlay.addEventListener("click", function (e) {
        if (e.target === overlay || e.target.closest(".book-close")) closeBooking();
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeBooking();
      });
    }
    modal.api.open(source, project);
    modal.el.classList.add("open");
    document.body.style.overflow = "hidden";
    var peekEl = document.querySelector(".jarvi-peek");
    if (peekEl) peekEl.classList.remove("up");
  }
  function closeBooking() {
    if (!modal) return;
    modal.el.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.addEventListener("click", function (e) {
    var trigger = e.target.closest && e.target.closest("[data-book]");
    if (!trigger) return;
    e.preventDefault();
    openBooking(
      trigger.getAttribute("data-source") || "",
      trigger.getAttribute("data-project") || ""
    );
  });

  /* --- Inline instance (contact page) --- */
  var inlineHost = document.getElementById("bookInline");
  if (inlineHost) {
    inlineHost.classList.add("book-overlay", "book-inline");
    initWizard(inlineHost);
  }
})();
