/* =========================================================
   NOIR & BLADES — Interactions
   Vanilla JS only. No dependencies.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Footer year ---------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Sticky navbar shrink ---------------- */
  const nav = document.getElementById('nav');
  const onScrollNav = () => {
    if (window.scrollY > 40) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive: true });

  /* ---------------- Mobile menu ---------------- */
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  function closeMobileMenu(){
    mobileMenu.classList.remove('is-open');
    burgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  function toggleMobileMenu(){
    const isOpen = mobileMenu.classList.toggle('is-open');
    burgerBtn.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }
  burgerBtn.addEventListener('click', toggleMobileMenu);
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMobileMenu));

  /* ---------------- Smooth scroll for in-page anchors ---------------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const navHeight = document.getElementById('nav').offsetHeight;
          const top = target.getBoundingClientRect().top + window.scrollY - (navHeight - 10);
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  /* ---------------- Scroll reveal ---------------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------------- Back to top ---------------- */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 700) backToTop.classList.add('is-visible');
    else backToTop.classList.remove('is-visible');
  }, { passive: true });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------- Gallery: expand hidden tiles ---------------- */
  const masonry = document.getElementById('masonry');
  const galleryToggle = document.getElementById('galleryToggle');
  galleryToggle.addEventListener('click', () => {
    const expanded = masonry.classList.toggle('is-expanded');
    galleryToggle.textContent = expanded ? 'Show Less' : 'View Full Gallery';
  });

  /* ---------------- Gallery lightbox ---------------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let galleryItems = [];
  let currentIndex = 0;

  function refreshGalleryItems(){
    galleryItems = Array.from(masonry.querySelectorAll('.masonry__item'));
  }
  refreshGalleryItems();

  function openLightbox(index){
    refreshGalleryItems();
    currentIndex = index;
    const item = galleryItems[currentIndex];
    const fullSrc = item.getAttribute('data-full');
    const caption = item.querySelector('figcaption') ? item.querySelector('figcaption').textContent : '';
    lightboxImg.src = fullSrc;
    lightboxImg.alt = caption;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox(){
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  function showRelative(delta){
    // only cycle through currently visible items
    const visible = galleryItems.filter(el => el.offsetParent !== null);
    let visIndex = visible.indexOf(galleryItems[currentIndex]);
    if (visIndex === -1) visIndex = 0;
    visIndex = (visIndex + delta + visible.length) % visible.length;
    const targetItem = visible[visIndex];
    currentIndex = galleryItems.indexOf(targetItem);
    openLightbox(currentIndex);
  }

  masonry.addEventListener('click', (e) => {
    const item = e.target.closest('.masonry__item');
    if (!item) return;
    refreshGalleryItems();
    openLightbox(galleryItems.indexOf(item));
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  lightboxPrev.addEventListener('click', () => showRelative(-1));
  lightboxNext.addEventListener('click', () => showRelative(1));

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showRelative(-1);
    if (e.key === 'ArrowRight') showRelative(1);
  });

  /* ---------------- Testimonial carousel ---------------- */
  const track = document.getElementById('testimonialTrack');
  const slides = Array.from(track.querySelectorAll('.testimonial__slide'));
  const dotsWrap = document.getElementById('testimonialDots');
  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');

  let activeSlide = 0;
  let autoplayTimer = null;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'testimonial__dot';
    dot.setAttribute('aria-label', 'Show review ' + (i + 1));
    dot.addEventListener('click', () => goToSlide(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.querySelectorAll('.testimonial__dot'));

  function goToSlide(index){
    slides[activeSlide].classList.remove('is-active');
    dots[activeSlide].classList.remove('is-active');
    activeSlide = (index + slides.length) % slides.length;
    slides[activeSlide].classList.add('is-active');
    dots[activeSlide].classList.add('is-active');
  }
  function nextSlide(){ goToSlide(activeSlide + 1); }
  function prevSlide(){ goToSlide(activeSlide - 1); }

  goToSlide(0);
  nextBtn.addEventListener('click', () => { nextSlide(); restartAutoplay(); });
  prevBtn.addEventListener('click', () => { prevSlide(); restartAutoplay(); });

  function startAutoplay(){ autoplayTimer = setInterval(nextSlide, 6000); }
  function restartAutoplay(){ clearInterval(autoplayTimer); startAutoplay(); }
  startAutoplay();

  const testimonialSection = document.querySelector('.testimonial');
  testimonialSection.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
  testimonialSection.addEventListener('mouseleave', startAutoplay);

  /* ---------------- Booking form ---------------- */
  const bookingForm = document.getElementById('bookingForm');
  const bookingError = document.getElementById('bookingError');
  const confirmModal = document.getElementById('confirmModal');
  const modalClose = document.getElementById('modalClose');
  const modalDone = document.getElementById('modalDone');

  // Prevent picking a date in the past
  const dateInput = document.getElementById('bkDate');
  const todayISO = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', todayISO);

  // Pre-fill barber when "Book With [Name]" is clicked from a barber card
  document.querySelectorAll('[data-prefill-barber]').forEach(link => {
    link.addEventListener('click', () => {
      const name = link.getAttribute('data-prefill-barber');
      const barberSelect = document.getElementById('bkBarber');
      for (const opt of barberSelect.options) {
        if (opt.value === name || opt.textContent.trim() === name) {
          barberSelect.value = opt.value;
          break;
        }
      }
    });
  });

  function openConfirmModal(){
    confirmModal.classList.add('is-open');
    confirmModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeConfirmModal(){
    confirmModal.classList.remove('is-open');
    confirmModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  modalClose.addEventListener('click', closeConfirmModal);
  modalDone.addEventListener('click', closeConfirmModal);
  confirmModal.addEventListener('click', (e) => { if (e.target === confirmModal) closeConfirmModal(); });

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    bookingError.textContent = '';

    const phone = document.getElementById('bkPhone').value.trim();
    const phoneDigits = phone.replace(/\D/g, '');

    if (!bookingForm.checkValidity()) {
      bookingError.textContent = 'Please fill in every field before booking.';
      bookingForm.reportValidity();
      return;
    }
    if (phoneDigits.length < 10) {
      bookingError.textContent = 'Please enter a valid phone number.';
      return;
    }

    // No backend: this is where a real integration (email, CRM, booking API)
    // would send the appointment request. For now we just confirm to the user.
    openConfirmModal();
    bookingForm.reset();
  });

  /* ---------------- WhatsApp button ---------------- */
  // PLACEHOLDER: replace this number with the real shop WhatsApp number (country code + number, no symbols)
  const WHATSAPP_NUMBER = '911234567890';
  const whatsappBtn = document.getElementById('whatsappBtn');
  whatsappBtn.addEventListener('click', () => {
    const service = document.getElementById('bkService').value;
    const barber = document.getElementById('bkBarber').value;
    let message = "Hi Noir & Blades, I'd like to book an appointment.";
    if (service) message += ` Service: ${service}.`;
    if (barber) message += ` Barber: ${barber}.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener');
  });

});
