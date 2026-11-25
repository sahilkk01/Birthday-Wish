
/* ======================================
   1. GET HTML ELEMENTS
====================================== */

const heart = document.getElementById("heart");

const heartContainer =
    document.getElementById("heart-container");

const starsContainer =
    document.getElementById("stars-container");

const openLetter =
    document.getElementById("openLetter");

const closeLetter =
    document.getElementById("closeLetter");

const letterOverlay =
    document.getElementById("letterOverlay");

const musicButton =
    document.getElementById("musicButton");

const musicStatus =
    document.getElementById("musicStatus");

const birthdayMusic =
    document.getElementById("birthdayMusic");


/* ======================================
   2. HEART EXPLOSION
====================================== */

heart.addEventListener("click", function () {

    const rect = heart.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 60; i++) {

        const smallHeart =
            document.createElement("div");

        smallHeart.classList.add("small-heart");

        smallHeart.innerHTML =
            Math.random() > 0.5 ? "❤️" : "💖";

        const angle = Math.random() * Math.PI * 2;

        const distance =
            Math.random() * 350 + 100;

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        smallHeart.style.setProperty(
            "--x", x + "px"
        );

        smallHeart.style.setProperty(
            "--y", y + "px"
        );

        smallHeart.style.left = centerX + "px";
        smallHeart.style.top = centerY + "px";

        heartContainer.appendChild(smallHeart);

        setTimeout(() => {
            smallHeart.remove();
        }, 2600);

    }

    // Fireworks when heart is clicked
    launchFireworks(5);

});


/* ======================================
   3. FALLING STARS
====================================== */

function createStar() {

    const star = document.createElement("div");

    star.classList.add("star");

    const symbols = ["✦", "✧", "⋆", "★"];

    star.innerHTML =
        symbols[Math.floor(Math.random() * symbols.length)];

    star.style.left = Math.random() * 100 + "vw";

    star.style.fontSize =
        Math.random() * 15 + 8 + "px";

    const duration = Math.random() * 4 + 3;

    star.style.animationDuration = duration + "s";

    starsContainer.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, duration * 1000);

}

setInterval(createStar, 150);

for (let i = 0; i < 20; i++) {
    setTimeout(createStar, i * 100);
}


/* ======================================
   4. BIRTHDAY LETTER
====================================== */

openLetter.addEventListener("click", function () {

    letterOverlay.classList.add("active");

});

closeLetter.addEventListener("click", function () {

    letterOverlay.classList.remove("active");

});

letterOverlay.addEventListener("click", function (event) {

    if (event.target === letterOverlay) {
        letterOverlay.classList.remove("active");
    }

});

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        letterOverlay.classList.remove("active");
    }

});


/* ======================================
   5. BACKGROUND MUSIC
====================================== */

musicButton.addEventListener("click", async function () {

    if (birthdayMusic.paused) {

        try {

            await birthdayMusic.play();

            musicButton.innerHTML = "❚❚";

            musicStatus.innerHTML =
                "Music is playing ❤️";

        } catch (error) {

            musicStatus.innerHTML =
                "Please add birthday.mp3 to your folder";

            console.error(error);

        }

    } else {

        birthdayMusic.pause();

        musicButton.innerHTML = "▶";

        musicStatus.innerHTML =
            "Music paused";

    }

});


/* ======================================
   6. FIREWORKS SETUP
====================================== */

const canvas = document.getElementById("fireworks");

const ctx = canvas.getContext("2d");

let particles = [];

const colors = [
    "#ff3366",
    "#ffcc00",
    "#00ffff",
    "#ff66cc",
    "#ffffff",
    "#a855f7",
    "#ff8800"
];


/* ======================================
   7. RESIZE CANVAS
====================================== */

function resizeCanvas() {

    const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
    );

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    canvas.style.width =
        window.innerWidth + "px";

    canvas.style.height =
        window.innerHeight + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


/* ======================================
   8. CREATE FIREWORKS
====================================== */

function createFirework(x, y) {

    const color =
        colors[Math.floor(Math.random() * colors.length)];

    const particleCount = 55;

    for (let i = 0; i < particleCount; i++) {

        const angle =
            (Math.PI * 2 * i) / particleCount;

        const speed = Math.random() * 4 + 1;

        particles.push({

            x: x,
            y: y,

            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,

            alpha: 1,

            color: color,

            size: Math.random() * 3 + 1

        });

    }

}


/* ======================================
   9. LAUNCH FIREWORKS
====================================== */

function launchFireworks(count = 3) {

    for (let i = 0; i < count; i++) {

        setTimeout(() => {

            const x =
                Math.random() * window.innerWidth;

            const y =
                Math.random() * window.innerHeight * 0.65;

            createFirework(x, y);

        }, i * 250);

    }

}


/* ======================================
   10. FIREWORKS ANIMATION
====================================== */

function animateFireworks() {

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    for (let i = particles.length - 1; i >= 0; i--) {

        const particle = particles[i];

        particle.x += particle.vx;
        particle.y += particle.vy;

        particle.vy += 0.025;

        particle.vx *= 0.99;
        particle.vy *= 0.99;

        particle.alpha -= 0.012;

        ctx.globalAlpha = Math.max(
            0,
            particle.alpha
        );

        ctx.fillStyle = particle.color;

        ctx.shadowBlur = 15;
        ctx.shadowColor = particle.color;

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

        if (particle.alpha <= 0) {
            particles.splice(i, 1);
        }

    }

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;

    requestAnimationFrame(animateFireworks);

}

animateFireworks();


/* ======================================
   11. INITIAL FIREWORKS
====================================== */

setTimeout(() => {

    launchFireworks(3);

}, 1200);
