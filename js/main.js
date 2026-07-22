/* ===== Jarvis — site interactions ===== */
(function () {
  "use strict";

  // Current year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
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

  // Animated stat counters (runs when scrolled into view)
  var counters = document.querySelectorAll(".num[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { io.observe(c); });
  }

  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var start = 0, duration = 1200, startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var p = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(step);
  }

  // Project filters (projects page)
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
          card.style.display = show ? "" : "none";
        });
      });
    });
  }

  // Contact form (client-side only — no backend)
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");
  if (form && note) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();
      var validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!name || !validEmail || !message) {
        note.textContent = "Please fill in your name, a valid email, and a message.";
        note.className = "form-note err";
        return;
      }
      var btn = form.querySelector("button[type=submit]");
      var btnText = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
      note.textContent = "Sending your enquiry…";
      note.className = "form-note";

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (res) {
          if (res.ok) {
            note.textContent = "Thanks, " + name + "! Your enquiry is on its way. We'll be in touch soon.";
            note.className = "form-note ok";
            form.reset();
          } else {
            return res.json().then(function (data) {
              var msg = data && data.errors ? data.errors.map(function (e) { return e.message; }).join(", ")
                : "Something went wrong. Please email us directly.";
              throw new Error(msg);
            });
          }
        })
        .catch(function (err) {
          note.textContent = err.message || "Network error. Please try again or email us directly.";
          note.className = "form-note err";
        })
        .then(function () {
          if (btn) { btn.disabled = false; btn.textContent = btnText; }
        });
    });
  }
})();
