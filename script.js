'use strict';
(() => {
  const VIDEO_ID = 'On6n-RriodU';
  const CHECKOUT_URL = 'https://pay.kiwify.com.br/EsxrUl1';
  // Analytics não carrega nenhum rastreador. Insira IDs reais e ajuste a política/consentimento antes de ativar Pixel, GA ou GTM.
  window.dataLayer = window.dataLayer || [];
  function track(event, details = {}) {
    window.dataLayer.push({ event, product: 'cocriando_em_7', ...details });
  }
  const allowedParameters = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'src', 'sck'];
  function getCheckoutUrl(search = window.location.search) {
    const url = new URL(CHECKOUT_URL);
    const source = new URLSearchParams(search);
    allowedParameters.forEach(key => {
      const value = source.get(key);
      if (value && value.length <= 250) url.searchParams.set(key, value);
    });
    return url.href;
  }
  document.querySelectorAll('.checkout-link').forEach(link => { link.href = getCheckoutUrl(); });
  document.querySelectorAll('[data-track]').forEach(link => {
    link.addEventListener('click', () => track(link.dataset.track, { location: link.dataset.location || 'page' }));
  });
  document.querySelectorAll('.faq-list details').forEach((detail, index) => {
    detail.addEventListener('toggle', () => { if (detail.open) track('faq_open', { question: index + 1 }); });
  });
  const playButton = document.getElementById('play-video');
  const frame = document.getElementById('video-frame');
  let player;
  let started = false;
  if (playButton && frame) {
    playButton.addEventListener('click', () => {
      player = document.createElement('iframe');
      player.src = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&playsinline=1&rel=0&enablejsapi=1`;
      player.title = 'Cocriando em 7 dias — apresentação com Wall Benegr';
      player.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      player.allowFullscreen = true;
      player.referrerPolicy = 'strict-origin-when-cross-origin';
      player.addEventListener('load', () => {
        const send = message => player.contentWindow.postMessage(JSON.stringify(message), 'https://www.youtube-nocookie.com');
        send({ event: 'listening', id: 'cocriando-player' });
        send({ event: 'command', func: 'addEventListener', args: ['onStateChange'] });
      }, { once: true });
      frame.replaceChildren(player);
      player.focus();
      track('video_request', { video_id: VIDEO_ID });
    }, { once: true });
  }
  window.addEventListener('message', event => {
    if (!player || event.source !== player.contentWindow || event.origin !== 'https://www.youtube-nocookie.com') return;
    let data;
    try { data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data; } catch { return; }
    if (!data || typeof data !== 'object') return;
    if (!started && ((data.event === 'onStateChange' && data.info === 1) || (data.event === 'infoDelivery' && data.info?.playerState === 1))) {
      started = true;
      track('video_play', { video_id: VIDEO_ID });
    }
  });
  const offer = document.getElementById('oferta');
  const hero = document.getElementById('inicio');
  const mobileBar = document.getElementById('mobile-cta');
  let offerSeen = false;
  let heroVisible = true;
  let offerVisible = false;
  if ('IntersectionObserver' in window && offer && hero) {
    const updateBar = () => { if (mobileBar) mobileBar.hidden = heroVisible || offerVisible; };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target === hero) heroVisible = entry.isIntersecting;
        if (entry.target === offer) {
          offerVisible = entry.isIntersecting;
          if (entry.isIntersecting && !offerSeen) { offerSeen = true; track('offer_view'); }
        }
      });
      updateBar();
    }, { threshold: 0 });
    observer.observe(hero);
    observer.observe(offer);
  }
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();

// Camada visual independente: os links e a oferta funcionam sem estes efeitos.
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const header = document.getElementById('page-header');
  const progress = document.getElementById('reading-progress');
  let scrollFrame = 0;
  function paintScroll() {
    scrollFrame = 0;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const amount = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    if (progress) progress.style.transform = `scaleX(${amount})`;
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 20);
  }
  function queueScroll() { if (!scrollFrame) scrollFrame = window.requestAnimationFrame(paintScroll); }
  window.addEventListener('scroll', queueScroll, { passive: true });
  window.addEventListener('resize', queueScroll, { passive: true });
  paintScroll();

  const reveals = [...document.querySelectorAll('[data-reveal]')];
  if (!reduceMotion.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('reveal-prepared');
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .06, rootMargin: '0px 0px 20px 0px' });
    // Conteúdo da primeira tela permanece visível. Conteúdo posterior aparece ao rolar.
    reveals.forEach(el => {
      if (el.getBoundingClientRect().top > window.innerHeight + 30) el.classList.add('reveal-prepared');
      observer.observe(el);
    });
    // Evita esconder conteúdo impresso ou acessado por âncoras/teclado.
    window.addEventListener('beforeprint', () => reveals.forEach(el => el.classList.remove('reveal-prepared')));
    document.addEventListener('focusin', event => {
      reveals.forEach(el => { if (el.contains(event.target)) el.classList.remove('reveal-prepared'); });
    });
  }
  function clearMotion() {
    if (!reduceMotion.matches) return;
    reveals.forEach(el => el.classList.remove('reveal-prepared'));
    document.querySelectorAll('[data-tilt]').forEach(el => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    });
  }
  reduceMotion.addEventListener?.('change', clearMotion);

  if (finePointer.matches && !reduceMotion.matches) {
    document.querySelectorAll('[data-tilt]').forEach(card => {
      let frame = 0;
      let bounds;
      card.addEventListener('pointerenter', () => { bounds = card.getBoundingClientRect(); });
      card.addEventListener('pointermove', event => {
        if (frame || reduceMotion.matches) return;
        frame = window.requestAnimationFrame(() => {
          frame = 0;
          if (!bounds) return;
          const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
          const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
          card.style.setProperty('--mx', `${x * 100}%`);
          card.style.setProperty('--my', `${y * 100}%`);
          card.style.setProperty('--rx', `${(0.5 - y) * 3}deg`);
          card.style.setProperty('--ry', `${(x - 0.5) * 3}deg`);
        });
      });
      card.addEventListener('pointerleave', () => {
        if (frame) window.cancelAnimationFrame(frame);
        frame = 0;
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
        bounds = null;
      });
    });
    const hero = document.getElementById('inicio');
    if (hero) {
      let frame = 0;
      hero.addEventListener('pointermove', event => {
        if (frame || reduceMotion.matches) return;
        frame = window.requestAnimationFrame(() => {
          frame = 0;
          const rect = hero.getBoundingClientRect();
          hero.style.setProperty('--hero-x', `${(event.clientX - rect.left) / rect.width * 100}%`);
          hero.style.setProperty('--hero-y', `${(event.clientY - rect.top) / rect.height * 100}%`);
        });
      });
    }
  }
})();
