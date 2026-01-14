/* === fadein.js v11_2026.5 === */
/* 修正：
   回頂端按鈕在所有瀏覽器恢復平滑滾動
   保留分批淡入動畫與首頁自動隱藏按鈕
*/

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

// 平滑回頂端（修正版，支援所有平台）
const scrollTopBtn = document.querySelector('.fab-top');
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// 首頁隱藏「回首頁」
if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
  const homeBtn = document.querySelector('.fab-home');
  if (homeBtn) homeBtn.style.display = "none";
}
