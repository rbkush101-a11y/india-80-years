/* =================================
   PERFORMANCE CONFIG
================================= */

const isMobile =
    window.matchMedia("(max-width: 600px)").matches;

const isTouchDevice =
    window.matchMedia("(pointer: coarse)").matches;

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


/* =================================
   PARTICLE BACKGROUND
================================= */

const canvas =
    document.getElementById("particles");

let particleAnimation = null;
let particlesRunning = true;

if (canvas && !prefersReducedMotion) {

    const ctx =
        canvas.getContext("2d", {
            alpha: true
        });

    let particles = [];

    const colors = [
        "#ff9933",
        "#ffffff",
        "#138808"
    ];


    function getParticleCount() {

        if (isMobile || isTouchDevice) {
            return 25;
        }

        if (window.innerWidth <= 1000) {
            return 60;
        }

        return 100;
    }


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
                    Math.random() * 1.6 + 0.6,

                speedX:
                    (Math.random() - 0.5) * 0.35,

                speedY:
                    (Math.random() - 0.5) * 0.35,

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


    function resizeCanvas() {

        const dpr =
            isMobile
                ? 1
                : Math.min(
                    window.devicePixelRatio || 1,
                    1.5
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


    function animateParticles() {

        if (
            !particlesRunning ||
            document.hidden
        ) {
            particleAnimation = null;
            return;
        }


        ctx.clearRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );

        ctx.globalAlpha = 0.65;


        for (
            let i = 0;
            i < particles.length;
            i++
        ) {

            const p =
                particles[i];


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

        }


        particleAnimation =
            requestAnimationFrame(
                animateParticles
            );

    }


    resizeCanvas();

    animateParticles();


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
                    200
                );

        },
        { passive: true }
    );


    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.hidden) {

                particlesRunning =
                    false;

                if (particleAnimation) {

                    cancelAnimationFrame(
                        particleAnimation
                    );

                    particleAnimation =
                        null;
                }

            } else {

                particlesRunning =
                    true;

                if (!particleAnimation) {
                    animateParticles();
                }

            }

        }
    );

}


/* =================================
   START EXPERIENCE
================================= */

function startExperience() {

    const technology =
        document.getElementById(
            "technology"
        );

    if (technology) {

        technology.scrollIntoView({
            behavior:
                prefersReducedMotion
                    ? "auto"
                    : "smooth"
        });

    }

}


/* =================================
   TYPING EFFECT
================================= */

const typing =
    document.getElementById("typing");

const typingText =
    "WE CODE • WE BUILD • WE GROW";


if (
    typing &&
    !prefersReducedMotion
) {

    let typingIndex = 0;

    function typeText() {

        if (
            typingIndex <
            typingText.length
        ) {

            typing.textContent +=
                typingText.charAt(
                    typingIndex
                );

            typingIndex++;

            setTimeout(
                typeText,
                70
            );

        }

    }

    typeText();

} else if (typing) {

    typing.textContent =
        typingText;

}


/* =================================
   MOUSE GLOW
================================= */

const glow =
    document.querySelector(
        ".hero-glow"
    );


/*
   Desktop only.
   Mobile/touch devices don't
   need mouse glow.
*/

if (
    glow &&
    !isMobile &&
    !isTouchDevice &&
    !prefersReducedMotion
) {

    let glowX = 0;
    let glowY = 0;

    let glowTargetX = 0;
    let glowTargetY = 0;

    let glowFrame = null;


    document.addEventListener(
        "mousemove",
        (e) => {

            glowTargetX =
                e.clientX - 250;

            glowTargetY =
                e.clientY - 250;


            if (!glowFrame) {

                glowFrame =
                    requestAnimationFrame(
                        updateGlow
                    );

            }

        },
        {
            passive: true
        }
    );


    function updateGlow() {

        glowX +=
            (glowTargetX - glowX) *
            0.15;

        glowY +=
            (glowTargetY - glowY) *
            0.15;


        glow.style.transform =
            `translate3d(
                ${glowX}px,
                ${glowY}px,
                0
            )`;


        glowFrame = null;

    }

}


/* =================================
   TRICOLOR FIREWORK
================================= */

function celebrate() {

    const colors = [
        "#ff9933",
        "#ffffff",
        "#138808"
    ];


    const count =
        isMobile
            ? 35
            : 70;


    const fragment =
        document.createDocumentFragment();


    const centerX =
        window.innerWidth / 2;

    const centerY =
        window.innerHeight / 2;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const particle =
            document.createElement(
                "div"
            );

        particle.className =
            "firework";


        particle.style.left =
            centerX + "px";

        particle.style.top =
            centerY + "px";


        const angle =
            Math.random() *
            Math.PI * 2;

        const distance =
            Math.random() *
            (isMobile ? 220 : 300) +
            70;


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


        fragment.appendChild(
            particle
        );

    }


    document.body.appendChild(
        fragment
    );


    setTimeout(
        () => {

            document
                .querySelectorAll(
                    ".firework"
                )
                .forEach(
                    particle =>
                        particle.remove()
                );

        },
        1100
    );


    startExperience();

}


