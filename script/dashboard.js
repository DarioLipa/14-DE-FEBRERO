document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. MODO OSCURO ---
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

    // --- 2. CERRAR SESIÓN ---
    const logoutBtn = document.getElementById("logoutButton");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            const confirmation = confirm("¿Estás seguro de que quieres cerrar sesión, mi amor?");
            if (confirmation) {
                window.location.href = "index.html";
            }
        });
    }

    // --- 3. NAVEGACIÓN SPA Y TOGGLE SIDEBAR ---
    const links = document.querySelectorAll(".sidebar nav ul li a");
    const sections = document.querySelectorAll(".content-section");
    const sidebar = document.querySelector(".sidebar");
    const sidebarToggle = document.getElementById("sidebarToggle");

    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);

            // Oculta todas las secciones
            sections.forEach((section) => {
                section.classList.remove("active");
            });

            // Muestra la sección activa
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add("active");
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // Si la sección es timeline, forzar trigger de revelación
                if (targetId === "timeline") {
                    revealTimelineItems();
                }
            }

            // Actualizar enlace activo en sidebar
            links.forEach((l) => l.classList.remove("active"));
            link.classList.add("active");

            // Cerrar sidebar en móvil
            if (window.innerWidth <= 1023 && sidebar) {
                sidebar.classList.remove("active");
            }
        });
    });

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener("click", () => {
            sidebar.classList.toggle("active");
        });
    }

    // --- 4. CONTADOR DE DÍAS ANIVERSARIO ---
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
            counterElement.innerHTML = `Llevamos juntos <strong>${years} ${yearText}, ${months} ${monthText} y ${days} ${dayText}</strong> de pura felicidad.<br>
            Gracias por llenar mi vida de amor y sonrisas. ¡Te amo con todo mi corazón! ❤️`;
        }
    }
    updateDaysCount();

    // --- 5. FRASES ALEATORIAS ---
    const mensajes = [
        "Eres mi razón de sonreír cada día. 💖",
        "Contigo, cada momento es especial y único. 🌟",
        "Tu amor es mi mayor tesoro en esta vida. 🏆",
        "Eres mi hoy, mi mañana y mi siempre. 🌹",
        "Gracias por hacerme el novio más feliz del mundo. 😊",
        "Eres la mejor parte de todos mis días. ☀️",
        "Mi corazón late más fuerte por ti y para ti. 💓",
        "Cada segundo a tu lado es un regalo del cielo. 😍",
        "Amo tu risa, tus ojos y todo de ti. 🌸",
        "Eres mi hogar, mi refugio y mi paz. 🏡",
        "A tu lado, el mundo es un lugar mucho más bonito. 🌍"
    ];

    const mensajeTexto = document.getElementById("mensaje-texto");
    const nuevoMensajeBtn = document.getElementById("nuevo-mensaje-btn");

    function mostrarMensajeAleatorio() {
        if (mensajeTexto) {
            // Animación de salida suave
            mensajeTexto.style.opacity = 0;
            setTimeout(() => {
                const mensajeAleatorio = mensajes[Math.floor(Math.random() * mensajes.length)];
                mensajeTexto.textContent = mensajeAleatorio;
                mensajeTexto.style.opacity = 1;
            }, 300);
        }
    }

    if (nuevoMensajeBtn) {
        nuevoMensajeBtn.addEventListener("click", mostrarMensajeAleatorio);
    }
    mostrarMensajeAleatorio();

    // --- 6. PARTICLES.JS CONFIG ---
    if (window.particlesJS) {
        particlesJS("particles-js", {
            particles: {
                number: { value: 18, density: { enable: true, value_area: 800 } },
                shape: {
                    type: "image",
                    image: {
                        src: "https://img.icons8.com/m_rounded/200/ffb6c1/like.png",
                        width: 50,
                        height: 50
                    }
                },
                size: { value: 14, random: true },
                opacity: { value: 0.7, random: true },
                move: {
                    enable: true,
                    speed: 1.2,
                    direction: "top",
                    random: true,
                    straight: false,
                    out_mode: "out"
                }
            },
            interactivity: { events: { onhover: { enable: false }, onclick: { enable: false } } },
            retina_detect: true
        });
    }

    // --- 7. GALERÍA DE RECUERDOS (Zoom Directo al hacer Clic) ---
    const galleryItems = document.querySelectorAll(".gallery-item img");
    const lightboxModal = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeLightbox = document.getElementById("close-lightbox");

    galleryItems.forEach((img) => {
        img.style.cursor = "pointer";
        img.addEventListener("click", () => {
            if (lightboxModal && lightboxImg) {
                lightboxImg.src = img.src;
                lightboxModal.style.display = "flex";
            }
        });
    });

    if (closeLightbox && lightboxModal) {
        closeLightbox.addEventListener("click", () => {
            lightboxModal.style.display = "none";
        });
        lightboxModal.addEventListener("click", (e) => {
            if (e.target === lightboxModal) lightboxModal.style.display = "none";
        });
    }

    // --- 8. LÍNEA DE TIEMPO ANIMADA (Scroll Reveal) ---
    const timelineItems = document.querySelectorAll(".timeline-item");

    function revealTimelineItems() {
        const triggerBottom = window.innerHeight * 0.85;
        timelineItems.forEach((item) => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < triggerBottom) {
                item.classList.add("revealed");
            }
        });
    }

    window.addEventListener("scroll", revealTimelineItems);
    revealTimelineItems(); // Ejecutar inicialmente

    // --- 9. CUPONERA INTERACTIVA ---
    const couponCards = document.querySelectorAll(".coupon-card");

    // Cargar cupones ya canjeados desde localStorage
    couponCards.forEach((card) => {
        const couponId = card.id;
        const button = card.querySelector(".coupon-btn");
        
        if (localStorage.getItem(couponId) === "redeemed") {
            card.classList.add("redeemed");
            if (button) {
                button.textContent = "Canjeado";
                button.disabled = true;
            }
        }

        if (button) {
            button.addEventListener("click", (e) => {
                e.stopPropagation();
                
                // Confirmación romántica
                const confirmRedeem = confirm(`¿Quieres canjear tu vale de "${card.querySelector("h3").innerText}" ahora, mi amor?`);
                if (confirmRedeem) {
                    // Marcar en UI
                    card.classList.add("redeemed");
                    button.textContent = "Canjeado";
                    button.disabled = true;
                    
                    // Guardar estado
                    localStorage.setItem(couponId, "redeemed");

                    // Ráfagas de confeti con formas y colores hermosos
                    if (window.confetti) {
                        const end = Date.now() + (1.5 * 1000);
                        const colors = ['#ff4081', '#ff80ab', '#ffffff', '#e91e63'];

                        (function frame() {
                            confetti({
                                particleCount: 4,
                                angle: 60,
                                spread: 55,
                                origin: { x: 0 },
                                colors: colors
                            });
                            confetti({
                                particleCount: 4,
                                angle: 120,
                                spread: 55,
                                origin: { x: 1 },
                                colors: colors
                            });

                            if (Date.now() < end) {
                                requestAnimationFrame(frame);
                            }
                        }());
                    }

                    // Mensaje dulce personalizado
                    alert(`¡Vale canjeado con éxito! Muéstrame la pantalla para hacerlo realidad. Te amo mucho. ❤️`);
                }
            });
        }
    });
