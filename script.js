// Main JavaScript file for Valentine's Website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    createFloatingHearts();
    createFooterHearts();
    initScrollAnimations();
    initCountdown();
    initTypewriter();
    initSmoothScroll();
});

// ===== Floating Hearts Background =====
function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💘', '💝', '🌹'];
    const heartCount = 20;

    for (let i = 0; i < heartCount; i++) {
        createHeart(container, hearts);
    }

    // Continuously create new hearts
    setInterval(() => {
        if (container.children.length < 30) {
            createHeart(container, hearts);
        }
    }, 2000);
}

function createHeart(container, hearts) {
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
    heart.style.animationDelay = Math.random() * 5 + 's';
    heart.style.opacity = Math.random() * 0.5 + 0.3;
    
    container.appendChild(heart);

    // Remove heart after animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.remove();
        }
    }, 20000);
}

// ===== Footer Floating Hearts =====
function createFooterHearts() {
    const container = document.getElementById('footerHearts');
    const hearts = ['❤️', '💕', '💖', '💗'];
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('span');
        heart.className = 'footer-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 15 + 10) + 'px';
        heart.style.animationDuration = (Math.random() * 8 + 6) + 's';
        heart.style.animationDelay = Math.random() * 8 + 's';
        container.appendChild(heart);
    }
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe reason cards
    document.querySelectorAll('.reason-card').forEach((card, index) => {
        card.style.transitionDelay = (index * 0.1) + 's';
        observer.observe(card);
    });

    // Observe gallery items
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.transitionDelay = (index * 0.15) + 's';
        observer.observe(item);
    });
}

// ===== Valentine's Day Countdown =====
function initCountdown() {
    // Set Valentine's Day 2026
    const valentinesDay = new Date('july 7, 2025 00:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = valentinesDay - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        } else {
            // Valentine's Day is here!
            document.getElementById('days').textContent = '💕';
            document.getElementById('hours').textContent = '💖';
            document.getElementById('minutes').textContent = '💗';
            document.getElementById('seconds').textContent = '💓';
        }
    }

    updateCountdown(); 
    setInterval(updateCountdown, 1000);
}

// ===== Typewriter Effect for Love Letter =====
function initTypewriter() {
    const loveMessage = `From the moment I met you, my life changed forever. You brought color to my world when everything seemed gray. Your smile is my sunshine, your laugh is my favorite song, and your love is the greatest gift I've ever received.

Every day with you feels like a beautiful dream that I never want to wake up from. You make me want to be a better person, and I'm so grateful that you chose to share your life with me.

I promise to love you, cherish you, and stand by your side through all of life's adventures. You are my best friend, my soulmate, and my forever valentine.

I love you more than words could ever express, today and always. 💕`;

    const typewriterElement = document.getElementById('typewriter');
    let charIndex = 0;
    let isTyping = false;

    function typeWriter() {
        if (charIndex < loveMessage.length) {
            typewriterElement.textContent += loveMessage.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 90);
        }
    }

    // Start typewriter when letter section is visible
    const letterSection = document.getElementById('letter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isTyping) {
                isTyping = true;
                typeWriter();
            }
        });
    }, { threshold: 0.3 });

    observer.observe(letterSection);
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== Add sparkle effect on click =====
document.addEventListener('click', function(e) {
    createSparkle(e.clientX, e.clientY);
});

function createSparkle(x, y) {
    const sparkle = document.createElement('span');
    sparkle.textContent = '✨';
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 20px;
        pointer-events: none;
        animation: sparkle 0.8s ease-out forwards;
        z-index: 9999;
    `;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 800);
}

// Add sparkle animation to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0.8;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Console Love Message =====
console.log('%c💕 Made with love 💕', 'font-size: 20px; color: #FF6B9D;');
console.log('%cFor the most amazing person in the world!', 'font-size: 14px; color: #C44569;');