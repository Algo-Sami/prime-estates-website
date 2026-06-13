const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');
const backToTop = document.getElementById('backToTop');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section');

navToggle.addEventListener('click', () => {
  const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
  mainNav.classList.toggle('open');
  navToggle.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(!isExpanded));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', () => {
  const showButton = window.scrollY > 400;
  backToTop.classList.toggle('visible', showButton);

  const header = document.querySelector('.site-header');
  header.classList.toggle('scrolled', window.scrollY > 20);

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;
    const isActive = window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight;
    const id = section.getAttribute('id');
    const activeLink = document.querySelector(`.nav-link[href='#${id}']`);
    if (activeLink) {
      activeLink.classList.toggle('active', isActive);
    }
  });
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const revealElements = document.querySelectorAll('.animate-up, .animate-fade');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((element) => {
  observer.observe(element);
});

const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = contactForm.fullName.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    alert('Please complete all fields before sending your message.');
    return;
  }

  contactForm.reset();
  alert('Thank you! Your message has been prepared for sending.');
});
