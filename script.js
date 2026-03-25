/* ================================================
   SRISHTI'S PORTFOLIO — SHARED SCRIPT
   ================================================ */

// ---- CUSTOM CURSOR ----
const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');

document.addEventListener('mousemove', e => {
  if (!dot || !ring) return;
  dot.style.left  = e.clientX + 'px';
  dot.style.top   = e.clientY + 'px';
  ring.style.left = e.clientX + 'px';
  ring.style.top  = e.clientY + 'px';
});

document.addEventListener('mouseover', e => {
  if (!dot || !ring) return;
  const target = e.target.closest('a, button, .clickable, .nav-tab, .folder-card, .skill-chip, .journal-cover');
  if (target) {
    dot.classList.add('hovered');
    ring.classList.add('hovered');
  } else {
    dot.classList.remove('hovered');
    ring.classList.remove('hovered');
  }
});

// ---- PAGE TRANSITIONS ----
document.querySelectorAll('.nav-tab').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return;
    e.preventDefault();
    document.body.style.transition = 'opacity 0.28s ease';
    document.body.style.opacity = '0';
    setTimeout(() => { window.location.href = href; }, 280);
  });
});

// ---- DOODLE SCROLL PEEKER ----
const doodles = document.querySelectorAll('.doodle');

function handleDoodleScroll() {
  const scrollY = window.scrollY;
  const scrolled = scrollY > 80;
  doodles.forEach(d => {
    if (scrolled) d.classList.add('peek');
    else d.classList.remove('peek');
  });
}

window.addEventListener('scroll', handleDoodleScroll, { passive: true });
handleDoodleScroll();