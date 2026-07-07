// ============================================
// CURSOR GLOW
// ============================================
const heroSection = document.querySelector('.hero');
const glow = document.getElementById('cursorGlow');
if (heroSection && glow) {
    heroSection.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });
}

// ============================================
// TILT EFFECT FOR CARDS
// ============================================
document.querySelectorAll('.proj-card, .cert-cell, .testi-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        const rx = ((y / r.height) - 0.5) * -6;
        const ry = ((x / r.width) - 0.5) * 6;
        card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

// ============================================
// PRELOADER
// ============================================
// ============================================
// PRELOADER - FIXED
// ============================================
// ============================================
// PRELOADER - COMPLETE WORKING FIX
// ============================================

// Option 1: Hide after everything loads
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Show preloader for 2 seconds then hide
        setTimeout(function() {
            preloader.classList.add('hide');
            // After transition, hide completely
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 800);
        }, 2000);
    }
});

// Option 2: Alternative - Hide immediately when page loads

window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 600);
    }
});

// Option 3: Show at least 2 seconds

window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Minimum display time 2 seconds
        const minDisplayTime = 2000;
        const startTime = Date.now();
        
        // Force hide after minimum time
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minDisplayTime - elapsed);
        
        setTimeout(function() {
            preloader.classList.add('hide');
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 800);
        }, remaining);
    }
});


// ============================================
// WHATSAPP WIDGET
// ============================================
const waBtn = document.getElementById('waBtn');
const waPanel = document.getElementById('waPanel');
if (waBtn && waPanel) {
    waBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        waPanel.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
        const widget = document.getElementById('wa-widget');
        if (widget && !widget.contains(e.target)) {
            waPanel.classList.remove('open');
        }
    });
}

// ============================================
// THEME TOGGLE
// ============================================
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        root.classList.add('light-theme');
    }
});

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        root.classList.toggle('light-theme');
        const isLight = root.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
}

// ============================================
// REVEAL ON SCROLL
// ============================================
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// ============================================
// COUNTERS
// ============================================
const counters = document.querySelectorAll('[data-count]');
const countObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const el = e.target;
            const target = parseInt(el.dataset.count, 10);
            const duration = 1400;
            const start = performance.now();
            const step = (now) => {
                const p = Math.min((now - start) / duration, 1);
                el.textContent = Math.floor(p * target).toLocaleString();
                if (p < 1) requestAnimationFrame(step);
                else el.textContent = target.toLocaleString();
            };
            requestAnimationFrame(step);
            countObserver.unobserve(el);
        }
    });
}, { threshold: 0.4 });
counters.forEach(c => countObserver.observe(c));

// ============================================
// SKILL BARS
// ============================================
document.querySelectorAll('.skill-cat').forEach(cat => {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.querySelectorAll('.skill-fill').forEach(f => {
                    f.style.width = f.dataset.w + '%';
                });
                obs.disconnect();
            }
        });
    }, { threshold: 0.25 });
    obs.observe(cat);
});

// ============================================
// PROJECT FILTER
// ============================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projCards = document.querySelectorAll('.proj-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        projCards.forEach(card => {
            card.classList.toggle('hidden', f !== 'all' && card.dataset.cat !== f);
        });
    });
});

// ============================================
// FORM SUBMIT
// ============================================
const form = document.getElementById('demoForm');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('This form is not wired up yet — we will connect it to real email delivery.');
    });
}

// ============================================
// TESTIMONIAL 3D TILT
// ============================================
const cards = document.querySelectorAll('.testi-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = -(y - centerY) / 12;
        const rotateY = (x - centerX) / 12;
        card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
});

// ============================================
// BACKGROUND CANVAS
// ============================================
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let w, h;

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const mouse = { x: w / 2, y: h / 2 };
window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

class Wire {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.speed = .2 + Math.random() * 0.6;
        this.length = 180 + Math.random() * 250;
        this.angle = Math.random() * Math.PI * 2;
        this.hue = Math.random() * 360;
        this.wave = Math.random() * 100;
    }
    update() {
        this.angle += 0.002;
        this.wave += 0.02;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        if (this.x < -300 || this.x > w + 300 || this.y < -300 || this.y > h + 300) {
            this.reset();
        }
    }
    draw() {
        const influenceX = (mouse.x - w / 2) / 70;
        const influenceY = (mouse.y - h / 2) / 70;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        const cp1x = this.x + Math.cos(this.wave) * 120 + influenceX;
        const cp1y = this.y + Math.sin(this.wave) * 120 + influenceY;
        const cp2x = this.x + this.length / 2 + Math.cos(this.wave + 2) * 120;
        const cp2y = this.y + this.length / 2 + Math.sin(this.wave + 2) * 120;
        const ex = this.x + this.length * Math.cos(this.angle);
        const ey = this.y + this.length * Math.sin(this.angle);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, ex, ey);
        ctx.strokeStyle = `hsla(${this.hue},100%,65%,0.45)`;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 35;
        ctx.shadowColor = `hsl(${this.hue},100%,60%)`;
        ctx.stroke();
    }
}

