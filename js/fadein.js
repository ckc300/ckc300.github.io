// 內容預設可見；淡入只是漸進增強，不是使用入口的必要條件。
(function () {
  const elements = [...document.querySelectorAll('.icon-section, .icon-wrapper')];
  let observer;
  let fallback;
  const reveal = element => {
    element.classList.remove('reveal-pending');
    element.classList.add('fade-in');
  };
  const revealAll = () => {
    elements.forEach(reveal);
    if (observer) observer.disconnect();
    clearTimeout(fallback);
  };
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    try {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      // 觀察器若未回呼，也不會永久隱藏內容。
      fallback = setTimeout(revealAll, 1600);
      elements.forEach(element => {
        observer.observe(element);
        element.classList.add('reveal-pending');
      });
    } catch (error) {
      revealAll();
    }
  }
  document.addEventListener('focusin', event => {
    if (event.target.closest('.icon-link')) revealAll();
  });
  if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    const homeBtn = document.querySelector('.fab-home');
    if (homeBtn) homeBtn.style.display = 'none';
  }
  if (document.readyState === 'complete') document.body.classList.add('page-loaded');
  else window.addEventListener('load', () => document.body.classList.add('page-loaded'), { once: true });
})();
