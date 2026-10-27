// ---------- Floating hearts ----------
const heartsBox = document.getElementById("hearts");
const heartEmojis = ["💖", "💗", "💕", "🌸", "🎀", "✨", "💓"];

function spawnHeart() {
  const h = document.createElement("span");
  h.className = "heart";
  h.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = 14 + Math.random() * 22 + "px";
  const dur = 7 + Math.random() * 7;
  h.style.animationDuration = dur + "s";
  heartsBox.appendChild(h);
  setTimeout(() => h.remove(), dur * 1000);
}
setInterval(spawnHeart, 600);
for (let i = 0; i < 8; i++) setTimeout(spawnHeart, i * 250);

// ---------- Typing effect ----------
const phrases = [
  "a dreamer ☁️",
  "a creative soul 🎨",
  "a lover of all things pink 🌷",
  "a future IT Professional 💼",
];
const typed = document.getElementById("typed");
let pIndex = 0, cIndex = 0, deleting = false;

function type() {
  const current = phrases[pIndex];
  typed.textContent = current.slice(0, cIndex);

  if (!deleting && cIndex < current.length) {
    cIndex++;
    setTimeout(type, 90);
  } else if (!deleting) {
    deleting = true;
    setTimeout(type, 1500);
  } else if (cIndex > 0) {
    cIndex--;
    setTimeout(type, 45);
  } else {
    deleting = false;
    pIndex = (pIndex + 1) % phrases.length;
    setTimeout(type, 400);
  }
}
type();

// ---------- Reveal on scroll + skill bars ----------
document.querySelectorAll(".section .card, .section h2").forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("show");
      entry.target.querySelectorAll?.(".skill").forEach((s) => {
        s.querySelector(".fill").style.width = s.dataset.level + "%";
      });
    });
  },
  { threshold: 0.2 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ---------- Sparkle cursor trail ----------
let lastSparkle = 0;
document.addEventListener("mousemove", (e) => {
  const now = Date.now();
  if (now - lastSparkle < 60) return;
  lastSparkle = now;
  const s = document.createElement("span");
  s.className = "sparkle";
  s.textContent = ["✨", "💖", "🌸"][Math.floor(Math.random() * 3)];
  s.style.left = e.clientX + "px";
  s.style.top = e.clientY + "px";
  document.body.appendChild(s);
  setTimeout(() => s.remove(), 900);
});

// ---------- Contact form ----------
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  e.target.reset();
  const thanks = document.getElementById("thanks");
  thanks.hidden = false;
  setTimeout(() => (thanks.hidden = true), 5000);
  for (let i = 0; i < 15; i++) setTimeout(spawnHeart, i * 80);
});
