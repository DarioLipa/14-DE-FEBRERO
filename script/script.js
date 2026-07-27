// --- Modo Oscuro (Login Page) ---
const toggleDarkModeButton = document.getElementById('toggleDarkMode');
const body = document.body;
const sunIcon = '<i class="ri-sun-line"></i>';
const moonIcon = '<i class="ri-moon-line"></i>';

// Comprobar el estado guardado del modo oscuro en el localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    if (toggleDarkModeButton) toggleDarkModeButton.innerHTML = moonIcon;
}

if (toggleDarkModeButton) {
    toggleDarkModeButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Guardar el estado del modo oscuro en el localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            toggleDarkModeButton.innerHTML = moonIcon;
        } else {
            localStorage.setItem('darkMode', 'disabled');
            toggleDarkModeButton.innerHTML = sunIcon;
        }
    });
}

// --- Validación del aniversario con transición WOW ---
const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");
const loginCard = document.querySelector(".login-card");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const anniversaryDate = document.getElementById("anniversaryDate").value;
        
        // Fecha de aniversario: AAAA-MM-DD
        if (anniversaryDate === "2022-10-10") {
            // Guardar la fecha de aniversario en localStorage
            localStorage.setItem("anniversaryDate", anniversaryDate);
            if (errorMessage) errorMessage.classList.add("hidden");
            
            // Efecto WOW de desvanecimiento de salida antes de redirigir
            loginCard.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
            loginCard.style.opacity = "0";
            loginCard.style.transform = "translateY(-30px) scale(0.95)";
            
            // Generar una ráfaga masiva de corazones celebrando
            for (let i = 0; i < 30; i++) {
                setTimeout(() => createHeart(window.innerWidth / 2, window.innerHeight / 2, true), i * 30);
            }
            
            setTimeout(() => {
                window.location.href = "dashboard.html"; // Redirige al dashboard
            }, 800);
        } else {
            if (errorMessage) {
                errorMessage.classList.remove("hidden");
                // Animación de vibración (shake) para avisar del error
                loginCard.classList.remove("shake-anim");
                void loginCard.offsetWidth; // Dispara reflow para reiniciar la animación
                loginCard.classList.add("shake-anim");
            }
        }
    });
}

// Añadimos la animación de sacudida (shake) dinámicamente si no existe en CSS
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-8px); }
    40%, 80% { transform: translateX(8px); }
}
.shake-anim {
    animation: shake 0.5s ease-in-out;
}
`;
document.head.appendChild(styleSheet);


// --- Animación interactiva de Corazones Flotantes (Click & Automáticos) ---
function createHeart(x, y, isExplosion = false) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // Si viene de un evento/explosión, se posiciona en x, y específicos
    if (x !== undefined && y !== undefined) {
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.position = 'absolute';
        
        if (isExplosion) {
            // Dirección aleatoria 360 grados
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 150 + 100;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            heart.style.setProperty('--tx', `${tx}px`);
            heart.style.setProperty('--ty', `${ty}px`);
            heart.style.animation = 'heartExplode 1.2s forwards cubic-bezier(0.1, 0.8, 0.3, 1)';
        } else {
            heart.style.animation = 'floatHeartsUp 4s forwards linear';
        }
    } else {
        // Generación automática normal por la pantalla
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.top = '105vh';
        heart.style.animation = 'floatHeartsUp 5s forwards linear';
        // Duración aleatoria de la animación
        heart.style.animationDuration = `${Math.random() * 3 + 4}s`;
    }

    document.body.appendChild(heart);

    // Eliminamos el corazón después de que se haya animado
    setTimeout(() => {
        heart.remove();
    }, isExplosion ? 1200 : 7000);
}

// Inyectamos los keyframes necesarios para los corazones interactivos
const heartKeyframes = document.createElement("style");
heartKeyframes.innerText = `
@keyframes floatHeartsUp {
    0% {
        transform: translateY(0) rotate(45deg) scale(0.6);
        opacity: 0;
    }
    10% { opacity: 0.8; }
    90% { opacity: 0.8; }
    100% {
        transform: translateY(-110vh) rotate(360deg) scale(1.2);
        opacity: 0;
    }
}
@keyframes heartExplode {
    0% {
        transform: translate(-50%, -50%) rotate(45deg) scale(0.2);
        opacity: 1;
    }
    100% {
        transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) rotate(180deg) scale(1.1);
        opacity: 0;
    }
}
`;
document.head.appendChild(heartKeyframes);

// Crear corazones de forma continua en segundo plano
setInterval(() => createHeart(), 450);

// Generar corazones al hacer clic en cualquier parte de la pantalla
document.addEventListener('click', (e) => {
    // Evitar generar corazones si se hace clic en botones o entradas
    if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'A' && !e.target.closest('.action-btn')) {
        for (let i = 0; i < 5; i++) {
            createHeart(e.clientX, e.clientY, true);
        }
    }
});


// --- Driver.js para guiar a la usuaria ---
document.addEventListener('DOMContentLoaded', function () {
    if (typeof window.driver === 'undefined' || typeof window.driver.js === 'undefined') {
        console.warn('Driver.js no está disponible.');
        return;
    }

    // Si ya vio el tour, no lo repetimos
    if (localStorage.getItem('tourVisto') === 'true') {
        return;
    }

    const driver = window.driver.js.driver;
    const driverObj = driver({
        showProgress: true,
        showButtons: ['next', 'previous'],
        steps: [
            {
                element: '#toggleDarkMode',
                popover: {
                    title: 'Modo Oscuro/Claro',
                    description: 'Puedes hacer clic aquí para alternar el diseño nocturno o diurno.',
                    side: 'bottom',
                    align: 'center'
                }
            },
            {
                element: '#anniversaryDate',
                popover: {
                    title: 'Nuestra Fecha',
                    description: 'Ingresa el día en que comenzó nuestra hermosa historia.',
                    side: 'top',
                    align: 'center'
                }
            },
            {
                element: '#loginForm button',
                popover: {
                    title: 'Entrar a la Sorpresa',
                    description: 'Haz clic aquí para ingresar y descubrir todo lo que he preparado para ti.',
                    side: 'top',
                    align: 'center'
                }
            }
        ]
    });

    // Iniciar el tour después de un pequeño retraso
    setTimeout(() => {
        driverObj.drive();
        localStorage.setItem('tourVisto', 'true');
    }, 1000);
});
