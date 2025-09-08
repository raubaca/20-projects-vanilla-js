const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const year = document.getElementById('year');
const loading = document.getElementById('loading');
const countdown = document.getElementById('countdown');

const currentYear = new Date().getFullYear();
const newYear = new Date(`January 01 ${currentYear + 1} 00:00:00`);

year.textContent = `${currentYear + 1}`;

const updateCoundown = () => {
  const currentTime = new Date();
  const diff = newYear - currentTime;

  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  const h = Math.floor(diff / 1000 / 60 / 60) % 24;
  const m = Math.floor(diff / 1000 / 60) % 60;
  const s = Math.floor(diff / 1000) % 60;

  days.textContent = d;
  hours.textContent = h.toString().padStart(2, '0');
  minutes.textContent = m.toString().padStart(2, '0');
  seconds.textContent = s.toString().padStart(2, '0');

  if (d < 1) {
    days.nextElementSibling.textContent = 'day';
  }
};

setTimeout(() => {
  loading.remove();
  countdown.style.display = 'flex';
}, 1000);

setInterval(updateCoundown, 1000);