const wires = [];
for (let i = 0; i < 22; i++) {
    wires.push(new Wire());
}

function animate() {
    ctx.clearRect(0, 0, w, h);
    for (const wire of wires) {
        wire.update();
        wire.draw();
    }
    requestAnimationFrame(animate);
}
animate();

// ============================================
// FOOTER CTA 3D TILT
// ============================================
const footerCard = document.querySelector('.footer-cta');
const mouseLight = document.querySelector('.mouse-light');

if (footerCard && mouseLight) {
    footerCard.addEventListener('mousemove', (e) => {
        const rect = footerCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseLight.style.left = (x - 160) + 'px';
        mouseLight.style.top = (y - 160) + 'px';
        mouseLight.style.opacity = '1';
        const rotateY = ((x / rect.width) - 0.5) * 12;
        const rotateX = ((rect.height / 2 - y) / rect.height) * 12;
        footerCard.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    footerCard.addEventListener('mouseleave', () => {
        mouseLight.style.opacity = '0';
        footerCard.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
    });
}

// ============================================
// BUTTON 3D TILT
// ============================================
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const moveX = (x - rect.width / 2) / 8;
        const moveY = (y - rect.height / 2) / 8;
        btn.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0,0) scale(1)';
    });
});

// ============================================
// FOOTER COUNTERS
// ============================================
const footerCounters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.dataset.target;
            let value = 0;
            const speed = target / 80;
            const update = () => {
                value += speed;
                if (value < target) {
                    counter.innerText = Math.floor(value);
                    requestAnimationFrame(update);
                } else {
                    counter.innerText = target + '+';
                }
            };
            update();
            counterObserver.unobserve(counter);
        }
    });
});
footerCounters.forEach(counter => counterObserver.observe(counter));



/* ==========================================
        PREMIUM NAVBAR JS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const menu = document.getElementById("mobileMenu");
    const overlay = document.getElementById("mobileOverlay");
    const openBtn = document.getElementById("menuToggle");
    const closeBtn = document.getElementById("closeMenu");

    if (!menu || !overlay || !openBtn || !closeBtn) {
        console.log("Navbar elements not found.");
        return;
    }

    // ==========================
    // OPEN MENU
    // ==========================

    function openMenu() {

        menu.classList.add("active");
        overlay.classList.add("active");
        document.body.classList.add("menu-open");
        openBtn.classList.add("active");

    }

    // ==========================
    // CLOSE MENU
    // ==========================

    function closeMenu() {

        menu.classList.remove("active");
        overlay.classList.remove("active");
        document.body.classList.remove("menu-open");
        openBtn.classList.remove("active");

    }

    // ==========================
    // EVENTS
    // ==========================

    openBtn.addEventListener("click", openMenu);

    closeBtn.addEventListener("click", closeMenu);

    overlay.addEventListener("click", closeMenu);

    // Close when clicking a menu link

    document.querySelectorAll(".mobile-nav a").forEach(link => {

        link.addEventListener("click", closeMenu);

    });

    // ESC key

    document.addEventListener("keydown", function(e){

        if(e.key==="Escape"){

            closeMenu();

        }

    });

});

// ============================================
// PREMIUM NAVBAR
// Part 4.3
// ============================================

const navbar = document.querySelector(".navbar");
const navToggle = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");
const closeBtn = document.getElementById("mobileCloseBtn");
const overlay = document.querySelector(".mobile-overlay");

const navLinks = document.querySelectorAll(
".mobile-nav-link, .nav-links a"
);

// =========================
// OPEN MENU
// =========================

function openMenu(){

    mobileMenu.classList.add("active");
    navToggle.classList.add("active");

    document.body.style.overflow="hidden";

}

// =========================
// CLOSE MENU
// =========================

function closeMenu(){

    mobileMenu.classList.remove("active");
    navToggle.classList.remove("active");

    document.body.style.overflow="";

}

// =========================
// BUTTON EVENTS
// =========================

navToggle.addEventListener("click",()=>{

    if(mobileMenu.classList.contains("active")){

        closeMenu();

    }else{

        openMenu();

    }

});

closeBtn.addEventListener("click",closeMenu);

overlay.addEventListener("click",closeMenu);

// =========================
// ESC KEY
// =========================

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        closeMenu();

    }

});

// =========================
// CLOSE AFTER CLICK
// =========================

navLinks.forEach(link=>{

    link.addEventListener("click",()=>{

        closeMenu();

    });

});

// =========================
// SMOOTH SCROLL
// =========================

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

// =========================
// ACTIVE LINK
// =========================

const sections=document.querySelectorAll("section");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const top=section.offsetTop-150;

        const height=section.offsetHeight;

        if(pageYOffset>=top){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});

// =========================
// GLASS NAVBAR ON SCROLL
// =========================

window.addEventListener("scroll",()=>{

    if(window.scrollY>30){

        navbar.classList.add("scrolled");

    }else{

        navbar.classList.remove("scrolled");

    }

});