// --- 9.5 Resetear Vales de Amor ---
const resetBtn = document.getElementById('resetCouponsBtn');
if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        // Limpiar estado en localStorage
        couponCards.forEach(card => {
            const couponId = card.id;
            localStorage.removeItem(couponId);
            card.classList.remove('redeemed');
            const btn = card.querySelector('.coupon-btn');
            if (btn) {
                btn.textContent = 'Canjear Vale';
                btn.disabled = false;
            }
        });
        alert('Todos los vales han sido reiniciados.');
    });
}
// --- 10. SOBRE DE CARTA INTERACTIVO & TYPEWRITER ---
    // --- 10. SOBRE DE CARTA INTERACTIVO & TYPEWRITER ---
    const envelopeWrapper = document.getElementById("envelopeWrapper");
    const envelopeLetter = document.getElementById("envelopeLetter");
    const typewriterElement = document.getElementById("typewriter-text");
    const envelopeHint = document.getElementById("envelopeHint");
    const originalText = typewriterElement ? typewriterElement.textContent : "";
    let typewriterIndex = 0;
    let typewriterInterval;
    let isLetterWriting = false;

    // Canción secreta del sobre de carta (jay wheeler o rio roma por defecto)
    const secretAudio = new Audio("assets/music/Río Roma - Por Eso Te Amo.mp3");
    secretAudio.volume = 0.45;
    secretAudio.loop = true;

    if (envelopeWrapper && typewriterElement) {
        // Inicializar texto vacío
        typewriterElement.textContent = "";

        envelopeWrapper.addEventListener("click", () => {
            const isOpen = envelopeWrapper.classList.toggle("open");
            
            if (isOpen) {
                envelopeHint.innerHTML = '<i class="ri-mail-open-fill"></i> ¡Haz clic de nuevo para guardar la carta!';
                
                // Empezar a escribir tras un pequeño delay (mientras se eleva la carta)
                setTimeout(() => {
                    iniciarTypewriter();
                }, 600);

                // Intentar reproducir música suave al abrir la carta
                secretAudio.play().catch(err => console.log("La reproducción de audio del sobre requiere interacción previa."));
            } else {
                envelopeHint.innerHTML = '<i class="ri-mail-unread-fill"></i> ¡Haz clic en el corazón para abrir la carta!';
                detenerTypewriter();
                typewriterElement.textContent = ""; // Limpiar
                secretAudio.pause();
                secretAudio.currentTime = 0;
            }
        });
    }

    function iniciarTypewriter() {
        if (isLetterWriting) return;
        isLetterWriting = true;
        typewriterIndex = 0;
        typewriterElement.textContent = "";

        typewriterInterval = setInterval(() => {
            if (typewriterIndex < originalText.length) {
                typewriterElement.textContent += originalText.charAt(typewriterIndex);
                typewriterIndex++;
                
                // Scroll automático de la carta para seguir la escritura en móviles
                envelopeLetter.scrollTop = envelopeLetter.scrollHeight;
            } else {
                detenerTypewriter();
            }
        }, 35); // Velocidad de escritura romántica
    }

    function detenerTypewriter() {
        clearInterval(typewriterInterval);
        isLetterWriting = false;
    }

    // --- 11. REPRODUCTOR DE MÚSICA VINILO & AUDIO VISUALIZER ---
    const audioModal = document.getElementById("audio-modal");
    const closeAudio = document.getElementById("close-audio");
    const playPauseBtn = document.getElementById("audio-play-pause");
    const audioTitle = document.getElementById("audio-title");
    const audioArtist = document.getElementById("audio-artist");
    const modalAudioPlayer = document.getElementById("modal-audio-player");
    const canvas = document.getElementById("audio-visualizer");
    const ctx = canvas ? canvas.getContext("2d") : null;
    
    let isPlaying = false;
    let animationId;
    let currentPlayingCard = null;
    const NUM_BARS = 40;
    let visualData = new Array(NUM_BARS).fill(0);

    const listenBtns = document.querySelectorAll(".listen-btn[data-src]");

    listenBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            
            const card = btn.closest(".music-card");
            const src = btn.getAttribute("data-src");
            const title = card.querySelector("h3").innerText;
            const artist = card.querySelector("p").innerText;

            abrirReproductor(src, title, artist, card);
        });
    });

    function abrirReproductor(src, title, artist, card) {
        if (!audioModal || !modalAudioPlayer) return;

        // Pausar audio del sobre si estaba sonando
        secretAudio.pause();

        audioModal.style.display = "flex";
        audioTitle.innerText = title;
        audioArtist.innerText = artist;

        // Detener animación previa de vinilo si la hubiera
        if (currentPlayingCard) {
            currentPlayingCard.classList.remove("playing");
        }

        currentPlayingCard = card;

        if (modalAudioPlayer.getAttribute("src") !== src) {
            modalAudioPlayer.src = src;
            modalAudioPlayer.load();
        }

        modalAudioPlayer.play().then(() => {
            playPauseBtn.innerHTML = '<i class="ri-pause-fill"></i>';
            isPlaying = true;
            document.querySelector(".audio-modal-content").classList.add("playing");
            if (currentPlayingCard) currentPlayingCard.classList.add("playing");
            dibujarOndasDinamicas();
        }).catch(err => {
            console.log("Error al reproducir el audio del reproductor principal", err);
            playPauseBtn.innerHTML = '<i class="ri-play-fill"></i>';
            isPlaying = false;
        });
    }

    function dibujarOndasDinamicas() {
        if (!canvas || !ctx || audioModal.style.display === "none") {
            cancelAnimationFrame(animationId);
            return;
        }

        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = 80;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / NUM_BARS) - 3;
        let x = 0;

        for (let i = 0; i < NUM_BARS; i++) {
            if (isPlaying) {
                // Algoritmo matemático para simular una onda fluida
                const distanceToCenter = Math.abs((NUM_BARS / 2) - i);
                let maxH = 65 - (distanceToCenter * 2.5);
                if (maxH < 15) maxH = 15;

                const target = Math.random() * maxH;
                visualData[i] += (target - visualData[i]) * 0.25;
            } else {
                // Suavizar caída al pausar
                visualData[i] += (3 - visualData[i]) * 0.15;
            }

            const barHeight = Math.max(3, visualData[i]);

            // Crear gradiente de color neón rosa/morado
            const grad = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
            grad.addColorStop(0, '#9c27b0');
            grad.addColorStop(1, '#ff4081');

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.roundRect(x, canvas.height - barHeight, barWidth, barHeight, 4); // Esquinas curvas de barras
            ctx.fill();

            x += barWidth + 3;
        }

        animationId = requestAnimationFrame(dibujarOndasDinamicas);
    }

    if (playPauseBtn && modalAudioPlayer) {
        playPauseBtn.addEventListener("click", () => {
            if (modalAudioPlayer.paused) {
                modalAudioPlayer.play();
                playPauseBtn.innerHTML = '<i class="ri-pause-fill"></i>';
                isPlaying = true;
                document.querySelector(".audio-modal-content").classList.add("playing");
                if (currentPlayingCard) currentPlayingCard.classList.add("playing");
                dibujarOndasDinamicas();
            } else {
                modalAudioPlayer.pause();
                playPauseBtn.innerHTML = '<i class="ri-play-fill"></i>';
                isPlaying = false;
                document.querySelector(".audio-modal-content").classList.remove("playing");
                if (currentPlayingCard) currentPlayingCard.classList.remove("playing");
            }
        });
    }

    function cerrarReproductor() {
        if (audioModal && modalAudioPlayer) {
            audioModal.style.display = "none";
            modalAudioPlayer.pause();
            isPlaying = false;
            document.querySelector(".audio-modal-content").classList.remove("playing");
            if (currentPlayingCard) {
                currentPlayingCard.classList.remove("playing");
                currentPlayingCard = null;
            }
        }
    }

    if (closeAudio) {
        closeAudio.addEventListener("click", cerrarReproductor);
    }

    if (audioModal) {
        audioModal.addEventListener("click", (e) => {
            if (e.target === audioModal) cerrarReproductor();
        });
    }

    if (modalAudioPlayer) {
        modalAudioPlayer.addEventListener("ended", () => {
            if (playPauseBtn) playPauseBtn.innerHTML = '<i class="ri-play-fill"></i>';
            isPlaying = false;
            document.querySelector(".audio-modal-content").classList.remove("playing");
            if (currentPlayingCard) currentPlayingCard.classList.remove("playing");
        });
    }

    // --- 12. PARTÍCULAS INTERACTIVAS EN CLICS DEL DASHBOARD ---
    function createClickHeart(x, y) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.position = 'absolute';
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 120 + 80;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        heart.style.setProperty('--tx', `${tx}px`);
        heart.style.setProperty('--ty', `${ty}px`);
        heart.style.animation = 'heartExplode 1.2s forwards cubic-bezier(0.1, 0.8, 0.3, 1)';
        
        document.body.appendChild(heart);
        setTimeout(() => {
            heart.remove();
        }, 1200);
    }

    document.addEventListener("click", (e) => {
        if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'A' && !e.target.closest('.action-btn')) {
            for (let i = 0; i < 4; i++) {
                createClickHeart(e.clientX, e.clientY);
            }
        }
    });

});
