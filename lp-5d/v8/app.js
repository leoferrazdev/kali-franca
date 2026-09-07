(() => {
  const variant = document.body.dataset.abVariant || 'B';
  const sentMarkers = new Set();

  function track(event, details = {}) {
    const payload = { event, variant, page: 'eleva-5d', ...details };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
    if (typeof window.gtag === 'function') window.gtag('event', event, payload);
  }

  document.querySelectorAll('[data-cta]').forEach((cta) => {
    cta.addEventListener('click', () => {
      track('eleva5d_cta_click', {
        cta: cta.dataset.cta,
        destination: cta.getAttribute('href') || '',
      });
    });
  });

  document.querySelectorAll('details').forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) track('eleva5d_faq_open', { question: item.querySelector('summary')?.textContent.trim() || '' });
    });
  });

  const offer = document.querySelector('#oferta');
  const markers = document.querySelectorAll('[data-scroll-marker]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const marker = entry.target.dataset.scrollMarker;
        if (sentMarkers.has(marker)) return;
        sentMarkers.add(marker);
        track(marker === 'offer' ? 'eleva5d_offer_view' : 'eleva5d_scroll_depth', { section: marker });
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.35 });
    markers.forEach((marker) => observer.observe(marker));
  } else if (offer) {
    track('eleva5d_offer_view', { section: 'offer', fallback: true });
  }
})();
