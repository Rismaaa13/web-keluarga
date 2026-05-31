// --- 1. Preloader Close & Initial Confetti Splash ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.6s ease';
        setTimeout(() => {
            preloader.style.display = 'none';
            
            // Konfeti saat web pertama dibuka
            confetti({
                particleCount: 120,
                spread: 80,
                origin: { y: 0.6 },
                colors: ['#d4a373', '#e6b89c', '#f7f3eb']
            });
        }, 600);
    }, 1000);
});

// --- 2. Initialize Animations (AOS) ---
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// --- 3. Dynamic Realtime Clock & Greeting Logic ---
function updateLiveWidgets() {
    const now = new Date();
    
    // Format Jam Digital
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('digital-clock').innerHTML = `<i class="fa-solid fa-clock"></i> ${hrs}:${mins}:${secs}`;
    
    // Ucapan Berdasarkan Waktu Otomatis
    let greeting = "";
    let icon = "";
    const currentHour = now.getHours();
    
    if (currentHour >= 5 && currentHour < 11) {
        greeting = "Selamat Pagi";
        icon = "fa-sun";
    } else if (currentHour >= 11 && currentHour < 15) {
        greeting = "Selamat Siang";
        icon = "fa-cloud-sun";
    } else if (currentHour >= 15 && currentHour < 18) {
        greeting = "Selamat Sore";
        icon = "fa-cloud-moon";
    } else {
        greeting = "Selamat Malam";
        icon = "fa-moon";
    }
    document.getElementById('greeting-text').innerHTML = `<i class="fa-solid ${icon}"></i> ${greeting}`;
}
setInterval(updateLiveWidgets, 1000);
updateLiveWidgets();

// --- 4. Light/Dark Mode Toggle Mechanism ---
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
});

// --- 5. Audio Player Toggle Setup ---
const musicToggleBtn = document.getElementById('music-toggle');
const bgAudio = document.getElementById('bg-audio');
musicToggleBtn.addEventListener('click', () => {
    if (bgAudio.paused) {
        bgAudio.play().catch(e => console.log("Audio playback user restriction standard.", e));
        musicToggleBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        musicToggleBtn.style.color = 'var(--accent-warm)';
    } else {
        bgAudio.pause();
        musicToggleBtn.innerHTML = '<i class="fa-solid fa-music"></i>';
        musicToggleBtn.style.color = 'var(--text-main)';
    }
});

// --- 6. Automated Hero Image Slideshow ---
const slides = document.querySelectorAll('.hero-slideshow .slide');
let currentSlideIndex = 0;
setInterval(() => {
    slides[currentSlideIndex].classList.remove('active');
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    slides[currentSlideIndex].classList.add('active');
}, 5000);

// --- 7. Back To Top Visibility Toggle & Event ---
const bttBtn = document.getElementById('scroll-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        bttBtn.style.display = 'flex';
        bttBtn.style.opacity = '1';
    } else {
        bttBtn.style.display = 'none';
    }
});
bttBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- 8. Interactive Reveal Element (Secret Message Box) ---
const secretBtn = document.getElementById('secret-btn');
const secretBox = document.getElementById('secret-box');
secretBtn.addEventListener('click', () => {
    secretBox.classList.toggle('open');
    if (secretBox.classList.contains('open')) {
        secretBtn.textContent = 'Tutup Pesan Rahasia';
        confetti({ particleCount: 40, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 40, angle: 120, spread: 55, origin: { x: 1 } });
    } else {
        secretBtn.textContent = 'Buka Pesan Rahasia Keluarga';
    }
});

// --- 9. Countdown Target Menuju Idul Fitri (Dihitung Otomatis untuk Tahun Berjalan/Berikutnya) ---
function calculateCountdown() {
    const currentYear = new Date().getFullYear();
    // Estimasi patokan tanggal Idul Fitri (Dikalibrasi dinamis untuk demonstrasi)
    let targetDate = new Date(`March 20, ${currentYear} 00:00:00`).getTime();
    const now = new Date().getTime();

    if (now > targetDate) {
        targetDate = new Date(`March 20, ${currentYear + 1} 00:00:00`).getTime();
    }

    const difference = targetDate - now;

    const d = Math.floor(difference / (1000 * 60 * 60 * 24));
    const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = String(d).padStart(2, '0');
    document.getElementById('hours').innerText = String(h).padStart(2, '0');
    document.getElementById('minutes').innerText = String(m).padStart(2, '0');
    document.getElementById('seconds').innerText = String(s).padStart(2, '0');
}
setInterval(calculateCountdown, 1000);
calculateCountdown();

// --- 10. Ambient Canvas Particle Engine (Floating Stars Effect) ---
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particleArray = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * -0.6 - 0.1; // Melayang lembut ke atas
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y < 0) {
            this.y = canvas.height;
            this.x = Math.random() * canvas.width;
        }
    }
    draw() {
        ctx.fillStyle = `rgba(212, 163, 115, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particleArray = [];
    const numberOfParticles = Math.floor((canvas.width * canvas.height) / 12000);
    for (let i = 0; i < numberOfParticles; i++) {
        particleArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
    }
    requestAnimationFrame(animateParticles);
}
initParticles();
animateParticles();
window.addEventListener('resize', initParticles);