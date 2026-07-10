// Mobile navigation toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Close mobile menu after clicking a link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// Scroll-reveal animations
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
reveals.forEach((el) => observer.observe(el));

// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Navbar shadow on scroll
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 10) nav.style.boxShadow = "0 6px 24px rgba(0,0,0,0.35)";
  else nav.style.boxShadow = "none";
});
