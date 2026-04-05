/* ============================================================
   SRISHTI'S PORTFOLIO — script.js
   ============================================================ */

/* ---- CUSTOM CURSOR ---- */
const cDot  = document.getElementById('cDot');
const cRing = document.getElementById('cRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cDot.style.left = mx + 'px';
  cDot.style.top  = my + 'px';
});

// Smooth lagging ring
(function loop() {
  rx += (mx - rx) * 0.14;
  ry += (my - ry) * 0.14;
  cRing.style.left = rx + 'px';
  cRing.style.top  = ry + 'px';
  requestAnimationFrame(loop);
})();

document.addEventListener('mouseover', e => {
  const t = e.target.closest(
    'a, button, .folder-item, .chip, .folder, .contact-card, .j-cover, .folder-item'
  );
  document.body.classList.toggle('hov', !!t);
});

/* ---- NAV ACTIVE ON SCROLL ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[data-sec]');

const navObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(n => n.classList.remove('active'));
      const active = document.querySelector(`.nav-link[data-sec="${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.28 });

sections.forEach(s => navObs.observe(s));

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById(link.dataset.sec)?.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ---- SCROLL REVEAL (generic) ---- */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
}, { threshold: 0.1 });
document.querySelectorAll('[data-rev]').forEach(el => revObs.observe(el));

/* Education stagger */
const eduObs = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) setTimeout(() => entry.target.classList.add('vis'), i * 130);
  });
}, { threshold: 0.1 });
document.querySelectorAll('[data-edu]').forEach(el => eduObs.observe(el));

/* Experience stagger */
const expObs = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) setTimeout(() => entry.target.classList.add('vis'), i * 110);
  });
}, { threshold: 0.1 });
document.querySelectorAll('[data-exp]').forEach(el => expObs.observe(el));

/* ---- DOODLE PEEK ON SCROLL ---- */
const doodles = document.querySelectorAll('.doodle');
window.addEventListener('scroll', () => {
  const show = window.scrollY > 80;
  doodles.forEach(d => d.classList.toggle('peek', show));
}, { passive: true });

/* ---- JOURNAL ---- */
function openJournal() {
  document.getElementById('journal').classList.add('open');
  document.getElementById('jLabel').textContent = 'scroll inside ↓';
}
function closeJournal() {
  document.getElementById('journal').classList.remove('open');
  document.getElementById('jLabel').textContent = 'a little note from me ✦';
}
// Expose globally
window.openJournal  = openJournal;
window.closeJournal = closeJournal;

/* ---- SPEECH BUBBLE CYCLE ---- */
const bubbleMsgs = [
  'Hi there! ✦',
  'I love to code 💻',
  'Coffee = fuel ☕',
  'Let\'s build stuff!',
  'IoT + AI nerd 🤖',
  'I dance too 💃',
  '9.33 GPA, no big deal 😌',
  'Controlled chaos ✦'
];
let bubbleIdx = 0;
const bEl = document.getElementById('bText');
if (bEl) {
  bEl.style.transition = 'opacity .25s';
  setInterval(() => {
    bEl.style.opacity = '0';
    setTimeout(() => {
      bubbleIdx = (bubbleIdx + 1) % bubbleMsgs.length;
      bEl.textContent = bubbleMsgs[bubbleIdx];
      bEl.style.opacity = '1';
    }, 260);
  }, 2800);
}

/* ---- SKILL CHIP REPEL ---- */
const skillsArea = document.getElementById('skillsArea');
if (skillsArea) {
  skillsArea.addEventListener('mousemove', e => {
    document.querySelectorAll('.chip').forEach(chip => {
      const r  = chip.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top  + r.height / 2);
      const dist = Math.hypot(dx, dy);
      const maxD = 100;

      if (dist < maxD && dist > 0) {
        const force = (maxD - dist) / maxD;
        chip.style.transform = `translate(${-dx/dist * force * 46}px, ${-dy/dist * force * 46}px)`;
        chip.style.transition = 'transform .06s linear';
      } else {
        chip.style.transform = 'translate(0,0)';
        chip.style.transition = 'transform .4s cubic-bezier(0.34,1.56,0.64,1)';
      }
    });
  });

  skillsArea.addEventListener('mouseleave', () => {
    document.querySelectorAll('.chip').forEach(c => {
      c.style.transform  = 'translate(0,0)';
      c.style.transition = 'transform .5s cubic-bezier(0.34,1.56,0.64,1)';
    });
  });
}

/* ---- MODALS ---- */
function openModal(id)  { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }
window.openModal  = openModal;
window.closeModal = closeModal;

document.querySelectorAll('.overlay').forEach(o => {
  o.addEventListener('click', e => { if (e.target === o) o.classList.remove('open'); });
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape')
    document.querySelectorAll('.overlay.open').forEach(o => o.classList.remove('open'));
});

/* ---- CONTACT COPY ---- */
document.querySelectorAll('[data-copy]').forEach(card => {
  card.addEventListener('click', e => {
    e.preventDefault();
    navigator.clipboard.writeText(card.dataset.copy)
      .then(() => showToast('Copied to clipboard!'));
  });
});

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

/* ---- DESKTOP CLOCK ---- */
function tick() {
  const el = document.getElementById('barTime');
  if (el) {
    el.textContent = new Date().toLocaleTimeString('en-GB', {
      hour: '2-digit', minute: '2-digit'
    });
  }
}
tick();
setInterval(tick, 30000);