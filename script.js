/* ============================================================
   FTA VEÍCULOS — script.js
   ============================================================ */

// ---- HEADER: scroll class ----
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ---- MOBILE MENU ----
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  // Animate hamburger → X
  const spans = navToggle.querySelectorAll('span');
  navToggle.classList.toggle('active');
  if (navToggle.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close menu on nav link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
    });
  });
});

// ---- REVEAL ON SCROLL (Intersection Observer) ----
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings slightly
        const siblings = entry.target.closest('.veiculos-grid, .servicos-grid, .hero-content');
        let delay = 0;
        if (siblings) {
          const els = Array.from(siblings.querySelectorAll('.reveal'));
          delay = els.indexOf(entry.target) * 80;
        }
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

reveals.forEach(el => revealObserver.observe(el));

// ---- ACTIVE NAV LINK on scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinksAll.forEach(link => {
          link.classList.toggle(
            'active-link',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => sectionObserver.observe(s));

// Add active-link style dynamically
const style = document.createElement('style');
style.textContent = `.nav-link.active-link { color: #fff; background: rgba(232,19,26,.15); }`;
document.head.appendChild(style);

// ---- SMOOTH SCROLL for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      const offset = header.offsetHeight + 8;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- WhatsApp button micro-interaction ----
const waFloat = document.querySelector('.whatsapp-float');
if (waFloat) {
  // Pulsing attention after 3 seconds of inactivity
  let pulseTimeout;
  const resetPulse = () => {
    waFloat.style.animation = 'none';
    clearTimeout(pulseTimeout);
    pulseTimeout = setTimeout(() => {
      waFloat.style.animation = '';
    }, 4000);
  };
  ['scroll','click','keydown','mousemove','touchstart'].forEach(ev =>
    window.addEventListener(ev, resetPulse, { passive: true })
  );
}

// ---- Card hover: price highlight ----
document.querySelectorAll('.veiculo-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const preco = card.querySelector('.preco-valor');
    if (preco) preco.style.color = '#fff';
  });
  card.addEventListener('mouseleave', () => {
    const preco = card.querySelector('.preco-valor');
    if (preco) preco.style.color = '';
  });
});

console.log('FTA Veículos — site carregado com sucesso! 🚗');
