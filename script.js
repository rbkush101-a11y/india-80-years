/* =================================
   PARTICLE BACKGROUND
================================= */

const canvas = document.getElementById("particles");

if (canvas) {

    const ctx = canvas.getContext("2d");

    let particles = [];
    let animationFrame;
    let isRunning = true;

    const colors = [
        "#ff9933",
        "#ffffff",
        "#138808"
    ];


    /* -----------------------------
       CANVAS SIZE
    ----------------------------- */

    function resizeCanvas() {

        const dpr = Math.min(
            window.devicePixelRatio || 1,
            2
        );

        canvas.width =
            window.innerWidth * dpr;

        canvas.height =
            window.innerHeight * dpr;

        canvas.style.width =
            window.innerWidth + "px";

        canvas.style.height =
            window.innerHeight + "px";

        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );

        createParticles();
    }


    /* -----------------------------
       ADAPTIVE PARTICLE COUNT
    ----------------------------- */

    function getParticleCount() {

        if (window.innerWidth <= 600) {
            return 50;
        }

        if (window.innerWidth <= 1000) {
            return 80;
        }

        return 110;
    }


    /* -----------------------------
       CREATE PARTICLES
    ----------------------------- */

    function createParticles() {

        particles = [];

        const count =
            getParticleCount();

        for (let i = 0; i < count; i++) {

            particles.push({

                x:
                    Math.random() *
                    window.innerWidth,

                y:
                    Math.random() *
                    window.innerHeight,

                size:
                    Math.random() * 2 + 1,

                speedX:
                    (Math.random() - 0.5) * 0.4,

                speedY:
                    (Math.random() - 0.5) * 0.4,

                color:
                    colors[
                        Math.floor(
                            Math.random() *
                            colors.length
                        )
                    ]

            });

        }

    }


    /* -----------------------------
       ANIMATION
    ----------------------------- */

    function animate() {

        if (!isRunning) {
            return;
        }

        ctx.clearRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );

        ctx.globalAlpha = 0.7;


        particles.forEach(p => {

            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                p.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                p.color;

            ctx.fill();


            p.x += p.speedX;
            p.y += p.speedY;


            if (
                p.x < 0 ||
                p.x > window.innerWidth
            ) {

                p.speedX *= -1;

            }


            if (
                p.y < 0 ||
                p.y > window.innerHeight
            ) {

                p.speedY *= -1;

            }

        });


        animationFrame =
            requestAnimationFrame(
                animate
            );

    }


    /* -----------------------------
       START
    ----------------------------- */

    resizeCanvas();

    animate();


    /* -----------------------------
       RESIZE
    ----------------------------- */

    let resizeTimer;

    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimer
            );

            resizeTimer =
                setTimeout(
                    resizeCanvas,
                    150
                );

        }
    );


    /* -----------------------------
       PAUSE WHEN TAB IS HIDDEN
    ----------------------------- */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.hidden) {

                isRunning = false;

                cancelAnimationFrame(
                    animationFrame
                );

            } else {

                isRunning = true;

                animate();

            }

        }
    );

}


/* =================================
   START EXPERIENCE
================================= */

function startExperience() {

    document
        .getElementById("technology")
        .scrollIntoView({
            behavior: "smooth"
        });

}

/* =========================
   TYPING EFFECT
========================= */

const text = "WE CODE • WE BUILD • WE GROW";

const typing = document.getElementById("typing");

let index = 0;

function typeText() {

    if (index < text.length) {

        typing.textContent += text.charAt(index);

        index++;

        setTimeout(typeText, 70);

    }

}

typeText();


/* =========================
   MOUSE GLOW
========================= */

const glow = document.querySelector(".hero-glow");

document.addEventListener("mousemove", (e) => {

    glow.style.left =
        e.clientX - 250 + "px";

    glow.style.top =
        e.clientY - 250 + "px";

});


/* =========================
   TRICOLOR FIREWORK
========================= */

function celebrate() {

    const colors = [
        "#ff9933",
        "#ffffff",
        "#138808"
    ];

    for (let i = 0; i < 100; i++) {

        const particle =
            document.createElement("div");

        particle.className = "firework";

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            Math.random() * 300 + 100;

        particle.style.left =
            window.innerWidth / 2 + "px";

        particle.style.top =
            window.innerHeight / 2 + "px";

        particle.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];

        particle.style.setProperty(
            "--x",
            Math.cos(angle) * distance + "px"
        );

        particle.style.setProperty(
            "--y",
            Math.sin(angle) * distance + "px"
        );

        document.body.appendChild(particle);

        setTimeout(() => {

            particle.remove();

        }, 1000);

    }

    document
        .getElementById("technology")
        .scrollIntoView({
            behavior: "smooth"
        });

}

