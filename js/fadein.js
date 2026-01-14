/* === fadein.js v12_2026.1 === */
/* 功能總覽：
   Scroll-triggered fade-in for sections and icons
   Disconnect observer after all icons fade in
   Smooth scroll-to-top action (cross-browser)
   Auto-hide "Home" button on index page
   Efficient memory handling and safe checks
*/

// 淡入整個 icon-section
const sections = document.querySelectorAll('.icon-section');
const sectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

// 啟用 section 觀察
sections.forEach(section => sectionObserver.observe(section));


// --- 分批淡入每個 icon-wrapper ---
const icons = document.querySelectorAll('.icon-wrapper');
let fadedIconCount = 0;

const iconObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
      fadedIconCount++;

      // 若所有圖標皆已淡入，則自動 disconnect
      if (fadedIconCount === icons.length) {
        observer.disconnect();
        console.log("[fadein.js] All icons have faded in — observer disconnected.");
      }
    }
  });
}, { threshold: 0.15 });

// 啟用 icon 觀察
icons.forEach(icon => iconObserver.observe(icon));


// --- 平滑回頂端按鈕 ---
const scrollTopBtn = document.querySelector('.fab-top');
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', e => {
    e.preventDefault();

    // 同時對 body 與 html 執行，確保 Safari / iOS 有效
    if ('scrollBehavior' in document.documentElement.style) {
      document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
      document.body.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  });
}


// --- 自動隱藏首頁的「回首頁」按鈕 ---
if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
  const homeBtn = document.querySelector('.fab-home');
  if (homeBtn) homeBtn.style.display = "none";
}


// --- 可選：在頁面完全載入後再啟動動畫（避免閃爍） ---
window.addEventListener('load', () => {
  document.body.classList.add('page-loaded');
});
