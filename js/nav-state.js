// nav-state.js
(function () {
  const nav = {
    home: document.querySelector('[data-nav="home"]'),
    path: document.querySelector('[data-nav="path"]'),
    project: document.querySelector('[data-nav="project"]'),
    timer: document.querySelector('[data-nav="timer"]')
  };

  if (!nav.home) return;

  const path = window.location.pathname;

  /* ================= 工具函式 ================= */

  function resetAll() {
    Object.values(nav).forEach(el => {
      if (!el) return;
      el.classList.remove('active', 'disabled');
      el.removeAttribute('aria-disabled');
      el.onclick = null;
    });
  }

  function activate(el) {
    if (el) el.classList.add('active');
  }

  function disable(el) {
    if (!el) return;
    el.classList.add('disabled');
    el.setAttribute('aria-disabled', 'true');
    el.removeAttribute('href');
    el.onclick = null;
  }

  function enable(el, href = null, handler = null) {
    if (!el) return;
    el.classList.remove('disabled');
    el.removeAttribute('aria-disabled');
    if (href) el.setAttribute('href', href);
    if (handler) el.onclick = handler;
  }

  /* ================= 宇宙判斷（只看資料夾） ================= */

  const isHome =
    path === '/' ||
    path === '/index.html';

  const isPathway =
    path.startsWith('/Projects/');

  const isProject =
    path.startsWith('/DTM/');

  const isTimer =
    path.startsWith('/Timer/');

  const isPathwayIndex =
    path === '/Projects/index.html';

  const isProjectIndex =
    path === '/DTM/index.html';

  /* ================= 主邏輯 ================= */

  resetAll();

  /* ---------- 首頁 ---------- */
  if (isHome) {
    activate(nav.home);
    disable(nav.home);

    disable(nav.path);
    enable(nav.project, '/DTM/index.html');
    enable(nav.timer, '/Timer/timer.html');
    return;
  }

  /* ---------- Pathway 宇宙 ---------- */
  if (isPathway) {
    activate(nav.path);

    if (isPathwayIndex) {
      // 第二層
      disable(nav.path);
    } else {
      // 第三層
      enable(nav.path, null, () => history.back());
    }

    enable(nav.home, '/index.html');
    enable(nav.project, '/DTM/index.html');
    enable(nav.timer, '/Timer/timer.html');
    return;
  }

  /* ---------- 專案計畫（DTM）宇宙 ---------- */
  if (isProject) {
    activate(nav.project);

    if (isProjectIndex) {
      // 第二層
      disable(nav.project);
    } else {
      // 第三層
      enable(nav.project, null, () => history.back());
    }

    enable(nav.home, '/index.html');
    disable(nav.path);
    enable(nav.timer, '/Timer/timer.html');
    return;
  }

  /* ---------- 工具頁 ---------- */
  if (isTimer) {
    activate(nav.timer);
    disable(nav.timer);

    enable(nav.home, '/index.html');
    disable(nav.path);
    enable(nav.project, '/DTM/index.html');
  }
})();
