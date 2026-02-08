const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const questionBox = document.getElementById('question-box');
const successBox = document.getElementById('success-box');
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

// --- Particle Background ---
let particles = [];
let width, height;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.size = Math.random() * 5 + 2;
        this.color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 0.5)`;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
        particles[i].update();
        particles[i].draw();
    }
    
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    resize();
    initParticles();
});

resize();
initParticles();
animateParticles();

// --- Evading No Button ---
const phrases = [
    "Nope!",
    "Too slow!",
    "Can't catch me!",
    "Try again!",
    "Whoops!",
    "Almost!",
    "Nice try!",
];

noBtn.addEventListener('mouseover', () => {
    // Calculate new position within the glass container or screen? 
    // Staying within container is safer for layout, but screen is funnier.
    // Let's settle for "Screen safe area" so it doesn't go off-screen.
    
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 50);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 50);
    
    // Ensure it doesn't overlap excessively with the container center if possible
    // Simple implementation first:
    noBtn.style.position = 'fixed'; // Switch to fixed to move freely around screen
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    
    // Change text for extra flavor
    noBtn.innerText = phrases[Math.floor(Math.random() * phrases.length)];
});

// --- Success Logic ---
yesBtn.addEventListener('click', () => {
    // Hide question, show success
    questionBox.classList.add('hidden');
    successBox.classList.remove('hidden');
    
    // Trigger Confetti
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff6b6b', '#4ecdc4', '#ffe66d']
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff6b6b', '#4ecdc4', '#ffe66d']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
});