/* =========================
   MISSION SYSTEM
========================= */

const missions =
    document.querySelectorAll(".mission-card");

const progressFill =
    document.getElementById("progressFill");

const progressText =
    document.getElementById("progressText");

const finalReveal =
    document.getElementById("finalReveal");

let completedMissions = 0;


missions.forEach(card => {

    const button =
        card.querySelector(".mission-btn");


    button.addEventListener("click", () => {

        if (card.classList.contains("completed")) {
            return;
        }


        /* Complete card */

        card.classList.add("completed");

        button.textContent =
            "✓ COMPLETED";


        completedMissions++;


        /* Progress */

        const percentage =
            (completedMissions / missions.length) * 100;

        progressFill.style.width =
            percentage + "%";

        progressText.textContent =
            completedMissions +
            " / " +
            missions.length;


        /* Celebration */

        missionBurst(card);


        /* Final reveal */

        if (
            completedMissions ===
            missions.length
        ) {

            setTimeout(() => {

                finalReveal.classList.add(
                    "active"
                );

                bigCelebration();

            }, 1200);

        }

    });

});


/* =========================
   MISSION PARTICLES
========================= */

function missionBurst(card) {

    const rect =
        card.getBoundingClientRect();

    const colors = [
        "#ff9933",
        "#ffffff",
        "#138808"
    ];


    for (let i = 0; i < 25; i++) {

        const particle =
            document.createElement("div");

        particle.className =
            "firework";


        particle.style.left =
            rect.left +
            rect.width / 2 +
            "px";

        particle.style.top =
            rect.top +
            rect.height / 2 +
            "px";


        const angle =
            Math.random() *
            Math.PI * 2;

        const distance =
            Math.random() * 120 + 40;


        particle.style.setProperty(
            "--x",
            Math.cos(angle) *
            distance +
            "px"
        );


        particle.style.setProperty(
            "--y",
            Math.sin(angle) *
            distance +
            "px"
        );


        particle.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        document.body.appendChild(
            particle
        );


        setTimeout(() => {

            particle.remove();

        }, 1000);

    }

}


/* =========================
   FINAL CELEBRATION
========================= */

function bigCelebration() {

    for (let i = 0; i < 150; i++) {

        setTimeout(() => {

            const particle =
                document.createElement("div");

            particle.className =
                "firework";


            particle.style.left =
                window.innerWidth / 2 +
                "px";

            particle.style.top =
                window.innerHeight / 2 +
                "px";


            const angle =
                Math.random() *
                Math.PI * 2;

            const distance =
                Math.random() * 600 +
                100;


            particle.style.setProperty(
                "--x",
                Math.cos(angle) *
                distance +
                "px"
            );


            particle.style.setProperty(
                "--y",
                Math.sin(angle) *
                distance +
                "px"
            );


            const colors = [
                "#ff9933",
                "#ffffff",
                "#138808"
            ];


            particle.style.background =
                colors[
                    Math.floor(
                        Math.random() *
                        colors.length
                    )
                ];


            document.body.appendChild(
                particle
            );


            setTimeout(() => {

                particle.remove();

            }, 1200);


        }, i * 10);

    }

}


/* =========================
   CLOSE REVEAL
========================= */

function closeReveal() {

    finalReveal.classList.remove(
        "active"
    );

}

/* =================================
   3D FLAG MOUSE EFFECT
================================= */

const flag =
    document.querySelector(".flag");


const flagWrapper =
    document.querySelector(".flag-wrapper");


if (flag && flagWrapper) {

    flagWrapper.addEventListener(
        "mousemove",
        (e) => {

            const rect =
                flagWrapper.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateY =
                (x - centerX) /
                20;


            const rotateX =
                (centerY - y) /
                20;


            flag.style.animation =
                "none";


            flag.style.transform =
                `rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 scale(1.03)`;

        }
    );


    flagWrapper.addEventListener(
        "mouseleave",
        () => {

            flag.style.animation =
                "flagFloat 4s ease-in-out infinite";

        }
    );

}

/* =================================
   CINEMATIC SCROLL ENGINE
================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );


const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "show"
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =================================
   TIMELINE ANIMATION
================================= */

const timeline =
    document.querySelector(".timeline");


