// ====== CONFIGURACIÓN RÁPIDA ======
const EVENT = {
  name: "Fiesta",
  person: "Brandon",
  dateText: "28 de marzo 2026",
  timeText: "3:00 PM",
  placeText: "Salon Magico Encuentro",
  // Formato recomendado: "2026-07-20T20:00:00-06:00"
  isoDate: "2026-03-28T15:00:00-06:00",
  mapsUrl: "https://maps.app.goo.gl/FDfZbyakYAjGk22D8", // pon tu link real aquí
  rsvpEmail: "brandon.asc15@gmail.com", // cámbialo
  rsvpSubject: "Confirmación de asistencia",
};

// ====== Pintar textos (por si luego cambias arriba) ======
document.getElementById("eventDateText").textContent = EVENT.dateText;
document.getElementById("eventTimeText").textContent = EVENT.timeText;
document.getElementById("eventPlaceText").textContent = EVENT.placeText;

const mapLink = document.getElementById("mapLink");
mapLink.href = EVENT.mapsUrl;

// ====== RSVP (SÚPER SIMPLE: mailto con texto prellenado) ======
// Nota: depende del correo del invitado. Abre su app de correo con un mensaje listo.
const rsvpMailto = document.getElementById("rsvpMailto");
const body = encodeURIComponent(
  `Hola ${EVENT.person} 👋

Confirmo mi asistencia a tu ${EVENT.name} ✅

Nombre:
Número de personas:
Comentario (opcional):

¡Nos vemos! 🦸‍♂️🎓`
);
rsvpMailto.href = `mailto:${encodeURIComponent(EVENT.rsvpEmail)}?subject=${encodeURIComponent(EVENT.rsvpSubject)}&body=${body}`;

// ====== Cuenta regresiva ======
const countdownElement = document.getElementById("countdown");
const eventDate = new Date(EVENT.isoDate).getTime();

function updateCountdown() {
  const now = Date.now();
  const distance = eventDate - now;

  if (distance <= 0) {
    countdownElement.textContent = "🦸‍♂️ ¡Es hoy, es hoy!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownElement.textContent = `⏳ Faltan: ${days} días ${hours}h ${minutes}m ${seconds}s`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

document.getElementById("year").textContent = new Date().getFullYear();

// ====== Animación reveal al hacer scroll ======
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("show");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// ====== Tilt ligero en tarjetas (cómico) ======
document.querySelectorAll(".tilt").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = ((y / r.height) - 0.5) * -6;
    const ry = ((x / r.width) - 0.5) * 6;
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0)";
  });
});

// ====== Música (autoplay-friendly) ======
const music = document.getElementById("bgMusic");
const btn = document.getElementById("musicBtn");

let playing = false;

btn.addEventListener("click", async () => {
  try {
    if (!playing) {
      await music.play();
      playing = true;
      btn.textContent = "⏸ Pausar música";
      btn.setAttribute("aria-pressed", "true");
    } else {
      music.pause();
      playing = false;
      btn.textContent = "▶ Música épica";
      btn.setAttribute("aria-pressed", "false");
    }
  } catch (err) {
    // Si el navegador bloquea, no pasa nada; el usuario vuelve a intentar.
    console.log("No se pudo reproducir audio:", err);
  }
});

// ===== LIBRO MANGA =====
const pages = document.querySelectorAll(".page");
const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");
const indicator = document.getElementById("pageIndicator");

let current = 0;

function stopVideos() {
  pages.forEach(p => {
    const v = p.querySelector("video");
    if (v) v.pause();
  });
}

function updatePage() {
  pages.forEach(p => p.classList.remove("show"));
  pages[current].classList.add("show");
  indicator.textContent = `${current + 1} / ${pages.length}`;
}

prevBtn.addEventListener("click", () => {
  stopVideos();
  current = (current - 1 + pages.length) % pages.length;
  updatePage();
});

nextBtn.addEventListener("click", () => {
  stopVideos();
  current = (current + 1) % pages.length;
  updatePage();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextBtn.click();
  if (e.key === "ArrowLeft") prevBtn.click();
});

updatePage();