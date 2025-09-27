document.addEventListener('DOMContentLoaded', function () {
  // Mobile Menu Toggle
  const mobileMenuButton = document.querySelector('[data-mobile-menu-button]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const mobileMenuCloseButtons = document.querySelectorAll('[data-mobile-menu-close]');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function () {
      const isExpanded = mobileMenu.getAttribute('aria-expanded') === 'true';
      mobileMenu.setAttribute('aria-expanded', !isExpanded);
    });

    mobileMenuCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            mobileMenu.setAttribute('aria-expanded', 'false');
        });
    });
  }

  // Scroll Animations (can be kept as it's a generic visual effect)
  const animatedElements = document.querySelectorAll('section, .fade-in-item');
  animatedElements.forEach(el => el.classList.add('fade-in-on-scroll'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  animatedElements.forEach(element => {
    observer.observe(element);
  });

});