if (timeline) {

    const timelineObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        timeline.classList.add(
                            "show"
                        );

                    }

                });

            },

            {
                threshold: .3
            }

        );


    timelineObserver.observe(timeline);

}

/* =================================
   INDIA 2047 EFFECT
================================= */

const futureSection =
    document.querySelector(".future-section");

const futureYear =
    document.querySelector(".future-year");


if (futureSection && futureYear) {

    window.addEventListener("scroll", () => {

        const rect =
            futureSection.getBoundingClientRect();

        const windowHeight =
            window.innerHeight;


        const progress =
            Math.min(
                Math.max(
                    1 -
                    rect.top /
                    windowHeight,

                    0
                ),

                1
            );


        const scale =
            0.75 +
            progress * 0.25;


        const opacity =
            Math.min(
                progress * 1.5,
                1
            );


        futureYear.style.transform =
            `scale(${scale})`;


        futureYear.style.opacity =
            opacity;

    });

}

/* =================================
   INTERACTIVE INDIA MAP
================================= */

const indiaMap =
    document.getElementById("indiaMap");

const mapContainer =
    document.querySelector(
        ".india-map-container"
    );


if (indiaMap && mapContainer) {

    mapContainer.addEventListener(
        "mousemove",
        (e) => {

            const rect =
                mapContainer.getBoundingClientRect();


            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateX =
                (centerY - y) / 25;

            const rotateY =
                (x - centerX) / 25;


            indiaMap.style.transform =
                `
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.04)
                `;

            indiaMap.style.filter =
                `
                brightness(0)
                invert(1)
                drop-shadow(
                    0 0 25px #ff9933
                )
                `;

        }
    );


    mapContainer.addEventListener(
        "mouseleave",
        () => {

            indiaMap.style.transform =
                "rotateX(0deg) rotateY(0deg) scale(1)";

            indiaMap.style.filter =
                `
                brightness(0)
                invert(1)
                drop-shadow(
                    0 0 10px #ff993344
                )
                `;

        }
    );

}


/* =================================
   MAP INFORMATION
================================= */

const nodes =
    document.querySelectorAll(
        ".tech-node"
    );

const infoTitle =
    document.getElementById(
        "indiaInfoTitle"
    );

const infoText =
    document.getElementById(
        "indiaInfoText"
    );


nodes.forEach((node, index) => {

    node.addEventListener(
        "mouseenter",
        () => {

            infoTitle.textContent =
                node.dataset.title;

            infoText.textContent =
                node.dataset.text;

        }
    );


    node.addEventListener(
        "click",
        () => {

            infoTitle.textContent =
                node.dataset.title;

            infoText.textContent =
                node.dataset.text;

            node.animate(

                [
                    {
                        transform:
                            "scale(1)"
                    },

                    {
                        transform:
                            "scale(1.8)"
                    },

                    {
                        transform:
                            "scale(1)"
                    }

                ],

                {
                    duration: 500
                }

            );

        }
    );

});

/* =================================
   CINEMATIC LOADING SYSTEM
================================= */

const loader =
    document.getElementById("loader");

const loaderProgress =
    document.getElementById(
        "loaderProgress"
    );

const loaderPercent =
    document.getElementById(
        "loaderPercent"
    );

const loaderStatus =
    document.getElementById(
        "loaderStatus"
    );

const enterIndia =
    document.getElementById(
        "enterIndia"
    );

const bgMusic =
    document.getElementById(
        "bgMusic"
    );


let loadingValue = 0;


const loadingMessages = [

    "SYSTEM INITIALIZING",

    "LOADING INDIA",

    "CONNECTING FUTURE",

    "ACTIVATING TECHNOLOGY",

    "SYSTEM READY"

];


const loadingTimer =
    setInterval(() => {

        loadingValue++;

        loaderProgress.style.width =
            loadingValue + "%";

        loaderPercent.textContent =
            loadingValue;


        if (
            loadingValue % 20 === 0
        ) {

            const messageIndex =
                Math.min(
                    loadingValue / 20 - 1,
                    loadingMessages.length - 1
                );

            loaderStatus.textContent =
                loadingMessages[
                    messageIndex
                ];

        }


        if (loadingValue >= 100) {

            clearInterval(
                loadingTimer
            );


            loaderStatus.textContent =
                "SYSTEM READY";

            enterIndia.classList.add(
                "ready"
            );

        }

    }, 35);

    /* =================================
   ENTER INDIA
================================= */