/* =================================
   MISSION SYSTEM
================================= */

const missions =
    document.querySelectorAll(
        ".mission-card"
    );

const progressFill =
    document.getElementById(
        "progressFill"
    );

const progressText =
    document.getElementById(
        "progressText"
    );

const finalReveal =
    document.getElementById(
        "finalReveal"
    );

let completedMissions = 0;


missions.forEach(
    card => {

        const button =
            card.querySelector(
                ".mission-btn"
            );


        if (!button) {
            return;
        }


        button.addEventListener(
            "click",
            () => {

                if (
                    card.classList.contains(
                        "completed"
                    )
                ) {
                    return;
                }


                card.classList.add(
                    "completed"
                );

                button.textContent =
                    "✓ COMPLETED";


                completedMissions++;


                const percentage =
                    (
                        completedMissions /
                        missions.length
                    ) * 100;


                if (progressFill) {

                    progressFill.style.width =
                        percentage + "%";

                }


                if (progressText) {

                    progressText.textContent =
                        completedMissions +
                        " / " +
                        missions.length;

                }


                missionBurst(card);


                if (
                    completedMissions ===
                    missions.length
                ) {

                    setTimeout(
                        () => {

                            if (
                                finalReveal
                            ) {

                                finalReveal.classList.add(
                                    "active"
                                );

                            }

                            bigCelebration();

                        },
                        1000
                    );

                }

            }
        );

    }
);


/* =================================
   MISSION PARTICLES
================================= */

function missionBurst(card) {

    if (
        prefersReducedMotion
    ) {
        return;
    }


    const rect =
        card.getBoundingClientRect();


    const colors = [
        "#ff9933",
        "#ffffff",
        "#138808"
    ];


    const count =
        isMobile
            ? 10
            : 20;


    const fragment =
        document.createDocumentFragment();


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const particle =
            document.createElement(
                "div"
            );

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
            Math.random() *
            (isMobile ? 80 : 120) +
            30;


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


        fragment.appendChild(
            particle
        );

    }


    document.body.appendChild(
        fragment
    );


    setTimeout(
        () => {

            document
                .querySelectorAll(
                    ".firework"
                )
                .forEach(
                    particle =>
                        particle.remove()
                );

        },
        1000
    );

}


/* =================================
   FINAL CELEBRATION
================================= */

function bigCelebration() {

    if (
        prefersReducedMotion
    ) {
        return;
    }


    const colors = [
        "#ff9933",
        "#ffffff",
        "#138808"
    ];


    const particleCount =
        isMobile
            ? 30
            : 80;


    const fragment =
        document.createDocumentFragment();


    const centerX =
        window.innerWidth / 2;

    const centerY =
        window.innerHeight / 2;


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const particle =
            document.createElement(
                "div"
            );

        particle.className =
            "firework";


        particle.style.left =
            centerX + "px";

        particle.style.top =
            centerY + "px";


        const angle =
            Math.random() *
            Math.PI * 2;

        const distance =
            Math.random() *
            (isMobile ? 300 : 500) +
            80;


        particle.style.setProperty(
            "--x",
            `${Math.cos(angle) * distance}px`
        );

        particle.style.setProperty(
            "--y",
            `${Math.sin(angle) * distance}px`
        );


        particle.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        fragment.appendChild(
            particle
        );

    }


    document.body.appendChild(
        fragment
    );


    setTimeout(
        () => {

            document
                .querySelectorAll(
                    ".firework"
                )
                .forEach(
                    particle =>
                        particle.remove()
                );

        },
        1300
    );

}


/* =================================
   CLOSE REVEAL
================================= */

function closeReveal() {

    if (finalReveal) {

        finalReveal.classList.remove(
            "active"
        );

    }

}


/* =================================
   3D FLAG MOUSE EFFECT
================================= */

const flag =
    document.querySelector(
        ".flag"
    );

const flagWrapper =
    document.querySelector(
        ".flag-wrapper"
    );


