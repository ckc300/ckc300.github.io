// JavaScript Document
(function () {
  const nav = {
    home: document.querySelector('[data-nav="home"]'),
    path: document.querySelector('[data-nav="path"]'),
    project: document.querySelector('[data-nav="project"]'),
    timer: document.querySelector('[data-nav="timer"]')
  };

  const pathName = window.location.pathname;

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
    if (handler) {
      el.onclick = handler;
    }
  }

  function activate(el) {
    el.classList.add('active');
  }

  function resetAll() {
    Object.values(nav).forEach(el => {
      el.classList.remove('active');
      el.classList.remove('disabled');
      el.removeAttribute('aria-disabled');
      el.onclick = null;
    });
  }

  /* ========= 狀態判斷 ========= */

  const isHome = pathName === '/' || pathName.endsWith('/index.html');
  const isPathway = pathName.includes('/Projects/');
  const isProject = pathName.includes('/DTM/');
  const isTimer = pathName.includes('/Timer/');

  // 第二層 vs 第三層（是否為內容頁）
  const isPathwayDetail = isPathway && !pathName.endsWith('.html') ? false : isPathway && pathName.match(/\d{4}_/);
  const isProjectDetail = isProject && pathName.match(/\d{4}_/);

  /* ========= 主邏輯 ========= */

  resetAll();

/* --- 首頁（強制狀態）--- */
if (isHome) {
  // 先把所有 active 全部清掉（不相信任何前置狀態）
  Object.values(nav).forEach(el => {
    el.classList.remove('active');
  });

  // 首頁：唯一高亮
  nav.home.classList.add('active');
  disable(nav.home);

  // 我的路徑：語意不存在
  disable(nav.path);

  // 其他入口
  enable(nav.project);
  enable(nav.timer);

  return; // ⚠️ 必須在最外層 function / IIFE 內
}


  /* --- 路徑系統 --- */
  if (isPathway) {
    activate(nav.path);

    if (isPathwayDetail) {
      // 第三層：高亮 + 可用（回上一層）
      enable(nav.path, () => history.back());
    } else {
      // 第二層：高亮 + 不可用
      disable(nav.path);
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
      // 第三層：高亮 + 可用（回上一層）
      enable(nav.project, () => history.back());
    } else {
      // 第二層：高亮 + 不可用
      disable(nav.project);
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
