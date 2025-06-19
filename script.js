const message = document.getElementById('message');
const popSound = document.getElementById('pop-sound');
const bgMusic = document.getElementById('background-music');
const audio = new Audio('assets/sound.mp3');
audio.play();

// Iniciar música al primer clic (por políticas del navegador)
document.body.addEventListener('click', () => {
  if (bgMusic && bgMusic.paused) {
    bgMusic.play().catch((e) => {
      console.log('Error al reproducir la música:', e);
    });
  }
}, { once: true });

function randomColor() {
  const colors = ['#ff6b81', '#ff4d6d', '#ff8fab', '#ff0033', '#e91e63', '#f06292'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function createFloatingHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');

  const size = Math.random() * 15 + 10;
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;

  const x = Math.random() * window.innerWidth;
  const wind = (Math.random() - 0.5) * 200;

  heart.style.left = `${x}px`;
  heart.style.top = `${window.innerHeight}px`;
  heart.style.backgroundColor = randomColor();
  heart.style.opacity = 0.4 + Math.random() * 0.3;
  heart.style.zIndex = 1;
  heart.style.setProperty('--wind', `${wind}px`);
  heart.style.animation = `floatUp ${7 + Math.random() * 5}s linear forwards`;

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 12000);
}

// Corazones infinitos
setInterval(() => {
  createFloatingHeart();
}, 60);

function showMessage() {
  message.textContent = "TE AMO MUCHO MICHI   ATT: JANDY";
  message.classList.add('visible');
  setTimeout(() => {
    message.classList.remove('visible');
  }, 3000);
}

// Explosión de corazones al clic
document.body.addEventListener('click', (e) => {
  if (popSound) {
    popSound.currentTime = 0;
    popSound.play();
  }

  showMessage();

  const amount = 20;
  for (let i = 0; i < amount; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    const size = Math.random() * 8 + 5;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.left = `${e.clientX}px`;
    heart.style.top = `${e.clientY}px`;
    heart.style.backgroundColor = randomColor();
    heart.style.opacity = 0.6 + Math.random() * 0.4;

    const angle = Math.random() * 2 * Math.PI;
    const radius = Math.random() * 100 + 30;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    heart.style.setProperty('--x', `${x}px`);
    heart.style.setProperty('--y', `${y}px`);
    heart.style.animation = `explode 1.2s ease-out forwards`;

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1500);
  }
});
