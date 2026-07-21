
// ============================================================
// ANIMATIONS CONTROLLED VIA HIGH-PERFORMANCE CSS & OBSERVERS
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // GSAP blocks removed in favor of CSS transitions and IntersectionObserver reveals

  // ── Header transparent-on-scroll ──────────────────────────
  const header = document.querySelector('.header-curved');
  if (header) {
    const SCROLL_THRESHOLD = 80;
    const onScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Mobile navigation drawer ───────────────────────────────
  const hamburgerBtn  = document.getElementById('hamburger-btn');
  const mobileDrawer  = document.getElementById('mobile-nav-drawer');
  const mobileOverlay = document.getElementById('mobile-nav-overlay');
  const mobileClose   = document.getElementById('mobile-nav-close');

  function openDrawer() {
    mobileDrawer?.classList.add('is-open');
    mobileOverlay?.classList.add('is-open');
    hamburgerBtn?.classList.add('is-open');
    hamburgerBtn?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('is-open');
    mobileOverlay?.classList.remove('is-open');
    hamburgerBtn?.classList.remove('is-open');
    hamburgerBtn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburgerBtn?.addEventListener('click', openDrawer);
  mobileClose?.addEventListener('click', closeDrawer);
  mobileOverlay?.addEventListener('click', closeDrawer);

  // Close drawer when any nav link is tapped
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });
});


// Modal Dialog Handlers
document.addEventListener('DOMContentLoaded', () => {
  const enquiryDialog = document.getElementById('enquiry-dialog');
  const successDialog = document.getElementById('success-dialog');
  const enquiryForm = document.getElementById('enquiry-form');
  const inlineForm = document.getElementById('inline-contact-form');

  document.querySelectorAll('.btn--open-enquiry').forEach(btn => {
    btn.addEventListener('click', () => {
      if (enquiryDialog && typeof enquiryDialog.showModal === 'function') {
        enquiryDialog.showModal();
      }
    });
  });

  document.querySelectorAll('.close-enquiry').forEach(btn => {
    btn.addEventListener('click', () => {
      if (enquiryDialog) enquiryDialog.close();
    });
  });

  document.querySelectorAll('.close-success').forEach(btn => {
    btn.addEventListener('click', () => {
      if (successDialog) successDialog.close();
    });
  });

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (enquiryDialog) enquiryDialog.close();
      enquiryForm.reset();
      if (successDialog && typeof successDialog.showModal === 'function') {
        successDialog.showModal();
      }
    });
  }

  if (inlineForm) {
    inlineForm.addEventListener('submit', (e) => {
      e.preventDefault();
      inlineForm.reset();
      if (successDialog && typeof successDialog.showModal === 'function') {
        successDialog.showModal();
      } else {
        alert('Thank you! Your inquiry has been submitted successfully.');
      }
    });
  }

  // --- Scroll-Triggered Reveal IntersectionObserver ---
  const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Once revealed, no need to track it anymore
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15, // trigger when 15% of element is visible
    rootMargin: '0px 0px -50px 0px' // offset so it triggers slightly before coming fully into view
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // ── Campus Facilities Pinned Card Stack Controller ────────
  const pinWrapper = document.getElementById('facilityPinWrapper');
  const facilityCards = document.querySelectorAll('.facility-stack-card');
  const stepPill = document.getElementById('facilityStepPill');
  const dots = document.querySelectorAll('.facility-dots .fac-dot');

  if (pinWrapper && facilityCards.length > 0) {
    const updateCardStack = () => {
      const rect = pinWrapper.getBoundingClientRect();
      const wrapperTop = rect.top;
      const wrapperHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Target top offset: 110px on desktop, 90px on mobile
      const targetTop = window.innerWidth <= 768 ? 90 : 110;
      const totalScrollable = wrapperHeight - windowHeight + targetTop;
      const currentScroll = targetTop - wrapperTop;

      let progress = 0;
      if (totalScrollable > 0) {
        progress = currentScroll / totalScrollable;
        progress = Math.max(0, Math.min(1, progress));
      }

      const numCards = facilityCards.length;
      const activeIndex = Math.min(numCards - 1, Math.floor(progress * numCards));

      facilityCards.forEach((card, index) => {
        if (index === 0) {
          card.classList.add('is-active');
          card.style.transform = 'translateY(0%)';
          card.style.opacity = '1';
          return;
        }

        const cardStart = (index - 1) / numCards;
        const cardEnd = index / numCards;

        if (progress <= cardStart) {
          card.classList.remove('is-active');
          card.style.transform = 'translateY(115%)';
          card.style.opacity = '0';
        } else if (progress >= cardEnd) {
          card.classList.add('is-active');
          card.style.transform = 'translateY(0%)';
          card.style.opacity = '1';
        } else {
          card.classList.add('is-active');
          const cardProgress = (progress - cardStart) / (cardEnd - cardStart);
          const translateY = (1 - cardProgress) * 115;
          card.style.transform = `translateY(${translateY.toFixed(2)}%)`;
          card.style.opacity = `${cardProgress.toFixed(2)}`;
        }
      });

      if (stepPill) {
        stepPill.textContent = `Facility ${activeIndex + 1} of ${numCards}`;
      }

      dots.forEach((dot, index) => {
        if (index <= activeIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };

    window.addEventListener('scroll', updateCardStack, { passive: true });
    window.addEventListener('resize', updateCardStack, { passive: true });
    updateCardStack();
  }
});

