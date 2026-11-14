/* ========= PENGATURAN: ganti di sini saja ========= */
const CONFIG = {
  phone: "6282197789423",      // format 62..., tanpa tanda + atau 0 di depan
  display: "0821-9778-9423"    // nomor yang tampil di footer
};

/* Foto: cukup timpa file .jpg di folder ini dengan foto barumu (nama file sama). Atau ubah nama file di daftar ini. */
const IMAGES = {
  "hero": "hero.jpg",
  "steak-sapi": "steak-sapi.jpg",
  "steak-ayam": "steak-ayam.jpg",
  "ayam-katsu": "ayam-katsu.jpg",
  "minuman": "minuman.jpg",
  "paket-keluarga": "paket-keluarga.jpg",
  "ilman": "ilman.jpg",
  "candra": "candra.jpg",
  "givfandho": "givfandho.jpg",
  "fitur": "fitur.jpg"
};
document.querySelectorAll("img[data-img]").forEach(function (img) {
  var src = IMAGES[img.dataset.img];
  if (src) img.src = src;
});

/* Semua tombol WhatsApp diisi otomatis dari CONFIG */
document.querySelectorAll("[data-wa]").forEach(function (a) {
  a.href = "https://wa.me/" + CONFIG.phone + "?text=" + encodeURIComponent(a.dataset.wa);
  a.target = "_blank";
  a.rel = "noopener";
});
document.querySelectorAll("[data-phone]").forEach(function (a) { a.textContent = CONFIG.display; });

/* Navbar: jadi solid saat di-scroll + menu mobile */
const header = document.getElementById("top");
const nav = document.getElementById("nav");
const burger = document.getElementById("burger");
function onScroll() { header.classList.toggle("solid", window.scrollY > 40); }
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
burger.addEventListener("click", function () {
  const open = nav.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
nav.addEventListener("click", function (e) {
  if (e.target.tagName === "A") { nav.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
});

/* Animasi muncul saat scroll */
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (en) {
    if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

/* Angka naik (count up) */
const co = new IntersectionObserver(function (entries) {
  entries.forEach(function (en) {
    if (!en.isIntersecting) return;
    const el = en.target, end = +el.dataset.count, pre = el.dataset.pre || "", suf = el.dataset.suf || "";
    const t0 = performance.now(), dur = 1400;
    (function tick(t) {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = pre + Math.round(end * (1 - Math.pow(1 - p, 3))) + suf;
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
    co.unobserve(el);
  });
}, { threshold: 0.6 });
document.querySelectorAll("[data-count]").forEach(function (el) { co.observe(el); });

/* Partikel bara api di hero */
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const c = document.getElementById("embers"), ctx = c.getContext("2d");
  let w, h, ps = [];
  function size() { w = c.width = c.offsetWidth; h = c.height = c.offsetHeight; }
  function make(init) {
    return { x: Math.random() * w, y: init ? Math.random() * h : h + 10, r: Math.random() * 2.2 + .6,
             v: Math.random() * .8 + .3, d: Math.random() * 2 - 1, a: Math.random() * .6 + .3 };
  }
  size(); window.addEventListener("resize", size);
  for (let i = 0; i < 55; i++) ps.push(make(true));
  (function loop() {
    ctx.clearRect(0, 0, w, h);
    ps.forEach(function (p, i) {
      p.y -= p.v; p.x += Math.sin(p.y / 40) * .4 + p.d * .15; p.a -= .0012;
      if (p.y < -10 || p.a <= 0) ps[i] = make(false);
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283);
      ctx.fillStyle = "rgba(255," + (120 + p.r * 30) + ",40," + p.a + ")";
      ctx.shadowColor = "#F26A1B"; ctx.shadowBlur = 10; ctx.fill();
    });
    requestAnimationFrame(loop);
  })();
})();

/* Piring hero bergerak halus mengikuti kursor (desktop) */
(function () {
  const pw = document.getElementById("plateWrap");
  if (!pw || window.matchMedia("(max-width: 900px)").matches) return;
  document.getElementById("hero").addEventListener("mousemove", function (e) {
    const x = (e.clientX / window.innerWidth - .5) * 18, y = (e.clientY / window.innerHeight - .5) * 18;
    pw.style.transform = "translate(" + x + "px," + y + "px)";
  });
})();

/* Bara api di bagian tim (hanya jalan saat bagian terlihat) */
(function () {
  const c = document.getElementById("timEmbers");
  if (!c || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = c.getContext("2d"), sec = c.parentElement;
  let w, h, ps = [], run = false;
  function size() { w = c.width = sec.offsetWidth; h = c.height = sec.offsetHeight; }
  function make(init) {
    return { x: Math.random() * w, y: init ? Math.random() * h : h + 10, r: Math.random() * 2.4 + .6,
             v: Math.random() * .7 + .25, d: Math.random() * 2 - 1, a: Math.random() * .6 + .3 };
  }
  size(); window.addEventListener("resize", size);
  const n = w < 700 ? 30 : 70;
  for (let i = 0; i < n; i++) ps.push(make(true));
  function loop() {
    if (!run) return;
    ctx.clearRect(0, 0, w, h);
    ps.forEach(function (p, i) {
      p.y -= p.v; p.x += Math.sin(p.y / 40) * .4 + p.d * .15; p.a -= .0012;
      if (p.y < -10 || p.a <= 0) ps[i] = make(false);
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283);
      ctx.fillStyle = "rgba(255," + (120 + p.r * 30) + ",40," + p.a + ")";
      ctx.shadowColor = "#F26A1B"; ctx.shadowBlur = 10; ctx.fill();
    });
    requestAnimationFrame(loop);
  }
  new IntersectionObserver(function (e) {
    const vis = e[0].isIntersecting;
    if (vis && !run) { run = true; size(); loop(); } else if (!vis) run = false;
  }).observe(sec);
})();
