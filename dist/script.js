'use strict';
(() => {
  document.documentElement.classList.add('js');
  document.getElementById('year').textContent = new Date().getFullYear();
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const motionButton = document.getElementById('motion-toggle');
  let motionPaused = reduceMotion.matches;
  try { motionPaused = reduceMotion.matches || localStorage.getItem('bv-motion-paused') === 'true'; } catch (_) {}
  const activeAnimations = new Set();
  const applyMotion = () => {
    document.documentElement.classList.toggle('motion-paused', motionPaused);
    motionButton.textContent = motionPaused ? 'Enable animations' : 'Pause animations';
    motionButton.setAttribute('aria-pressed', String(motionPaused));
    if (motionPaused) activeAnimations.forEach(animation => animation.finish());
  };
  motionButton.hidden = false;
  applyMotion();
  motionButton.addEventListener('click', () => {
    motionPaused = !motionPaused;
    try { localStorage.setItem('bv-motion-paused', String(motionPaused)); } catch (_) {}
    applyMotion();
  });
  reduceMotion.addEventListener('change', event => { motionPaused = event.matches; applyMotion(); });

  const menuButton = document.querySelector('.menu-button');
  const nav = document.getElementById('navigation');
  menuButton.hidden = false;
  const closeMenu = () => { nav.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); };
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) { closeMenu(); menuButton.focus(); }
  });
  document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
  window.matchMedia('(min-width: 601px)').addEventListener('change', closeMenu);

  const animateIn = (element, delay = 0) => {
    if (motionPaused || reduceMotion.matches || !element.animate) return;
    const animation = element.animate([{opacity:0,transform:'translateY(22px)'},{opacity:1,transform:'translateY(0)'}], {duration:650,delay,easing:'cubic-bezier(.2,.65,.3,1)',fill:'backwards'});
    activeAnimations.add(animation);
    animation.onfinish = animation.oncancel = () => activeAnimations.delete(animation);
  };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { animateIn(entry.target); observer.unobserve(entry.target); } });
    }, {threshold:0.08});
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  }

  const filters = document.querySelector('.filters');
  const projects = Array.from(document.querySelectorAll('.project'));
  filters.hidden = false;
  filters.addEventListener('click', event => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;
    filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    let count = 0;
    projects.forEach(project => {
      const show = button.dataset.filter === 'all' || project.dataset.category === button.dataset.filter;
      project.hidden = !show;
      if (show) { animateIn(project, count * 40); count++; }
    });
    document.getElementById('filter-status').textContent = `${count} ${count === 1 ? 'project' : 'projects'} shown.`;
  });

  const navLinks = Array.from(nav.querySelectorAll('a[href^="#"]'));
  const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  let scrollQueued = false;
  const updateScroll = () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = height > 0 ? Math.min(1, Math.max(0, window.scrollY / height)) : 0;
    document.querySelector('.reading-progress').style.transform = `scaleX(${progress})`;
    const current = sections.filter(section => section.getBoundingClientRect().top <= 160).pop();
    navLinks.forEach(link => { if (current && link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
    scrollQueued = false;
  };
  const queueScroll = () => { if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateScroll); } };
  window.addEventListener('scroll', queueScroll, {passive:true});
  window.addEventListener('resize', queueScroll);
  document.querySelectorAll('details').forEach(detail => detail.addEventListener('toggle', queueScroll));
  updateScroll();

  const copyButton = document.querySelector('.copy-email');
  if (navigator.clipboard && window.isSecureContext) {
    copyButton.hidden = false;
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText('bardhvula@gmail.com');
        document.querySelector('.copy-status').textContent = 'Email address copied.';
      } catch (_) {
        document.querySelector('.copy-status').textContent = 'Please select the email address above to copy it.';
      }
    });
  }
})();
