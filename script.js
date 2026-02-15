/* ========================================
   Young Explorers Programme — Script
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Reveal Animations ----------
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---------- Mobile Menu System ----------
  const menuBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('mobileNavClose');
  const navOverlay = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openMenu() {
    navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock scroll
  }

  function closeMenu() {
    navOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Unlock scroll
  }

  if (menuBtn) menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // ---------- Smooth Scrolling ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        // Offset for fixed header
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // ---------- Form Handling ----------
  const form = document.getElementById('registerForm');
  const successMsg = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Collect form data and map to Apps Script field names
      const formData = new FormData(form);
      const raw = Object.fromEntries(formData.entries());
      const payload = {
        studentName: raw.childName || '',
        childAge: raw.childAge || '',       // Added field
        ageGroup: raw.ageGroup || '',
        parentName: raw.parentName || '',
        contactNumber: raw.parentPhone || '',
        email: raw.parentEmail || '',
        medicalInfo: raw.additionalInfo || ''
      };

      // Disable submit button
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      try {
        // REPLACE THIS URL WITH YOUR DEPLOYED GOOGLE APPS SCRIPT WEB APP URL
        const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby-1602lsIwSTODjzlatPqby5mqkgntaqsszk9URxYgps7avS1TSIBjdA2Xn8SFf1w3/exec';

        if (GOOGLE_SCRIPT_URL === 'INSERT_YOUR_WEB_APP_URL_HERE') {
          throw new Error('Please configure the Google Apps Script URL in script.js');
        }

        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify(payload),
        });

        // Success
        form.style.opacity = '0';
        setTimeout(() => {
          form.style.display = 'none';
          successMsg.classList.remove('hidden');
          void successMsg.offsetWidth;
          successMsg.style.opacity = '1';
          successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);

      } catch (error) {
        console.error('Submission error:', error);
        alert('Could not submit form. Please check the console for details.');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // ---------- Parallax Effect ----------
  const parallaxLayers = document.querySelectorAll('.parallax-layer');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;

    // Simple optimization: only run requestAnimationFrame if needed
    window.requestAnimationFrame(() => {
      parallaxLayers.forEach(layer => {
        const speed = layer.getAttribute('data-speed');
        const yPos = -(scrolled * speed);
        layer.style.transform = `translateY(${yPos}px)`;
      });
    });
  });

});
