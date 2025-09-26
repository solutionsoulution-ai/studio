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

  // FAQ Accordion
  const accordionTriggers = document.querySelectorAll('[data-accordion-trigger]');
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', function () {
      const content = this.nextElementSibling;
      const parentItem = this.parentElement;
      const isOpen = parentItem.getAttribute('data-state') === 'open';

      // Close all other items
      parentItem.parentElement.querySelectorAll('[data-state="open"]').forEach(openItem => {
        if (openItem !== parentItem) {
            openItem.setAttribute('data-state', 'closed');
            const openContent = openItem.querySelector('[data-accordion-content]');
            if(openContent) openContent.style.maxHeight = null;
        }
      });
      
      // Toggle current item
      if (isOpen) {
        parentItem.setAttribute('data-state', 'closed');
        content.style.maxHeight = null;
      } else {
        parentItem.setAttribute('data-state', 'open');
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  // Scroll Animations
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