enterIndia.addEventListener(
    "click",
    async () => {

        /* START MUSIC */

        if (bgMusic) {

            bgMusic.volume = 0.35;

            try {

                await bgMusic.play();

            } catch (error) {

                console.log(
                    "Audio could not start."
                );

            }

        }


        /* HIDE LOADER */

        loader.classList.add(
            "hide"
        );


        /* START CELEBRATION */

        if (typeof bigCelebration === "function") {

            setTimeout(() => {

                bigCelebration();

            }, 700);

        }

    }
);

/* =================================
   CUSTOM CURSOR
================================= */

const cursorDot =
    document.querySelector(".cursor-dot");

const cursorRing =
    document.querySelector(".cursor-ring");

let mouseX = 0;
let mouseY = 0;

let cursorX = 0;
let cursorY = 0;

let cursorAnimation;


function updateCursor() {

    cursorX +=
        (mouseX - cursorX) * 0.18;

    cursorY +=
        (mouseY - cursorY) * 0.18;


    if (cursorDot) {

        cursorDot.style.transform =
            `translate3d(
                ${mouseX}px,
                ${mouseY}px,
                0
            )`;

    }


    if (cursorRing) {

        cursorRing.style.transform =
            `translate3d(
                ${cursorX}px,
                ${cursorY}px,
                0
            )`;

    }


    cursorAnimation =
        requestAnimationFrame(
            updateCursor
        );

}


if (
    cursorDot &&
    cursorRing &&
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    document.addEventListener(
        "mousemove",
        (e) => {

            mouseX = e.clientX;
            mouseY = e.clientY;

        },
        { passive: true }
    );


    updateCursor();

}

/* =================================
   CURSOR HOVER
================================= */

const interactiveElements =
    document.querySelectorAll(
        "button, a, .card, .mission-card, .tech-node"
    );


interactiveElements.forEach(
    element => {

        element.addEventListener(
            "mouseenter",
            () => {

                cursorRing.classList.add(
                    "hover"
                );

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                cursorRing.classList.remove(
                    "hover"
                );

            }
        );

    }
);

/* =================================
   15 AUGUST COUNTDOWN
================================= */

const targetDate =
    new Date(
        "August 15, 2026 00:00:00"
    ).getTime();


function updateCountdown() {

    const now =
        new Date().getTime();


    let difference =
        targetDate - now;


    if (difference <= 0) {

        const countdown = document.querySelector(".countdown");

        if (countdown) {
            countdown.innerHTML = `
                <div class="celebration-countdown">
                    <span>🇮🇳</span>
                    <strong>HAPPY INDEPENDENCE DAY</strong>
                    <small>15 AUGUST 2026</small>
                </div>
            `;
        }

        return;
    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference %
                (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (difference %
                (1000 * 60 * 60)) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (difference %
                (1000 * 60)) /
            1000
        );


    document.getElementById(
        "days"
    ).textContent =
        String(days).padStart(2, "0");


    document.getElementById(
        "hours"
    ).textContent =
        String(hours).padStart(2, "0");


    document.getElementById(
        "minutes"
    ).textContent =
        String(minutes).padStart(2, "0");


    document.getElementById(
        "seconds"
    ).textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);

/* =================================
   SOUND TOGGLE
================================= */

const soundToggle =
    document.getElementById(
        "soundToggle"
    );


if (soundToggle && bgMusic) {

    // Initial accessibility state
    soundToggle.setAttribute(
        "aria-label",
        "Turn background music on"
    );

    soundToggle.setAttribute(
        "aria-pressed",
        "false"
    );


    soundToggle.addEventListener(
        "click",
        async () => {

            if (bgMusic.paused) {

                try {

                    await bgMusic.play();

                    soundToggle.textContent =
                        "🔊 SOUND ON";

                    soundToggle.classList.add(
                        "active"
                    );


                    // Accessibility state
                    soundToggle.setAttribute(
                        "aria-label",
                        "Turn background music off"
                    );

                    soundToggle.setAttribute(
                        "aria-pressed",
                        "true"
                    );


                } catch (error) {

                    console.log(
                        "Audio playback blocked."
                    );

                }

            } else {

                bgMusic.pause();

                soundToggle.textContent =
                    "🔇 SOUND OFF";

                soundToggle.classList.remove(
                    "active"
                );


                // Accessibility state
                soundToggle.setAttribute(
                    "aria-label",
                    "Turn background music on"
                );

                soundToggle.setAttribute(
                    "aria-pressed",
                    "false"
                );

            }

        }
    );

}