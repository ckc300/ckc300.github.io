/* === fadein.js v2026.5 Scroll 與互動強化 === */

// icon-section 整體淡入
const sections = document.querySelectorAll('.icon-section');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      sectionObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

sections.forEach((s) => sectionObserver.observe(s));

// 每個 icon-wrapper 分批淡入
const icons = document.querySelectorAll('.icon-wrapper');
const iconObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      iconObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
icons.forEach((icon) => iconObserver.observe(icon));

// 平滑回到最上方
document.querySelector('.fab-top')?.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 首頁隱藏「🏠 回首頁」
if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
  const homeBtn = document.querySelector('.fab-home');
  if (homeBtn) homeBtn.style.display = "none";
}
