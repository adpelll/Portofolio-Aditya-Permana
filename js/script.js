(function () {
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var lang = "id";

  // reveal + animate bars
  var io = new IntersectionObserver(
    function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        e.target.querySelectorAll("[data-w]").forEach(function (b) {
          b.style.width = b.dataset.w + "%";
        });
        io.unobserve(e.target);
      });
    },
    { threshold: 0.12 },
  );
  document.querySelectorAll(".reveal").forEach(function (el) {
    io.observe(el);
  });

  // count-up on card stats
  document.querySelectorAll(".st b").forEach(function (b) {
    var n = +b.dataset.n;
    if (reduce) {
      b.textContent = n;
      return;
    }
    var t0 = performance.now(),
      d = 1100;
    (function f(t) {
      var p = Math.min((t - t0) / d, 1);
      b.textContent = Math.round(n * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(f);
    })(t0);
  });

  // 3D tilt + holo shine
  var card = document.getElementById("card");
  function move(x, y) {
    var r = card.getBoundingClientRect();
    var px = (x - r.left) / r.width,
      py = (y - r.top) / r.height;
    px = Math.max(0, Math.min(1, px));
    py = Math.max(0, Math.min(1, py));
    card.classList.remove("idle");
    card.style.setProperty("--ry", (px - 0.5) * 24 + "deg");
    card.style.setProperty("--rx", (0.5 - py) * 24 + "deg");
    card.style.setProperty("--mx", px * 100 + "%");
    card.style.setProperty("--my", py * 100 + "%");
  }
  function reset() {
    card.classList.add("idle");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--mx", "50%");
    card.style.setProperty("--my", "30%");
  }
  if (!reduce) {
    card.addEventListener("pointermove", function (e) {
      move(e.clientX, e.clientY);
    });
    card.addEventListener("pointerleave", reset);
    card.addEventListener("pointerup", function (e) {
      if (e.pointerType !== "mouse") reset();
    });
  }

  // certificate lightbox
  var lb = document.getElementById("lb"),
    img = document.getElementById("lbImg"),
    cap = document.getElementById("lbCap"),
    last = null;
  function fillLb(btn) {
    var en = lang === "en";
    img.src = btn.dataset.src;
    img.alt = (en && btn.dataset.altEn) || btn.dataset.alt;
    cap.textContent = (en && btn.dataset.capEn) || btn.dataset.cap;
  }
  function show(btn) {
    last = btn;
    lb.classList.toggle("scroll", !!btn.dataset.scroll);
    lb.querySelector("figure").scrollTop = 0;
    fillLb(btn);
    lb.classList.add("open");
    document.getElementById("lbClose").focus();
  }
  function hide() {
    lb.classList.remove("open");
    if (last) last.focus();
  }
  document.querySelectorAll("[data-src]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      show(btn);
    });
  });
  document.getElementById("lbClose").addEventListener("click", hide);
  lb.addEventListener("click", function (e) {
    if (e.target === lb) hide();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lb.classList.contains("open")) hide();
  });

  // copy email
  // language toggle (ID / EN)
  var WA = {
    id: "Halo Aditya, saya melihat portofolio kamu dan ingin berdiskusi.",
    en: "Hello Aditya, I saw your portfolio and would like to talk.",
  };
  function setLang(l, save) {
    lang = l;
    document.documentElement.lang = l;
    document.querySelectorAll("[data-en]").forEach(function (el) {
      if (el.dataset.id === undefined) el.dataset.id = el.innerHTML;
      el.innerHTML = l === "en" ? el.dataset.en : el.dataset.id;
    });
    document.querySelectorAll(".lang button").forEach(function (x) {
      var on = x.dataset.l === l;
      x.classList.toggle("on", on);
      x.setAttribute("aria-pressed", on ? "true" : "false");
    });
    var en = l === "en";
    document.querySelector(".card .photo").alt = en
      ? "Photo of Aditya Permana"
      : "Foto Aditya Permana";
    document
      .getElementById("card")
      .setAttribute(
        "aria-label",
        en ? "Aditya Permana player card" : "Kartu pemain Aditya Permana",
      );
    document
      .getElementById("lbClose")
      .setAttribute("aria-label", en ? "Close" : "Tutup");
    lb.setAttribute("aria-label", en ? "Certificate" : "Sertifikat");
    document.getElementById("wa").href =
      "https://wa.me/6285819941220?text=" + encodeURIComponent(WA[l]);
    if (lb.classList.contains("open") && last) fillLb(last);
    if (save) {
      try {
        localStorage.setItem("lang", l);
      } catch (e) {}
    }
  }
  document.querySelectorAll(".lang button").forEach(function (x) {
    x.addEventListener("click", function () {
      setLang(x.dataset.l, true);
    });
  });
  try {
    if (localStorage.getItem("lang") === "en") setLang("en", false);
  } catch (e) {}

  // pack-opening intro
  var pk = null;
  function playPack() {
    if (pk || reduce) return;
    var en = lang === "en";
    var N = 11,
      pts = [],
      i,
      y;
    for (i = 0; i <= N; i++) {
      y = i % 2 ? 2.4 : 0;
      pts.push(((i / N) * 100).toFixed(2) + "% " + y + "%");
    }
    for (i = N; i >= 0; i--) {
      y = 100 - (i % 2 ? 2.4 : 0);
      pts.push(((i / N) * 100).toFixed(2) + "% " + y + "%");
    }
    var poly = "polygon(" + pts.join(",") + ")";
    var art =
      '<div class="pk-art" style="clip-path:' +
      poly +
      '"><span class="pk-crimp t"></span><span class="pk-crimp b"></span><span class="pk-star" style="left:22px;top:46px">✦</span><span class="pk-star" style="right:24px;bottom:52px">✦</span><div class="pk-mid"><div class="ap">AP</div><div class="t1">PLAYER PACK</div><div class="t2">ADITYA PERMANA · 2026</div></div></div>';
    pk = document.createElement("div");
    pk.className = "pk";
    pk.setAttribute("role", "dialog");
    pk.setAttribute("aria-label", en ? "Opening animation" : "Animasi pembuka");
    pk.innerHTML =
      '<button type="button" class="pk-skip">' +
      (en ? "Skip" : "Lewati") +
      "</button>" +
      '<div class="pk-stage"><div class="pk-rays"></div>' +
      '<button type="button" class="pk-body" aria-label="' +
      (en ? "Open the pack" : "Buka pack") +
      '"><div class="pk-half top">' +
      art +
      '</div><div class="pk-half bot">' +
      art +
      "</div></button>" +
      '<div class="pk-card"></div><div class="pk-flash"></div></div>' +
      '<div class="pk-hint">' +
      (en ? "Tap the pack to open" : "Ketuk pack untuk membuka") +
      "</div>";
    document.body.appendChild(pk);
    var prevOv = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    var body = pk.querySelector(".pk-body"),
      started = false,
      timers = [];
    function later(f, ms) {
      timers.push(setTimeout(f, ms));
    }
    function close() {
      timers.forEach(clearTimeout);
      pk.classList.add("out");
      document.body.style.overflow = prevOv;
      document.removeEventListener("keydown", onKey);
      var el = pk;
      pk = null;
      setTimeout(function () {
        el.remove();
      }, 700);
    }
    function onKey(e) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    pk.querySelector(".pk-skip").addEventListener("click", close);
    body.addEventListener("click", function () {
      if (started) return;
      started = true;
      pk.classList.add("going");
      var c = document.getElementById("card").cloneNode(true);
      c.removeAttribute("id");
      c.classList.add("idle");
      c.querySelectorAll("[id]").forEach(function (e) {
        e.removeAttribute("id");
      });
      c.querySelectorAll("[data-n]").forEach(function (b) {
        b.textContent = b.dataset.n;
      });
      pk.querySelector(".pk-card").appendChild(c);
      body.classList.add("shake");
      later(function () {
        body.style.animation = "none";
        pk.classList.add("open");
      }, 700);
      later(close, 3400);
    });
    body.focus();
  }
  document.getElementById("replay").addEventListener("click", function () {
    window.scrollTo(0, 0);
    playPack();
  });
  playPack();

  var b = document.getElementById("copy"),
    s = document.getElementById("copyTxt"),
    orig = s.textContent;
  b.addEventListener("click", function () {
    try {
      navigator.clipboard.writeText(orig).then(
        function () {
          s.textContent = lang === "en" ? "Copied ✓" : "Tersalin ✓";
        },
        function () {
          s.textContent = orig;
        },
      );
    } catch (e) {
      s.textContent = orig;
    }
    setTimeout(function () {
      s.textContent = orig;
    }, 2500);
  });
})();
