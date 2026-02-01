// nav-state.js
(function () {
  const nav = {
    home: document.querySelector('[data-nav="home"]'),
    path: document.querySelector('[data-nav="path"]'),
    project: document.querySelector('[data-nav="project"]'),
    timer: document.querySelector('[data-nav="timer"]')
  };

  if (!nav.home) return;

  const pathName = window.location.pathname;

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

    // ⭐ 關鍵：真的鎖死點擊
    el.onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };
  }

  function enable(el, handler = null, href = null) {
    if (!el) return;
    el.classList.remove('disabled');
    el.removeAttribute('aria-disabled');

    if (href) el.setAttribute('href', href);
    if (handler) el.onclick = handler;
  }

  /* ================= 宇宙與層級判斷 ================= */

  const isHome =
    pathName === '/' || pathName === '/index.html';

  const isPathway =
    pathName.startsWith('/Projects/');

  const isProject =
    pathName.startsWith('/DTM/');

  const isTimer =
    pathName.startsWith('/Timer/');

  // 第二層（清單頁）判斷
  const isPathwaySecondLevel =
    isPathway && !pathName.match(/\/\d{4}_/);

  const isProjectSecondLevel =
    pathName === '/DTM/index.html';

  // 第三層（內容頁）判斷
  const isPathwayThirdLevel =
    isPathway && pathName.match(/\/\d{4}_/);

  const isProjectThirdLevel =
    isProject && !isProjectSecondLevel;

  /* ================= 主邏輯 ================= */

  resetAll();

  /* ---------- 首頁 ---------- */
  if (isHome) {
    activate(nav.home);
    disable(nav.home);

    disable(nav.path);
    enable(nav.project, null, '/DTM/index.html');
    enable(nav.timer, null, '/Timer/timer.html');
    return;
  }

  /* ---------- Pathways（我的路徑） ---------- */
  if (isPathway) {
    activate(nav.path);

    if (isPathwaySecondLevel) {
      // 第二層：高亮 + 不可用（不回首頁）
      disable(nav.path);
    }

    if (isPathwayThirdLevel) {
      // 第三層：高亮 + 可用（回上一頁）
      enable(nav.path, () => history.back());
    }

    enable(nav.home, null, '/index.html');
    enable(nav.project, null, '/DTM/index.html');
    enable(nav.timer, null, '/Timer/timer.html');
    return;
  }

  /* ---------- 專案計畫（DTM） ---------- */
  if (isProject) {
    activate(nav.project);

    if (isProjectSecondLevel) {
      // 第二層：高亮 + 不可用
      disable(nav.project);
    }

    if (isProjectThirdLevel) {
      // 第三層：高亮 + 可用（回上一頁）
      enable(nav.project, () => history.back());
    }

    enable(nav.home, null, '/index.html');
    disable(nav.path);
    enable(nav.timer, null, '/Timer/timer.html');
    return;
  }

  /* ---------- 工具頁 ---------- */
  if (isTimer) {
    activate(nav.timer);
    disable(nav.timer);

    enable(nav.home, null, '/index.html');
    disable(nav.path);
    enable(nav.project, null, '/DTM/index.html');
  }
})();
