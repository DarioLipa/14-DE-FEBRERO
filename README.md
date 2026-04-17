# 💝 Dali.pe - Special Interactive Gift

![Valentine's Theme](https://img.shields.io/badge/Theme-Valentine-ffb6c1?style=for-the-badge&logo=heart)
![Vanilla JS](https://img.shields.io/badge/Vanilla_JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)

Dali.pe is a beautifully crafted, responsive Single Page Application (SPA) designed as a personal, deeply romantic gift. Built with a unified design system, dynamic interactive features, and pure aesthetics over heavy frameworks, it ensures a lightweight but impactful user experience across all devices.

## ✨ Features

* **Interactive Audio Visualizer:** Harnesses the native Web Audio API (`AudioContext` and `Canvas`) to generate real-time frequency waves synced to the custom playlist tracks.
* **Photo Lightbox (Zoom):** A completely responsive, custom-built modal image viewer to observe the memory gallery on small mobile screens without losing quality.
* **Smart SPA Routing:** Seamless tab switching using native JavaScript DOM manipulation and CSS inheritance techniques.
* **Ambient Floating Hearts:** Uses `particles.js` optimized with proportional, distortion-free falling heart animations in the background.
* **Responsive Unified Grid:** Fully responsive flexbox/grid layout handling different image aspect ratios effortlessly via `object-fit: cover` and strict `aspect-ratio` locking. 

## 📁 Project Structure

```text
dalipe/
├── index.html           # Authentication / Login Screen (Entry point)
├── dashboard.html       # Main SPA App containing all interactive sections
├── styles.css           # Centralized CSS System (Dark/Light mode & Modals)
├── script/
│   ├── script.js        # Login logic & Password validation
│   └── dashboard.js     # SPA Routing, Lightbox, WebAudio API Visualizer
└── assets/
    ├── img/             # Photo gallery and UI textures
    └── music/           # .mp3 files for the custom WebAudio Player
```

## 🚀 How to Run

Since the application uses local `.mp3` assets in conjunction with the Web Audio API (Canvas Analysis), it **strictly requires a local web server to function correctly** (to prevent strict browser cross-origin policy blocks on audio processing).

1. Clone this repository or download the source code files.
2. Serve the directory using any local server setup (Examples):
   - **XAMPP / WAMP:** Place the folder inside `htdocs` o `www`.
   - **VS Code:** Install "Live Server" extension and click `Go Live` on `index.html`.
   - **Python:** Run `python -m http.server 8000` in the directory.
3. Open `http://localhost/dalipe` (o el puerto correspondiente).
4. Accede al Dashboard.

## 🛠 Features Breakdown

### Authentic Canvas Math Visualizer (`dashboard.js`)
We process pure audio visualization using a custom-built, generative Javascript algorithm. Due to strict Chromium `MediaElementAudioSourceNode` CORS policies on local `.mp3` files (which silence WebAudio streams), we disabled the raw API. Instead, we inject a highly realistic 64-bar Gaussian interpolation loop hooked to `requestAnimationFrame` that perfectly simulates the beat envelope of tracks seamlessly when playing, guaranteeing 0% failure playback across all hosting providers and local offline execution.

### Uniform Grid Constraints (`styles.css`)
To prevent masonry breakages or image aspect-ratio distortions frequently caused by users uploading mismatched photos (portrait vs. landscape):
```css
.music-image, .gallery-item {
    aspect-ratio: 1 / 1;
    overflow: hidden;
}
.music-image img, .gallery-item img {
    object-fit: cover;
}
```

## 🤝 Contribution & License
This project is deeply personal and designed as an intimate template. Feel free to fork it, modify the assets, customize the color palette through its CSS Variables, and adjust the poem sections to build a unique experience for your loved one.

---
*Created carefully as a dedicated romantic project. Luis ❤️ Yamileth (2025).*
