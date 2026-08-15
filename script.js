/* =========================================================
   INDIA 80 YEARS — OPTIMIZED SCRIPT
   Performance-focused version
========================================================= */

(() => {
    "use strict";

    /* =====================================================
       PERFORMANCE CONFIG
    ===================================================== */

    const mobileQuery = window.matchMedia("(max-width: 600px)");
    const touchQuery = window.matchMedia("(pointer: coarse)");
    const reducedMotionQuery =
        window.matchMedia("(prefers-reduced-motion: reduce)");

    const isMobile = mobileQuery.matches;
    const isTouchDevice = touchQuery.matches;
    const prefersReducedMotion = reducedMotionQuery.matches;

    const canAnimate =
        !prefersReducedMotion &&
        !document.hidden;

    const desktopEffects =
        !isMobile &&
        !isTouchDevice &&
        !prefersReducedMotion;


    /* =====================================================
       SMALL UTILITIES
    ===================================================== */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        Array.from(parent.querySelectorAll(selector));


    function rafThrottle(callback) {

        let frame = null;

        return (...args) => {

            if (frame !== null) {
                return;
            }

            frame = requestAnimationFrame(() => {

                frame = null;

                callback(...args);

            });

        };

    }


    /* =====================================================
       PARTICLE BACKGROUND
    ===================================================== */

    const canvas = $("#particles");

    let particleAnimation = null;
    let particlesRunning = !document.hidden;

    if (
        canvas &&
        !prefersReducedMotion
    ) {

        const ctx = canvas.getContext("2d", {
            alpha: true
        });

        let particles = [];
        let canvasWidth = window.innerWidth;
        let canvasHeight = window.innerHeight;
        let resizeTimer = null;


        const particleColors = [
            "#ff9933",
            "#ffffff",
            "#138808"
        ];


        function getParticleCount() {

            if (isMobile || isTouchDevice) {
                return 18;
            }

            if (window.innerWidth <= 1000) {
                return 40;
            }

            return 65;
        }


        function createParticles() {

            const count = getParticleCount();

            particles = new Array(count);

            for (let i = 0; i < count; i++) {

                particles[i] = {

                    x: Math.random() * canvasWidth,

                    y: Math.random() * canvasHeight,

                    size: Math.random() * 1.3 + 0.5,

                    speedX:
                        (Math.random() - 0.5) * 0.25,

                    speedY:
                        (Math.random() - 0.5) * 0.25,

                    color:
                        particleColors[
                            Math.floor(
                                Math.random() *
                                particleColors.length
                            )
                        ]

                };

            }

        }


        function resizeCanvas() {

            canvasWidth = window.innerWidth;
            canvasHeight = window.innerHeight;

            const dpr =
                isMobile
                    ? 1
                    : Math.min(
                        window.devicePixelRatio || 1,
                        1.25
                    );

            canvas.width =
                Math.floor(canvasWidth * dpr);

            canvas.height =
                Math.floor(canvasHeight * dpr);

            canvas.style.width =
                `${canvasWidth}px`;

            canvas.style.height =
                `${canvasHeight}px`;

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
                canvasWidth,
                canvasHeight
            );


            ctx.globalAlpha = 0.55;


            for (let i = 0; i < particles.length; i++) {

                const p = particles[i];


                ctx.beginPath();

                ctx.arc(
                    p.x,
                    p.y,
                    p.size,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle = p.color;

                ctx.fill();


                p.x += p.speedX;
                p.y += p.speedY;


                if (p.x < 0) {
                    p.x = canvasWidth;
                } else if (p.x > canvasWidth) {
                    p.x = 0;
                }


                if (p.y < 0) {
                    p.y = canvasHeight;
                } else if (p.y > canvasHeight) {
                    p.y = 0;
                }

            }


            particleAnimation =
                requestAnimationFrame(
                    animateParticles
                );

        }


        resizeCanvas();


        if (!document.hidden) {
            animateParticles();
        }


        window.addEventListener(
            "resize",
            () => {

                clearTimeout(resizeTimer);

                resizeTimer = setTimeout(
                    resizeCanvas,
                    180
                );

            },
            {
                passive: true
            }
        );


        document.addEventListener(
            "visibilitychange",
            () => {

                if (document.hidden) {

                    particlesRunning = false;

                    if (particleAnimation !== null) {

                        cancelAnimationFrame(
                            particleAnimation
                        );

                        particleAnimation = null;

                    }

                } else {

                    particlesRunning = true;

                    if (!particleAnimation) {
                        animateParticles();
                    }

                }

            }
        );

    }


    /* =====================================================
       START EXPERIENCE
    ===================================================== */

    window.startExperience = function startExperience() {

        const technology = $("#technology");

        if (!technology) {
            return;
        }


        technology.scrollIntoView({

            behavior:
                prefersReducedMotion
                    ? "auto"
                    : "smooth"

        });

    };


    /* =====================================================
       TYPING EFFECT
    ===================================================== */

    const typing = $("#typing");

    const typingText =
        "WE CODE • WE BUILD • WE GROW";


    if (typing) {

        if (prefersReducedMotion) {

            typing.textContent =
                typingText;

        } else {

            let typingIndex = 0;

            function typeText() {

                if (
                    typingIndex >=
                    typingText.length
                ) {
                    return;
                }


                typing.textContent +=
                    typingText.charAt(
                        typingIndex
                    );

                typingIndex++;


                setTimeout(
                    typeText,
                    55
                );

            }

            typeText();

        }

    }


    /* =====================================================
       MOUSE GLOW
       DESKTOP ONLY
    ===================================================== */

    const glow = $(".hero-glow");

    if (desktopEffects && glow) {

        let glowX = 0;
        let glowY = 0;

        let glowTargetX = 0;
        let glowTargetY = 0;

        let glowFrame = null;


        function updateGlow() {

            glowX +=
                (glowTargetX - glowX) * 0.12;

            glowY +=
                (glowTargetY - glowY) * 0.12;


            glow.style.transform =
                `translate3d(${glowX}px, ${glowY}px, 0)`;


            glowFrame = null;

        }


        document.addEventListener(
            "mousemove",
            (event) => {

                glowTargetX =
                    event.clientX - 250;

                glowTargetY =
                    event.clientY - 250;


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

    }


    /* =====================================================
       FIREWORK ENGINE
    ===================================================== */

    const fireworks = new Set();

    const fireworkColors = [
        "#ff9933",
        "#ffffff",
        "#138808"
    ];


    function removeFireworkSet() {

        fireworks.forEach(
            particle => particle.remove()
        );

        fireworks.clear();

    }


    function createFireworks(
        x,
        y,
        count,
        distanceMin,
        distanceMax,
        duration = 1100
    ) {

        if (prefersReducedMotion) {
            return;
        }


        const fragment =
            document.createDocumentFragment();


        const created = [];


        for (let i = 0; i < count; i++) {

            const particle =
                document.createElement("div");


            particle.className =
                "firework";


            particle.style.left =
                `${x}px`;

            particle.style.top =
                `${y}px`;


            const angle =
                Math.random() *
                Math.PI * 2;


            const distance =
                Math.random() *
                (distanceMax - distanceMin) +
                distanceMin;


            particle.style.setProperty(
                "--x",
                `${Math.cos(angle) * distance}px`
            );


            particle.style.setProperty(
                "--y",
                `${Math.sin(angle) * distance}px`
            );


            particle.style.background =
                fireworkColors[
                    Math.floor(
                        Math.random() *
                        fireworkColors.length
                    )
                ];


            fragment.appendChild(particle);

            created.push(particle);

            fireworks.add(particle);

        }


        document.body.appendChild(fragment);


        setTimeout(
            () => {

                for (let i = 0; i < created.length; i++) {

                    const particle =
                        created[i];

                    fireworks.delete(
                        particle
                    );

                    particle.remove();

                }

            },
            duration
        );

    }


    /* =====================================================
       TRICOLOR FIREWORK
    ===================================================== */

    window.celebrate = function celebrate() {

        const count =
            isMobile
                ? 25
                : 50;


        createFireworks(
            window.innerWidth / 2,
            window.innerHeight / 2,
            count,
            60,
            isMobile ? 200 : 280,
            1100
        );


        window.startExperience();

    };


    /* =====================================================
       MISSION SYSTEM
    ===================================================== */

    const missions =
        $$(".mission-card");


    const progressFill =
        $("#progressFill");


    const progressText =
        $("#progressText");


    const finalReveal =
        $("#finalReveal");


    let completedMissions = 0;


    function updateMissionProgress() {

        if (!missions.length) {
            return;
        }


        const percentage =
            (completedMissions /
                missions.length) *
            100;


        if (progressFill) {

            progressFill.style.width =
                `${percentage}%`;

        }


        if (progressText) {

            progressText.textContent =
                `${completedMissions} / ${missions.length}`;

        }

    }


    function missionBurst(card) {

        if (prefersReducedMotion) {
            return;
        }


        const rect =
            card.getBoundingClientRect();


        const count =
            isMobile
                ? 7
                : 14;


        createFireworks(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
            count,
            25,
            isMobile ? 70 : 110,
            900
        );

    }


    missions.forEach(
        card => {

            const button =
                $(".mission-btn", card);


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


                    button.setAttribute(
                        "aria-pressed",
                        "true"
                    );


                    completedMissions++;


                    updateMissionProgress();

                    missionBurst(card);


                    if (
                        completedMissions ===
                        missions.length
                    ) {

                        setTimeout(
                            () => {

                                if (finalReveal) {

                                    finalReveal.classList.add(
                                        "active"
                                    );

                                }

                                bigCelebration();

                            },
                            650
                        );

                    }

                }
            );

        }
    );


    /* =====================================================
       FINAL CELEBRATION
    ===================================================== */

    function bigCelebration() {

        if (prefersReducedMotion) {
            return;
        }


        const count =
            isMobile
                ? 22
                : 55;


        createFireworks(
            window.innerWidth / 2,
            window.innerHeight / 2,
            count,
            80,
            isMobile ? 280 : 430,
            1250
        );

    }


    window.bigCelebration =
        bigCelebration;


    /* =====================================================
       CLOSE REVEAL
    ===================================================== */

    window.closeReveal =
        function closeReveal() {

            if (finalReveal) {

                finalReveal.classList.remove(
                    "active"
                );

            }

        };


    /* =====================================================
       3D FLAG EFFECT
       DESKTOP ONLY
    ===================================================== */

    const flag = $(".flag");

    const flagWrapper =
        $(".flag-wrapper");


    if (
        desktopEffects &&
        flag &&
        flagWrapper
    ) {

        let flagFrame = null;

        let flagTargetX = 0;
        let flagTargetY = 0;


        flagWrapper.addEventListener(
            "mousemove",
            event => {

                const rect =
                    flagWrapper.getBoundingClientRect();


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                flagTargetY =
                    (event.clientX -
                        rect.left -
                        centerX) /
                    20;


                flagTargetX =
                    (centerY -
                        (event.clientY -
                            rect.top)) /
                    20;


                if (flagFrame) {
                    return;
                }


                flagFrame =
                    requestAnimationFrame(
                        () => {

                            flag.style.animation =
                                "none";


                            flag.style.transform =
                                `rotateX(${flagTargetX}deg) rotateY(${flagTargetY}deg) scale(1.03)`;


                            flagFrame = null;

                        }
                    );

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

                flag.style.transform = "";

            }
        );

    }


    /* =====================================================
       CINEMATIC SCROLL REVEAL
    ===================================================== */

    const revealElements =
        $$(".reveal, .reveal-left, .reveal-right");


    if (
        revealElements.length &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            entry.target.classList.add(
                                "show"
                            );


                            revealObserver.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold:
                        isMobile
                            ? 0.05
                            : 0.12,

                    rootMargin:
                        "0px 0px -30px 0px"

                }
            );


        revealElements.forEach(
            element =>
                revealObserver.observe(
                    element
                )
        );

    }


    /* =====================================================
       TIMELINE ANIMATION
    ===================================================== */

    const timeline =
        $(".timeline");


    if (
        timeline &&
        "IntersectionObserver" in window
    ) {

        const timelineObserver =
            new IntersectionObserver(
                entries => {

                    if (
                        entries[0] &&
                        entries[0].isIntersecting
                    ) {

                        timeline.classList.add(
                            "show"
                        );


                        timelineObserver.unobserve(
                            timeline
                        );

                    }

                },
                {
                    threshold:
                        isMobile
                            ? 0.1
                            : 0.25
                }
            );


        timelineObserver.observe(
            timeline
        );

    }


    /* =====================================================
       INDIA 2047 EFFECT
       DESKTOP ONLY
    ===================================================== */

    const futureSection =
        $(".future-section");


    const futureYear =
        $(".future-year");


    if (
        desktopEffects &&
        futureSection &&
        futureYear
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

                if (futureFrame) {
                    return;
                }


                futureFrame =
                    requestAnimationFrame(
                        updateFutureYear
                    );

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       INTERACTIVE INDIA MAP
       DESKTOP ONLY
    ===================================================== */

    const indiaMap =
        $("#indiaMap");


    const mapContainer =
        $(".india-map-container");


    if (
        desktopEffects &&
        indiaMap &&
        mapContainer
    ) {

        let mapFrame = null;

        let mapX = 0;
        let mapY = 0;


        mapContainer.addEventListener(
            "mousemove",
            event => {

                const rect =
                    mapContainer.getBoundingClientRect();


                mapX =
                    event.clientX -
                    rect.left;


                mapY =
                    event.clientY -
                    rect.top;


                if (mapFrame) {
                    return;
                }


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
                                `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;


                            indiaMap.style.filter =
                                "brightness(0) invert(1) drop-shadow(0 0 20px #ff9933)";


                            mapFrame = null;

                        }
                    );

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
                    "brightness(0) invert(1) drop-shadow(0 0 10px #ff993344)";

            }
        );

    }


    /* =====================================================
       MAP INFORMATION
    ===================================================== */

    const nodes =
        $$(".tech-node");


    const infoTitle =
        $("#indiaInfoTitle");


    const infoText =
        $("#indiaInfoText");


    nodes.forEach(
        node => {

            function updateInfo() {

                if (infoTitle) {

                    infoTitle.textContent =
                        node.dataset.title || "";

                }


                if (infoText) {

                    infoText.textContent =
                        node.dataset.text || "";

                }

            }


            node.addEventListener(
                "mouseenter",
                updateInfo,
                {
                    passive: true
                }
            );


            node.addEventListener(
                "click",
                () => {

                    updateInfo();


                    if (prefersReducedMotion) {
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
                                    "scale(1.6)"
                            },
                            {
                                transform:
                                    "scale(1)"
                            }
                        ],
                        {
                            duration:
                                isMobile
                                    ? 250
                                    : 400,

                            easing:
                                "ease-out",

                            fill:
                                "none"
                        }
                    );

                }
            );

        }
    );


    /* =====================================================
       CINEMATIC LOADING SYSTEM
    ===================================================== */

    const loader =
        $("#loader");


    const loaderProgress =
        $("#loaderProgress");


    const loaderPercent =
        $("#loaderPercent");


    const loaderStatus =
        $("#loaderStatus");


    const enterIndia =
        $("#enterIndia");


    const bgMusic =
        $("#bgMusic");


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

        let loadingTimer = null;


        /*
           Faster loader.
           This also reduces time spent
           blocking the initial experience.
        */

        const loadingStep =
            isMobile
                ? 25
                : 22;


        loadingTimer =
            setInterval(
                () => {

                    loadingValue += 1;


                    loaderProgress.style.width =
                        `${loadingValue}%`;


                    loaderPercent.textContent =
                        loadingValue;


                    if (
                        loadingValue % 20 === 0
                    ) {

                        const messageIndex =
                            Math.min(
                                Math.floor(
                                    loadingValue / 20
                                ) - 1,
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


        /* ===============================================
           ENTER INDIA
        =============================================== */

        enterIndia.addEventListener(
            "click",
            async () => {

                if (bgMusic) {

                    bgMusic.volume = 0.35;


                    try {

                        await bgMusic.play();

                    } catch (error) {

                        /*
                           Browser autoplay restriction.
                           No action required.
                        */

                    }

                }


                loader.classList.add(
                    "hide"
                );


                setTimeout(
                    () => {

                        bigCelebration();

                    },
                    isMobile
                        ? 300
                        : 500
                );

            }
        );

    }


    /* =====================================================
       CUSTOM CURSOR
       DESKTOP ONLY
    ===================================================== */

    const cursorDot =
        $(".cursor-dot");


    const cursorRing =
        $(".cursor-ring");


    if (
        desktopEffects &&
        cursorDot &&
        cursorRing
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let cursorX = 0;
        let cursorY = 0;

        let cursorAnimation = null;


        function updateCursor() {

            cursorX +=
                (mouseX - cursorX) *
                0.22;


            cursorY +=
                (mouseY - cursorY) *
                0.22;


            cursorDot.style.transform =
                `translate3d(${mouseX}px, ${mouseY}px, 0)`;


            cursorRing.style.transform =
                `translate3d(${cursorX}px, ${cursorY}px, 0)`;


            cursorAnimation =
                requestAnimationFrame(
                    updateCursor
                );

        }


        document.addEventListener(
            "mousemove",
            event => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;

            },
            {
                passive: true
            }
        );


        updateCursor();


        document.addEventListener(
            "visibilitychange",
            () => {

                if (document.hidden) {

                    if (cursorAnimation) {

                        cancelAnimationFrame(
                            cursorAnimation
                        );

                        cursorAnimation = null;

                    }

                } else if (!cursorAnimation) {

                    updateCursor();

                }

            }
        );


        /*
           Event delegation instead of adding
           listeners to every interactive element.
        */

        document.addEventListener(
            "mouseover",
            event => {

                const target =
                    event.target.closest(
                        "button, a, .card, .mission-card, .tech-node"
                    );


                if (target) {

                    cursorRing.classList.add(
                        "hover"
                    );

                }

            },
            {
                passive: true
            }
        );


        document.addEventListener(
            "mouseout",
            event => {

                const target =
                    event.target.closest(
                        "button, a, .card, .mission-card, .tech-node"
                    );


                if (target) {

                    cursorRing.classList.remove(
                        "hover"
                    );

                }

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       15 AUGUST COUNTDOWN
    ===================================================== */

    const targetDate =
        new Date(
            "August 15, 2026 00:00:00"
        ).getTime();


    const daysElement =
        $("#days");


    const hoursElement =
        $("#hours");


    const minutesElement =
        $("#minutes");


    const secondsElement =
        $("#seconds");


    let countdownFinished = false;


    function updateCountdown() {

        const difference =
            targetDate -
            Date.now();


        if (
            difference <= 0
        ) {

            if (countdownFinished) {
                return;
            }


            countdownFinished = true;


            const countdown =
                $(".countdown");


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
                86400000
            );


        const hours =
            Math.floor(
                (difference % 86400000) /
                3600000
            );


        const minutes =
            Math.floor(
                (difference % 3600000) /
                60000
            );


        const seconds =
            Math.floor(
                (difference % 60000) /
                1000
            );


        if (daysElement) {

            daysElement.textContent =
                String(days).padStart(2, "0");

        }


        if (hoursElement) {

            hoursElement.textContent =
                String(hours).padStart(2, "0");

        }


        if (minutesElement) {

            minutesElement.textContent =
                String(minutes).padStart(2, "0");

        }


        if (secondsElement) {

            secondsElement.textContent =
                String(seconds).padStart(2, "0");

        }

    }


    updateCountdown();


    const countdownTimer =
        setInterval(
            updateCountdown,
            1000
        );


    /*
       Stop countdown when page is closed/hidden
       for a long time is not necessary because
       one-second interval is extremely lightweight.
    */


    /* =====================================================
       SOUND TOGGLE
    ===================================================== */

    const soundToggle =
        $("#soundToggle");


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

                if (bgMusic.paused) {

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


    /* =====================================================
       GLOBAL VISIBILITY CLEANUP
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.hidden) {

                particlesRunning = false;

            } else {

                particlesRunning = true;

            }

        }
    );


    /* =====================================================
       INITIAL MISSION PROGRESS
    ===================================================== */

    updateMissionProgress();


    /* =====================================================
       CLEANUP
    ===================================================== */

    window.addEventListener(
        "pagehide",
        () => {

            if (particleAnimation) {

                cancelAnimationFrame(
                    particleAnimation
                );

                particleAnimation = null;

            }

            if (countdownTimer) {

                clearInterval(
                    countdownTimer
                );

            }

            removeFireworkSet();

        },
        {
            passive: true
        }
    );

})();