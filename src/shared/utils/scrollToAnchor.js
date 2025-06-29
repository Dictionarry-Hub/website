export function handleAnchorScroll() {
  const hash = window.location.hash;
  if (hash && hash !== '#/' && hash !== '#') {
    const targetId = hash.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      setTimeout(() => {
        const navbarHeight = 80;
        const elementPosition = element.offsetTop - navbarHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
  }
}

// Auto-run on page navigation
export function initAnchorScrolling() {
  // Handle initial page load
  window.addEventListener('load', handleAnchorScroll);
  
  // Handle hash changes
  window.addEventListener('hashchange', handleAnchorScroll);
}