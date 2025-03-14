
const scrollDownBtn = document.getElementById('scrollDownBtn');
if (scrollDownBtn) {
  scrollDownBtn.addEventListener('click', () => {
    document.getElementById('section2').scrollIntoView({ behavior: 'smooth' });
  });
}


const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('appeared');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

sections.forEach(sec => observer.observe(sec));


const canvas = document.getElementById('fallingCanvas');
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

const imagesSrc = [
  "https://cdn.jsdelivr.net/gh/heshuyue/love-code/heart1.png",
  "https://cdn.jsdelivr.net/gh/heshuyue/love-code/heart2.png",
  "https://cdn.jsdelivr.net/gh/heshuyue/love-code/envelope.png"
];
const images = [];
let loadedCount = 0;

imagesSrc.forEach(src => {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    loadedCount++;
    if (loadedCount === imagesSrc.length) {
      initFalling();
    }
  };
  images.push(img);
});

let hearts = [];

function initFalling() {
  const n = 30; 
  for (let i = 0; i < n; i++) {
    hearts.push({
      x: Math.random() * w,
      y: (Math.random() - 1) * h,
      speed: 1 + Math.random() * 2,
      size: 40 + Math.random() * 25,
      img: images[Math.floor(Math.random() * images.length)]
    });
  }
  animateHearts();
}

function animateHearts() {
  ctx.clearRect(0, 0, w, h);
  hearts.forEach(heart => {
    ctx.drawImage(heart.img, heart.x, heart.y, heart.size, heart.size);
    heart.y += heart.speed;
    if (heart.y > h) {
      heart.y = -heart.size;
      heart.x = Math.random() * w;
    }
  });
  requestAnimationFrame(animateHearts);
}

window.addEventListener('resize', () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});

const startDate = new Date(2012, 2, 6);
console.log( startDate)
// const startDate = 2012 * 365 * 24 * 60 * 60 * 1000 + 37 * 24 * 60 * 60 * 1000
function updateRelationshipTime() {
  const now = new Date();
  console.log(now)
 
  let diffMs =   now - startDate + 4*30*24*60*60*1000;
  console.log(diffMs)
  const yearMs   = 365 * 24 * 60 * 60 * 1000;
  const weekMs   = 7 * 24 * 60 * 60 * 1000;
  const dayMs    = 24 * 60 * 60 * 1000;
  const hourMs   = 60 * 60 * 1000;
  const minuteMs = 60 * 1000;
  const secondMs = 1000;
  const years   = Math.floor(diffMs / yearMs);
  diffMs       %= yearMs;

  const weeks   = Math.floor(diffMs / weekMs);
  diffMs       %= weekMs;

  const days    = Math.floor(diffMs / dayMs);
  diffMs       %= dayMs;

  const hours   = Math.floor(diffMs / hourMs);
  diffMs       %= hourMs;

  const minutes = Math.floor(diffMs / minuteMs);
  diffMs       %= minuteMs;

  const seconds = Math.floor(diffMs / secondMs);

  const timerEl = document.getElementById('relationshipTimer');
  if (timerEl) {
    timerEl.textContent =
      `${years} лет, ${weeks} недель, ${days} дней, ` +
      `${hours} ч, ${minutes} мин, ${seconds} сек`;
  }
}
setInterval(updateRelationshipTime, 1000);
updateRelationshipTime();

const pickupLines = [
  "Я хочу чтобы ты всегда была так же прекрасна ❤",
  "Без тебя мир кажется тусклее, а с тобой — ярче солнца!",
  "Ты заставляешь других жить и стараться, будто пишешь бесконечный цикл."
];

const pickupIdSpan = document.getElementById('pickup-id');
const pickupLineEl = document.getElementById('pickup-line');
const refreshBtn   = document.getElementById('refresh-btn');

function showRandomLine() {
  const randomIndex = Math.floor(Math.random() * pickupLines.length);
  if (pickupIdSpan) pickupIdSpan.textContent = randomIndex;
  if (pickupLineEl) pickupLineEl.textContent = pickupLines[randomIndex];
}

if (refreshBtn) {
  refreshBtn.addEventListener('click', showRandomLine);
}

document.addEventListener('keydown', e => {
  if (e.code === 'Space') {
    e.preventDefault();
    showRandomLine();
  }
});


const progress = document.getElementById("progress");
const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");
const playPauseButton = document.querySelector(".play-pause-btn");
const nextButton = document.querySelector(".controls button.forward");
const prevButton = document.querySelector(".controls button.backward");
const songName = document.querySelector(".music-player h1");
const artistName = document.querySelector(".music-player p");

const songs = [
  
  {
    title: "N1NT3ND0",
    name: "ЧП",
    source: "N1NT3ND0 - ЧП.mp3",
  },
  {
    title: "N1NT3ND0",
    name: "Ламбада",
    source: "N1NT3ND0 - Ламбада.mp3",
  },
  {
    title: "dj trippie flameboy",
    name: "Take The L",
    source: "dj trippie flameboy - Take The L.mp3",
  },
  {
    title: "Baby Melo",
    name: "Slappy Tap",
    source: "Baby Melo - Slappy Tap.mp3",
  },
  {
    title: "Jillzay",
    name: "Бар «2 лесбухи» speed up",
    source: "литиумс - бар &quot;2 лесбухи&quot; speed up.mp3",
  },
  {
    title: "ICEGERGERT",
    name: "Гектор",
    source: "ICEGERGERT - Гектор .mp3",
  },
  {
    title: "dj trippie flameboy",
    name: "Догги",
    source: "Doss - догги.mp3",
  },
];


let currentSongIndex = 3;

function updateSongInfo() {
  songName.textContent = songs[currentSongIndex].title;
  artistName.textContent = songs[currentSongIndex].name;
  song.src = songs[currentSongIndex].source;
}

song.addEventListener("timeupdate", () => {
  if (!song.paused) {
    progress.value = song.currentTime;
  }
});

song.addEventListener("loadedmetadata", () => {
  progress.max = song.duration;
  progress.value = song.currentTime;
});

song.addEventListener("ended", () => {
  currentSongIndex = (swiper.activeIndex + 1) % songs.length;
  updateSongInfo();
  swiper.slideTo(currentSongIndex);
  playSong();
});

function pauseSong() {
  song.pause();
  controlIcon.classList.remove("fa-pause");
  controlIcon.classList.add("fa-play");
}

function playSong() {
  song.play();
  controlIcon.classList.add("fa-pause");
  controlIcon.classList.remove("fa-play");
}

function playPause() {
  if (song.paused) {
    playSong();
  } else {
    pauseSong();
  }
}
playPauseButton.addEventListener("click", playPause);

progress.addEventListener("input", () => {
  song.currentTime = progress.value;
});
progress.addEventListener("change", () => {
  playSong();
});

nextButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongInfo();
  playPause();
});
prevButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updateSongInfo();
  playPause();
});

updateSongInfo();

var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  centeredSlides: true,
  initialSlide: currentSongIndex, 
  slidesPerView: "auto",
  grabCursor: true,
  spaceBetween: 40,
  coverflowEffect: {
    rotate: 25,
    stretch: 0,
    depth: 50,
    modifier: 1,
    slideShadows: false,
  },
  navigation: {
    nextEl: ".forward",
    prevEl: ".backward",
  },
});

swiper.on("slideChange", () => {
  currentSongIndex = swiper.activeIndex;
  updateSongInfo();
  playPause();
});
