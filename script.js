const countdownElement = document.getElementById("countdown");

// CAMBIA ESTA FECHA
const eventDate = new Date("July 20, 2026 20:00:00").getTime();

const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
        countdownElement.innerHTML = "🦸‍♂️ ¡La misión comenzó!";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    countdownElement.innerHTML = `
    ⏳ Faltan: ${days} días ${hours} horas ${minutes} minutos
  `;
};

setInterval(updateCountdown, 1000);
updateCountdown();