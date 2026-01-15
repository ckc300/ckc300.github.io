const sections = document.querySelectorAll('.icon-section');
const sectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

sections.forEach(section => sectionObserver.observe(section));

const icons = document.querySelectorAll('.icon-wrapper');
let fadedIconCount = 0;

const iconObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
      fadedIconCount++;
      if (fadedIconCount === icons.length) {
        observer.disconnect();
        console.log("[fadein.js] All icons have faded in ¡X observer disconnected.");
      }
    }
  });
}, { threshold: 0.15 });

icons.forEach(icon => iconObserver.observe(icon));

const scrollTopBtn = document.querySelector('.fab-top');
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', e => {
    e.preventDefault();
    if ('scrollBehavior' in document.documentElement.style) {
      document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
      document.body.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  });
}

if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
  const homeBtn = document.querySelector('.fab-home');
  if (homeBtn) homeBtn.style.display = "none";
}

window.addEventListener('load', () => {
  document.body.classList.add('page-loaded');
});
