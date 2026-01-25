// JavaScript Document
(function () {
  const nav = {
    home: document.querySelector('[data-nav="home"]'),
    path: document.querySelector('[data-nav="path"]'),
    project: document.querySelector('[data-nav="project"]'),
    timer: document.querySelector('[data-nav="timer"]')
  };

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

  // ✅ 首頁只允許根目錄
  const isHome =
    pathName === '' ||
    pathName === '/' ||
    pathName === '/index.html';

  // ✅ 宇宙用資料夾判斷
  const isPathway = pathName.startsWith('/Projects/');
  const isProject = pathName.startsWith('/DTM/');
  const isTimer = pathName.startsWith('/Timer/');

  // ✅ 第三層：內容頁（用命名規則判斷）
  const isPathwayDetail = isPathway && /\d{4}_/.test(pathName);
  const isProjectDetail = isProject && /\d{4}_/.test(pathName);

  /* ========= 主邏輯 ========= */

  resetAll();

  /* --- 首頁 --- */
  if (isHome) {
    activate(nav.home);
    disable(nav.home);

    disable(nav.path);      // 路徑未選，語意不存在
    enable(nav.project);
    enable(nav.timer);
    return;
  }

  /* --- 路徑系統 --- */
  if (isPathway) {
    activate(nav.path);

    if (isPathwayDetail) {
      enable(nav.path, () => history.back()); // 第三層
    } else {
      disable(nav.path); // 第二層
    }

    enable(nav.home);
    enable(nav.project);
    enable(nav.timer);
    return;
  }

  /* --- 專案計畫系統 --- */
  if (isProject) {
    activate(nav.project);

    if (isProjectDetail) {
      enable(nav.project, () => history.back()); // 第三層
    } else {
      disable(nav.project); // 第二層
    }

    enable(nav.home);
    disable(nav.path); // 不屬於此宇宙
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
