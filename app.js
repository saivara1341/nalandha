
// ============================================================
// CODEPEN GSAP INTRO TIMELINE & SCROLLTRIGGER ANIMATIONS
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Set initial hidden states for animated elements
    gsap.set(".nav", { opacity: 0, y: -20 });
    gsap.set(".headline .word > span", { y: "105%" });
    gsap.set("#inlineImg, #ideaPill", { scale: 0 });
    gsap.set(".col-left > *, .col-right > *", { opacity: 0, y: 30 });
    gsap.set(".big-image", { opacity: 0, y: 40, scale: 0.95 });
    gsap.set(".try-pill-wrap", { opacity: 0, y: -20 });
    gsap.set(".sphere", { scale: 0, opacity: 0 });
    gsap.set(".academic-card, .testimonial-card, .cta-inner", { opacity: 0, y: 25 });

    // Intro GSAP Timeline
    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

    intro
      .to(".nav", { opacity: 1, y: 0, duration: 0.8 }, 0.1)
      .to(".line-1 .word > span", { y: "0%", duration: 0.9, stagger: 0.1 }, 0.3)
      .to(".line-2 .word > span", { y: "0%", duration: 0.9 }, 0.55)
      .to("#inlineImg", { scale: 1, duration: 0.6, ease: "back.out(1.7)" }, 0.7)
      .to("#ideaPill", { scale: 1, duration: 0.6, ease: "back.out(1.7)" }, 0.8)
      .to(".line-3 .word > span", { y: "0%", duration: 0.9, stagger: 0.1 }, 0.9)
      .to(".try-pill-wrap", { opacity: 1, y: 0, duration: 0.6 }, 1.1)
      .to(".big-image", { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" }, 1.2)
      .to(".col-left > *, .col-right > *", { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 1.35)
      .to(".sphere", { scale: 1, opacity: 1, duration: 0.6, stagger: 0.05, ease: "back.out(1.7)" }, 1.5);

    // ScrollTrigger reveals for cards
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.utils.toArray('.academic-card, .testimonial-card, .cta-inner').forEach(el => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });
      });
    }
  }
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
});
