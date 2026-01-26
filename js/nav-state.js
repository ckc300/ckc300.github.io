// nav-state.js
(function () {
  const nav = {
    home: document.querySelector('[data-nav="home"]'),
    path: document.querySelector('[data-nav="path"]'),
    project: document.querySelector('[data-nav="project"]'),
    timer: document.querySelector('[data-nav="timer"]')
  };

  if (!nav.home || !nav.path || !nav.project || !nav.timer) return;

  const pathName = window.location.pathname.replace(/\/+$/, '');

  /* ========= 工具函式 ========= */

  function disable(el) {
    el.classList.add('disabled');
    el.setAttribute('aria-disabled', 'true');
    el.removeAttribute('href');
    el.onclick = null;
  }

  function enable(el, handler = null) {
    el.classList.remove('disabled');
    el.removeAttribute('aria-disabled');
    if (handler) el.onclick = handler;
  }

  function activate(el) {
    el.classList.add('active');
  }

  function resetAll() {
    Object.values(nav).forEach(el => {
      el.classList.remove('active', 'disabled');
      el.removeAttribute('aria-disabled');
      el.onclick = null;
    });
  }

  /* ========= 狀態判斷（關鍵修正） ========= */

  // 首頁只允許根目錄 index
  const isHome =
    pathName === '' ||
    pathName === '/' ||
    pathName === '/index.html';

  // 宇宙判斷：使用資料夾語意（支援 GitHub Pages）
  const isPathway = /\/Projects\//.test(pathName);
  const isProject = /\/DTM\//.test(pathName);
  const isTimer   = /\/Timer\//.test(pathName);

  // 第三層內容頁（僅用於層級，不用於宇宙）
  const isPathwayDetail = isPathway && /\d{4}_/.test(pathName);
  const isProjectDetail = isProject && /\d{4}_/.test(pathName);

  /* ========= 主邏輯 ========= */

  resetAll();

  /* --- 首頁 --- */
  if (isHome) {
    activate(nav.home);
    disable(nav.home);

    disable(nav.path);
    enable(nav.project);
    enable(nav.timer);
    return;
  }

  /* --- 我的路徑宇宙 --- */
  if (isPathway) {
    if (isPathwayDetail) {
      enable(nav.path, () => history.back());
    } else {
      disable(nav.path);
    }

    activate(nav.path);

    enable(nav.home);
    enable(nav.project);
    enable(nav.timer);
    return;
  }

  /* --- 專案計畫宇宙 --- */
  if (isProject) {
    if (isProjectDetail) {
      enable(nav.project, () => history.back());
    } else {
      disable(nav.project);
    }

    activate(nav.project);

    enable(nav.home);
    disable(nav.path);
    enable(nav.timer);
    return;
  }

  /* --- 工具頁 --- */
  if (isTimer) {
    activate(nav.timer);
    disable(nav.timer);

    enable(nav.home);
    disable(nav.path);
    enable(nav.project);
  }
})();
