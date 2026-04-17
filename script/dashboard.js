// --- Modo Oscuro ---
const toggleDarkModeButton = document.getElementById("toggleDarkMode");
const body = document.body;
const sunIcon = '<i class="ri-sun-line"></i>';
const moonIcon = '<i class="ri-moon-line"></i>';

if (localStorage.getItem("darkMode") === "enabled") {
  body.classList.add("dark-mode");
  if (toggleDarkModeButton) toggleDarkModeButton.innerHTML = moonIcon;
}

if (toggleDarkModeButton) {
  toggleDarkModeButton.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
      toggleDarkModeButton.innerHTML = moonIcon;
    } else {
      localStorage.setItem("darkMode", "disabled");
      toggleDarkModeButton.innerHTML = sunIcon;
    }
  });
}

// --- Cerrar Sesión ---
const logoutBtn = document.getElementById("logoutButton");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    const confirmation = confirm("¿Estás seguro de que quieres cerrar sesión?");
    if (confirmation) {
      window.location.href = "index.html";
    }
  });
}

// --- Navegación Fluida ---
const links = document.querySelectorAll(".sidebar nav ul li a");
const sections = document.querySelectorAll(".content-section");
const sidebar = document.querySelector(".sidebar");

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);

    // Oculta todas las secciones
    sections.forEach((section) => {
      section.classList.remove("active");
    });

    // Muestra la sección seleccionada
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add("active");
      // Scroll suave al inicio de la sección en móvil
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Marca el enlace como activo
    links.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    // Cerrar sidebar en móvil tras click
    if (window.innerWidth <= 1023) {
      sidebar.classList.remove("active");
    }
  });
});

// --- Toggle Sidebar Móbile ---
const sidebarToggle = document.getElementById("sidebarToggle");
if (sidebarToggle) {
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
}

// --- Contador de Días (Lógica Mejorada) ---
function updateDaysCount() {
  const anniversaryDate = localStorage.getItem("anniversaryDate") || "2022-10-10";
  const anniversary = new Date(anniversaryDate);
  const today = new Date();

  let years = today.getFullYear() - anniversary.getFullYear();
  let months = today.getMonth() - anniversary.getMonth();
  let days = today.getDate() - anniversary.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const yearText = years === 1 ? "año" : "años";
  const monthText = months === 1 ? "mes" : "meses";
  const dayText = days === 1 ? "día" : "días";

  const counterElement = document.getElementById("daysCount");
  if (counterElement) {
    counterElement.innerText = `Ya han pasado ${years} ${yearText}, ${months} ${monthText} y ${days} ${dayText}, desde que comenzó nuestra historia de amor. Me alegra mucho estar aún a tu lado y disfrutar cada momento, eres la persona que amaré de por vida. ¡Te Amoo❤️!`;
  }
}

window.addEventListener("load", updateDaysCount);
// --- Particles.js ---
if (window.particlesJS) {
  particlesJS("particles-js", {
    particles: {
      number: { value: 15, density: { enable: true, value_area: 800 } },
      shape: {
        type: "image",
        image: {
          src: "https://img.icons8.com/m_rounded/200/ffb6c1/like.png",
          width: 50,
          height: 50,
        },
      },
      size: {
        value: 12,
        random: false,
      },
      opacity: {
        value: 0.8,
        random: true,
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "top",
        random: true,
        straight: false,
        out_mode: "out",
      },
    },
    interactivity: { events: { onhover: { enable: false }, onclick: { enable: false } } },
    retina_detect: true,
  });
}

// --- Mensajes Aleatorios ---
const mensajes = [
  "Eres mi razón de sonreír cada día. 💖",
  "Contigo, cada momento es especial. 🌟",
  "Tu amor es mi mayor tesoro. 🏆",
  "Eres mi hoy, mi mañana y mi siempre. 🌹",
  "Gracias por hacerme tan feliz. 😊",
  "Eres la mejor parte de mi día. ☀️",
  "Mi corazón late por ti. 💓",
  "Cada segundo a tu lado es un regalo. 😍"
];

const mensajeTexto = document.getElementById("mensaje-texto");
const nuevoMensajeBtn = document.getElementById("nuevo-mensaje-btn");

function mostrarMensajeAleatorio() {
  if (mensajeTexto) {
    const mensajeAleatorio = mensajes[Math.floor(Math.random() * mensajes.length)];
    mensajeTexto.textContent = mensajeAleatorio;
  }
}

if (nuevoMensajeBtn) {
  nuevoMensajeBtn.addEventListener("click", mostrarMensajeAleatorio);
}

// Mostrar mensaje inicial
mostrarMensajeAleatorio();

// --- Sorpresa ---
const sorpresaBtn = document.getElementById('sorpresa-btn');
if (sorpresaBtn) {
  sorpresaBtn.addEventListener('click', function() {
    const contenido = document.getElementById('sorpresa-content');
    if (contenido) {
      contenido.classList.toggle('hidden');
    }
  });
}

// --- Modal Lightbox (Fotos) ---
document.addEventListener('DOMContentLoaded', () => {
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.getElementById('close-lightbox');
    
    if(!lightboxModal) return;

    // Asignar a todas las imágenes de la cuadrícula
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach(img => {
        img.style.cursor = 'pointer'; 
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxModal.style.display = 'flex';
        });
    });

    if (closeLightbox) {
        closeLightbox.addEventListener('click', () => lightboxModal.style.display = 'none');
    }
    
    // Cerrar al clickear afuera de la imagen
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) lightboxModal.style.display = 'none';
    });
});

