// ---------- Mobile nav ----------
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach((l) =>
  l.addEventListener("click", () => navLinks.classList.remove("open"))
);

// ---------- Custom cursor ----------
const cursor = document.getElementById("cursor");
const cursorDot = document.getElementById("cursorDot");
let cx = innerWidth / 2, cy = innerHeight / 2, dx = cx, dy = cy;
addEventListener("mousemove", (e) => {
  cx = e.clientX; cy = e.clientY;
  cursorDot.style.left = cx + "px";
  cursorDot.style.top = cy + "px";
});
(function loop() {
  dx += (cx - dx) * 0.18;
  dy += (cy - dy) * 0.18;
  cursor.style.left = dx + "px";
  cursor.style.top = dy + "px";
  requestAnimationFrame(loop);
})();
document.querySelectorAll("a, button, .project, .skill-card, .chip").forEach((el) => {
  el.addEventListener("mouseenter", () => cursor.classList.add("is-hover"));
  el.addEventListener("mouseleave", () => cursor.classList.remove("is-hover"));
});

// ---------- Scroll progress ----------
const progress = document.getElementById("scrollProgress");
addEventListener("scroll", () => {
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progress.style.width = pct + "%";
});

// ---------- Navbar shadow ----------
const nav = document.getElementById("nav");
addEventListener("scroll", () => {
  nav.style.boxShadow = window.scrollY > 10 ? "0 6px 24px rgba(0,0,0,0.4)" : "none";
});

// ---------- Reveal on scroll ----------
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
  }), { threshold: 0.12 }
);
reveals.forEach((el) => io.observe(el));

// ---------- Active nav link ----------
const sections = ["about", "skills", "experience", "projects", "education", "contact"]
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

// ---------- Typewriter hero ----------
const typed = document.getElementById("typed");
const roles = ["Data Engineer", "Fabric Builder", "PySpark Dev", "Azure Specialist", "Pipeline Architect"];
let ri = 0, ci = 0, deleting = false;
function tick() {
  const word = roles[ri];
  typed.textContent = word.slice(0, ci);
  if (!deleting && ci < word.length) ci++;
  else if (!deleting && ci === word.length) { deleting = true; setTimeout(tick, 1400); return; }
  else if (deleting && ci > 0) ci--;
  else { deleting = false; ri = (ri + 1) % roles.length; }
  setTimeout(tick, deleting ? 45 : 90);
}
tick();

// ---------- Project 3D tilt + glow ----------
document.querySelectorAll(".tilt").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    card.style.transform = `perspective(800px) rotateX(${(0.5 - py) * 8}deg) rotateY(${(px - 0.5) * 8}deg) translateY(-6px)`;
    card.style.setProperty("--mx", px * 100 + "%");
    card.style.setProperty("--my", py * 100 + "%");
  });
  card.addEventListener("mouseleave", () => { card.style.transform = ""; });
});

// ---------- Year ----------
document.getElementById("year").textContent = new Date().getFullYear();
