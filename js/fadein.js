/* =========================================================
   劉雨軒的 Pathways 動力中心 - fadein.js v13
   ---------------------------------------------------------
   改進內容：
   Scroll 淡入動畫（批次啟動）
   IntersectionObserver 效能最佳化（自動中止觀察）
   平滑回頂端（含動態動畫）
   自動隱藏首頁 按鈕（僅在首頁可見）
   確保在行動裝置與桌機行為一致
   ========================================================= */

// -----------------------------
// Scroll fade-in for icons
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const icons = document.querySelectorAll(".icon-wrapper");

  // 淡入觀察器
  const iconObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target);
        }
      });

      // 所有 icon 都淡入後，自動停止觀察
      if ([...icons].every(i => i.classList.contains("fade-in"))) {
        observer.disconnect();
      }
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  icons.forEach(icon => iconObserver.observe(icon));
});

// -----------------------------
// Smooth scroll to top button
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const topBtn = document.querySelector(".fab-top");

  if (topBtn) {
    topBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // 平滑回頂端動畫
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    // 顯示/隱藏按鈕
    window.addEventListener("scroll", () => {
      if (window.scrollY > 150) {
        topBtn.style.opacity = "1";
        topBtn.style.pointerEvents = "auto";
      } else {
        topBtn.style.opacity = "0";
        topBtn.style.pointerEvents = "none";
      }
    });
  }
});

// -----------------------------
// Hide home button on homepage itself
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const homeBtn = document.querySelector(".fab-home");
  const isHomePage = window.location.pathname.endsWith("index.html") || window.location.pathname === "/";

  if (homeBtn && isHomePage) {
    homeBtn.style.display = "none";
  }
});

// -----------------------------
// Lazy loading fallback (for older browsers)
// -----------------------------
if ("loading" in HTMLImageElement.prototype === false) {
  window.addEventListener("load", () => {
    const imgs = document.querySelectorAll("img[loading='lazy']");
    imgs.forEach(img => {
      const src = img.getAttribute("data-src") || img.src;
      img.src = src;
    });
  });
}