// --- Reproductor Modal (Simulación de Ondas Fluidas Canvas) ---
let isPlaying = false;
let animationId;

document.addEventListener('DOMContentLoaded', () => {
    const audioModal = document.getElementById('audio-modal');
    const closeAudio = document.getElementById('close-audio');
    const playPauseBtn = document.getElementById('audio-play-pause');
    const audioTitle = document.getElementById('audio-title');
    const audioArtist = document.getElementById('audio-artist');
    const canvas = document.getElementById('audio-visualizer');
    const currentGlobalAudio = document.getElementById('modal-audio-player');
    
    if(!canvas || !currentGlobalAudio) return; 

    // Limpiar CrossOrigin que bloquea local
    currentGlobalAudio.removeAttribute("crossOrigin");
    
    const ctx = canvas.getContext('2d');
    const NUM_BARS = 64; 
    let visualData = new Array(NUM_BARS).fill(0);

    // Reemplazar controles nativos por botones vibrantes
    const musicCards = document.querySelectorAll('.music-card');
    musicCards.forEach(card => {
        const audioEl = card.querySelector('audio');
        const sourceEl = card.querySelector('source');
        const titleEl = card.querySelector('.music-info h3');
        const artistEl = card.querySelector('.music-info p');
        
        if(audioEl && sourceEl) {
            audioEl.style.display = 'none'; 
            
            const btn = document.createElement('button');
            btn.className = 'sorpresa-btn btn-pulse';
            btn.innerHTML = '<i class="ri-play-circle-fill"></i> Escuchar';
            btn.style.width = '100%';
            btn.style.marginTop = '10px';
            
            btn.addEventListener('click', () => {
                const url = sourceEl.getAttribute('src');
                abrirReproductor(url, titleEl ? titleEl.innerText : 'Canción', artistEl ? artistEl.innerText : 'Artista');
            });
            
            card.querySelector('.music-controls').appendChild(btn);
        }
    });

    function abrirReproductor(src, title, artist) {
        audioModal.style.display = 'flex';
        audioTitle.innerText = title;
        audioArtist.innerText = artist;
        
        if (currentGlobalAudio.getAttribute('src') !== src) {
            currentGlobalAudio.src = src;
            currentGlobalAudio.load();
        }
        
        currentGlobalAudio.play().then(() => {
            playPauseBtn.innerHTML = '<i class="ri-pause-circle-fill"></i>';
            isPlaying = true;
            dibujarOndasDinamicas();
        }).catch(err => {
            console.log("Auto-play prevenido, iteraccion requerida", err);
            playPauseBtn.innerHTML = '<i class="ri-play-circle-fill"></i>';
            isPlaying = false;
        });
    }

    function dibujarOndasDinamicas() {
        if(audioModal.style.display === 'none') {
            cancelAnimationFrame(animationId);
            return;
        }

        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = 150;

        ctx.fillStyle = '#000000'; // Fondo oscuro
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / NUM_BARS) - 2; 
        let x = 1;

        for (let i = 0; i < NUM_BARS; i++) {
            if (isPlaying) {
                // Algoritmo matemático fluido que simula frecuencias
                let distanceToCenter = Math.abs((NUM_BARS / 2) - i);
                let maxH = 130 - (distanceToCenter * 2); // Forma general de campana
                if (maxH < 20) maxH = 20;

                // Suavizado (Interpolación / Easing) para ver ondas saltar lógicamente
                let target = Math.random() * maxH;
                visualData[i] += (target - visualData[i]) * 0.3; 
            } else {
                // Si está en pausa caen al piso suave
                visualData[i] += (5 - visualData[i]) * 0.1;
            }

            let barHeight = Math.max(5, visualData[i]); // Altura minima al piso

            // Colores vibrantes de espectro
            const r = 255;
            const g = Math.max(80, 192 - barHeight);
            const b = Math.max(120, 203 - barHeight);

            ctx.fillStyle = `rgb(${r},${g},${b})`;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight); 
            x += barWidth + 2;
        }

        animationId = requestAnimationFrame(dibujarOndasDinamicas);
    }

    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            if (currentGlobalAudio.paused) {
                currentGlobalAudio.play();
                playPauseBtn.innerHTML = '<i class="ri-pause-circle-fill"></i>';
                isPlaying = true;
                dibujarOndasDinamicas();
            } else {
                currentGlobalAudio.pause();
                playPauseBtn.innerHTML = '<i class="ri-play-circle-fill"></i>';
                isPlaying = false;
            }
        });
    }

    if(closeAudio){
        closeAudio.addEventListener('click', () => {
            audioModal.style.display = 'none';
            currentGlobalAudio.pause();
            playPauseBtn.innerHTML = '<i class="ri-play-circle-fill"></i>';
            isPlaying = false;
        });
    }
    
    // Cerrar clickeando afuera (Overlay)
    audioModal.addEventListener('click', (e) => {
        if (e.target === audioModal) {
            audioModal.style.display = 'none';
            currentGlobalAudio.pause();
            playPauseBtn.innerHTML = '<i class="ri-play-circle-fill"></i>';
            isPlaying = false;
        }
    });

    // Detectar cuando termina la canción automáticamente
    currentGlobalAudio.addEventListener('ended', () => {
         playPauseBtn.innerHTML = '<i class="ri-play-circle-fill"></i>';
         isPlaying = false;
    });
});