if (
    flag &&
    flagWrapper &&
    !isMobile &&
    !isTouchDevice &&
    !prefersReducedMotion
) {

    let flagFrame = null;

    let flagTargetX = 0;
    let flagTargetY = 0;


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


            flagTargetY =
                (x - centerX) / 20;

            flagTargetX =
                (centerY - y) / 20;


            if (!flagFrame) {

                flagFrame =
                    requestAnimationFrame(
                        () => {

                            flag.style.animation =
                                "none";

                            flag.style.transform =
                                `rotateX(${flagTargetX}deg)
                                 rotateY(${flagTargetY}deg)
                                 scale(1.03)`;

                            flagFrame = null;

                        }
                    );

            }

        },
        {
            passive: true
        }
    );


    flagWrapper.addEventListener(
        "mouseleave",
        () => {

            flag.style.animation =
                "flagFloat 4s ease-in-out infinite";

            flag.style.transform =
                "";

        }
    );

}


/* =================================
   CINEMATIC SCROLL REVEAL
================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );


if (
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold:
                    isMobile
                        ? 0.08
                        : 0.15
            }
        );


    revealElements.forEach(
        element =>
            revealObserver.observe(
                element
            )
    );

}


/* =================================
   TIMELINE ANIMATION
================================= */

const timeline =
    document.querySelector(
        ".timeline"
    );


if (
    timeline &&
    "IntersectionObserver" in window
) {

    const timelineObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            timeline.classList.add(
                                "show"
                            );

                            timelineObserver.unobserve(
                                timeline
                            );

                        }

                    }
                );

            },
            {
                threshold:
                    isMobile
                        ? 0.15
                        : 0.3
            }
        );


    timelineObserver.observe(
        timeline
    );

}


/* =================================
   INDIA 2047 EFFECT
================================= */

const futureSection =
    document.querySelector(
        ".future-section"
    );

const futureYear =
    document.querySelector(
        ".future-year"
    );


