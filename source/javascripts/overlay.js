// Navigation overlay

const navModal = document.getElementById('navigation-modal');
const openNavBtn = document.querySelector('.open-mobile-navigation');
const closeNavBtn = document.querySelector('.close_overlay');
const focusableNavElements = navModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

const openNavigation = () => {
  if (navModal) {
    document.addEventListener('keydown', closeNavOnEscape);
    navModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('overlay-open');
    trapNavFocus();
  }
};

const trapNavFocus = () => {
  const firstFocusableElement = focusableNavElements[0];
  const lastFocusableElement = focusableNavElements[focusableNavElements.length - 1];

  firstFocusableElement.focus();

  navModal.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
      if (event.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          event.preventDefault();
          lastFocusableElement.focus();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          event.preventDefault();
          firstFocusableElement.focus();
        }
      }
    }
  });
};

const closeNavigation = () => {
  if (navModal && navModal.getAttribute('aria-hidden') === 'false') {
    navModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('overlay-open');
    document.removeEventListener('keydown', closeNavOnEscape);
    navModal.addEventListener("transitionend", focusOpenNavBtn, { once: true });
  }
};

const closeNavOnEscape = (event) => {
  if (event.key === 'Escape' || event.code === 27) {
    closeNavigation();
  }
};

const focusOpenNavBtn = () => {
  openNavBtn.focus();
};

openNavBtn?.addEventListener('click', openNavigation);
closeNavBtn?.addEventListener('click', closeNavigation);