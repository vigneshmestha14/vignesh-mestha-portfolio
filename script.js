// ---------- Mobile sidebar toggle ----------
const side = document.getElementById("side");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => side.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach((l) =>
  l.addEventListener("click", () => side.classList.remove("open"))
);

// ---------- Theme toggle ----------
const themeToggle = document.getElementById("themeToggle");
const stored = localStorage.getItem("theme");
if (stored) {
  document.body.classList.toggle("theme-dark", stored === "dark");
} else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.body.classList.add("theme-dark");
}
themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("theme-dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// ---------- Back to top ----------
const toTop = document.getElementById("toTop");
toTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

// ---------- Preloader ----------
const preloader = document.getElementById("preloader");
const preloaderBar = document.getElementById("preloaderBar");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduceMotion) {
  preloader.classList.add("is-done");
} else {
  let p = 0;
  const iv = setInterval(() => {
    p += Math.random() * 18 + 6;
    if (p >= 100) { p = 100; clearInterval(iv); finishPreload(); }
    preloaderBar.style.width = p + "%";
  }, 130);
  function finishPreload() {
    setTimeout(() => preloader.classList.add("is-done"), 260);
  }
}

// ---------- Scroll progress + back-to-top ----------
const progress = document.getElementById("scrollProgress");
addEventListener("scroll", () => {
  const h = document.documentElement;
  progress.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + "%";
  toTop.classList.toggle("is-visible", window.scrollY > 500);
});

// ---------- Reveal on scroll ----------
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
  }), { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// ---------- Active nav link ----------
const sections = ["about", "skills", "projects", "experience", "education", "contact"]
  .map((id) => document.getElementById(id)).filter(Boolean);
const navAnchors = [...navLinks.querySelectorAll("a")];
const spy = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) {
      navAnchors.forEach((a) =>
        a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id)
      );
    }
  }), { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => spy.observe(s));

// ---------- Year ----------
document.getElementById("year").textContent = new Date().getFullYear();