if (
    futureSection &&
    futureYear &&
    !isMobile &&
    !isTouchDevice &&
    !prefersReducedMotion
) {

    let futureFrame = null;


    function updateFutureYear() {

        const rect =
            futureSection.getBoundingClientRect();

        const progress =
            Math.min(
                Math.max(
                    1 -
                    rect.top /
                    window.innerHeight,
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


        futureFrame = null;

    }


    window.addEventListener(
        "scroll",
        () => {

            if (!futureFrame) {

                futureFrame =
                    requestAnimationFrame(
                        updateFutureYear
                    );

            }

        },
        {
            passive: true
        }
    );

}


/* =================================
   INTERACTIVE INDIA MAP
================================= */

const indiaMap =
    document.getElementById(
        "indiaMap"
    );

const mapContainer =
    document.querySelector(
        ".india-map-container"
    );


if (
    indiaMap &&
    mapContainer &&
    !isMobile &&
    !isTouchDevice &&
    !prefersReducedMotion
) {

    let mapFrame = null;

    let mapX = 0;
    let mapY = 0;


    mapContainer.addEventListener(
        "mousemove",
        (e) => {

            const rect =
                mapContainer.getBoundingClientRect();


            mapX =
                e.clientX -
                rect.left;

            mapY =
                e.clientY -
                rect.top;


            if (!mapFrame) {

                mapFrame =
                    requestAnimationFrame(
                        () => {

                            const centerX =
                                rect.width / 2;

                            const centerY =
                                rect.height / 2;


                            const rotateX =
                                (centerY - mapY) /
                                25;

                            const rotateY =
                                (mapX - centerX) /
                                25;


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


                            mapFrame = null;

                        }
                    );

            }

        },
        {
            passive: true
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


nodes.forEach(
    node => {

        const updateInfo =
            () => {

                if (infoTitle) {

                    infoTitle.textContent =
                        node.dataset.title ||
                        "";

                }

                if (infoText) {

                    infoText.textContent =
                        node.dataset.text ||
                        "";

                }

            };


        node.addEventListener(
            "mouseenter",
            updateInfo
        );


        node.addEventListener(
            "click",
            () => {

                updateInfo();


                if (
                    prefersReducedMotion
                ) {
                    return;
                }


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
                        duration:
                            isMobile
                                ? 300
                                : 500,

                        easing:
                            "ease-out"
                    }
                );

            }
        );

    }
);


/* =================================
   CINEMATIC LOADING SYSTEM
================================= */

const loader =
    document.getElementById(
        "loader"
    );

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


if (
    loader &&
    loaderProgress &&
    loaderPercent &&
    loaderStatus &&
    enterIndia
) {

    /*
       Slightly faster on mobile.
       The loader still feels cinematic.
    */

    const loadingStep =
        isMobile
            ? 50
            : 35;


    const loadingTimer =
        setInterval(
            () => {

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


                if (
                    loadingValue >= 100
                ) {

                    clearInterval(
                        loadingTimer
                    );


                    loaderStatus.textContent =
                        "SYSTEM READY";


                    enterIndia.classList.add(
                        "ready"
                    );

                }

            },
            loadingStep
        );


    /* =================================
       ENTER INDIA
    ================================= */

    enterIndia.addEventListener(
        "click",
        async () => {

            if (bgMusic) {

                bgMusic.volume =
                    0.35;


                try {

                    await bgMusic.play();

                } catch (error) {

                    console.log(
                        "Audio could not start."
                    );

                }

            }


            loader.classList.add(
                "hide"
            );


            if (
                typeof bigCelebration ===
                "function"
            ) {

                setTimeout(
                    () => {

                        bigCelebration();

                    },
                    isMobile
                        ? 400
                        : 700
                );

            }

        }
    );

}


/* =================================
   CUSTOM CURSOR
   DESKTOP ONLY
================================= */

const cursorDot =
    document.querySelector(
        ".cursor-dot"
    );

const cursorRing =
    document.querySelector(
        ".cursor-ring"
    );


let mouseX = 0;
let mouseY = 0;

let cursorX = 0;
let cursorY = 0;

let cursorAnimation = null;


if (
    cursorDot &&
    cursorRing &&
    !isMobile &&
    !isTouchDevice &&
    !prefersReducedMotion
) {

    function updateCursor() {

        cursorX +=
            (mouseX - cursorX) *
            0.18;

        cursorY +=
            (mouseY - cursorY) *
            0.18;


        cursorDot.style.transform =
            `translate3d(
                ${mouseX}px,
                ${mouseY}px,
                0
            )`;


        cursorRing.style.transform =
            `translate3d(
                ${cursorX}px,
                ${cursorY}px,
                0
            )`;


        cursorAnimation =
            requestAnimationFrame(
                updateCursor
            );

    }


    document.addEventListener(
        "mousemove",
        (e) => {

            mouseX =
                e.clientX;

            mouseY =
                e.clientY;

        },
        {
            passive: true
        }
    );


    updateCursor();


    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {

                if (
                    cursorAnimation
                ) {

                    cancelAnimationFrame(
                        cursorAnimation
                    );

                    cursorAnimation =
                        null;

                }

            } else if (
                !cursorAnimation
            ) {

                updateCursor();

            }

        }
    );


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

}


/* =================================
   15 AUGUST COUNTDOWN
================================= */

const targetDate =
    new Date(
        "August 15, 2026 00:00:00"
    ).getTime();


const daysElement =
    document.getElementById(
        "days"
    );

const hoursElement =
    document.getElementById(
        "hours"
    );

const minutesElement =
    document.getElementById(
        "minutes"
    );

const secondsElement =
    document.getElementById(
        "seconds"
    );


let countdownFinished = false;


function updateCountdown() {

    const difference =
        targetDate -
        Date.now();


    if (
        difference <= 0
    ) {

        if (
            countdownFinished
        ) {
            return;
        }


        countdownFinished =
            true;


        const countdown =
            document.querySelector(
                ".countdown"
            );


        if (countdown) {

            countdown.innerHTML = `
                <div class="celebration-countdown">
                    <span>🇮🇳</span>
                    <strong>
                        HAPPY INDEPENDENCE DAY
                    </strong>
                    <small>
                        15 AUGUST 2026
                    </small>
                </div>
            `;

        }

        return;

    }


    const days =
        Math.floor(
            difference /
            86400000
        );


    const hours =
        Math.floor(
            (difference %
                86400000) /
            3600000
        );


    const minutes =
        Math.floor(
            (difference %
                3600000) /
            60000
        );


    const seconds =
        Math.floor(
            (difference %
                60000) /
            1000
        );


    if (daysElement) {

        daysElement.textContent =
            String(days).padStart(
                2,
                "0"
            );

    }


    if (hoursElement) {

        hoursElement.textContent =
            String(hours).padStart(
                2,
                "0"
            );

    }


    if (minutesElement) {

        minutesElement.textContent =
            String(minutes).padStart(
                2,
                "0"
            );

    }


    if (secondsElement) {

        secondsElement.textContent =
            String(seconds).padStart(
                2,
                "0"
            );

    }

}


updateCountdown();


const countdownTimer =
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


if (
    soundToggle &&
    bgMusic
) {

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

            if (
                bgMusic.paused
            ) {

                try {

                    await bgMusic.play();


                    soundToggle.textContent =
                        "🔊 SOUND ON";


                    soundToggle.classList.add(
                        "active"
                    );


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


/* =================================
   PAGE VISIBILITY
================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            /*
               Don't keep unnecessary
               visual work running.
            */

            if (
                cursorAnimation
            ) {

                cancelAnimationFrame(
                    cursorAnimation
                );

                cursorAnimation =
                    null;

            }

        }

    }
);