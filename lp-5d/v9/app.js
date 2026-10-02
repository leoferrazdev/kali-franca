(() => {
  'use strict';

  function track(event, details = {}) {
    const payload = { event, page: 'eleva-5d', version: 'v9', ...details };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
    if (typeof window.gtag === 'function') window.gtag('event', event, payload);
    if (typeof window.clarity === 'function') window.clarity('event', event);
  }

  document.querySelectorAll('[data-cta]').forEach((link) => {
    link.addEventListener('click', () => {
      const details = { cta: link.dataset.cta, destination: link.getAttribute('href') };
      track('eleva5d_cta_click', details);
      if (['offer-contact', 'faq-contact'].includes(link.dataset.cta)) {
        track('eleva5d_contact_click', details);
      }
    });
  });

  document.querySelectorAll('details').forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      const isPhase = Boolean(item.dataset.phase);
      track(isPhase ? 'eleva5d_curriculum_open' : 'eleva5d_details_open', {
        section: item.closest('[data-section]')?.dataset.section || '',
        topic: item.querySelector('summary')?.textContent.trim().replace(/\s+/g, ' '),
      });
    });
  });

  const stickyAction = document.querySelector('[data-mobile-action]');
  const hero = document.querySelector('.hero');
  const offer = document.querySelector('#oferta');
  if ('IntersectionObserver' in window && stickyAction && hero && offer) {
    let heroPassed = false;
    let offerVisible = false;
    const updateAction = () => { stickyAction.hidden = !heroPassed || offerVisible; };
    const actionObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) heroPassed = !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
        if (entry.target === offer) offerVisible = entry.isIntersecting;
      }
      updateAction();
    }, { threshold: 0 });
    actionObserver.observe(hero);
    actionObserver.observe(offer);

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        track(entry.target.dataset.section === 'offer' ? 'eleva5d_offer_view' : 'eleva5d_section_view', {
          section: entry.target.dataset.section,
        });
        sectionObserver.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('[data-section]').forEach((section) => sectionObserver.observe(section));
  }

  const dialog = document.querySelector('.proof-dialog');
  if (!dialog) return;
  const dialogImage = dialog.querySelector('img');
  const dialogTitle = dialog.querySelector('#proof-dialog-title');
  const originalLink = dialog.querySelector('.dialog-original');
  let opener = null;

  document.querySelectorAll('[data-proof-image]').forEach((button) => {
    button.addEventListener('click', () => {
      const source = button.dataset.proofImage;
      if (typeof dialog.showModal !== 'function') {
        window.open(source, '_blank', 'noopener,noreferrer');
        return;
      }
      opener = button;
      dialogTitle.textContent = button.dataset.proofTitle;
      dialogImage.src = source;
      dialogImage.alt = button.querySelector('img').alt;
      originalLink.href = source;
      dialog.showModal();
      document.body.classList.add('dialog-open');
      track('eleva5d_testimonial_open', { image: source });
    });
  });
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    opener?.focus({ preventScroll: true });
  });
})();
